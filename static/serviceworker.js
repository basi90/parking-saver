const CACHE_NAME = "djangopwa-v1";
const STATIC_ASSETS = [
    "/", // Homepage
    "/pwa/manifest.json", // Manifest file (if served from `/pwa/`)
    "/pwa/serviceworker.js", // Service Worker file (if served from `/pwa/`)
    "/static/icons/icon-192x192.png",
    "/static/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log("Service Worker: Caching static assets");

            const cachePromises = STATIC_ASSETS.map(url =>
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return cache.put(url, response);
                    })
                    .catch(error => console.warn(`⚠️ Skipping ${url}: ${error.message}`))
            );

            return Promise.all(cachePromises);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activated");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Service Worker: Removing old cache", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });

                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
