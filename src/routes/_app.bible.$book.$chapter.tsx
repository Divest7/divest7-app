import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw, WifiOff } from 'lucide-react'
import { BOOKS, findBook } from '@/data/bible'
import { getChapter } from '@/data/bible-text'
import { EmptyState, SaveToggle, ScreenHeader } from '@/components/ui'
import { toggleFavorite, useStore } from '@/lib/store'

export const Route = createFileRoute('/_app/bible/$book/$chapter')({ component: Reader })

type RemoteChapter = { verses?: Array<{ text?: string }> }
const cacheKey = (book: string, chapter: number) => `divest7:kjv:${book}:${chapter}`

async function fetchKjvChapter(bookSlug: string, bookName: string, chapter: number): Promise<string[]> {
  // Primary source: complete public-domain KJV JSON served through jsDelivr.
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/jsubroto/bible-api/versions/kjv/books/${bookSlug}/chapters/${chapter}.json`)
    if (!response.ok) throw new Error('Primary Bible source unavailable')
    const data = (await response.json()) as RemoteChapter
    const verses = Array.isArray(data.verses) ? data.verses.map(v => String(v.text ?? '').trim()).filter(Boolean) : []
    if (verses.length) return verses
  } catch {
    // Continue to the independent fallback below.
  }

  // Fallback source. The single-chapter option keeps Jude/Philemon/2 John/3 John unambiguous.
  const ref = encodeURIComponent(`${bookName} ${chapter}`)
  const response = await fetch(`https://bible-api.com/${ref}?translation=kjv&single_chapter_book_matching=indifferent`)
  if (!response.ok) throw new Error('KJV chapter unavailable')
  const data = (await response.json()) as RemoteChapter
  const verses = Array.isArray(data.verses) ? data.verses.map(v => String(v.text ?? '').trim()).filter(Boolean) : []
  if (!verses.length) throw new Error('KJV chapter unavailable')
  return verses
}

function Reader() {
  const { book: slug, chapter: raw } = Route.useParams()
  const book = findBook(slug)
  const chapter = Number(raw)
  if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) throw notFound()

  const localVerses = getChapter(book.slug, chapter)
  const [remoteVerses, setRemoteVerses] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(!localVerses)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const verses = localVerses ?? remoteVerses
  const { favorites } = useStore()

  useEffect(() => {
    if (localVerses) {
      setRemoteVerses(null)
      setLoading(false)
      setFailed(false)
      return
    }

    let live = true
    setLoading(true)
    setFailed(false)

    try {
      const cached = localStorage.getItem(cacheKey(book.slug, chapter))
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length) {
          setRemoteVerses(parsed)
          setLoading(false)
          return () => { live = false }
        }
      }
    } catch {
      // A damaged cache should never stop Bible reading.
    }

    fetchKjvChapter(book.slug, book.name, chapter)
      .then(data => {
        if (!live) return
        setRemoteVerses(data)
        try { localStorage.setItem(cacheKey(book.slug, chapter), JSON.stringify(data)) } catch {}
      })
      .catch(() => { if (live) { setRemoteVerses(null); setFailed(true) } })
      .finally(() => { if (live) setLoading(false) })

    return () => { live = false }
  }, [book.slug, book.name, chapter, localVerses, attempt])

  const bi = BOOKS.findIndex(b => b.slug === book.slug)
  const prev = chapter > 1 ? { b: book, c: chapter - 1 } : bi > 0 ? { b: BOOKS[bi - 1], c: BOOKS[bi - 1].chapters } : null
  const next = chapter < book.chapters ? { b: book, c: chapter + 1 } : bi < BOOKS.length - 1 ? { b: BOOKS[bi + 1], c: 1 } : null

  return <>
    <ScreenHeader eyebrow={`${book.name} · KJV`} title={`Chapter ${chapter}`} lede="Read the complete King James Version. Chapters retrieved online are saved on this device for quicker return visits." />

    {loading ? <EmptyState title="Loading KJV chapter" body="Retrieving this public-domain chapter for the reader." /> : verses ?
      <div className="space-y-1">{verses.map((text, i) => {
        const ref = `${book.name} ${chapter}:${i + 1}`
        const saved = favorites.some(f => f.kind === 'scripture' && f.ref === ref && f.text === text)
        return <div key={i} className="group flex gap-4 border-b border-mist-500/10 py-4">
          <span className="w-7 shrink-0 pt-1 text-right font-display text-sm text-gold-400">{i + 1}</span>
          <p className="flex-1 font-serif text-[1.08rem] leading-[1.8] text-cream/90">{text}</p>
          <SaveToggle saved={saved} label={`${saved ? 'Remove' : 'Save'} ${ref}`} onToggle={() => toggleFavorite({ kind: 'scripture', text, ref })} />
        </div>
      })}</div> :
      <div className="panel rounded-2xl p-7 text-center">
        <WifiOff className="mx-auto text-gold-400" size={26} />
        <h2 className="mt-4 font-display text-2xl text-cream">Chapter could not load</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist-400">This chapter needs an internet connection the first time it is opened. Reconnect and try again.</p>
        {failed && <button type="button" onClick={() => setAttempt(n => n + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-500/35 px-5 py-3 text-xs uppercase tracking-wider text-gold-300"><RefreshCw size={14}/>Try again</button>}
      </div>}

    <div className="mt-9 grid grid-cols-2 gap-3">
      {prev ? <Link to="/bible/$book/$chapter" params={{ book: prev.b.slug, chapter: String(prev.c) }} className="panel flex items-center gap-2 rounded-xl px-4 py-4 text-sm text-mist-300"><ChevronLeft size={16}/><span>{prev.b.name} {prev.c}</span></Link> : <span />}
      {next ? <Link to="/bible/$book/$chapter" params={{ book: next.b.slug, chapter: String(next.c) }} className="panel flex items-center justify-end gap-2 rounded-xl px-4 py-4 text-right text-sm text-mist-300"><span>{next.b.name} {next.c}</span><ChevronRight size={16}/></Link> : null}
    </div>
  </>
}
