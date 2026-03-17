```javascript
let pizzas=[

"Calabresa",
"Frango Catupiry",
"Portuguesa",
"Quatro Queijos",
"Marguerita",
"Pepperoni",
"Milho Bacon",
"Carne Seca",
"Bacon Cheddar",
"Pizza do Chef"

]

let lista=document.getElementById("listaPizzas")

pizzas.forEach(p=>{

lista.innerHTML+=`

<div class="card">

<div class="card-content">

<h3>${p}</h3>

<button onclick="montar('${p}')">

Montar pizza

</button>

</div>

</div>

`

})

function montar(nome){

localStorage.setItem("pizzaEscolhida",nome)

window.location="montar-pizza.html"

}
```
