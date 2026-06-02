const CACHE_NAME = 'meuble-art-cache-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'logo.png',
  'manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // بالنسبة لطلبات API الخلفية، لا نقوم بتخزينها مؤقتاً
    if (event.request.method === 'POST') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // إرجاع النسخة المخزنة مؤقتاً والتحقق من التحديثات في الخلفية (Stale-While-Revalidate)
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => {/* تجاهل أخطاء الشبكة في الخلفية */});
                
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
