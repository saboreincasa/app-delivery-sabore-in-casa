let numero = "5531983391576"

let taxaEntrega = 7.99

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let produtos = []

async function carregarProdutos(){

let r = await fetch("produtos.json")

produtos = await r.json()

mostrar(produtos)

}

function mostrar(lista){

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<img src="${p.foto}">

<div class="card-content">

<h3>${p.nome}</h3>

<p class="preco">R$ ${p.preco.toFixed(2)}</p>

<button onclick="add('${p.nome}',${p.preco})">

Adicionar

</button>

</div>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}

function filtrar(cat){

let filtrados = produtos.filter(p=>p.nome.includes(cat))

mostrar(filtrados)

}

document.getElementById("busca").addEventListener("input",function(){

let v=this.value.toLowerCase()

let filtrados=produtos.filter(p=>p.nome.toLowerCase().includes(v))

mostrar(filtrados)

})

function add(nome,preco){

let item=carrinho.find(p=>p.nome===nome)

if(item){

item.qtd++

}else{

carrinho.push({nome,preco,qtd:1})

}

salvar()

}

function salvar(){

localStorage.setItem("carrinho",JSON.stringify(carrinho))

atualizar()

}

function atualizar(){

let lista=""

let total=0

let qtd=0

carrinho.forEach((item,i)=>{

lista+=`${item.nome} x${item.qtd}<br>`

total+=item.preco*item.qtd

qtd+=item.qtd

})

document.getElementById("lista").innerHTML=lista

document.getElementById("contador").innerText=qtd

document.getElementById("total").innerText=(total+taxaEntrega).toFixed(2)

}

function scrollCarrinho(){

document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})

}

function enviarPedido(){

let msg="🍕 Pedido Sabore In Casa %0A"

carrinho.forEach(i=>{

msg+=`${i.nome} x${i.qtd}%0A`

})

window.open("https://wa.me/"+numero+"?text="+msg)

}

carregarProdutos()

atualizar()
