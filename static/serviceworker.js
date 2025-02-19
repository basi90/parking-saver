const CACHE_NAME = "djangopwa-v1";
const STATIC_ASSETS = [
    "/",
    "/pwa/manifest.json",
    "/pwa/serviceworker.js",
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
      caches.match(event.request)
          .then((response) => {
              if (response) {
                  return response;
              }
              return fetch(event.request)
                  .then((fetchResponse) => {
                      return fetchResponse;
                  })
                  .catch((error) => {
                      console.error("Service Worker Fetch Error:", error);
                      return new Response("Offline: Failed to fetch resource", {
                          status: 503,
                          statusText: "Service Unavailable",
                      });
                  });
          })
  );
});
