const cacheName="sabore-app"

const arquivos=[

"/",
"/index.html",
"/estilo.css",
"/app.js",
"/produtos.json"

]

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(cacheName)
.then(cache=>cache.addAll(arquivos))

)

})

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request)
.then(res=>res || fetch(e.request))

)

})
