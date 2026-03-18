let carrinho = []
let total = 0

// 🔄 ATUALIZA CARRINHO
function atualizarCarrinho(){

let lista = document.getElementById("lista")
let contador = document.getElementById("contador")

lista.innerHTML = ""
total = 0

carrinho.forEach(item=>{
lista.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`
total += item.preco
})

contador.innerText = carrinho.length
document.getElementById("total").innerText = total.toFixed(2)

}

// ➕ ADICIONAR
function addCarrinho(nome, preco){
carrinho.push({nome, preco})
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
<h3>${p.nome}</h3>
<p>R$ ${p.preco}</p>
<button onclick="addCarrinho('${p.nome}', ${p.preco})">Adicionar</button>
</div>
`
})

document.getElementById("produtos").innerHTML = html
}

// 🧠 FILTROS
function filtrar(tipo){

let html = ""

if(tipo === "bebidas"){

html += "<h2>🥤 Bebidas</h2>"

const bebidas = [
{nome:"Coca-Cola 2L",preco:12},
{nome:"Guaraná 2L",preco:10},
{nome:"Suco Natural",preco:8}
]

bebidas.forEach(b=>{
html += `
<div class="card">
<h3>${b.nome}</h3>
<p>R$ ${b.preco}</p>
<button onclick="addCarrinho('${b.nome}', ${b.preco})">Adicionar</button>
</div>
`
})

}

if(tipo === "combo"){

html += "<h2>🎁 Combos</h2>"

const combos = [
{nome:"Combo Família 🍕🍕🥤",preco:79},
{nome:"Combo Casal 🍕🥤",preco:49},
{nome:"Combo Amigos 🍕🍕🍟🥤",preco:89},
{nome:"Combo Solteiro 🍕🥤",preco:35}
]

combos.forEach(c=>{
html += `
<div class="card destaque">
<h3>${c.nome}</h3>
<p>R$ ${c.preco}</p>
<button onclick="addCarrinho('${c.nome}', ${c.preco})">Adicionar</button>
</div>
`
})

}

if(tipo === "snaks"){

html += "<h2>🍟 Snaks</h2>"

const snaks = [
{nome:"Batata Frita",preco:15},
{nome:"Hambúrguer",preco:20}
]

snaks.forEach(s=>{
html += `
<div class="card">
<h3>${s.nome}</h3>
<p>R$ ${s.preco}</p>
<button onclick="addCarrinho('${s.nome}', ${s.preco})">Adicionar</button>
</div>
`
})

}

document.getElementById("produtos").innerHTML = html

}

// 🔎 BUSCA
document.getElementById("busca").addEventListener("input", function(){

let termo = this.value.toLowerCase()
let cards = document.querySelectorAll(".card")

cards.forEach(card=>{
card.style.display = card.innerText.toLowerCase().includes(termo) ? "block" : "none"
})

})

// 📲 WHATSAPP
function enviarPedido(){

let endereco = document.getElementById("enderecoCliente").value
let pagamento = document.getElementById("pagamento").value

let msg = "🍕 *Pedido Sabore In Casa*%0A%0A"

carrinho.forEach(item=>{
msg += `${item.nome} - R$ ${item.preco}%0A`
})

msg += `%0ATotal: R$ ${total.toFixed(2)}`
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
