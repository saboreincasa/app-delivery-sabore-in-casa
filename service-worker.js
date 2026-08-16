const CACHE_NAME = "sabore-v3";

const urlsToCache = [
"/",
"/index.html",
"/styles.css",
"/app.js",
"/integracao-sistema.js",
"/produtos.json"
];

self.addEventListener("install", event => {

self.skipWaiting();

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))

);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(nomes =>
Promise.all(nomes.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
).then(() => self.clients.claim())

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});
