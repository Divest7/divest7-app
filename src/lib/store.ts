import { useSyncExternalStore } from 'react'

/**
 * On-device store for journal entries, favorites and completed days.
 *
 * This is the single seam between the UI and persistence. It is deliberately
 * the only module that knows *where* personal data lives, so the planned move
 * to accounts + Netlify Database only has to change this file and swap the
 * synchronous getters for async ones.
 */

const KEY = 'divest7:v1'

export type JournalEntry = {
  id: string
  day: number
  title: string
  body: string
  prompt?: string
  createdAt: number
  updatedAt: number
}

export type Favorite = {
  id: string
  kind: 'affirmation' | 'scripture'
  text: string
  /** Scripture reference, e.g. "Psalm 23:1". */
  ref?: string
  day?: number
  savedAt: number
}

export type State = {
  journal: JournalEntry[]
  favorites: Favorite[]
  /** Day-of-year numbers, 1–365. */
  completed: number[]
}

const EMPTY: State = { journal: [], favorites: [], completed: [] }

let state: State = EMPTY
let hydrated = false
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((l) => l())

function read(): State {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<State>
    return {
      journal: Array.isArray(parsed.journal) ? parsed.journal : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
    }
  } catch {
    return EMPTY
  }
}

function write(next: State) {
  state = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* quota or private mode — keep the in-memory copy */
  }
  emit()
}

/** Loads saved data on the client. Safe to call more than once. */
export function hydrateStore() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  state = read()
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = read()
      emit()
    }
  })
  emit()
}

const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const useStore = (): State =>
  useSyncExternalStore(subscribe, () => state, () => EMPTY)

export const useHydrated = (): boolean =>
  useSyncExternalStore(subscribe, () => hydrated, () => false)

const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

/* --- Journal ---------------------------------------------------------- */

export function saveJournal(input: {
  id?: string
  day: number
  title: string
  body: string
  prompt?: string
}): string {
  const now = Date.now()
  if (input.id) {
    const id = input.id
    write({
      ...state,
      journal: state.journal.map((e) =>
        e.id === id ? { ...e, title: input.title, body: input.body, updatedAt: now } : e,
      ),
    })
    return id
  }
  const entry: JournalEntry = {
    id: uid(),
    day: input.day,
    title: input.title,
    body: input.body,
    prompt: input.prompt,
    createdAt: now,
    updatedAt: now,
  }
  write({ ...state, journal: [entry, ...state.journal] })
  return entry.id
}

export function deleteJournal(id: string) {
  write({ ...state, journal: state.journal.filter((e) => e.id !== id) })
}

/* --- Favorites -------------------------------------------------------- */

export const favoriteId = (kind: Favorite['kind'], text: string, ref?: string) =>
  `${kind}::${ref ?? ''}::${text.slice(0, 80)}`

export function isFavorite(kind: Favorite['kind'], text: string, ref?: string) {
  const id = favoriteId(kind, text, ref)
  return state.favorites.some((f) => f.id === id)
}

export function toggleFavorite(fav: Omit<Favorite, 'id' | 'savedAt'>) {
  const id = favoriteId(fav.kind, fav.text, fav.ref)
  const exists = state.favorites.some((f) => f.id === id)
  write({
    ...state,
    favorites: exists
      ? state.favorites.filter((f) => f.id !== id)
      : [{ ...fav, id, savedAt: Date.now() }, ...state.favorites],
  })
}

/* --- Progress --------------------------------------------------------- */

export function toggleComplete(day: number) {
  const has = state.completed.includes(day)
  write({
    ...state,
    completed: has
      ? state.completed.filter((d) => d !== day)
      : [...state.completed, day].sort((a, b) => a - b),
  })
}

export const isComplete = (day: number) => state.completed.includes(day)

export type Streaks = { current: number; longest: number; total: number }

/** Streaks measured against the fixed 365-day calendar. */
export function computeStreaks(completed: number[], today: number): Streaks {
  const set = new Set(completed)
  let current = 0
  let cursor = set.has(today) ? today : today - 1
  while (cursor >= 1 && set.has(cursor)) {
    current += 1
    cursor -= 1
  }
  if (!set.has(today) && !set.has(today - 1)) current = 0

  let longest = 0
  let run = 0
  const sorted = [...set].sort((a, b) => a - b)
  let prev = -1
  for (const d of sorted) {
    run = d === prev + 1 ? run + 1 : 1
    if (run > longest) longest = run
    prev = d
  }

  return { current, longest, total: set.size }
}
