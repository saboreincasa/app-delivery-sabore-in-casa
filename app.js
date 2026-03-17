let produtos=[]

async function carregar(){

let r=await fetch("produtos.json")

produtos=await r.json()

mostrarCombos()

}

function mostrarCombos(){

let combos=produtos.filter(p=>p.categoria=="combo")

let html=""

combos.forEach(p=>{

html+=`

<div class="card">

<h3>${p.nome}</h3>

<p>${p.descricao}</p>

<p>R$ ${p.preco}</p>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}

function filtrar(cat){

let lista=produtos.filter(p=>p.categoria==cat)

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<h3>${p.nome}</h3>

<p>${p.descricao}</p>

<p>R$ ${p.preco}</p>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}

function abrirPizzas(){

window.location="pizza.html"

}

carregar()
