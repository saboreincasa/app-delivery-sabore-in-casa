let carrinho=[]
let produtos=[]

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

<div class="card-content">

<h3>${p.nome}</h3>

${p.ingredientes?`<p>${p.ingredientes}</p>`:""}

${p.precos?`

<select onchange="selecionarTamanho(this)">

<option value="">Tamanho</option>
<option value="${p.precos.pequena}">Pequena 25cm</option>
<option value="${p.precos.media}">Média 30cm</option>
<option value="${p.precos.gigante}">Gigante 35cm</option>

</select>

<select>

<option value="0">Sem borda</option>
<option value="10">Catupiry +10</option>
<option value="10">Cheddar +10</option>

</select>

<button onclick="addPizza('${p.nome}',this)">

Adicionar

</button>

`

:

`<button onclick="add('${p.nome}',${p.preco})">Adicionar</button>`

}

</div>

</div>

`

})

document.getElementById("produtos").innerHTML=html

}


function add(nome,preco){

carrinho.push({nome,preco})

atualizar()

}

function addPizza(nome,btn){

let card=btn.parentElement

let tamanho=card.querySelector("select").value

let borda=Number(card.querySelectorAll("select")[1].value)

let preco=Number(tamanho)+borda

carrinho.push({nome,preco})

atualizar()

}

function atualizar(){

let lista=""
let total=0

carrinho.forEach((i,index)=>{

lista+=`<div>${i.nome} R$${i.preco}
<button onclick="remover(${index})">❌</button>
</div>`

total+=i.preco

})

document.getElementById("lista").innerHTML=lista

document.getElementById("total").innerText=total.toFixed(2)

document.getElementById("contador").innerText=carrinho.length

}

function remover(i){

carrinho.splice(i,1)

atualizar()

}

function abrirCarrinho(){

document.getElementById("carrinho").classList.toggle("aberto")

}

function finalizarPedido(){

alert("Aqui entra pagamento PIX ou WhatsApp")

}
