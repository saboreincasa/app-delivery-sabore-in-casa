let carrinho = []

fetch("produtos.json")
.then(res => res.json())
.then(data => {

mostrarPizzas(data.pizzas)

mostrarBebidas(data.bebidas)

})

function mostrarPizzas(pizzas){

let container = document.getElementById("lista-pizzas")

pizzas.forEach(pizza => {

container.innerHTML += `

<div class="pizza">

<h3>${pizza.nome}</h3>

<p>${pizza.descricao}</p>

<select id="tamanho-${pizza.id}">
<option value="media">30cm Média</option>
<option value="grande">35cm Gigante</option>
</select>

<select id="metade-${pizza.id}">
<option value="">Pizza inteira</option>
<option value="metade">Meio a meio</option>
</select>

<button onclick="addPizza(${pizza.id},'${pizza.nome}',${pizza.preco_media},${pizza.preco_grande})">

Adicionar

</button>

</div>

`
})

}

function mostrarBebidas(bebidas){

let container = document.getElementById("lista-bebidas")

bebidas.forEach(bebida => {

container.innerHTML += `

<div class="bebida">

<h3>${bebida.nome}</h3>

<p>R$ ${bebida.preco}</p>

<button onclick="addCarrinho('${bebida.nome}',${bebida.preco})">

Adicionar

</button>

</div>

`

})

}

function addPizza(id,nome,precoMedia,precoGrande){

let tamanho = document.getElementById(`tamanho-${id}`).value

let preco = tamanho === "media" ? precoMedia : precoGrande

addCarrinho(nome,preco)

}

function addCarrinho(nome,preco){

carrinho.push({nome,preco})

renderCarrinho()

}

function renderCarrinho(){

let lista = document.getElementById("itens-carrinho")

lista.innerHTML = ""

carrinho.forEach(item => {

lista.innerHTML += `<li>${item.nome} - R$ ${item.preco}</li>`

})

}

function finalizarPedido(){

alert("Pedido enviado para a pizzaria!")

}
