import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { hydrateStore } from '@/lib/store'

type Choice = { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

let deferred: Choice | null = null
const listeners = new Set<(v: boolean) => void>()

/** Boots on-device data and the service worker, and captures the install offer. */
export function PwaRuntime() {
  useEffect(() => {
    hydrateStore()

    const onPrompt = (e: Event) => {
      e.preventDefault()
      deferred = e as unknown as Choice
      listeners.forEach((l) => l(true))
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    const onInstalled = () => {
      deferred = null
      listeners.forEach((l) => l(false))
    }
    window.addEventListener('appinstalled', onInstalled)

    if ('serviceWorker' in navigator) {
      // Never let a production service worker intercept Vite's local dev server.
      // Also remove any stale worker/cache previously registered on localhost.
      if (import.meta.env.DEV) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => registration.unregister())
        })
        if ('caches' in window) {
          caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)))
        }
      } else {
        const register = () => {
          navigator.serviceWorker.register('/sw.js').catch(() => {
            /* offline shell is a nicety, not a requirement */
          })
        }
        if (document.readyState === 'complete') register()
        else window.addEventListener('load', register, { once: true })
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  return null
}

/**
 * Renders only when the browser has offered an install. iOS Safari never
 * fires `beforeinstallprompt`, so the Progress screen also documents the
 * manual Add to Home Screen route.
 */
export function InstallButton({ className = '' }: { className?: string }) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    setAvailable(Boolean(deferred))
    const l = (v: boolean) => setAvailable(v)
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])

  if (!available) return null

  return (
    <button
      type="button"
      onClick={async () => {
        const d = deferred
        if (!d) return
        await d.prompt()
        await d.userChoice.catch(() => null)
        deferred = null
        setAvailable(false)
      }}
      className={`inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-[0.68rem] tracking-[0.22em] uppercase text-gold-300 transition-colors hover:bg-gold-500/20 ${className}`}
    >
      <Download size={13} strokeWidth={1.75} />
      Install app
    </button>
  )
}
