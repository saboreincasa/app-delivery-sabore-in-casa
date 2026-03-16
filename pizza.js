const pizzas = {

calabresa:{
ingredientes:"Molho de tomate, mussarela, calabresa, cebola e orégano"
},

quatroqueijos:{
ingredientes:"Mussarela, parmesão, gorgonzola e catupiry"
},

frango:{
ingredientes:"Frango desfiado, catupiry, mussarela e orégano"
},

portuguesa:{
ingredientes:"Presunto, ovo, cebola, ervilha, azeitona e mussarela"
},

marguerita:{
ingredientes:"Mussarela, tomate e manjericão"
},

pepperoni:{
ingredientes:"Molho de tomate, mussarela e pepperoni"
},

bacon:{
ingredientes:"Mussarela, bacon crocante e molho de tomate"
},

napolitana:{
ingredientes:"Tomate, alho, parmesão e orégano"
},

milhobacon:{
ingredientes:"Milho, bacon, mussarela e molho"
},

vegetariana:{
ingredientes:"Pimentão, cebola, tomate, milho, azeitona e mussarela"
}

};

function mostrarIngredientes(numero){

let sabor = document.getElementById("sabor"+numero).value;

let texto = pizzas[sabor].ingredientes;

document.getElementById("ingredientes"+numero).innerText = texto;

}

mostrarIngredientes(1);
mostrarIngredientes(2);

document.getElementById("borda").addEventListener("change", atualizarPreco);
document.getElementById("cheddar").addEventListener("change", atualizarPreco);

function atualizarPreco(){

let tamanho = document.getElementById("tamanho").value;

let preco = 0;

if(tamanho === "media"){

preco = 54.90;

}

if(tamanho === "gigante"){

preco = 64.90;

}

if(document.getElementById("borda").checked){

preco += 8;

}

if(document.getElementById("cheddar").checked){

preco += 5;

}

document.getElementById("preco").innerText =
"R$ " + preco.toFixed(2);

}

function adicionarCarrinho(){

let tamanho = document.getElementById("tamanho").value;

let sabor1 = document.getElementById("sabor1").value;
let sabor2 = document.getElementById("sabor2").value;

let borda = document.getElementById("borda").checked;
let cheddar = document.getElementById("cheddar").checked;

let pedido = {

tamanho:tamanho,
sabor1:sabor1,
sabor2:sabor2,
borda:borda,
cheddar:cheddar,
preco:document.getElementById("preco").innerText

};

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.push(pedido);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

alert("Pizza adicionada ao carrinho 🍕");

}
