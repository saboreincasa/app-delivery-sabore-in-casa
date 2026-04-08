document.addEventListener("DOMContentLoaded", () => {

const pizzas = [
{
nome: "Calabresa",
desc: "Molho, mussarela, calabresa, cebola",
img: "imagens/calabresa.jpg"
},
{
nome: "Frango com Catupiry",
desc: "Molho, frango desfiado, catupiry",
img: "imagens/frango.jpg"
},
{
nome: "4 Queijos",
desc: "Mussarela, provolone, parmesão, catupiry",
img: "imagens/4queijos.jpg"
},
{
nome: "Portuguesa",
desc: "Presunto, ovo, cebola, ervilha",
img: "imagens/portuguesa.jpg"
},
{
nome: "Marguerita",
desc: "Mussarela, tomate, manjericão",
img: "imagens/marguerita.jpg"
}
];

const lista = document.getElementById("listaPizzas");
const config = document.getElementById("configPizza");

let pizzaAtual = null;

// CONTADOR
function atualizarCarrinho(){
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
document.getElementById("count").innerText = carrinho.length;
}

// LISTAR PIZZAS
pizzas.forEach((pizza, index) => {

lista.innerHTML += `
<div class="pizza-card" onclick="abrirPizza(${index})">
<img src="${pizza.img}" class="pizza-img" onerror="this.src='imagens/erro.jpg'">
<div class="pizza-info">
<div class="pizza-nome">${pizza.nome}</div>
<div class="pizza-desc">🧾 ${pizza.desc}</div>
</div>
</div>
`;

});

// ABRIR CONFIG
window.abrirPizza = function(index){

pizzaAtual = pizzas[index];

lista.style.display = "none";
config.style.display = "block";

document.getElementById("nomePizza").innerText = "🍕 " + pizzaAtual.nome;
document.getElementById("descPizza").innerText = "Ingredientes: " + pizzaAtual.desc;
document.getElementById("imgPizza").src = pizzaAtual.img;

// MEIO A MEIO
let selectMeio = document.getElementById("meio");
selectMeio.innerHTML = `<option value="">Não</option>`;

pizzas.forEach(p => {
if(p.nome !== pizzaAtual.nome){
selectMeio.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
}
});

atualizarPreco();
}

// VOLTAR
window.fecharPizza = function(){
config.style.display = "none";
lista.style.display = "block";

document.getElementById("tamanho").value = "25";
document.getElementById("borda").value = "0";
document.getElementById("meio").value = "";
}

// PREÇO
window.atualizarPreco = function(){

let tamanho = document.getElementById("tamanho").value;
let borda = document.getElementById("borda").value;

let preco = 0;

if(tamanho == 25) preco = 30;
if(tamanho == 30) preco = 40;
if(tamanho == 35) preco = 50;

preco += Number(borda);

document.getElementById("preco").innerText = "Total: R$ " + preco;
}

// ADICIONAR
window.adicionarPizza = function(){

let tamanho = document.getElementById("tamanho").value;
let borda = document.getElementById("borda");
let meio = document.getElementById("meio").value;

let textoBorda = borda.options[borda.selectedIndex].text;

let preco = 0;

if(tamanho == 25) preco = 30;
if(tamanho == 30) preco = 40;
if(tamanho == 35) preco = 50;

preco += Number(borda.value);

let nomeFinal = `${pizzaAtual.nome} ${tamanho}cm`;

if(meio){
nomeFinal += " / Meio a Meio com " + meio;
}

if(borda.value != 0){
nomeFinal += " / " + textoBorda;
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.push({
nome: nomeFinal,
preco: preco
});

localStorage.setItem("carrinho", JSON.stringify(carrinho));

atualizarCarrinho();

alert("Pizza adicionada!");

fecharPizza();
}

// WHATSAPP
window.enviarWhatsApp = function(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if(carrinho.length === 0){
alert("Carrinho vazio!");
return;
}

let mensagem = "🍕 *Pedido:*\n\n";
let total = 0;

carrinho.forEach(item => {
mensagem += `• ${item.nome} - R$${item.preco}\n`;
total += item.preco;
});

mensagem += `\n💰 Total: R$${total}`;

let numero = "5531999999999";

let link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

window.open(link, "_blank");
}

atualizarCarrinho();

});
