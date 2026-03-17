let produtos=[]
let carrinho=[]
let taxaEntrega=6.99

fetch("produtos.json")
.then(r=>r.json())
.then(d=>{

produtos=d

mostrarCombosSemana()
mostrar(produtos)

})

function filtrar(cat){

let filtrados=produtos.filter(p=>p.categoria==cat)

mostrar(filtrados)

}

function mostrar(lista){

let area=document.getElementById("produtos")

area.innerHTML=""

lista.forEach(p=>{

area.innerHTML+=`

<div class="card">

<img src="${p.foto}">

<div class="card-content">

<h3>${p.nome}</h3>

<p>${p.descricao}</p>

<div class="preco">R$ ${p.preco}</div>

<button onclick="addCarrinho('${p.nome}',${p.preco})">
Adicionar
</button>

</div>

</div>

`

})

}

function mostrarCombosSemana(){

let area=document.getElementById("combosSemana")

let combos=produtos.filter(p=>p.categoria=="combo")

area.innerHTML=""

combos.forEach(p=>{

area.innerHTML+=`

<div class="card">

<img src="${p.foto}">

<div class="card-content">

<h3>${p.nome}</h3>

<div class="preco">R$ ${p.preco}</div>

<button onclick="addCarrinho('${p.nome}',${p.preco})">
Adicionar
</button>

</div>

</div>

`

})

}

function addCarrinho(nome,preco){

carrinho.push({nome,preco})

atualizarCarrinho()

}

function atualizarCarrinho(){

let lista=document.getElementById("lista")

lista.innerHTML=""

let total=taxaEntrega

carrinho.forEach(i=>{

lista.innerHTML+=`
<div>${i.nome} - R$ ${i.preco}</div>
`

total+=i.preco

})

document.getElementById("total").innerText=total.toFixed(2)
document.getElementById("contador").innerText=carrinho.length

}

function scrollCarrinho(){

document.getElementById("carrinho").scrollIntoView()

}

function abrirPizzas(){

window.location="pizza.html"

}

function enviarPedido(){

let pagamento=document.getElementById("pagamento").value
let endereco=document.getElementById("enderecoCliente").value

let msg="Pedido%20Sabore%20In%20Casa%0A%0A"

carrinho.forEach(i=>{
msg+=i.nome+"%20-%20R$"+i.preco+"%0A"
})

msg+="%0AEntrega:%20R$6.99"
msg+="%0AEndereco:%20"+endereco
msg+="%0APagamento:%20"+pagamento

window.open("https://wa.me/5531983391576?text="+msg)

}
