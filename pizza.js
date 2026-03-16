const pizzas = {
  Calabresa: "Molho de tomate, mussarela, calabresa fatiada e cebola",
  "Quatro Queijos": "Mussarela, parmesão, gorgonzola e catupiry",
  Frango: "Frango desfiado temperado com catupiry",
  Portuguesa: "Presunto, ovo, cebola, ervilha e azeitona",
  Marguerita: "Mussarela, tomate e manjericão",
  Pepperoni: "Molho de tomate, mussarela e pepperoni",
  Bacon: "Mussarela e bacon crocante",
  Napolitana: "Tomate, alho e parmesão",
  "Milho com Bacon": "Milho verde e bacon",
  Vegetariana: "Pimentão, cebola, tomate e azeitona"
}

const sabores = Object.keys(pizzas)

const s1 = document.getElementById("sabor1")
const s2 = document.getElementById("sabor2")
const catupiry = document.getElementById("catupiry")
const cheddar = document.getElementById("cheddar")
const tamanho = document.getElementById("tamanho")
const precoEl = document.getElementById("preco")

/* carregar sabores */

sabores.forEach(s => {

s1.innerHTML += `<option>${s}</option>`
s2.innerHTML += `<option>${s}</option>`

})

/* mostrar ingredientes */

function mostrarIngredientes(n){

const sabor = document.getElementById("sabor"+n).value

document.getElementById("ingredientes"+n).innerText =
pizzas[sabor]

}

mostrarIngredientes(1)
mostrarIngredientes(2)

s1.addEventListener("change",()=>mostrarIngredientes(1))
s2.addEventListener("change",()=>mostrarIngredientes(2))

catupiry.addEventListener("change",atualizarPreco)
cheddar.addEventListener("change",atualizarPreco)
tamanho.addEventListener("change",atualizarPreco)

/* calcular preço */

function atualizarPreco(){

let preco = 0

switch(tamanho.value){

case "pequena":
preco = 39.90
break

case "media":
preco = 54.90
break

case "gigante":
preco = 64.90
break

}

if(catupiry.checked) preco += 10
if(cheddar.checked) preco += 10

precoEl.innerText = "R$ "+preco.toFixed(2)

return preco

}

/* adicionar ao carrinho */

function adicionarCarrinho(){

const precoNum = atualizarPreco()

let descricao =
`Pizza ${tamanho.value} ${s1.value} / ${s2.value}`

if(catupiry.checked) descricao += " | borda catupiry"

if(cheddar.checked) descricao += " | borda cheddar"

let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

let item = carrinho.find(p => p.nome === descricao)

if(item){

item.qtd++

}else{

carrinho.push({

nome: descricao,
preco: precoNum,
qtd: 1

})

}

localStorage.setItem("carrinho",JSON.stringify(carrinho))

alert("🍕 Pizza adicionada ao carrinho!")

}
