let carrinho = [];
const whatsappNumero = "5531983391576";

function calcularFrete(){
 let bairro = document.getElementById("bairro").value;
 let frete = 20;

 if(["Mantiqueira","Venda Nova"].includes(bairro)) frete = 7;
 else if(["Justinópolis"].includes(bairro)) frete = 10;

 document.getElementById("frete").innerText = frete.toFixed(2);
 atualizarTotal();
}

function abrirPizzas(){
 let html = `<h2>🍕 Pizzas (Massa Integral Artesanal)</h2>`;

 const pizzas = ["Calabresa","Frango com Catupiry","4 Queijos"];

 pizzas.forEach(p=>{
  html += `
  <div class="card">
    <h3>${p}</h3>
    <button onclick="addCarrinho('${p} (Massa Integral)', 54.90)">
      Adicionar
    </button>
  </div>`;
 });

 document.getElementById("produtos").innerHTML = html;
}

function addCarrinho(nome, preco){
 let item = carrinho.find(i=>i.nome===nome);

 if(item) item.qtd++;
 else carrinho.push({nome,preco,qtd:1});

 atualizarCarrinho();
 mostrarSugestoes();
}

function atualizarCarrinho(){
 let lista = document.getElementById("lista");
 lista.innerHTML = "";

 let subtotal = 0;

 carrinho.forEach((item,i)=>{
  let total = item.preco * item.qtd;
  subtotal += total;

  lista.innerHTML += `
  <div style="display:flex;justify-content:space-between;">
    <div>
      <b>${item.nome}</b><br>
      R$ ${total.toFixed(2)}
      <div class="remover" onclick="removerItem(${i})">Remover</div>
    </div>

    <div>
      <button onclick="diminuir(${i})">➖</button>
      ${item.qtd}
      <button onclick="aumentar(${i})">➕</button>
    </div>
  </div>`;
 });

 document.getElementById("subtotal").innerText = subtotal.toFixed(2);
 atualizarTotal();
}

function atualizarTotal(){
 let subtotal = Number(document.getElementById("subtotal").innerText);
 let frete = Number(document.getElementById("frete").innerText);

 document.getElementById("total").innerText = (subtotal + frete).toFixed(2);
}

function mostrarSugestoes(){
 let box = document.getElementById("sugestoes");

 if(carrinho.length > 0){
  box.innerHTML = `
  <h3>🔥 Aproveite também</h3>
  <button onclick="addCarrinho('Coca-Cola 2L',14.90)">+ Refrigerante</button>
  <button onclick="addCarrinho('Batata Frita',22.90)">+ Batata</button>
  `;
 }
}

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho(); }
function diminuir(i){
 carrinho[i].qtd--;
 if(carrinho[i].qtd<=0) carrinho.splice(i,1);
 atualizarCarrinho();
}
function removerItem(i){
 carrinho.splice(i,1);
 atualizarCarrinho();
}

function enviarPedido(){
 let subtotal = document.getElementById("subtotal").innerText;
 let frete = document.getElementById("frete").innerText;
 let total = document.getElementById("total").innerText;

 let msg = `🍕 SABORE IN CASA\n\nPedido:\n`;

 carrinho.forEach(item=>{
  msg += `${item.qtd}x ${item.nome}\n`;
 });

 msg += `\nSubtotal: R$${subtotal}`;
 msg += `\nFrete: R$${frete}`;
 msg += `\nTOTAL: R$${total}`;

 window.open(`https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`);
}
