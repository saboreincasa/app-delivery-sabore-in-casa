// LISTA DE PIZZAS
const pizzas = [
"A Moda",
"Calabresa",
"Frango com Cheddar",
"Frango com Catupiry",
"Frango Bolonhesa",
"Milho com Bacon",
"Napolitana",
"Palmito Bolonhesa",
"Quatro Queijos",
"Vegetariana"
];

const lista = document.getElementById("listaPizzas");
const config = document.getElementById("configPizza");
const nomePizzaEl = document.getElementById("nomePizza");
const selectMeio = document.getElementById("meio");

let pizzaAtual = "";

// GERAR LISTA
pizzas.forEach(pizza => {

lista.innerHTML += `
<div class="pizza-card" onclick="abrirPizza('${pizza}')">

<img src="imagens/pizza.jpg" class="pizza-img">

<div class="pizza-body">
<div class="pizza-nome">${pizza}</div>
</div>

</div>
`;

});

// ABRIR CONFIGURAÇÃO
function abrirPizza(nome){

pizzaAtual = nome;

// esconder lista
lista.style.display = "none";

// mostrar config
config.style.display = "block";

// nome da pizza
nomePizzaEl.innerText = "🍕 " + nome;

// preencher meio a meio
selectMeio.innerHTML = `<option value="">Pizza inteira</option>`;

pizzas.forEach(p => {
if(p !== nome){
selectMeio.innerHTML += `<option value="${p}">${p}</option>`;
}
});

}

// FECHAR CONFIGURAÇÃO
function fecharPizza(){
config.style.display = "none";
lista.style.display = "block";
}

// ADICIONAR AO CARRINHO
function adicionarPizza(){

let tamanho = document.getElementById("tamanho").value;
let borda = document.getElementById("borda").value;
let meio = document.getElementById("meio").value;

let preco = 0;

// PREÇOS
if(tamanho == 25) preco = 30;
if(tamanho == 30) preco = 40;
if(tamanho == 35) preco = 50;

preco += Number(borda);

// NOME FINAL
let nomeFinal = `${pizzaAtual} ${tamanho}cm`;

if(meio){
nomeFinal += " / Meio a Meio com " + meio;
}

if(borda == 10){
nomeFinal += " / Borda recheada";
}

// CARRINHO
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.push({
nome: nomeFinal,
preco: preco
});

// SALVAR
localStorage.setItem("carrinho", JSON.stringify(carrinho));

alert("Pizza adicionada!");

// VOLTA PRA LISTA
fecharPizza();

}
