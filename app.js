let carrinho=[]
let numero="5531987620190"

fetch("produtos.json")
.then(r=>r.json())
.then(dados=>{

mostrarPizzas(dados.pizzas)
mostrarBebidas(dados.bebidas)
mostrarCombos(dados.combos)

})

function mostrarPizzas(lista){

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<h3>${p.nome}</h3>

<p class="descricao">${p.descricao}</p>

<select onchange="addPizza('${p.nome}',this.value,${p.P},${p.M},${p.GG})">

<option>Escolha tamanho</option>
<option value="P">P R$${p.P}</option>
<option value="M">M R$${p.M}</option>
<option value="GG">GG R$${p.GG}</option>

</select>

<select id="borda">

<option>Borda normal</option>
<option>Borda catupiry</option>
<option>Borda cheddar</option>

</select>

</div>
`

})

document.getElementById("pizzas").innerHTML=html

}

function mostrarBebidas(lista){

let html=""

lista.forEach(b=>{

html+=`

<div class="card">

<h3>${b.nome}</h3>

<p>R$ ${b.preco}</p>

<button onclick="add('${b.nome}',${b.preco})">Adicionar</button>

</div>
`

})

document.getElementById("bebidas").innerHTML=html

}

function mostrarCombos(lista){

let html=""

lista.forEach(c=>{

html+=`

<div class="card">

<h3>${c.nome}</h3>

<p>${c.descricao}</p>

<p>R$ ${c.preco}</p>

<button onclick="add('${c.nome}',${c.preco})">Adicionar</button>

</div>
`

})

document.getElementById("combos").innerHTML=html

}

function addPizza(nome,tamanho,p,m,gg){

let preco=0

if(tamanho=="P") preco=p
if(tamanho=="M") preco=m
if(tamanho=="GG") preco=gg

add(nome+" "+tamanho,preco)

}

function add(nome,preco){

carrinho.push({nome,preco})

atualizar()

}

function atualizar(){

let lista=""
let total=0

carrinho.forEach(i=>{

lista+=`<p>${i.nome}</p>`
total+=i.preco

})

document.getElementById("lista").innerHTML=lista
document.getElementById("total").innerText=total

}

function enviarPedido(){

let endereco=document.getElementById("endereco").value
let pagamento=document.getElementById("pagamento").value

let msg="Pedido Sabore in Casa%0A%0A"

carrinho.forEach(i=>{
msg+=i.nome+"%0A"
})

msg+="%0AEndereço: "+endereco
msg+="%0APagamento: "+pagamento

window.open(`https://wa.me/${numero}?text=${msg}`)

}
