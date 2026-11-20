const CACHE_NAME = 'mindmelt-pwa-v9-chat-usernames';
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png', './assets/packs/animal.webp', './assets/packs/fantasy.webp', './assets/packs/space.webp', './assets/packs/ocean.webp', './assets/packs/dino.webp', './assets/packs/jungle.webp', './assets/packs/arctic.webp', './assets/packs/desert.webp', './assets/packs/mythical.webp', './assets/packs/superhero.webp', './assets/packs/sports.webp', './assets/packs/foodie.webp', './assets/packs/music.webp', './assets/packs/nature.webp', './assets/packs/weather.webp', './assets/packs/monster.webp', './assets/packs/ninja.webp', './assets/packs/pirate.webp', './assets/packs/royal.webp', './assets/packs/science.webp', './assets/packs/art.webp', './assets/packs/candy.webp', './assets/packs/halloween.webp', './assets/packs/winter.webp', './assets/packs/desertgalaxy.webp', './assets/packs/tech.webp', './assets/packs/adventure.webp'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
