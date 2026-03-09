// app.js

let produtos = [];
let carrinho = [];
let pizzaSelecionada = null;

// Carregar produtos do JSON
fetch("produtos.json")
  .then(res => res.json())
  .then(data => {
    produtos = data;
    mostrarCategoria('pizza'); // mostrar pizzas por padrão
  });

// Mostrar produtos por categoria
function mostrarCategoria(categoria) {
  const area = document.getElementById("produtos");
  area.innerHTML = "";

  let filtrados = produtos.filter(p => p.categoria === categoria);

  filtrados.forEach(p => {
    let card = document.createElement("div");
    card.className = p.categoria === "bebida" || p.categoria === "combos" ? "cardBebida" : "card";

    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      ${p.ingredientes ? `<p>${p.ingredientes}</p>` : ""}
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="${p.categoria === 'pizza' ? `abrirModal(${p.id})` : `adicionarBebida('${p.nome}', ${p.preco})`}">
        Adicionar
      </button>
    `;

    area.appendChild(card);
  });
}

// === MODAL PIZZA ===
function abrirModal(id) {
  pizzaSelecionada = produtos.find(p => p.id === id);
  document.getElementById("pizzaNome").innerText = pizzaSelecionada.nome;
  document.getElementById("pizzaIngredientes").innerText = pizzaSelecionada.ingredientes;
  document.getElementById("modalPizza").style.display = "block";
}

function fecharModal() {
  pizzaSelecionada = null;
  document.getElementById("modalPizza").style.display = "none";
}

// === ADICIONAR AO CARRINHO ===
function adicionarCarrinho() {
  if (!pizzaSelecionada) return;

  let tamanho = document.getElementById("tamanho").value;
  let tipoPizza = document.getElementById("tipoPizza").value;
  let borda = parseFloat(document.getElementById("borda").value);

  let item = {
    nome: pizzaSelecionada.nome,
    preco: pizzaSelecionada.preco + borda,
    tamanho,
    tipoPizza,
    borda: borda > 0 ? (borda === 10 ? "Cheddar/Catupiry +10" : "Normal") : "Normal"
  };

  carrinho.push(item);
  atualizarCarrinho();
  fecharModal();
}

// === ADICIONAR BEBIDAS / COMBOS ===
function adicionarBebida(nome, preco) {
  let item = { nome, preco };
  carrinho.push(item);
  atualizarCarrinho();
}

// === ATUALIZAR CARRINHO ===
function atualizarCarrinho() {
  const contador = document.getElementById("contador");
  contador.innerText = carrinho.length;

  const itens = document.getElementById("itensCarrinho");
  itens.innerHTML = "";

  carrinho.forEach((item, index) => {
    let div = document.createElement("div");
    div.innerHTML = `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;
    itens.appendChild(div);
  });
}

// === ABRIR / FECHAR CARRINHO ===
function abrirCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  carrinhoDiv.style.display = carrinhoDiv.style.display === "block" ? "none" : "block";
}

// === ENVIAR PEDIDO WHATSAPP ===
function enviarWhatsapp() {
  if (carrinho.length === 0) return alert("Carrinho vazio!");

  let texto = "Olá, quero fazer o pedido:\n";
  carrinho.forEach(item => {
    if(item.tamanho) texto += `- ${item.nome} (${item.tipoPizza}, ${item.tamanho}cm, borda: ${item.borda}) - R$ ${item.preco.toFixed(2)}\n`;
    else texto += `- ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
  });

  let url = `https://wa.me/5531983391576?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}

// === MOSTRAR PIX ===
function mostrarPix() {
  if (carrinho.length === 0) return alert("Carrinho vazio!");

  document.getElementById("pixArea").style.display = "block";
}

// === FILTRO DE BUSCA ===
document.getElementById("busca").addEventListener("input", function(e){
  const termo = e.target.value.toLowerCase();
  const area = document.getElementById("produtos");
  area.innerHTML = "";

  let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));

  filtrados.forEach(p => {
    let card = document.createElement("div");
    card.className = p.categoria === "bebida" || p.categoria === "combos" ? "cardBebida" : "card";
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      ${p.ingredientes ? `<p>${p.ingredientes}</p>` : ""}
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="${p.categoria === 'pizza' ? `abrirModal(${p.id})` : `adicionarBebida('${p.nome}', ${p.preco})`}">
        Adicionar
      </button>
    `;
    area.appendChild(card);
  });
});
