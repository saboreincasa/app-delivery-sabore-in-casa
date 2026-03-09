let produtos=[]
let carrinho=[]

fetch("produtos.json")
.then(res=>res.json())
.then(data=>{

produtos=data
mostrarProdutos(produtos)

})

function mostrarProdutos(lista){

let area=document.getElementById("produtos")

area.innerHTML=""

lista.forEach(p=>{

area.innerHTML+=`

<div class="produto">

<div>

<h3>${p.nome}</h3>

<p>R$ ${p.preco}</p>

</div>

<button onclick="addCarrinho(${p.id})">

Adicionar

</button>

</div>

`

})

}

function filtrar(cat){

let filtrados=produtos.filter(p=>p.categoria==cat)

mostrarProdutos(filtrados)

}

function addCarrinho(id){

let produto=produtos.find(p=>p.id==id)

carrinho.push(produto)

atualizarCarrinho()

}

function atualizarCarrinho(){

let lista=document.getElementById("listaCarrinho")

lista.innerHTML=""

let total=0

carrinho.forEach(p=>{

lista.innerHTML+=`<p>${p.nome} - R$ ${p.preco}</p>`

total+=p.preco

})

document.getElementById("total").innerText=total

document.getElementById("contador").innerText=carrinho.length

}

function abrirCarrinho(){

let c=document.getElementById("carrinho")

if(c.style.display=="block"){

c.style.display="none"

}else{

c.style.display="block"

}

}

function enviarWhats(){

let msg="Pedido:%0A"

carrinho.forEach(p=>{

msg+=p.nome+"%0A"

})

window.open("https://wa.me/5511999999999?text="+msg)

}
