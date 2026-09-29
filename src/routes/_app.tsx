import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Bookmark,
  CalendarDays,
  Mountain,
  PenLine,
  Sunrise,
  TrendingUp,
  ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SevenMark, Wordmark } from '@/components/brand'
import { InstallButton } from '@/components/pwa'
import { DAY_COUNT, dayOfYear, getEntry } from '@/data/days'

export const Route = createFileRoute('/_app')({
  component: AppShell,
  loader: () => {
    const day = dayOfYear()
    return { day, movement: getEntry(day).movement }
  },
})

type NavItem = { to: string; label: string; short: string; icon: LucideIcon; tab: boolean }

const NAV: NavItem[] = [
  { to: '/today', label: 'Today', short: 'Today', icon: Sunrise, tab: true },
  { to: '/days', label: '365 Days', short: '365', icon: CalendarDays, tab: true },
  { to: '/bible', label: 'KJV Bible', short: 'Bible', icon: BookOpen, tab: true },
  { to: '/journal', label: 'Journal', short: 'Journal', icon: PenLine, tab: true },
  { to: '/progress', label: 'Progress', short: 'Progress', icon: TrendingUp, tab: true },
  { to: '/divest7', label: 'The Seven', short: 'Seven', icon: Mountain, tab: false },
  { to: '/favorites', label: 'Favorites', short: 'Saved', icon: Bookmark, tab: false },
]

const TABS = NAV.filter((n) => n.tab)

function AppShell() {
  const { day, movement } = Route.useLoaderData()

  return (
    <div className="relative min-h-[100dvh] bg-ink">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[url('/img/summit-path.png')] bg-cover bg-center opacity-[0.10]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />
      {/* Ambient horizon behind every screen */}
      <div
        aria-hidden="true"
        className="horizon-glow pointer-events-none fixed inset-x-0 bottom-0 h-[70vh] opacity-70"
      />

      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17.5rem] flex-col border-r border-mist-500/12 bg-navy-950/70 px-7 py-9 backdrop-blur-xl lg:flex">
        <Link to="/" className="group flex items-center gap-3">
          <SevenMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[-4deg]" />
          <span className="leading-tight">
            <Wordmark className="block text-[0.95rem] text-cream" />
            <span className="mt-1 block text-[0.62rem] tracking-[0.2em] uppercase text-mist-500/70">
              The Next Step Forward
            </span>
          </span>
        </Link>

        <nav className="mt-11 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{
                className:
                  'text-gold-300 border-gold-500/35 bg-gold-500/10 [&_svg]:text-gold-400',
              }}
              inactiveProps={{
                className:
                  'text-mist-400 border-transparent hover:text-cream hover:bg-navy-800/50',
              }}
              className="flex items-center gap-3.5 rounded-xl border px-3.5 py-3 text-[0.82rem] tracking-[0.06em] transition-all duration-200"
            >
              <item.icon size={17} strokeWidth={1.5} className="text-mist-500" />
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://payhip.com/b/zRFVh"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-between rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-[0.72rem] tracking-[0.12em] uppercase text-gold-300 transition hover:bg-gold-500/15"
        >
          DIVEST 7 Website <ExternalLink size={14} />
        </a>

        <div className="mt-auto space-y-5 pt-8">
          <InstallButton />
          <div className="border-t border-mist-500/12 pt-5">
            <p className="eyebrow text-gold-500/75">
              Day {day} / {DAY_COUNT}
            </p>
            <p className="mt-2 font-display text-[1.05rem] text-cream/85">{movement.title}</p>
            <p className="mt-1 text-[0.72rem] leading-relaxed text-mist-500/80">
              {movement.theme}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-mist-500/12 bg-ink/82 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-5 pb-3 pt-[max(0.85rem,env(safe-area-inset-top))]">
          <Link to="/" className="flex items-center gap-2.5">
            <SevenMark className="h-7 w-7" />
            <Wordmark className="text-[0.8rem] text-cream" />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/divest7"
              aria-label="The Seven Movements"
              activeProps={{ className: 'border-gold-500/50 text-gold-300' }}
              inactiveProps={{ className: 'border-mist-500/20 text-mist-400' }}
              className="grid h-9 w-9 place-items-center rounded-full border transition-colors"
            >
              <Mountain size={15} strokeWidth={1.6} />
            </Link>
            <Link
              to="/favorites"
              aria-label="Favorites"
              activeProps={{ className: 'border-gold-500/50 text-gold-300' }}
              inactiveProps={{ className: 'border-mist-500/20 text-mist-400' }}
              className="grid h-9 w-9 place-items-center rounded-full border transition-colors"
            >
              <Bookmark size={15} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 lg:pl-[17.5rem]">
        <div className="mx-auto max-w-4xl px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-8 sm:px-8 lg:px-12 lg:pb-20 lg:pt-14">
          <Outlet />
        </div>
      </main>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-500/12 bg-ink/90 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2">
          {TABS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: 'text-gold-300' }}
              inactiveProps={{ className: 'text-mist-500' }}
              className="group relative flex flex-col items-center gap-1.5 rounded-lg py-2 transition-colors duration-200"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute -top-[9px] h-[2px] w-7 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-gold-400 opacity-100' : 'opacity-0'
                    }`}
                  />
                  <item.icon size={19} strokeWidth={1.5} />
                  <span className="text-[0.58rem] tracking-[0.14em] uppercase">
                    {item.short}
                  </span>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
