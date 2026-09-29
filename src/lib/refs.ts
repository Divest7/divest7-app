import { BOOKS, type Book } from '@/data/bible'

const ALIASES: Record<string, string> = {
  psalm: 'psalms',
  song: 'song of solomon',
  songs: 'song of solomon',
  'song of songs': 'song of solomon',
  canticles: 'song of solomon',
  revelations: 'revelation',
}

const BY_NAME = new Map(BOOKS.map((b) => [b.name.toLowerCase(), b]))

export function findBookByName(name: string): Book | undefined {
  const key = name.trim().toLowerCase().replace(/\s+/g, ' ')
  return BY_NAME.get(ALIASES[key] ?? key)
}

/** Parses "Psalm 23:1-2" or "1 Corinthians 13" into a book and chapter. */
export function parseRef(ref: string): { book: Book; chapter: number; verse?: number } | null {
  const m = ref.trim().match(/^((?:[123]\s+)?[A-Za-z][A-Za-z ]*?)\s+(\d+)(?::(\d+))?/)
  if (!m) return null
  const book = findBookByName(m[1])
  if (!book) return null
  const chapter = Number(m[2])
  if (!Number.isFinite(chapter) || chapter < 1 || chapter > book.chapters) return null
  return { book, chapter, verse: m[3] ? Number(m[3]) : undefined }
}

/** Backward-compatible name used by Favorites. */
export const parseScriptureRef = parseRef
