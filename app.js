let numero="5531983391576"

let carrinho=JSON.parse(localStorage.getItem("carrinho"))||[]

let produtos=[]

let taxaEntrega=6.99

async function carregarProdutos(){

let r=await fetch("produtos.json")

produtos=await r.json()

mostrar(produtos)

}

function mostrar(lista){

let html=""

lista.forEach(p=>{

html+=`

<div class="card">

<img src="${p.foto}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1046/1046784.png'">

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

let filtrados=produtos.filter(p=>p.nome.includes(cat))

mostrar(filtrados)

}

document.getElementById("busca").addEventListener("input",function(){

let v=this.value.toLowerCase()

let filtrados=produtos.filter(p=>p.nome.toLowerCase().includes(v))

mostrar(filtrados)

})

function add(nome,preco){

let item=carrinho.find(i=>i.nome==nome)

if(item){

item.qtd++

}else{

carrinho.push({nome,preco,qtd:1})

}

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

carrinho.forEach((i,index)=>{

lista+=`

<div>

${i.nome} x${i.qtd}

<button onclick="remover(${index})">❌</button>

</div>

`

total+=i.preco*i.qtd

qtd+=i.qtd

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

function enviarPedido(){

let endereco=document.getElementById("enderecoCliente").value

let pagamento=document.getElementById("pagamento").value

let troco=document.getElementById("troco").value

if(carrinho.length==0){

alert("Adicione algum produto")

return

}

let msg="🍕 *Pedido Sabore In Casa*%0A%0A"

let total=0

carrinho.forEach(i=>{

msg+=`${i.nome} x${i.qtd}%0A`

total+=i.preco*i.qtd

})

msg+=`%0ATaxa entrega: R$ ${taxaEntrega}`

msg+=`%0ATotal: R$ ${(total+taxaEntrega).toFixed(2)}`

msg+=`%0AEndereço: ${endereco}`

msg+=`%0APagamento: ${pagamento}`

msg+=`%0ATroco: ${troco}`

window.open(`https://wa.me/${numero}?text=${msg}`)

}

carregarProdutos()

atualizar()
