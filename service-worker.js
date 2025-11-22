const CACHE_NAME = "inventario-pwa-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/offline.html",
    "/manifest.json",
    "/assets/css/style.css",
    "/assets/js/app.js",
    "/assets/js/db.js",
    "/views/menu.html",
    "/views/configuracion.html",
    "/views/reportes.html"
];


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        cache.keys().then(keys => Promise.all(keys.map(key => {
            if (key !== CACHE_NAME) return cache.delete(key);
        })))
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    if (event.request.mode == "navigate") {
        event.respondWith (
          fetch(event.request).catch(() => caches.match("/offline.html"))
        );
    return;
    }
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});