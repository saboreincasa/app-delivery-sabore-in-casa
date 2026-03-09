let dados
let carrinho=[]
let numeroPedido=5000

fetch("produtos.json")
.then(r=>r.json())
.then(d=>{

dados=d
mostrar("pizzas")

})

function mostrar(tipo){

let area=document.getElementById("lista")
area.innerHTML=""

dados[tipo].forEach(p=>{

area.innerHTML+=`

<div class="card">

<h3>${p.nome}</h3>

<p>${p.descricao||""}</p>

<p>R$ ${p.preco || p.media}</p>

<button onclick='add(${JSON.stringify(p)})'>Adicionar</button>

</div>

`

})

}

function add(p){

carrinho.push(p)

alert("Item adicionado")

}

function abrirCarrinho(){

document.getElementById("carrinho").style.display="block"

let area=document.getElementById("itens")

area.innerHTML=""

let subtotal=0

carrinho.forEach(i=>{

let valor=i.preco||i.media

subtotal+=valor

area.innerHTML+=`<p>${i.nome} - R$${valor}</p>`

})

document.getElementById("total").innerHTML="Subtotal: R$"+subtotal

}

function calcularTaxa(){

let taxa=7 + Math.random()*5
return taxa

}

function finalizar(){

numeroPedido++

let subtotal=0

carrinho.forEach(i=>{

subtotal+= i.preco||i.media

})

let taxaEntrega=calcularTaxa()

let taxaExtra=10

let total=subtotal + taxaEntrega + taxaExtra

let pix=gerarPix(total)

let texto=`

Pedido nº ${numeroPedido}

Itens:
${carrinho.map(i=>"➡ "+i.nome).join("\n")}

💳 Pix

🛵 Delivery (taxa: R$${taxaEntrega.toFixed(2)})

📦 Taxa serviço: R$10

🏠 ${document.getElementById("endereco").value}

Total: R$${total.toFixed(2)}

Pix:
${pix}

SABORE IN CASA
31983391576

`

navigator.clipboard.writeText(texto)

alert("Pedido gerado e copiado!")

notificar()

}

function notificar(){

if(Notification.permission==="granted"){

new Notification("Novo pedido recebido!")

}else{

Notification.requestPermission()

}

}
