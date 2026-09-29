import { createFileRoute, Link } from '@tanstack/react-router'
import { Bookmark, X } from 'lucide-react'
import { Eyebrow, Panel } from '@/components/ui'
import { toggleFavorite, useStore } from '@/lib/store'
import { parseScriptureRef } from '@/lib/refs'

export const Route = createFileRoute('/_app/favorites')({
  component: Favorites,
})

function Favorites() {
  const { favorites } = useStore()
  const groups: Array<'scripture' | 'affirmation'> = ['scripture', 'affirmation']

  return (
    <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:py-12">
      <Eyebrow>Favorites</Eyebrow>
      <h1 className="mt-3 text-4xl sm:text-5xl">Keep what speaks to you.</h1>
      <p className="mt-3 text-mist-400">Saved Scriptures and affirmations stay on this device.</p>

      {groups.map((kind) => {
        const items = favorites.filter((favorite) => favorite.kind === kind)
        return (
          <section key={kind} className="mt-9">
            <Eyebrow>
              {kind === 'scripture' ? 'Scripture' : 'Affirmations'} · {items.length}
            </Eyebrow>
            <div className="mt-3 space-y-3">
              {items.map((favorite) => {
                const scripture = favorite.ref ? parseScriptureRef(favorite.ref) : null
                return (
                  <Panel key={favorite.id} className="p-6">
                    <div className="flex gap-4">
                      <Bookmark size={17} className="mt-1 shrink-0 text-gold-400" />
                      <div className="flex-1">
                        <p className="font-scripture text-lg leading-relaxed text-cream/90">{favorite.text}</p>
                        {favorite.ref && (
                          <p className="mt-3 text-xs tracking-wider uppercase text-gold-400">{favorite.ref}</p>
                        )}
                        {scripture && (
                          <Link
                            to="/bible/$book/$chapter"
                            params={{ book: scripture.book.slug, chapter: String(scripture.chapter) }}
                            className="mt-3 inline-block text-xs uppercase tracking-wider text-mist-400 hover:text-gold-300"
                          >
                            Read chapter
                          </Link>
                        )}
                      </div>
                      <button
                        type="button"
                        aria-label="Remove favorite"
                        onClick={() =>
                          toggleFavorite({
                            kind: favorite.kind,
                            text: favorite.text,
                            ref: favorite.ref,
                            day: favorite.day,
                          })
                        }
                        className="text-mist-500 hover:text-cream"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </Panel>
                )
              })}
              {items.length === 0 && <Panel className="p-6 text-mist-400">Nothing saved here yet.</Panel>}
            </div>
          </section>
        )
      })}
    </main>
  )
}
