import { Bookmark, Check } from 'lucide-react'
import type { ReactNode } from 'react'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow text-gold-500/85 ${className}`}>{children}</p>
}

export function GoldRule({ className = '' }: { className?: string }) {
  return <div className={`gold-hairline h-px w-full ${className}`} />
}

/** Standard page header used by every screen inside the app shell. */
export function ScreenHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  aside?: ReactNode
}) {
  return (
    <header className="rise mb-8">
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-2.5 text-[2rem] leading-[1.05] sm:text-[2.6rem]">{title}</h1>
        </div>
        {aside ? <div className="shrink-0 pb-1.5">{aside}</div> : null}
      </div>
      {lede ? (
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-mist-400">{lede}</p>
      ) : null}
      <GoldRule className="mt-6 opacity-50" />
    </header>
  )
}

export function Panel({
  children,
  tone = 'default',
  className = '',
  style,
}: {
  children: ReactNode
  tone?: 'default' | 'gold'
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <section
      style={style}
      className={`rounded-[1.25rem] ${tone === 'gold' ? 'panel-gold' : 'panel'} ${className}`}
    >
      {children}
    </section>
  )
}

/** Gold save/bookmark toggle used on affirmations, scriptures and verses. */
export function SaveToggle({
  saved,
  onToggle,
  label,
}: {
  saved: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={label}
      className={`group grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 active:scale-90 ${
        saved
          ? 'border-gold-500/70 bg-gold-500/15 text-gold-300'
          : 'border-mist-500/25 text-mist-500 hover:border-gold-500/50 hover:text-gold-400'
      }`}
    >
      <Bookmark size={16} strokeWidth={1.75} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}

export function CompleteToggle({
  done,
  onToggle,
  className = '',
}: {
  done: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      className={`group flex w-full items-center justify-center gap-3 rounded-full border px-6 py-4 text-[0.78rem] tracking-[0.22em] uppercase transition-all duration-300 active:scale-[0.98] ${
        done
          ? 'border-gold-500/60 bg-gold-500/15 text-gold-300'
          : 'border-mist-500/25 text-cream/80 hover:border-gold-500/50 hover:bg-gold-500/8 hover:text-gold-300'
      } ${className}`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
          done ? 'border-gold-400 bg-gold-400 text-ink' : 'border-mist-500/50'
        }`}
      >
        {done ? <Check size={12} strokeWidth={3} /> : null}
      </span>
      {done ? 'Day complete' : 'Mark today complete'}
    </button>
  )
}

export function StatTile({
  value,
  label,
  hint,
}: {
  value: ReactNode
  label: string
  hint?: string
}) {
  return (
    <div className="panel rounded-[1.1rem] px-5 py-5">
      <p className="font-display text-[2.1rem] leading-none gold-text">{value}</p>
      <p className="eyebrow mt-3 text-mist-500">{label}</p>
      {hint ? <p className="mt-1.5 text-xs text-mist-500/70">{hint}</p> : null}
    </div>
  )
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="panel rounded-[1.25rem] px-7 py-14 text-center">
      <div className="mx-auto mb-6 h-px w-14 gold-hairline" />
      <h3 className="text-xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist-500">{body}</p>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  )
}

export function StepBadge({ n, name }: { n: number; name: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/8 px-3.5 py-1.5">
      <span className="font-display text-[0.7rem] text-gold-400">{n}</span>
      <span className="text-[0.65rem] tracking-[0.24em] uppercase text-gold-300/90">{name}</span>
    </span>
  )
}
