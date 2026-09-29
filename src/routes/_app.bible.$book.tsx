import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { findBook } from '@/data/bible'
import { ScreenHeader } from '@/components/ui'

export const Route = createFileRoute('/_app/bible/$book')({ component: BookPage })
function BookPage(){
 const {book:slug}=Route.useParams(); const book=findBook(slug); if(!book) throw notFound()
 return <><ScreenHeader eyebrow={`${book.testament} Testament · ${book.division}`} title={book.name} lede={`${book.chapters} chapters · Complete KJV access. Choose a chapter to begin reading.`}/>
 <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">{Array.from({length:book.chapters},(_,i)=>i+1).map(ch=><Link key={ch} to="/bible/$book/$chapter" params={{ book: book.slug, chapter: String(ch) }} preload="intent" className="grid aspect-square place-items-center rounded-xl border border-mist-500/15 text-sm text-mist-300 transition hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-300">{ch}</Link>)}</div>
 <Link to="/bible" className="mt-8 inline-block text-xs tracking-[.16em] uppercase text-gold-400">← All books</Link></>
}
