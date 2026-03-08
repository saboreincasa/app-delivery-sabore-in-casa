let numero = "5531983391576"; // WhatsApp
let taxaEntrega = 6.99;
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtos = [];
let metade1 = null;

// Carregar produtos do JSON
async function carregarProdutos() {
  let resposta = await fetch("produtos.json");
  produtos = await resposta.json();
  mostrar(produtos);
}

// Mostrar produtos na tela
function mostrar(lista) {
  let html = "";
  lista.forEach(p => {
    html += `
      <div class="card">
        <img src="${p.foto}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1046/1046784.png'" alt="${p.nome}">
        <div class="card-content">
          <h3>${p.nome}</h3>
          <div class="preco">R$ ${p.preco.toFixed(2)}</div>
          ${p.nome.toLowerCase().includes("pizza") ? 
            `<button onclick="abrirModalMeioMeio('${p.nome}', ${p.preco})">Meio a Meio</button>
             <button onclick="add('${p.nome}', ${p.preco})">Adicionar</button>` :
            `<button onclick="add('${p.nome}', ${p.preco})">Adicionar</button>`
          }
        </div>
      </div>
    `;
  });
  document.getElementById("produtos").innerHTML = html;
}

// Filtrar categorias
function filtrar(cat) {
  let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(cat.toLowerCase()));
  mostrar(filtrados);
}

// Busca
document.getElementById("busca").addEventListener("input", function() {
  let valor = this.value.toLowerCase();
  let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(valor));
  mostrar(filtrados);
});

// Adicionar produto ao carrinho
function add(nome, preco, metade2 = null) {
  let bordaSelecionada = document.getElementById("borda").value;
  let descricao = nome;
  if (metade2) descricao = `${nome} / ${metade2} (Meio a Meio)`;
  if (bordaSelecionada && !metade2) descricao += ` + Borda: ${bordaSelecionada}`;

  let item = carrinho.find(p => p.nome === descricao);
  if (item) item.qtd++;
  else carrinho.push({nome: descricao, preco, qtd: 1});
  salvar();
}

// Salvar e atualizar carrinho
function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizar();
}

function atualizar() {
  let lista = "", total = 0, qtd = 0;
  carrinho.forEach((item, i) => {
    total += item.preco * item.qtd;
    qtd += item.qtd;
    lista += `<div class="item">${item.nome} x${item.qtd} <button onclick="remover(${i})">❌</button></div>`;
  });
  document.getElementById("lista").innerHTML = lista;
  document.getElementById("contador").innerText = qtd;
  document.getElementById("total").innerText = (total + taxaEntrega).toFixed(2);
}

function remover(i) { carrinho.splice(i,1); salvar(); }
function scrollCarrinho() { document.getElementById("carrinho").scrollIntoView({behavior:"smooth"}); }

// Modal Meio a Meio
function abrirModalMeioMeio(nome, preco) {
  metade1 = {nome, preco};
  const select = document.getElementById("segundaMetade");
  select.innerHTML = "";
  produtos.filter(p => p.nome.toLowerCase().includes("pizza") && p.nome !== nome).forEach(p => {
    let option = document.createElement("option");
    option.value = p.nome;
    option.textContent = p.nome;
    select.appendChild(option);
  });
  document.getElementById("modalMeioMeio").style.display = "flex";
}
function fecharModal() { document.getElementById("modalMeioMeio").style.display = "none"; metade1=null; }
function confirmarMeioMeio() {
  const select = document.getElementById("segundaMetade");
  const metade2 = produtos.find(p => p.nome === select.value);
  if (!metade2) { alert("Selecione a segunda metade."); return; }
  const precoMedio = ((metade1.preco + metade2.preco)/2).toFixed(2);
  add(metade1.nome, Number(precoMedio), metade2.nome);
  fecharModal();
}

// Enviar pedido WhatsApp
function enviarPedido() {
  const endereco = document.getElementById("enderecoCliente").value;
  const pagamento = document.getElementById("pagamento").value;
  const troco = document.getElementById("troco").value;
  if(carrinho.length===0){alert("Adicione produtos."); return;}
  if(!endereco){alert("Informe o endereço."); return;}

  let pedidoNumero = Math.floor(Math.random()*9000)+1000;
  let msg = `Pedido *nº ${pedidoNumero}*%0A%0A*Itens:*%0A`;
  let total = 0;
  carrinho.forEach(item=>{msg+=`➡ ${item.qtd}x ${item.nome}%0A`; total+=item.preco*item.qtd;});
  msg += `%0A💳 *${pagamento}*%0A%0A🛵 *Delivery* (taxa de: *R$ ${taxaEntrega.toFixed(2)}*)%0A`;
  msg += `🏠 ${endereco}%0A(Estimativa: *entre 20~40 minutos*)%0A%0ATotal: *R$ ${(total+taxaEntrega).toFixed(2)}*%0A%0AObrigado pela preferência, se precisar de algo é só chamar! 😉`;
  window.open(`https://wa.me/${numero}?text=${msg}`);
}

// Inicializar
carregarProdutos();
atualizar();
