import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { PenLine, Trash2 } from 'lucide-react'
import { deleteJournal, saveJournal, useStore } from '@/lib/store'
import { Eyebrow, Panel } from '@/components/ui'

export const Route = createFileRoute('/_app/journal')({
  validateSearch: (s: Record<string, unknown>) => ({
    day: Number(s.day) || 0,
    prompt: typeof s.prompt === 'string' ? s.prompt : '',
  }),
  component: Journal,
})

function Journal() {
  const { day, prompt } = Route.useSearch()
  const { journal } = useStore()
  const [title, setTitle] = useState(day ? `Day ${day} Reflection` : 'My Reflection')
  const [body, setBody] = useState('')
  const [editing, setEditing] = useState<string | undefined>()
  const entries = useMemo(() => [...journal].sort((a,b)=>b.updatedAt-a.updatedAt), [journal])
  const submit = () => {
    if (!body.trim()) return
    saveJournal({ id: editing, day: day || new Date().getDate(), title: title.trim() || 'Reflection', body: body.trim(), prompt })
    setBody(''); setEditing(undefined); setTitle('My Reflection')
  }
  return <main className="mx-auto max-w-4xl space-y-7 px-5 py-8 sm:px-8 lg:py-12">
    <header><Eyebrow>Journal & Reflections</Eyebrow><h1 className="mt-3 text-4xl sm:text-5xl">Write what is true.</h1><p className="mt-3 max-w-2xl text-mist-400">A private space on this device for prayer, reflection, gratitude and the next faithful step.</p></header>
    <Panel tone="gold" className="p-6 sm:p-8">
      {prompt && <p className="mb-5 font-display text-xl text-cream/90">{prompt}</p>}
      <input aria-label="Entry title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full rounded-xl border border-mist-500/20 bg-navy-950/60 px-4 py-3 text-cream outline-none focus:border-gold-500/60" />
      <textarea aria-label="Journal entry" value={body} onChange={e=>setBody(e.target.value)} rows={8} placeholder="Begin here..." className="mt-3 w-full resize-y rounded-xl border border-mist-500/20 bg-navy-950/60 px-4 py-4 font-scripture text-lg leading-relaxed text-cream outline-none focus:border-gold-500/60" />
      <button onClick={submit} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-xs font-semibold tracking-[.18em] uppercase text-navy-950"><PenLine size={14}/>{editing?'Update entry':'Save reflection'}</button>
    </Panel>
    <section className="space-y-4"><Eyebrow>Saved entries · {entries.length}</Eyebrow>{entries.length===0?<Panel className="p-8 text-mist-400">Your saved reflections will appear here.</Panel>:entries.map(e=><Panel key={e.id} className="p-6"><div className="flex justify-between gap-4"><div><h2 className="font-display text-2xl text-cream">{e.title}</h2><p className="mt-1 text-xs tracking-wider uppercase text-gold-400">Day {e.day} · {new Date(e.updatedAt).toLocaleDateString()}</p></div><button aria-label="Delete entry" onClick={()=>deleteJournal(e.id)} className="text-mist-500 hover:text-cream"><Trash2 size={17}/></button></div><p className="mt-4 whitespace-pre-wrap font-scripture text-lg leading-relaxed text-cream/85">{e.body}</p><button onClick={()=>{setEditing(e.id);setTitle(e.title);setBody(e.body);window.scrollTo({top:0,behavior:'smooth'})}} className="mt-4 text-xs tracking-[.16em] uppercase text-gold-400">Edit</button></Panel>)}</section>
  </main>
}
