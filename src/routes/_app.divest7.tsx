import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Eyebrow, Panel } from '@/components/ui'
import { STEPS } from '@/data/divest7'
import { dayOfYear } from '@/data/days'

export const Route = createFileRoute('/_app/divest7')({ component: Seven })
const PAYHIP_URL = 'https://payhip.com/b/zRFVh'

function Seven() {
  const today = dayOfYear()
  return <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
    <Eyebrow>The DIVEST 7 Method</Eyebrow>
    <h1 className="mt-3 max-w-3xl text-5xl sm:text-7xl">Dream. Believe. Decide. Act. Reflect. Plan. Transform.</h1>
    <p className="mt-5 max-w-2xl text-mist-400">Seven steps designed to move vision toward transformation. Complete the seven, then repeat the process with what you have learned.</p>

    <Panel tone="gold" className="mt-8 p-6 sm:p-8">
      <Eyebrow>DIVEST 7 · The Next Step Forward</Eyebrow>
      <h2 className="mt-2 text-3xl text-cream">Continue with the full DIVEST 7 program.</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-cream/75">Access the complete seven-day coaching experience, videos and program materials through the official DIVEST 7 course page.</p>
      <a href={PAYHIP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-950">Open DIVEST 7 Program <ExternalLink size={14}/></a>
    </Panel>

    <div className="mt-10 space-y-4">{STEPS.map(s => <Panel key={s.key} tone="gold" className="p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-[5rem_1fr]"><span className="font-display text-6xl text-gold-500/30">0{s.n}</span><div><Eyebrow>{s.verb}</Eyebrow><h2 className="mt-2 text-4xl">{s.name}</h2><p className="mt-2 font-display text-xl text-gold-300">{s.essence}</p><p className="mt-4 leading-relaxed text-cream/80">{s.body}</p><blockquote className="mt-5 border-l border-gold-500/40 pl-4 font-scripture text-lg text-cream/85">“{s.scripture.text}” <span className="mt-2 block text-xs uppercase tracking-wider text-gold-400">{s.scripture.ref}</span></blockquote><p className="mt-5 text-sm text-mist-300"><strong className="text-cream">Reflect:</strong> {s.prompt}</p></div></div></Panel>)}</div>
    <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/days/$day" params={{ day: String(today) }} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-950">Take today’s step <ArrowRight size={14}/></Link>
      <a href={PAYHIP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold-300">Visit DIVEST 7 <ExternalLink size={14}/></a>
    </div>
  </main>
}
