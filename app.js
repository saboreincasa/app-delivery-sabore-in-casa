let carrinho = [];

fetch("produtos.json")
.then(res => res.json())
.then(produtos => {

let area = document.getElementById("produtos");

produtos.forEach(pizza => {

area.innerHTML += `

<div class="produto">

<h3>${pizza.nome}</h3>

<p>${pizza.ingredientes.join(", ")}</p>

<p>R$ ${pizza.preco}</p>

<button onclick="adicionarCarrinho(${pizza.id})">
Adicionar
</button>

</div>

`;

});

});

function adicionarCarrinho(id){

carrinho.push(id);

alert("Produto adicionado");

}
