import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { DAY_COUNT, getEntry } from '@/data/days'
import { DayEntry } from '@/components/day-entry'
import { CompleteToggle, Panel } from '@/components/ui'
import { isComplete, toggleComplete, useHydrated, useStore } from '@/lib/store'

export const Route = createFileRoute('/_app/days/$day')({
  component: DayView,
  loader: ({ params }) => {
    const n = Number(params.day)
    if (!Number.isInteger(n) || n < 1 || n > DAY_COUNT) throw notFound()
    return { entry: getEntry(n) }
  },
  notFoundComponent: () => (
    <Panel className="px-7 py-14 text-center">
      <h1 className="text-2xl">That day is outside the year</h1>
      <p className="mt-3 text-sm text-mist-500">DIVEST 7 runs from day 1 to day 365.</p>
      <Link
        to="/days"
        className="mt-7 inline-block rounded-full border border-gold-500/40 px-6 py-3 text-[0.68rem] tracking-[0.22em] uppercase text-gold-300"
      >
        Back to the year
      </Link>
    </Panel>
  ),
})

function DayView() {
  const { entry } = Route.useLoaderData()
  return (
    <div>
      <Link
        to="/days"
        search={{ month: String(entry.monthIndex) }}
        className="rise mb-7 inline-flex items-center gap-2.5 text-[0.68rem] tracking-[0.2em] uppercase text-mist-500 transition-colors hover:text-gold-300"
      >
        <ArrowLeft size={14} strokeWidth={1.6} />
        {entry.movement.title}
      </Link>
      <DayEntry entry={entry} footer={<ArchiveComplete day={entry.day} />} />
    </div>
  )
}

function ArchiveComplete({ day }: { day: number }) {
  useStore()
  const ready = useHydrated()
  if (!ready) return null
  return (
    <Panel className="rise px-6 py-7 sm:px-9" style={{ animationDelay: '400ms' }}>
      <CompleteToggle done={isComplete(day)} onToggle={() => toggleComplete(day)} />
    </Panel>
  )
}
