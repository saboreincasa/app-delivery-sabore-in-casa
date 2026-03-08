let carrinho=[]
let total=0

fetch("produtos.json")

.then(r=>r.json())

.then(data=>{

carregarPizzas(data.pizzas)

carregarBebidas(data.bebidas)

})


function carregarPizzas(pizzas){

let area=document.getElementById("listaPizzas")

pizzas.forEach(p=>{

area.innerHTML+=`

<div class="card">

<img src="${p.img}">

<h3>${p.nome}</h3>

<p>${p.descricao}</p>

<select id="tam${p.id}">
<option value="media">30cm Média</option>
<option value="gigante">35cm Gigante</option>
</select>

<label>

<input type="checkbox" id="borda${p.id}">
Borda recheada

</label>

<button onclick="addPizza(${p.id},'${p.nome}',${p.media},${p.gigante})">

Adicionar

</button>

</div>

`

})

}


function carregarBebidas(bebidas){

let area=document.getElementById("listaBebidas")

bebidas.forEach(b=>{

area.innerHTML+=`

<div class="card">

<img src="${b.img}">

<h3>${b.nome}</h3>

<p>R$ ${b.preco}</p>

<button onclick="addCarrinho('${b.nome}',${b.preco})">

Adicionar

</button>

</div>

`

})

}


function addPizza(id,nome,media,gigante){

let tamanho=document.getElementById("tam"+id).value

let preco=tamanho=="media"?media:gigante

addCarrinho(nome,preco)

}


function addCarrinho(nome,preco){

carrinho.push({nome,preco})

total+=preco

render()

}


function render(){

let lista=document.getElementById("carrinho")

lista.innerHTML=""

carrinho.forEach(i=>{

lista.innerHTML+=`<li>${i.nome} - R$ ${i.preco}</li>`

})

document.getElementById("total").innerHTML="Total: R$ "+total

}


function enviarWhats(){

let texto="Pedido:%0A"

carrinho.forEach(i=>{

texto+=`${i.nome} - R$ ${i.preco}%0A`

})

texto+=`Total: R$ ${total}`

let url=`https://wa.me/5531983391576?text=${texto}`

window.open(url)

}
