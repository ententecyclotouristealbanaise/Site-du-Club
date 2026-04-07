/* Service Worker pour ECTA Saint-Alban - PWA Offline Support */

const CACHE_NAME = 'ecta-v2';
const BASE_PATH = new URL('.', self.registration.scope).pathname.replace(/\/$/, '');
const withBase = (path) => `${BASE_PATH}/${path.replace(/^\//, '')}`;
const STATIC_ASSETS = [
  withBase('index.html'),
  withBase('le-club.html'),
  withBase('actualites.html'),
  withBase('agenda.html'),
  withBase('galerie.html'),
  withBase('contact.html'),
  withBase('documents.html'),
  withBase('news.html'),
  withBase('styles.css'),
  withBase('scripts.js'),
  withBase('donnees.js'),
  withBase('manifest.json')
];

/* Installation du Service Worker */
self.addEventListener('install', event => {
  console.log('SW: Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Cache ouvert, ajout des assets statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('SW: Erreur installation', err))
  );
});

/* Activation du Service Worker */
self.addEventListener('activate', event => {
  console.log('SW: Activation en cours...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('SW: Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

/* Stratégie Fetch: Cache First, Network Fallback */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* Ignorer les requêtes externes et non-GET */
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  /* Stratégie Cache-First pour assets statiques */
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.url.includes('.js') ||
      request.url.includes('.css')) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
        .catch(() => new Response('Offline - Ressource non disponible', { status: 503 }))
    );
    return;
  }

  /* Stratégie Network-First pour les pages HTML */
  event.respondWith(
    fetch(request)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request)
            .then(response => response || caches.match(withBase('index.html')))
          .catch(() => new Response('Offline - Page non disponible', { status: 503 }));
      })
  );
});

/* Gestion des messages du client */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
