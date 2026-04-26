// Service Worker — Gym Tracker PWA
// Usa caminhos relativos ao scope do SW (funciona em GitHub Pages em subpasta).
const CACHE = 'gym-v7'
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)

  // Nunca cacheia chamadas Supabase (dados sempre frescos)
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(fetch(e.request))
    return
  }

  // Só trata GET
  if (e.request.method !== 'GET') return

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
        }
        return res
      }).catch(() => {
        // fallback offline: devolve o index.html (SPA shell)
        if (e.request.mode === 'navigate') return caches.match('./index.html')
      })
    })
  )
})
