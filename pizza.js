let pizzas=[

{
nome:"Calabresa",
ingredientes:"Mussarela, calabresa artesanal, cebola e orégano",
preco:39.90
},

{
nome:"Frango Catupiry",
ingredientes:"Frango desfiado, catupiry e mussarela",
preco:42.90
},

{
nome:"Portuguesa",
ingredientes:"Presunto, ovo, cebola e ervilha",
preco:44.90
},

{
nome:"Quatro Queijos",
ingredientes:"Mussarela, parmesão, gorgonzola e catupiry",
preco:46.90
},

{
nome:"Marguerita",
ingredientes:"Tomate, mussarela e manjericão",
preco:41.90
},

{
nome:"Pepperoni",
ingredientes:"Pepperoni americano e mussarela",
preco:48.90
},

{
nome:"Milho com Bacon",
ingredientes:"Milho verde, bacon e mussarela",
preco:43.90
},

{
nome:"Carne Seca",
ingredientes:"Carne seca desfiada, cebola roxa e catupiry",
preco:49.90
},

{
nome:"Bacon Cheddar",
ingredientes:"Bacon crocante e cheddar cremoso",
preco:47.90
},

{
nome:"Pizza do Chef",
ingredientes:"Molho especial da casa, mussarela premium, picanha fatiada, cebola caramelizada e catupiry",
preco:54.90
}

]

let lista=document.getElementById("lista-pizzas")

pizzas.forEach(p=>{

lista.innerHTML+=`

<div class="card">

<h3>${p.nome}</h3>

<p>${p.ingredientes}</p>

<p>R$ ${p.preco}</p>

<button onclick="escolher('${p.nome}',${p.preco})">

Escolher

</button>

</div>

`

})

function escolher(nome,preco){

document.getElementById("opcoes").innerHTML=`

<h2>${nome}</h2>

<label>

<input type="radio" name="tipo">

Pizza Inteira

</label>

<label>

<input type="radio" name="tipo">

Meio a Meio

</label>

<h3>Borda</h3>

<select>

<option>Sem borda</option>

<option>Borda Catupiry +10</option>

<option>Borda Cheddar +10</option>

</select>

<button>

Adicionar ao Carrinho

</button>

`

}
