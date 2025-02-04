var staticCacheName = "djangopwa-v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
      caches.open(staticCacheName).then(async function(cache) {
          console.log("Service Worker: Caching static assets");

          const urlsToCache = [
              "/",
              "/home/",
              "/manifest.json",
              "/serviceworker.js",
              "/static/icons/icon-192x192.png",
              "/static/icons/icon-512x512.png"
          ];

          const cachePromises = urlsToCache.map(url =>
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
self.addEventListener("activate", function(event) {
    console.log("Service Worker: Activated");
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cache) {
                    if (cache !== staticCacheName) {
                        console.log("Service Worker: Removing old cache", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                return caches.open(staticCacheName).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(function() {
                return caches.match(event.request);
            })
    );
});
