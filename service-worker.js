const CACHE="sabore-app"

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE).then(cache=>{

return cache.addAll([

"/",
"/index.html",
"/estilo.css",
"/app.js",
"/produtos.json"

])

})

)

})
