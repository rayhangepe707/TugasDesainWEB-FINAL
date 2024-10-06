const CACHE_NAME = 'toko-baju-jesika-cache-v1';
const urlsToCache = [
  '/',
  '/TugasDesainWEB-FINAL/index.html',
  '/TugasDesainWEB-FINAL/about.html',
  '/TugasDesainWEB-FINAL/contact.html',
  '/TugasDesainWEB-FINAL/style.css',
  '/TugasDesainWEB-FINAL/logo.png',
  '/TugasDesainWEB-FINAL/about.jpg',
  '/TugasDesainWEB-FINAL/contact.jpg',
  '/TugasDesainWEB-FINAL/offline.html',
  '/TugasDesainWEB-FINAL/service-worker.js',
  '/TugasDesainWEB-FINAL/toko baju jesika.html',
  '/TugasDesainWEB-FINAL/whatsapp-icon.png',
  '/TugasDesainWEB-FINAL/banner.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          console.log('Cache opened');
          // Gunakan Promise.all untuk memeriksa setiap URL
          return Promise.all(urlsToCache.map((url) => {
              return fetch(url)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error(`Failed to fetch ${url}: ${response.status}`);
                      }
                      return cache.add(url); // Menambahkan ke cache
                  })
                  .catch(error => {
                      console.error(`Failed to cache ${url}: ${error}`);
                  });
          }));
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
      fetch(event.request).catch(() => {
          // Jika fetch gagal, kembalikan offline.html
          return caches.match('/TugasDesainWEB-FINAL/offline.html');
      })
  );
});
