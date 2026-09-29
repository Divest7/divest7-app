import { Link, createFileRoute } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  DAY_COUNT,
  MONTH_NAMES,
  dayOfYear,
  getEntry,
  monthRange,
  searchEntries,
} from '@/data/days'
import { MOVEMENTS } from '@/data/library'
import { Eyebrow, EmptyState, ScreenHeader } from '@/components/ui'
import { useHydrated, useStore } from '@/lib/store'

export const Route = createFileRoute('/_app/days/')({
  component: Days,
  validateSearch: (s: Record<string, unknown>) => ({
    month: typeof s.month === 'string' ? s.month : undefined,
    q: typeof s.q === 'string' ? s.q : undefined,
  }),
  loader: () => ({ today: dayOfYear() }),
  head: () => ({ meta: [{ title: '365 Days — DIVEST 7' }] }),
})

function Days() {
  const { today } = Route.useLoaderData()
  const { month, q } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [query, setQuery] = useState(q ?? '')

  const activeMonth = month ? Math.max(0, Math.min(11, Number(month))) : monthOf(today)
  const store = useStore()
  const ready = useHydrated()
  const completed = new Set(ready ? store.completed : [])

  const results = useMemo(() => (query.trim().length >= 2 ? searchEntries(query) : null), [query])

  const range = monthRange(activeMonth)
  const monthDays = useMemo(
    () => Array.from({ length: range.last - range.first + 1 }, (_, i) => getEntry(range.first + i)),
    [range.first, range.last],
  )

  const shown = results ?? monthDays
  const movement = MOVEMENTS[activeMonth]

  return (
    <div>
      <ScreenHeader
        eyebrow={`${DAY_COUNT} entries · one for every day`}
        title="The Year"
        lede="Twelve movements, seven steps practiced throughout the year. Every day carries its own affirmation, Scripture, question and step — no two are the same."
      />

      {/* Search */}
      <div className="rise relative mb-7" style={{ animationDelay: '60ms' }}>
        <Search
          size={16}
          strokeWidth={1.6}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-mist-500"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            navigate({ search: (p) => ({ ...p, q: e.target.value || undefined }), replace: true })
          }}
          placeholder="Search affirmations, Scripture, questions, steps…"
          className="panel w-full rounded-full py-4 pl-13 pr-13 text-[0.9rem] text-cream placeholder:text-mist-500/70 focus:border-gold-500/40 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('')
              navigate({ search: (p) => ({ ...p, q: undefined }), replace: true })
            }}
            className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-mist-500 hover:text-gold-300"
          >
            <X size={15} strokeWidth={1.7} />
          </button>
        ) : null}
      </div>

      {/* Month rail */}
      {!results ? (
        <div className="-mx-5 mb-8 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <div className="flex min-w-max gap-2 pb-1">
            {MONTH_NAMES.map((name, i) => (
              <Link
                key={name}
                to="/days"
                search={(p) => ({ ...p, month: String(i) })}
                replace
                className={`rounded-full border px-4 py-2.5 text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
                  i === activeMonth
                    ? 'border-gold-500/45 bg-gold-500/12 text-gold-300'
                    : 'border-mist-500/18 text-mist-500 hover:border-mist-500/40 hover:text-cream'
                }`}
              >
                {name.slice(0, 3)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {!results ? (
        <div className="rise mb-7" style={{ animationDelay: '120ms' }}>
          <Eyebrow>Movement {activeMonth + 1}</Eyebrow>
          <h2 className="mt-2 text-[1.6rem]">{movement.title}</h2>
          <p className="mt-1.5 text-[0.85rem] text-mist-500">{movement.theme}</p>
        </div>
      ) : (
        <p className="rise mb-7 text-[0.78rem] tracking-[0.16em] uppercase text-mist-500">
          {results.length} {results.length === 1 ? 'entry' : 'entries'} matching &ldquo;{query}&rdquo;
        </p>
      )}

      {shown.length === 0 ? (
        <EmptyState
          title="Nothing found"
          body="Try a shorter phrase, a book of the Bible, or one of the seven movements — Dream, Believe, Decide, Act, Reflect, Plan, Transform."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {shown.map((e, i) => (
            <Link
              key={e.day}
              to="/days/$day"
              params={{ day: String(e.day) }}
              className="panel rise group relative overflow-hidden rounded-[1.1rem] px-5 py-5 transition-all duration-300 hover:border-gold-500/35"
              style={{ animationDelay: `${Math.min(i, 14) * 28 + 140}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-[0.95rem] text-gold-400">
                    {String(e.day).padStart(3, '0')}
                  </p>
                  <p className="mt-1 text-[0.7rem] tracking-[0.18em] uppercase text-mist-500">
                    {e.label} &middot; {e.step.name}
                  </p>
                </div>
                <span className="flex items-center gap-2">
                  {e.day === today ? (
                    <span className="rounded-full border border-gold-500/40 px-2.5 py-1 text-[0.55rem] tracking-[0.2em] uppercase text-gold-300">
                      Today
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full transition-colors ${
                      completed.has(e.day) ? 'bg-gold-400' : 'bg-mist-500/25'
                    }`}
                  />
                </span>
              </div>
              <p className="mt-4 font-display text-[1.02rem] leading-snug text-cream/92">
                {e.affirmation}
              </p>
              <p className="mt-3 text-[0.72rem] tracking-[0.14em] uppercase text-mist-500/80">
                {e.scripture.ref}
              </p>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px gold-hairline opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function monthOf(day: number) {
  for (let m = 0; m < 12; m += 1) {
    const r = monthRange(m)
    if (day >= r.first && day <= r.last) return m
  }
  return 0
}
