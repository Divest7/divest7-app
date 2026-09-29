/**
 * Structure of the King James Bible: 66 books, their divisions and chapter
 * counts. Navigation is driven entirely by this table, so the reader works for
 * every book whether or not its text has been loaded yet.
 *
 * Verse text lives separately in `src/data/bible-text.ts`.
 */

export type Testament = 'Old' | 'New'

export type Division =
  | 'Law'
  | 'History'
  | 'Wisdom & Poetry'
  | 'Major Prophets'
  | 'Minor Prophets'
  | 'Gospels'
  | 'History of the Church'
  | 'Epistles of Paul'
  | 'General Epistles'
  | 'Prophecy'

export type Book = {
  slug: string
  name: string
  abbr: string
  chapters: number
  testament: Testament
  division: Division
}

const book = (
  name: string,
  abbr: string,
  chapters: number,
  testament: Testament,
  division: Division,
): Book => ({
  slug: name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, ''),
  name,
  abbr,
  chapters,
  testament,
  division,
})

export const BOOKS: Book[] = [
  book('Genesis', 'Gen', 50, 'Old', 'Law'),
  book('Exodus', 'Exo', 40, 'Old', 'Law'),
  book('Leviticus', 'Lev', 27, 'Old', 'Law'),
  book('Numbers', 'Num', 36, 'Old', 'Law'),
  book('Deuteronomy', 'Deu', 34, 'Old', 'Law'),
  book('Joshua', 'Jos', 24, 'Old', 'History'),
  book('Judges', 'Jdg', 21, 'Old', 'History'),
  book('Ruth', 'Rut', 4, 'Old', 'History'),
  book('1 Samuel', '1Sa', 31, 'Old', 'History'),
  book('2 Samuel', '2Sa', 24, 'Old', 'History'),
  book('1 Kings', '1Ki', 22, 'Old', 'History'),
  book('2 Kings', '2Ki', 25, 'Old', 'History'),
  book('1 Chronicles', '1Ch', 29, 'Old', 'History'),
  book('2 Chronicles', '2Ch', 36, 'Old', 'History'),
  book('Ezra', 'Ezr', 10, 'Old', 'History'),
  book('Nehemiah', 'Neh', 13, 'Old', 'History'),
  book('Esther', 'Est', 10, 'Old', 'History'),
  book('Job', 'Job', 42, 'Old', 'Wisdom & Poetry'),
  book('Psalms', 'Psa', 150, 'Old', 'Wisdom & Poetry'),
  book('Proverbs', 'Pro', 31, 'Old', 'Wisdom & Poetry'),
  book('Ecclesiastes', 'Ecc', 12, 'Old', 'Wisdom & Poetry'),
  book('Song of Solomon', 'Sng', 8, 'Old', 'Wisdom & Poetry'),
  book('Isaiah', 'Isa', 66, 'Old', 'Major Prophets'),
  book('Jeremiah', 'Jer', 52, 'Old', 'Major Prophets'),
  book('Lamentations', 'Lam', 5, 'Old', 'Major Prophets'),
  book('Ezekiel', 'Eze', 48, 'Old', 'Major Prophets'),
  book('Daniel', 'Dan', 12, 'Old', 'Major Prophets'),
  book('Hosea', 'Hos', 14, 'Old', 'Minor Prophets'),
  book('Joel', 'Joe', 3, 'Old', 'Minor Prophets'),
  book('Amos', 'Amo', 9, 'Old', 'Minor Prophets'),
  book('Obadiah', 'Oba', 1, 'Old', 'Minor Prophets'),
  book('Jonah', 'Jon', 4, 'Old', 'Minor Prophets'),
  book('Micah', 'Mic', 7, 'Old', 'Minor Prophets'),
  book('Nahum', 'Nah', 3, 'Old', 'Minor Prophets'),
  book('Habakkuk', 'Hab', 3, 'Old', 'Minor Prophets'),
  book('Zephaniah', 'Zep', 3, 'Old', 'Minor Prophets'),
  book('Haggai', 'Hag', 2, 'Old', 'Minor Prophets'),
  book('Zechariah', 'Zec', 14, 'Old', 'Minor Prophets'),
  book('Malachi', 'Mal', 4, 'Old', 'Minor Prophets'),
  book('Matthew', 'Mat', 28, 'New', 'Gospels'),
  book('Mark', 'Mar', 16, 'New', 'Gospels'),
  book('Luke', 'Luk', 24, 'New', 'Gospels'),
  book('John', 'Joh', 21, 'New', 'Gospels'),
  book('Acts', 'Act', 28, 'New', 'History of the Church'),
  book('Romans', 'Rom', 16, 'New', 'Epistles of Paul'),
  book('1 Corinthians', '1Co', 16, 'New', 'Epistles of Paul'),
  book('2 Corinthians', '2Co', 13, 'New', 'Epistles of Paul'),
  book('Galatians', 'Gal', 6, 'New', 'Epistles of Paul'),
  book('Ephesians', 'Eph', 6, 'New', 'Epistles of Paul'),
  book('Philippians', 'Phi', 4, 'New', 'Epistles of Paul'),
  book('Colossians', 'Col', 4, 'New', 'Epistles of Paul'),
  book('1 Thessalonians', '1Th', 5, 'New', 'Epistles of Paul'),
  book('2 Thessalonians', '2Th', 3, 'New', 'Epistles of Paul'),
  book('1 Timothy', '1Ti', 6, 'New', 'Epistles of Paul'),
  book('2 Timothy', '2Ti', 4, 'New', 'Epistles of Paul'),
  book('Titus', 'Tit', 3, 'New', 'Epistles of Paul'),
  book('Philemon', 'Phm', 1, 'New', 'Epistles of Paul'),
  book('Hebrews', 'Heb', 13, 'New', 'General Epistles'),
  book('James', 'Jam', 5, 'New', 'General Epistles'),
  book('1 Peter', '1Pe', 5, 'New', 'General Epistles'),
  book('2 Peter', '2Pe', 3, 'New', 'General Epistles'),
  book('1 John', '1Jo', 5, 'New', 'General Epistles'),
  book('2 John', '2Jo', 1, 'New', 'General Epistles'),
  book('3 John', '3Jo', 1, 'New', 'General Epistles'),
  book('Jude', 'Jud', 1, 'New', 'General Epistles'),
  book('Revelation', 'Rev', 22, 'New', 'Prophecy'),
]

export const OLD_TESTAMENT = BOOKS.filter((b) => b.testament === 'Old')
export const NEW_TESTAMENT = BOOKS.filter((b) => b.testament === 'New')

export const DIVISION_ORDER: Division[] = [
  'Law',
  'History',
  'Wisdom & Poetry',
  'Major Prophets',
  'Minor Prophets',
  'Gospels',
  'History of the Church',
  'Epistles of Paul',
  'General Epistles',
  'Prophecy',
]

export const booksByDivision = (testament: Testament) =>
  DIVISION_ORDER.map((division) => ({
    division,
    books: BOOKS.filter((b) => b.testament === testament && b.division === division),
  })).filter((group) => group.books.length > 0)

const BY_SLUG = new Map(BOOKS.map((b) => [b.slug, b]))

export const findBook = (slug: string): Book | undefined => BY_SLUG.get(slug.toLowerCase())

export const TOTAL_CHAPTERS = BOOKS.reduce((n, b) => n + b.chapters, 0)
