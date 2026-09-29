import { Link, createFileRoute } from '@tanstack/react-router'
import { BookOpen, Search } from 'lucide-react'
import { booksByDivision, type Testament } from '@/data/bible'
import { Panel, ScreenHeader } from '@/components/ui'
import { useState } from 'react'

export const Route = createFileRoute('/_app/bible/')({ component: BibleHome })

function BibleHome() {
  const [testament, setTestament] = useState<Testament>('Old')
  const groups = booksByDivision(testament)
  return <>
    <ScreenHeader eyebrow="The Word" title="KJV Bible" lede="Read the King James Version by book and chapter. Save verses that speak to you and return to them anytime." aside={<Link to="/bible/search" className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/30 text-gold-300" aria-label="Search Scripture"><Search size={17}/></Link>} />
    <div className="mb-7 grid grid-cols-2 gap-2 rounded-full border border-mist-500/15 bg-navy-950/50 p-1.5">
      {(['Old','New'] as Testament[]).map(t => <button key={t} onClick={()=>setTestament(t)} className={`rounded-full px-4 py-3 text-xs tracking-[.18em] uppercase transition ${testament===t?'bg-gold-500/15 text-gold-300':'text-mist-500'}`}>{t} Testament</button>)}
    </div>
    <div className="space-y-8">
      {groups.map(group => <section key={group.division}>
        <p className="eyebrow mb-3 text-gold-500/75">{group.division}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {group.books.map(book => <Link key={book.slug} to="/bible/$book" params={{ book: book.slug }} preload="intent" className="panel group flex items-center justify-between rounded-xl px-5 py-4 transition hover:border-gold-500/35">
            <span><span className="block font-display text-lg text-cream">{book.name}</span><span className="mt-1 block text-[.68rem] text-mist-500">{book.chapters} chapters</span></span>
            <span className="text-[.62rem] tracking-[.12em] uppercase text-gold-400">Read</span>
          </Link>)}
        </div>
      </section>)}
    </div>
    <Panel className="mt-9 flex gap-4 px-5 py-5"><BookOpen className="mt-0.5 shrink-0 text-gold-400" size={19}/><p className="text-sm leading-relaxed text-mist-400">All 66 books and 1,189 chapters are available in the KJV reader. Core chapters are bundled with the app; other chapters load securely from public Bible data sources and are cached on your device after opening.</p></Panel>
  </>
}
