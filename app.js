let carrinho = []

// 🚀 INICIALIZA APP
window.onload = function(){
carregarCombosSemana()
}

// 🛒 ATUALIZA CARRINHO
function atualizarCarrinho(){

let lista = document.getElementById("lista")
let contador = document.getElementById("contador")
let total = 0

lista.innerHTML = ""

let agrupado = {}

carrinho.forEach(item=>{
if(!agrupado[item.nome]){
agrupado[item.nome] = {preco:item.preco, qtd:1}
}else{
agrupado[item.nome].qtd++
}
})

Object.keys(agrupado).forEach(nome=>{

let item = agrupado[nome]

lista.innerHTML += `
<div class="item-carrinho">

<div class="info-item">
<span class="nome-item">${nome}</span>
<span class="preco-item">R$ ${(item.preco * item.qtd).toFixed(2)}</span>
</div>

<div class="controle">
<button onclick="diminuirItem('${nome}')">−</button>
<span>${item.qtd}</span>
<button onclick="aumentarItem('${nome}')">+</button>
</div>

<button class="btn-remover" onclick="removerItemTotal('${nome}')">✕</button>

</div>
`

total += item.preco * item.qtd

})

contador.innerText = carrinho.length
document.getElementById("total").innerText = total.toFixed(2)

}

// ➕ ADICIONAR
function addCarrinho(nome, preco){
carrinho.push({nome, preco})
atualizarCarrinho()
}

// ➕ AUMENTAR
function aumentarItem(nome){
let item = carrinho.find(p => p.nome === nome)
if(item){
carrinho.push(item)
}
atualizarCarrinho()
}

// ➖ DIMINUIR
function diminuirItem(nome){
let index = carrinho.findIndex(p => p.nome === nome)
if(index > -1){
carrinho.splice(index,1)
}
atualizarCarrinho()
}

// ❌ REMOVER TUDO
function removerItemTotal(nome){
carrinho = carrinho.filter(item => item.nome !== nome)
atualizarCarrinho()
}

// 🍕 PIZZAS
function abrirPizzas(){

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

// 🥤🍟🎁 FILTROS
function filtrar(tipo){

let html = ""

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

if(tipo==="combo"){

html += "<h2>🎁 Combos</h2>"

const combos = getCombos()

combos.forEach(c=>{
html += `
<div class="card destaque">
<div class="card-content">
<h3>${c.nome}</h3>
<p class="preco">R$ ${c.preco}</p>
<button onclick="addCarrinho('${c.nome}', ${c.preco})">Adicionar</button>
</div>
</div>
`
})

}

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
{nome:"Combo Família 🍕🍕🥤",preco:79},
{nome:"Combo Casal 🍕🥤",preco:49},
{nome:"Combo Amigos 🍕🍕🍟🥤",preco:89},
{nome:"Combo Solteiro 🍕🥤",preco:35}
]
}

// ⭐ COMBOS NA TELA INICIAL
function carregarCombosSemana(){

let combos = getCombos()
let html = ""

combos.forEach(c=>{
html += `
<div class="card destaque">
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

// 📲 WHATSAPP
function enviarPedido(){

let endereco = document.getElementById("enderecoCliente").value
let pagamento = document.getElementById("pagamento").value
let total = document.getElementById("total").innerText

let msg = "🍕 *Pedido Sabore In Casa*%0A%0A"

carrinho.forEach(item=>{
msg += `${item.nome} - R$ ${item.preco}%0A`
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
