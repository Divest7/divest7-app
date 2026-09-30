import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, BookOpen, PenLine } from 'lucide-react'
import type { Entry } from '@/data/days'
import { DAY_COUNT } from '@/data/days'
import { Eyebrow, GoldRule, Panel, SaveToggle, StepBadge } from '@/components/ui'
import { parseRef } from '@/lib/refs'
import { hasChapter } from '@/data/bible-text'
import { isFavorite, toggleFavorite, useStore } from '@/lib/store'

/**
 * The full shape of a day: affirmation, message, Scripture, reflection and one
 * action. Shared by the Today screen and every day in the 365 archive.
 */
export function DayEntry({
  entry,
  heading,
  footer,
}: {
  entry: Entry
  heading?: string
  footer?: React.ReactNode
}) {
  useStore() // re-render when favorites change
  const savedAffirmation = isFavorite('affirmation', entry.affirmation)
  const savedScripture = isFavorite('scripture', entry.scripture.text, entry.scripture.ref)
  const ref = parseRef(entry.scripture.ref)
  const readable = ref ? hasChapter(ref.book.slug, ref.chapter) : false

  return (
    <article className="space-y-5">
      <header className="rise">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Eyebrow>
            Day {entry.day} of {DAY_COUNT}
          </Eyebrow>
          <span className="h-1 w-1 rounded-full bg-mist-500/40" />
          <span className="text-[0.66rem] tracking-[0.22em] uppercase text-mist-500">
            {entry.movement.title}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[2.1rem] leading-none sm:text-[2.9rem]">
            {heading ?? entry.label}
          </h1>
          <StepBadge n={entry.step.n} name={entry.step.name} />
        </div>
        <p className="mt-3 text-[0.82rem] text-mist-500">
          {heading ? `${entry.label} · ` : ''}
          {entry.step.verb}
        </p>
        <GoldRule className="mt-6 opacity-50" />
      </header>

      {/* Affirmation */}
      <Panel tone="gold" className="rise px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '80ms' }}>
        <div className="flex items-start justify-between gap-5">
          <Eyebrow className="pt-1">Affirmation</Eyebrow>
          <SaveToggle
            saved={savedAffirmation}
            label="Save this affirmation"
            onToggle={() =>
              toggleFavorite({ kind: 'affirmation', text: entry.affirmation, day: entry.day })
            }
          />
        </div>
        <p className="mt-4 font-display text-[1.6rem] leading-[1.22] text-cream sm:text-[2.05rem]">
          {entry.affirmation}
        </p>
      </Panel>

      {/* Message */}
      <Panel className="rise px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '150ms' }}>
        <Eyebrow>Today&rsquo;s Message</Eyebrow>
        <p className="mt-4 font-scripture text-[1.08rem] leading-[1.75] text-cream/88 sm:text-[1.18rem]">
          {entry.message}
        </p>
      </Panel>

      {/* Scripture */}
      <Panel className="rise relative overflow-hidden px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '220ms' }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 font-display text-[10rem] leading-none text-gold-500/[0.06] select-none"
        >
          &ldquo;
        </div>
        <div className="relative flex items-start justify-between gap-5">
          <Eyebrow className="pt-1">Scripture &middot; King James Version</Eyebrow>
          <SaveToggle
            saved={savedScripture}
            label="Save this Scripture"
            onToggle={() =>
              toggleFavorite({
                kind: 'scripture',
                text: entry.scripture.text,
                ref: entry.scripture.ref,
                day: entry.day,
              })
            }
          />
        </div>
        <blockquote className="relative mt-4 font-scripture text-[1.15rem] leading-[1.8] text-cream sm:text-[1.3rem]">
          {entry.scripture.text}
        </blockquote>
        <div className="relative mt-5 flex flex-wrap items-center gap-4">
          <cite className="not-italic eyebrow text-gold-400">{entry.scripture.ref}</cite>
          {ref && readable ? (
            <Link
              to="/bible/$book/$chapter"
              params={{ book: ref.book.slug, chapter: String(ref.chapter) }}
              className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-mist-400 transition-colors hover:text-gold-300"
            >
              <BookOpen size={13} strokeWidth={1.6} />
              Read the chapter
            </Link>
          ) : null}
        </div>
      </Panel>

      {/* Prayer */}
      <Panel tone="gold" className="rise px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '270ms' }}>
        <Eyebrow>Prayer</Eyebrow>
        <p className="mt-4 font-scripture text-[1.08rem] leading-[1.75] text-cream/92 sm:text-[1.18rem]">
          {entry.prayer}
        </p>
      </Panel>

      {/* Reflection */}
      <Panel className="rise px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '320ms' }}>
        <Eyebrow>Reflection</Eyebrow>
        <p className="mt-4 font-display text-[1.28rem] leading-[1.4] text-cream/92 sm:text-[1.5rem]">
          {entry.reflection}
        </p>
        <Link
          to="/journal"
          search={{ day: entry.day, prompt: entry.reflection }}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-mist-500/25 px-5 py-3 text-[0.68rem] tracking-[0.22em] uppercase text-cream/85 transition-colors hover:border-gold-500/50 hover:text-gold-300"
        >
          <PenLine size={13} strokeWidth={1.7} />
          Write about this
        </Link>
      </Panel>

      {/* Action */}
      <Panel className="rise px-6 py-7 sm:px-9 sm:py-9" style={{ animationDelay: '390ms' }}>
        <div className="flex items-start gap-5">
          <span className="mt-0.5 font-display text-[2.4rem] leading-none text-gold-500/25">
            {entry.step.n}
          </span>
          <div className="min-w-0">
            <Eyebrow>One Step &middot; {entry.step.name}</Eyebrow>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-cream/90 sm:text-[1.1rem]">
              {entry.action}
            </p>
          </div>
        </div>
      </Panel>

      {footer}

      <nav className="rise flex items-center justify-between gap-4 pt-4" style={{ animationDelay: '460ms' }}>
        {entry.day > 1 ? (
          <Link
            to="/days/$day"
            params={{ day: String(entry.day - 1) }}
            className="inline-flex items-center gap-2.5 text-[0.7rem] tracking-[0.2em] uppercase text-mist-500 transition-colors hover:text-gold-300"
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
            Day {entry.day - 1}
          </Link>
        ) : (
          <span />
        )}
        {entry.day < DAY_COUNT ? (
          <Link
            to="/days/$day"
            params={{ day: String(entry.day + 1) }}
            className="inline-flex items-center gap-2.5 text-[0.7rem] tracking-[0.2em] uppercase text-mist-500 transition-colors hover:text-gold-300"
          >
            Day {entry.day + 1}
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
