const CACHE_NAME = "parking-saver-v1";
const STATIC_ASSETS = [
    "/",
    "/static/manifest.json",
    "/static/service-worker.js",
    "/static/icons/icon-192x192.png",
    "/static/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
});
