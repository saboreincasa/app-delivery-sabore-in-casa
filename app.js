let carrinho=[]
let total=0
let pizzaSelecionada=""

const pizzas = [

{nome:"A Moda",desc:"Mussarela, milho, presunto, molho, azeitona, cebola, calabresa e orégano",img:"https://images.unsplash.com/photo-1594007654729-407eedc4fe24"},

{nome:"Calabresa",desc:"Molho, calabresa, cebola, mussarela e orégano",img:"https://images.unsplash.com/photo-1548365328-9f547fb0953d"},

{nome:"Frango com Cheddar",desc:"Frango, cheddar, mussarela e orégano",img:"https://images.unsplash.com/photo-1601924638867-3ec2bcd05c15"},

{nome:"Frango com Catupiry",desc:"Frango, catupiry, mussarela e orégano",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},

{nome:"Frango Bolonhesa",desc:"Molho bolonhesa, frango e mussarela",img:"https://images.unsplash.com/photo-1604382355076-af4b0eb60143"},

{nome:"Milho com Bacon",desc:"Milho, bacon, mussarela e orégano",img:"https://images.unsplash.com/photo-1590947132387-155cc02f3212"},

{nome:"Napolitana",desc:"Tomate, parmesão, mussarela",img:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e"},

{nome:"Palmito Bolonhesa",desc:"Palmito, bolonhesa e mussarela",img:"https://images.unsplash.com/photo-1601924582975-7c4c2d6a8f36"},

{nome:"Quatro Queijos",desc:"Mussarela, gorgonzola, parmesão, cheddar",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},

{nome:"Vegetariana",desc:"Tomate, cebola, milho, azeitona e palmito",img:"https://images.unsplash.com/photo-1548365328-9f547fb0953d"}

]

function abrirPizzas(){

let html="<h2>🍕 Cardápio</h2>"

pizzas.forEach(p=>{

html+=`
<div class="card-pizza" onclick="abrirModal('${p.nome}','${p.img}')">

<img src="${p.img}">

<div>
<h3>${p.nome}</h3>
<p>${p.desc}</p>
<p><b>P R$23 | M R$38 | G R$42</b></p>
</div>

</div>
`

})

document.getElementById("produtos").innerHTML=html

}

function abrirModal(nome,img){

pizzaSelecionada=nome

document.getElementById("nomePizza").innerText=nome
document.getElementById("imgPizza").src=img

document.getElementById("modalPizza").style.display="flex"

}

function fecharModal(){
document.getElementById("modalPizza").style.display="none"
}

function confirmarPizza(){

let tamanho=parseFloat(document.getElementById("tamanho").value)
let borda=parseFloat(document.getElementById("borda").value)
let meia=document.getElementById("meiaPizza").value

let preco=tamanho + borda

let nome=pizzaSelecionada

if(meia){
nome+=" / "+meia
}

carrinho.push({nome,preco})
total+=preco

atualizarCarrinho()
fecharModal()

}

function atualizarCarrinho(){

let html=""

carrinho.forEach(p=>{
html+=`<div>${p.nome} - R$${p.preco}</div>`
})

document.getElementById("lista").innerHTML=html
document.getElementById("total").innerText=total.toFixed(2)
document.getElementById("contador").innerText=carrinho.length

}

function enviarPedido(){

let endereco=document.getElementById("enderecoCliente").value
let pagamento=document.getElementById("pagamento").value

let msg="Pedido Sabore In Casa %0A"

carrinho.forEach(p=>{
msg+=p.nome+" - R$"+p.preco+"%0A"
})

msg+="Total: R$"+total
msg+="%0APagamento: "+pagamento
msg+="%0AEndereço: "+endereco

window.open("https://wa.me/5531983391576?text="+msg)

}

function scrollCarrinho(){
document.getElementById("carrinho").scrollIntoView()
}
