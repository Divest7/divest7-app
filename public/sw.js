/* DIVEST 7 service worker — offline shell for the daily practice. */
const VERSION = 'divest7-v4-polished'
const SHELL = `${VERSION}-shell`
const RUNTIME = `${VERSION}-runtime`
const OFFLINE_URL = '/offline.html'

const PRECACHE = [OFFLINE_URL, '/manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin && !url.pathname.startsWith('/.netlify/images')) return

  // Navigations: fresh when online, cached page or offline notice when not.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(RUNTIME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => (await caches.match(request)) || caches.match(OFFLINE_URL)),
    )
    return
  }

  // Static assets and transformed images: cache first, then fill in.
  const cacheable =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/img/') ||
    url.pathname.startsWith('/.netlify/images') ||
    /\.(?:css|js|woff2?|png|svg|ico|webp|avif)$/.test(url.pathname)

  if (!cacheable) return

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok || response.type === 'opaque') {
            const copy = response.clone()
            caches.open(RUNTIME).then((cache) => cache.put(request, copy))
          }
          return response
        }),
    ),
  )
})
