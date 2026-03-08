let produtos=[]
let carrinho=[]

async function carregar(){

let r=await fetch("produtos.json")

produtos=await r.json()

mostrar(produtos)

}

function mostrar(lista){

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<img src="${p.foto}">

<h3>${p.nome}</h3>

<div class="preco">R$ ${p.preco}</div>

<button onclick="add('${p.nome}',${p.preco})">

Adicionar

</button>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}

function filtrar(cat){

let f=produtos.filter(p=>p.nome.includes(cat))

mostrar(f)

}

function add(nome,preco){

carrinho.push({nome,preco})

document.getElementById("contador").innerText=carrinho.length

}

carregar()
