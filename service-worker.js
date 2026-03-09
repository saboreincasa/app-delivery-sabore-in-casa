const CACHE_NAME = "sabore-v1"

const urlsToCache = [

"/",
"/index.html",
"/estilo.css",
"/app.js",
"/produtos.json"

]

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>cache.addAll(urlsToCache))

)

})

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)
.then(response=>{

return response || fetch(event.request)

})

)

})
