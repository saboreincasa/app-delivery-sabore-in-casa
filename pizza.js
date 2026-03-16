const pizzas = {
  Calabresa: "Molho, mussarela, calabresa, cebola",
  "Quatro Queijos": "Mussarela, parmesão, gorgonzola, catupiry",
  Frango: "Frango desfiado, catupiry",
  Portuguesa: "Presunto, ovo, cebola, ervilha",
  Marguerita: "Mussarela, tomate, manjericão",
  Pepperoni: "Molho, mussarela, pepperoni",
  Bacon: "Mussarela, bacon",
  Napolitana: "Tomate, alho, parmesão",
  "Milho com Bacon": "Milho, bacon",
  Vegetariana: "Pimentão, cebola, tomate"
};

const sabores = Object.keys(pizzas);
const s1 = document.getElementById("sabor1");
const s2 = document.getElementById("sabor2");
const catupiry = document.getElementById("catupiry");
const cheddar = document.getElementById("cheddar");
const tamanho = document.getElementById("tamanho");
const precoEl = document.getElementById("preco");

sabores.forEach(s => {
  s1.innerHTML += `<option>${s}</option>`;
  s2.innerHTML += `<option>${s}</option>`;
});

function mostrarIngredientes(n) {
  const sabor = document.getElementById("sabor" + n).value;
  document.getElementById("ingredientes" + n).innerText = pizzas[sabor];
}

mostrarIngredientes(1);
mostrarIngredientes(2);

s1.addEventListener("change", () => mostrarIngredientes(1));
s2.addEventListener("change", () => mostrarIngredientes(2));
catupiry.addEventListener("change", atualizarPreco);
cheddar.addEventListener("change", atualizarPreco);
tamanho.addEventListener("change", atualizarPreco);

function atualizarPreco() {
  let preco = 0;
  switch (tamanho.value) {
    case "pequena": preco = 39.90; break;
    case "media": preco = 54.90; break;
    case "gigante": preco = 64.90; break;
  }
  if (catupiry.checked) preco += 10;
  if (cheddar.checked) preco += 10;
  precoEl.innerText = "R$ " + preco.toFixed(2);
  return preco;
}

function adicionarCarrinho() {
  const precoNum = atualizarPreco();
  const pedido = {
    tamanho: tamanho.value,
    sabor1: s1.value,
    sabor2: s2.value,
    catupiry: catupiry.checked,
    cheddar: cheddar.checked,
    preco: precoNum
  };
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(pedido);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Pizza adicionada ao carrinho!");
}
