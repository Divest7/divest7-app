import { MOVEMENTS } from './library'
import { LESSONS } from './daily-lessons'
import { STEPS, type Step } from './divest7'

export const DAY_COUNT = 365

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

/** Fixed 365-day calendar. Leap days fold onto 28 February. */
const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const MONTH_STARTS = MONTH_LENGTHS.reduce<number[]>((acc, len, i) => {
  acc.push(i === 0 ? 1 : acc[i - 1] + MONTH_LENGTHS[i - 1])
  return acc
}, [])

export type Entry = {
  /** 1 – 365 */
  day: number
  /** e.g. "March 14" */
  label: string
  monthIndex: number
  dayOfMonth: number
  movement: (typeof MOVEMENTS)[number]
  step: Step
  affirmation: string
  scripture: { ref: string; text: string }
  message: string
  prayer: string
  reflection: string
  action: string
}

export function clampDay(day: number): number {
  if (!Number.isFinite(day)) return 1
  return Math.min(DAY_COUNT, Math.max(1, Math.trunc(day)))
}

/** Day-of-year 1–365 for a date, folding 29 February onto 28 February. */
export function dayOfYear(date: Date = new Date()): number {
  const year = date.getFullYear()
  const start = Date.UTC(year, 0, 1)
  const today = Date.UTC(year, date.getMonth(), date.getDate())
  let n = Math.floor((today - start) / 86_400_000) + 1
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  if (isLeap && n > 59) n -= 1
  return clampDay(n)
}

export function monthDayForDay(day: number): { monthIndex: number; dayOfMonth: number } {
  const d = clampDay(day)
  let monthIndex = 11
  for (let i = 0; i < 12; i += 1) {
    if (d < MONTH_STARTS[i] + MONTH_LENGTHS[i]) {
      monthIndex = i
      break
    }
  }
  return { monthIndex, dayOfMonth: d - MONTH_STARTS[monthIndex] + 1 }
}

export function dayForMonth(monthIndex: number, dayOfMonth = 1): number {
  const m = Math.min(11, Math.max(0, monthIndex))
  return clampDay(MONTH_STARTS[m] + dayOfMonth - 1)
}

export function monthRange(monthIndex: number): { first: number; last: number; name: string } {
  const m = Math.min(11, Math.max(0, monthIndex))
  return {
    first: MONTH_STARTS[m],
    last: MONTH_STARTS[m] + MONTH_LENGTHS[m] - 1,
    name: MONTH_NAMES[m],
  }
}

/**
 * Composes a day from one coherent editorial lesson. All content elements for
 * the day come from the same DIVEST practice and lesson variant, so the
 * affirmation, message, Scripture, prayer, reflection and action reinforce one
 * central idea. Monthly movements add seasonal framing without changing the
 * lesson's core meaning.
 */
export function getEntry(day: number): Entry {
  const d = clampDay(day)
  const i = d - 1
  const { monthIndex, dayOfMonth } = monthDayForDay(d)
  const step = STEPS[i % 7]
  const lessons = LESSONS[step.key]
  // A stable 0–4 rotation that varies across months while preserving step alignment.
  const variant = (Math.floor((dayOfMonth - 1) / 7) + monthIndex) % lessons.length
  const lesson = lessons[variant]
  const movement = MOVEMENTS[monthIndex]

  return {
    day: d,
    label: `${MONTH_NAMES[monthIndex]} ${dayOfMonth}`,
    monthIndex,
    dayOfMonth,
    movement,
    step,
    affirmation: lesson.affirmation,
    scripture: lesson.scripture,
    message: `${lesson.message} This month’s movement, ${movement.title}, invites you to practice this through ${movement.theme.toLowerCase()}.`,
    prayer: lesson.prayer,
    reflection: lesson.reflection,
    action: lesson.action,
  }
}

export const allEntries = (): Entry[] =>
  Array.from({ length: DAY_COUNT }, (_, i) => getEntry(i + 1))

export function searchEntries(query: string, limit = 60): Entry[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const out: Entry[] = []
  for (let d = 1; d <= DAY_COUNT && out.length < limit; d += 1) {
    const e = getEntry(d)
    const haystack = `${e.label} ${e.affirmation} ${e.message} ${e.prayer} ${e.scripture.ref} ${e.scripture.text} ${e.reflection} ${e.action} ${e.step.name} ${e.movement.title}`
    if (haystack.toLowerCase().includes(q)) out.push(e)
  }
  return out
}

export { MONTH_NAMES }
