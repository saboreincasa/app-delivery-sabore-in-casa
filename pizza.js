const pizzas = {

Calabresa:"Molho, mussarela, calabresa, cebola",

"Quatro Queijos":"Mussarela, parmesão, gorgonzola, catupiry",

Frango:"Frango desfiado, catupiry",

Portuguesa:"Presunto, ovo, cebola, ervilha",

Marguerita:"Mussarela, tomate, manjericão",

Pepperoni:"Molho, mussarela, pepperoni",

Bacon:"Mussarela, bacon",

Napolitana:"Tomate, alho, parmesão",

"Milho com Bacon":"Milho, bacon",

Vegetariana:"Pimentão, cebola, tomate"

};

const sabores = Object.keys(pizzas);

let s1 = document.getElementById("sabor1");
let s2 = document.getElementById("sabor2");

sabores.forEach(s=>{

s1.innerHTML+=`<option>${s}</option>`;
s2.innerHTML+=`<option>${s}</option>`;

});

function mostrarIngredientes(n){

let sabor=document.getElementById("sabor"+n).value;

document.getElementById("ingredientes"+n).innerText=pizzas[sabor];

}

mostrarIngredientes(1);
mostrarIngredientes(2);

document.getElementById("catupiry").addEventListener("change",atualizarPreco);
document.getElementById("cheddar").addEventListener("change",atualizarPreco);

function atualizarPreco(){

let tamanho=document.getElementById("tamanho").value;

let preco=0;

if(tamanho=="pequena")preco=39.90;
if(tamanho=="media")preco=54.90;
if(tamanho=="gigante")preco=64.90;

if(catupiry.checked)preco+=10;
if(cheddar.checked)preco+=10;

document.getElementById("preco").innerText="R$ "+preco.toFixed(2);

}

function adicionarCarrinho(){

let pedido={

tamanho:tamanho.value,
sabor1:sabor1.value,
sabor2:sabor2.value,
preco:preco.innerText

};

let carrinho=JSON.parse(localStorage.getItem("carrinho"))||[];

carrinho.push(pedido);

localStorage.setItem("carrinho",JSON.stringify(carrinho));

alert("Pizza adicionada");

}
