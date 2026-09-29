import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SevenMark } from '@/components/brand'
import { STEPS } from '@/data/divest7'
import { DAY_COUNT, dayOfYear, getEntry } from '@/data/days'

export const Route = createFileRoute('/')({
  component: Welcome,
  loader: () => {
    const day = dayOfYear()
    return { day, entry: getEntry(day) }
  },
})

const HERO = '/img/sunrise-hero.png'
const HERO_SM = '/img/sunrise-hero.png'

function Welcome() {
  const { day, entry } = Route.useLoaderData()

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-ink">
      {/* Sunrise plate */}
      <div className="absolute inset-0">
        <img
          src={HERO}
          srcSet={`${HERO_SM} 900w, ${HERO} 1800w`}
          sizes="100vw"
          alt="Sunrise breaking over a layered mountain range"
          className="fade-in h-full w-full object-cover object-[62%_center] sm:object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#04070d_2%,rgba(4,7,13,0.88)_34%,rgba(7,12,23,0.5)_62%,rgba(10,21,38,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_112%,rgba(208,160,77,0.22),transparent_70%)]" />
      </div>

      {/* Rising sun halo */}
      <div
        aria-hidden="true"
        className="sun-ascend pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 sm:top-[42%]"
      >
        <div className="breathe h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(240,213,154,0.2)_0%,rgba(208,160,77,0.09)_38%,transparent_68%)] sm:h-[34rem] sm:w-[34rem]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-6 pb-[max(2.25rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-10">
        <div className="rise flex items-center gap-3" style={{ animationDelay: '120ms' }}>
          <SevenMark className="h-9 w-9" />
          <span className="eyebrow text-cream/45">Small Steps. Big Movement.</span>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-2 sm:pb-10">
          <div
            className="rise mb-7 h-px w-16 gold-hairline"
            style={{ animationDelay: '320ms' }}
          />

          <h1
            className="rise font-display text-[3.35rem] leading-[0.92] tracking-[-0.01em] sm:text-[6rem] lg:text-[7.5rem]"
            style={{ animationDelay: '400ms' }}
          >
            <span className="block text-cream">Divest</span>
            <span className="block gold-text">Seven</span>
          </h1>

          <p
            className="rise mt-6 font-scripture text-[1.4rem] italic leading-snug text-cream/85 sm:mt-8 sm:text-[2rem]"
            style={{ animationDelay: '560ms' }}
          >
            The Next Step Forward
          </p>

          <p
            className="rise mt-5 max-w-md text-[0.98rem] leading-relaxed text-mist-400 sm:mt-6 sm:max-w-lg sm:text-[1.05rem]"
            style={{ animationDelay: '680ms' }}
          >
            A daily practice for growing spiritually, mentally and personally — one
            affirmation, one Scripture, one honest question, one step. Every day for a
            year.
          </p>

          {/* The seven movements, spelled out */}
          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-11"
            style={{ animationDelay: '800ms' }}
          >
            {STEPS.map((s, i) => (
              <span key={s.key} className="flex items-center gap-3">
                <span className="text-[0.7rem] tracking-[0.26em] uppercase text-cream/55">
                  {s.name}
                </span>
                {i < STEPS.length - 1 ? (
                  <span className="h-1 w-1 rounded-full bg-gold-500/55" />
                ) : null}
              </span>
            ))}
          </div>

          <div
            className="rise mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center"
            style={{ animationDelay: '920ms' }}
          >
            <Link
              to="/today"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 px-8 py-4.5 text-[0.72rem] tracking-[0.26em] uppercase text-ink shadow-[0_18px_44px_-18px_rgba(208,160,77,0.7)] transition-transform duration-300 active:scale-[0.98] sm:px-9"
            >
              <span className="relative z-10">Begin Today</span>
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <Link
              to="/divest7"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/20 px-7 py-4.5 text-[0.72rem] tracking-[0.26em] uppercase text-cream/80 transition-colors hover:border-gold-500/50 hover:text-gold-300"
            >
              The Seven Movements
            </Link>

            <a
              href="https://payhip.com/b/zRFVh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gold-500/35 px-7 py-4.5 text-[0.72rem] tracking-[0.22em] uppercase text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              DIVEST 7 Website <ExternalLink size={14} />
            </a>
          </div>

          <div
            className="rise mt-11 border-t border-cream/10 pt-6 sm:mt-14"
            style={{ animationDelay: '1040ms' }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
              <span className="eyebrow text-gold-500/80">
                Day {day} of {DAY_COUNT}
              </span>
              <span className="text-[0.7rem] tracking-[0.18em] uppercase text-mist-500/70">
                {entry.movement.title} · {entry.label}
              </span>
            </div>
            <p className="mt-3 max-w-xl font-scripture text-[1.05rem] leading-relaxed text-cream/75 sm:text-[1.15rem]">
              “{entry.affirmation}”
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
