let nomePizza = localStorage.getItem("pizzaSelecionada")

document.getElementById("nomePizza").innerText = "🍕 " + nomePizza

function adicionarPizza(){

let tamanho = document.getElementById("tamanho").value
let borda = document.getElementById("borda").value
let meio = document.getElementById("meio").value

let preco = 0

if(tamanho == 25) preco = 30
if(tamanho == 30) preco = 40
if(tamanho == 35) preco = 50

preco += Number(borda)

let nomeFinal = `${nomePizza} ${tamanho}cm`

if(meio){
nomeFinal += " / Meio a Meio com " + meio
}

if(borda == 10){
nomeFinal += " / Borda recheada"
}

// pega carrinho existente
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

carrinho.push({
nome: nomeFinal,
preco: preco
})

// salva
localStorage.setItem("carrinho", JSON.stringify(carrinho))

alert("Pizza adicionada!")

window.location.href = "index.html"
}

function voltar(){
window.location.href = "index.html"
}
