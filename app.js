// 🛒 CARRINHO
let carrinho = []

// 🚀 INICIO
window.onload = function(){
carregarCombosSemana()
trocarBanner()
}

// 🔥 ESCONDER COMBOS
function esconderCombos(){
document.getElementById("combosSemana").innerHTML = ""
document.getElementById("tituloCombos").style.display = "none"
}

// 🔥 MOSTRAR COMBOS
function mostrarCombos(){
document.getElementById("tituloCombos").style.display = "block"
carregarCombosSemana()
document.getElementById("produtos").innerHTML = ""
}

// 🍕 PIZZAS
function abrirPizzas(){
esconderCombos()

let html = "<h2>🍕 Pizzas</h2>"

const pizzas = [
{nome:"Calabresa",preco:38},
{nome:"Frango com Catupiry",preco:40},
{nome:"4 Queijos",preco:42}
]

pizzas.forEach(p=>{
html += `
<div class="card">
<div class="card-content">
<h3>${p.nome}</h3>
<p class="preco">R$ ${p.preco}</p>
<button onclick="addCarrinho('${p.nome}', ${p.preco})">Adicionar</button>
</div>
</div>
`
})

document.getElementById("produtos").innerHTML = html
}

// 🥤🍟🎁 FILTRO
function filtrar(tipo){

if(tipo === "combo"){
mostrarCombos()
return
}else{
esconderCombos()
}

let html = ""

// BEBIDAS
if(tipo==="bebidas"){

html += "<h2>🥤 Bebidas</h2>"

const bebidas = [
{nome:"Coca-Cola 2L",preco:12},
{nome:"Guaraná 2L",preco:10},
{nome:"Suco Natural",preco:8}
]

bebidas.forEach(b=>{
html += `
<div class="card">
<div class="card-content">
<h3>${b.nome}</h3>
<p class="preco">R$ ${b.preco}</p>
<button onclick="addCarrinho('${b.nome}', ${b.preco})">Adicionar</button>
</div>
</div>
`
})
}

// SNAKS
if(tipo==="snaks"){

html += "<h2>🍟 Snaks</h2>"

const snaks = [
{nome:"Batata Frita",preco:15},
{nome:"Hambúrguer",preco:20}
]

snaks.forEach(s=>{
html += `
<div class="card">
<div class="card-content">
<h3>${s.nome}</h3>
<p class="preco">R$ ${s.preco}</p>
<button onclick="addCarrinho('${s.nome}', ${s.preco})">Adicionar</button>
</div>
</div>
`
})
}

document.getElementById("produtos").innerHTML = html
}

// 🎁 COMBOS
function getCombos(){
return [
{nome:"Combo Família 🍕🍕🥤",preco:79,img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},
{nome:"Combo Casal 🍕🥤",preco:49,img:"https://images.unsplash.com/photo-1594007654729-407eedc4fe24"},
{nome:"Combo Amigos 🍕🍕🍟🥤",preco:89,img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092"},
{nome:"Combo Solteiro 🍕🥤",preco:35,img:"https://images.unsplash.com/photo-1548365328-9f547fb0953d"}
]
}

// ⭐ HOME
function carregarCombosSemana(){

let combos = getCombos()
let html = ""

combos.forEach(c=>{
html += `
<div class="card destaque">
<img src="${c.img}">
<div class="card-content">
<h3>${c.nome}</h3>
<p class="preco">R$ ${c.preco}</p>
<button onclick="addCarrinho('${c.nome}', ${c.preco})">Adicionar</button>
</div>
</div>
`
})

document.getElementById("combosSemana").innerHTML = html
}

// 🎬 BANNER
let banners = [
"https://images.unsplash.com/photo-1513104890138-7c749659a591",
"https://images.unsplash.com/photo-1601924582975-7e9c7b4f9d19",
"https://images.unsplash.com/photo-1548365328-9f547fb0953d"
]

let bannerIndex = 0

function trocarBanner(){
let banner = document.getElementById("banner")
banner.style.backgroundImage = `url(${banners[bannerIndex]})`

bannerIndex++
if(bannerIndex >= banners.length){
bannerIndex = 0
}
}

setInterval(trocarBanner, 3000)

// 🛒 CARRINHO

function atualizarCarrinho(){

let lista = document.getElementById("lista")
let contador = document.getElementById("contador")
let total = 0

lista.innerHTML = ""

carrinho.forEach((item,index)=>{
lista.innerHTML += `
<div class="item-carrinho">
<div class="info-item">
<div class="nome-item">${item.nome}</div>
<div class="preco-item">R$ ${item.preco}</div>
<div class="controle">
<button onclick="alterarQuantidade(${index}, -1)">-</button>
<span>${item.quantidade}</span>
<button onclick="alterarQuantidade(${index}, 1)">+</button>
</div>
</div>
<button class="btn-remover" onclick="removerItem(${index})">x</button>
</div>
`
total += item.preco * item.quantidade
})

contador.innerText = carrinho.reduce((sum,i)=>sum+i.quantidade,0)
document.getElementById("total").innerText = total.toFixed(2)
}

function addCarrinho(nome, preco){
let itemExistente = carrinho.find(i=>i.nome===nome)
if(itemExistente){
itemExistente.quantidade += 1
}else{
carrinho.push({nome, preco, quantidade:1})
}
atualizarCarrinho()
}

function alterarQuantidade(index, delta){
carrinho[index].quantidade += delta
if(carrinho[index].quantidade <=0){
carrinho.splice(index,1)
}
atualizarCarrinho()
}

function removerItem(index){
carrinho.splice(index,1)
atualizarCarrinho()
}

// 📲 WHATSAPP
function enviarPedido(){

let endereco = document.getElementById("enderecoCliente").value
let pagamento = document.getElementById("pagamento").value
let total = document.getElementById("total").innerText

let msg = "🍕 *Pedido Sabore In Casa*%0A%0A"

carrinho.forEach(item=>{
msg += `${item.nome} x${item.quantidade} - R$ ${item.preco * item.quantidade}%0A`
})

msg += `%0ATotal: R$ ${total}`
msg += `%0AEndereço: ${endereco}`
msg += `%0APagamento: ${pagamento}`

window.open(`https://wa.me/5531999999999?text=${msg}`)
}

// 📍 MAPA
function abrirMapa(){
window.open("https://maps.google.com?q=Rua+Maria+de+Lourdes+da+Cruz+378")
}

// 🛒 SCROLL
function scrollCarrinho(){
document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}
