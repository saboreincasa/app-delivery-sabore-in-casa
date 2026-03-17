```javascript
let numero="5531983391576"

let taxaEntrega=6.99

let carrinho=JSON.parse(localStorage.getItem("carrinho"))||[]

let produtos=[]

let banners=[

"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
"https://images.unsplash.com/photo-1548365328-9f547fb0953d?w=1200",
"https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1200"

]

function bannerAutomatico(){

let b=document.getElementById("banner")

let i=0

setInterval(()=>{

b.style.backgroundImage=`url(${banners[i]})`

i++

if(i>=banners.length)i=0

},4000)

}

async function carregarProdutos(){

let res=await fetch("produtos.json")

produtos=await res.json()

mostrar(produtos)

mostrarCombos()

}

function mostrar(lista){

let html=""

lista.forEach(p=>{

if(p.categoria=="pizza") return

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

let filtrados=produtos.filter(p=>p.categoria==cat)

mostrar(filtrados)

}

function mostrarCombos(){

let combos=produtos.filter(p=>p.categoria=="combo")

let html=""

combos.forEach(c=>{

html+=`

<div class="card">

<img src="${c.foto}">

<div class="card-content">

<h3>${c.nome}</h3>

<div class="preco">R$ ${c.preco.toFixed(2)}</div>

<button onclick="add('${c.nome}',${c.preco})">

Adicionar

</button>

</div>

</div>

`

})

document.getElementById("combosSemana").innerHTML=html

}

function add(nome,preco){

let item=carrinho.find(p=>p.nome==nome)

if(item)item.qtd++

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

carrinho.forEach((i,idx)=>{

total+=i.preco*i.qtd

qtd+=i.qtd

lista+=`<div class="item">${i.nome} x${i.qtd}
<button onclick="remover(${idx})">❌</button>
</div>`

})

document.getElementById("lista").innerHTML=lista

document.getElementById("contador").innerText=qtd

document.getElementById("total").innerText=(total+taxaEntrega).toFixed(2)

}

function remover(i){

carrinho.splice(i,1)

salvar()

}

function scrollCarrinho(){

document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})

}

function abrirPizzas(){

window.location="pizza.html"

}

function enviarPedido(){

let endereco=document.getElementById("enderecoCliente").value

let pagamento=document.getElementById("pagamento").value

let troco=document.getElementById("troco").value

if(carrinho.length==0){

alert("Adicione produtos")

return

}

let msg="🍕 *Pedido Sabore In Casa*%0A%0A"

let total=0

carrinho.forEach(i=>{

msg+=`➡ ${i.nome} x${i.qtd}%0A`

total+=i.preco*i.qtd

})

msg+=`%0A🛵 Entrega: R$ ${taxaEntrega}`
msg+=`%0A💰 Total: R$ ${(total+taxaEntrega).toFixed(2)}`
msg+=`%0A📍 ${endereco}`
msg+=`%0A💳 ${pagamento}`
msg+=`%0A💵 Troco: ${troco}`

window.open(`https://wa.me/${numero}?text=${msg}`)

}

bannerAutomatico()

carregarProdutos()

atualizar()
```
