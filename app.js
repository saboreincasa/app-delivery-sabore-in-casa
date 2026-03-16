let produtos=[]
let carrinho=[]

fetch("produtos.json")
.then(r=>r.json())
.then(data=>{
produtos=data
mostrar(produtos)
})

function mostrar(lista){

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<img src="${p.foto}">

<div class="info">

<h3>${p.nome}</h3>

<p>R$ ${p.preco}</p>

<button onclick='add(${JSON.stringify(p)})'>
Adicionar
</button>

</div>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}

function add(p){

carrinho.push(p)

alert("Adicionado ao carrinho")

}

document.getElementById("busca").addEventListener("input",e=>{

let termo=e.target.value.toLowerCase()

let filtrado=produtos.filter(p=>p.nome.toLowerCase().includes(termo))

mostrar(filtrado)

})
