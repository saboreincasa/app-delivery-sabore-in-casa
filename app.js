let numero = "5531983391576"
let taxaEntrega = 6.99

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
let produtos = []
let metade1 = null

async function carregarProdutos(){

const res = await fetch("produtos.json")
produtos = await res.json()

mostrar(produtos)

}

function mostrar(lista){

let html = ""

lista.forEach(p => {

html += `

<div class="card">

<img src="${p.foto}">

<div class="card-content">

<h3>${p.nome}</h3>

<div class="preco">R$ ${p.preco.toFixed(2)}</div>

<button onclick="add('${p.nome}',${p.preco})">
Adicionar
</button>

</div>

</div>

`

})

document.getElementById("produtos").innerHTML = html

}

function add(nome,preco){

let item = carrinho.find(p => p.nome === nome)

if(item){

item.qtd++

}else{

carrinho.push({
nome,
preco,
qtd:1
})

}

salvar()

}

function salvar(){

localStorage.setItem("carrinho",JSON.stringify(carrinho))

atualizar()

}

function atualizar(){

let lista = ""
let total = 0
let qtd = 0

carrinho.forEach((item,i)=>{

total += item.preco * item.qtd
qtd += item.qtd

lista += `
<div class="item">
${item.nome} x${item.qtd}
<button onclick="remover(${i})">❌</button>
</div>
`

})

document.getElementById("lista").innerHTML = lista

document.getElementById("contador").innerText = qtd

document.getElementById("total").innerText =
(total + taxaEntrega).toFixed(2)

}

function remover(i){

carrinho.splice(i,1)

salvar()

}

function enviarPedido(){

let endereco =
document.getElementById("enderecoCliente").value

let pagamento =
document.getElementById("pagamento").value

let troco =
document.getElementById("troco").value

let numeroPedido = Math.floor(Math.random()*9000+1000)

let msg = `🍕 Pedido *nº ${numeroPedido}*%0A%0A`

msg += "*Itens:*%0A"

let total = 0

carrinho.forEach(item => {

msg += `➡ ${item.qtd}x ${item.nome}%0A`

total += item.preco * item.qtd

})

msg += `%0A💳 *${pagamento}*`

msg += `%0A%0A🛵 *Delivery* (taxa de: R$ ${taxaEntrega.toFixed(2)})`

msg += `%0A🏠 ${endereco}`

msg += `%0A(Estimativa: *20~40 minutos*)`

msg += `%0A%0A💰 Total: *R$ ${(total + taxaEntrega).toFixed(2)}*`

msg += `%0A%0AObrigado pela preferência 😉`

window.open(`https://wa.me/${numero}?text=${msg}`)

}

carregarProdutos()
atualizar()
