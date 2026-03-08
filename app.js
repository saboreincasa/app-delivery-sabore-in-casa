let carrinho = []

function toggleCarrinho(){

document.getElementById("carrinhoBox")
.classList.toggle("ativo")

}

function adicionar(nome, preco){

let borda = ""

if(nome.includes("Pizza")){

borda = prompt("Escolha a borda: \n1- Cheddar\n2- Catupiry\n3- Sem borda")

if(borda == "1") borda = "Borda Cheddar"
else if(borda == "2") borda = "Borda Catupiry"
else borda = "Sem borda"

}

carrinho.push({

nome:nome,
preco:preco,
borda:borda

})

renderCarrinho()

}

function renderCarrinho(){

let lista = document.getElementById("carrinho")
let total = 0

lista.innerHTML=""

carrinho.forEach((item)=>{

let li=document.createElement("li")

li.innerText=item.nome+" "+item.borda+" - R$"+item.preco

lista.appendChild(li)

total+=item.preco

})

document.getElementById("total").innerText="Total: R$"+total

}

function enviarWhats(){

let numeroPedido=Math.floor(Math.random()*9000)+1000

let texto=`Pedido *nº ${numeroPedido}*\n\n`

texto+="*Itens:*\n"

let total=0

carrinho.forEach(item=>{

texto+=`➡ ${item.nome} ${item.borda}\n`
total+=item.preco

})

texto+=`\n🛵 *Delivery*\n`
texto+=`🏠 Rua Maria de Lourdes da Cruz, Nº 378 - Mantiqueira, Belo Horizonte\n`
texto+=`(Estimativa: *20~40 minutos*)\n\n`

texto+=`Total: *R$ ${total}*`

let url="https://wa.me/5531983391576?text="+encodeURIComponent(texto)

window.open(url)

}

function scrollTopo(){

window.scrollTo({

top:0,
behavior:"smooth"

})

}
