let numero = "5531983391576"

let taxaEntrega = 7.99

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let produtos = []

async function carregarProdutos(){

let resposta = await fetch("produtos.json")

produtos = await resposta.json()

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

<div class="preco">R$ ${p.preco.toFixed(2)}</div>

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

let filtrados = produtos.filter(p => p.nome.includes(cat))

mostrar(filtrados)

}

document.getElementById("busca").addEventListener("input",function(){

let valor=this.value.toLowerCase()

let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(valor))

mostrar(filtrados)

})

function add(nome,preco){

let item=carrinho.find(p=>p.nome===nome)

if(item) item.qtd++

else carrinho.push({nome,preco,qtd:1})

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

total+=item.preco*item.qtd

qtd+=item.qtd

lista+=`${item.nome} x${item.qtd}<br>`

})

document.getElementById("lista").innerHTML=lista

document.getElementById("contador").innerText=qtd

document.getElementById("total").innerText=(total+taxaEntrega).toFixed(2)

}

function scrollCarrinho(){

document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})

}

carregarProdutos()

atualizar()
