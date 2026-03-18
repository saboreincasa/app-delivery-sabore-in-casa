let produtos=[]
let carrinho=[]

fetch("produtos.json")
.then(r=>r.json())
.then(d=>{

produtos=d

mostrar("combos")

})

function mostrar(cat){

let area=document.getElementById("produtos")

area.innerHTML=""

produtos
.filter(p=>p.categoria==cat)
.forEach(p=>{

area.innerHTML+=`

<div class="card">

<img src="${p.foto}">

<div class="card-body">

<h3>${p.nome}</h3>

<p>${p.descricao}</p>

<div class="preco">R$ ${p.preco}</div>

<button onclick="add('${p.nome}',${p.preco})">
Adicionar
</button>

</div>

</div>

`

})

}

function add(nome,preco){

carrinho.push({nome,preco})

atualizar()

}

function atualizar(){

let lista=document.getElementById("listaCarrinho")

lista.innerHTML=""

let total=0

carrinho.forEach(i=>{

lista.innerHTML+=`

<div>
${i.nome} - R$ ${i.preco}
</div>

`

total+=i.preco

})

document.getElementById("total").innerText=total.toFixed(2)

document.getElementById("contador").innerText=carrinho.length

}

function abrirCarrinho(){

let c=document.getElementById("carrinho")

c.style.display=c.style.display=="block"?"none":"block"

}

function irPizzas(){

window.location="pizza.html"

}

function enviarPedido(){

let pagamento=document.getElementById("pagamento").value

let endereco=document.getElementById("endereco").value

let texto="Pedido%20Sabore%20In%20Casa%0A%0A"

carrinho.forEach(i=>{

texto+=i.nome+"%20-%20R$"+i.preco+"%0A"

})

texto+="%0APagamento:%20"+pagamento
texto+="%0AEndereco:%20"+endereco

let url="https://wa.me/5531983391576?text="+texto

window.open(url)

}
