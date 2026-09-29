import { createFileRoute } from '@tanstack/react-router'
import { dayOfYear, getEntry } from '@/data/days'
import { DayEntry } from '@/components/day-entry'
import { CompleteToggle, Panel } from '@/components/ui'
import { isComplete, toggleComplete, useHydrated, useStore } from '@/lib/store'

export const Route = createFileRoute('/_app/today')({
  component: Today,
  loader: () => {
    const day = dayOfYear()
    return { entry: getEntry(day) }
  },
  head: () => ({ meta: [{ title: 'Today — DIVEST 7' }] }),
})

function Today() {
  const { entry } = Route.useLoaderData()
  return <DayEntry entry={entry} heading="Today" footer={<CompletePanel day={entry.day} />} />
}

function CompletePanel({ day }: { day: number }) {
  useStore()
  const ready = useHydrated()
  const done = ready && isComplete(day)

  return (
    <Panel
      tone={done ? 'gold' : 'default'}
      className="rise px-6 py-7 sm:px-9"
      style={{ animationDelay: '400ms' }}
    >
      {ready ? (
        <>
          <CompleteToggle done={done} onToggle={() => toggleComplete(day)} />
          <p className="mt-4 text-center text-[0.72rem] leading-relaxed text-mist-500">
            {done
              ? 'Logged. Transformation is step seven. Come back tomorrow and repeat the process.'
              : 'Mark the day when the step is taken. Consistency is what compounds.'}
          </p>
        </>
      ) : (
        <div className="h-[3.4rem] animate-pulse rounded-full bg-navy-700/40" />
      )}
    </Panel>
  )
}
