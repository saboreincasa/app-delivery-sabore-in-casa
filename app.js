<!DOCTYPE html>
<html lang="pt-br">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sabore In Casa</title>
<link rel="manifest" href="manifest.json">
<link rel="stylesheet" href="style.css">
</head>

<body>

<header class="header-topo">
  <div class="overlay"></div>
  <div class="logo-container">
    <img src="imagens/logo.png" class="logo-grande">
  </div>
</header>

<div class="endereco">
📍 Rua Maria de Lourdes da Cruz Nº 378<br>
Bairro Mantiqueira – Belo Horizonte
<br>
<button onclick="abrirMapa()">📍 Ver no mapa</button>
</div>

<div id="banner" class="banner" style="cursor:pointer;"></div>

<div class="container">
<input class="busca" id="busca" placeholder="🔎 Buscar produto">

<div class="btn-flutuantes">
<div class="linha">
<button onclick="abrirPizzas()">🍕 Pizzas</button>
<button onclick="filtrar('bebidas')">🥤 Bebidas</button>
</div>
<div class="linha">
<button onclick="filtrar('combo')">🎁 Combos</button>
<button onclick="filtrar('snaks')">🍟 Snaks</button>
</div>
</div>

<h2 id="tituloCombos">⭐ Combos da Semana</h2>
<div id="combosSemana"></div>
<div id="produtos"></div>

<div id="carrinho">
<h2>🛒 Carrinho</h2>
<div id="lista"></div>

<div class="total">
Total + entrega: R$ <span id="total">0.00</span>
</div>

<input id="enderecoCliente" placeholder="Digite seu endereço">

<select id="pagamento">
<option>PIX</option>
<option>Dinheiro</option>
<option>Cartão</option>
</select>

<input id="troco" placeholder="Troco para quanto?">

<button class="enviar" onclick="enviarPedido()">
Enviar pedido no WhatsApp
</button>
</div>
</div>

<div id="botaoCarrinho" onclick="scrollCarrinho()">
🛒 <div id="contador">0</div>
</div>

<footer>
© Sabore In Casa<br>
Desenvolvido por <b>Carlos Henrique</b>
</footer>

<script>
// Número do WhatsApp completo
const whatsappNumero = "5531983391576";

// 🛒 CARRINHO
let carrinho = []

// Função para atualizar carrinho visualmente
function atualizarCarrinho() {
    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>
         <div style="display:flex; align-items:center; gap:5px;">
            <button onclick="diminuir(${index})"
                style="background:#ffb300; color:white; border:none; border-radius:5px; padding:5px 10px; cursor:pointer;">
                ➖
            </button>
            <span>${item.qtd}</span>
            <button onclick="aumentar(${index})"
                style="background:#ffb300; color:white; border:none; border-radius:5px; padding:5px 10px; cursor:pointer;">
                ➕
            </button>
            <button onclick="removerItem(${index})"
                style="background:none; border:none; font-weight:bold; margin-left:10px; cursor:pointer;">
                ❌<span style="color:white;"> Remover item</span>
            </button>
        </div>
        </div>
        `
        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

// Funções de aumentar, diminuir e remover item
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho(); }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho(); }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho(); }

// 🛒 SCROLL PARA O CARRINHO
function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

// FUNÇÃO PARA MOSTRAR TOAST
function mostrarToast(mensagem, onClickFunc) {
    let toastExistente = document.getElementById("toast-msg")
    if(toastExistente) toastExistente.remove()

    let toast = document.createElement("div")
    toast.id = "toast-msg"
    toast.style.position = "fixed"
    toast.style.bottom = "20px"
    toast.style.left = "50%"
    toast.style.transform = "translateX(-50%)"
    toast.style.background = "#28a745"
    toast.style.color = "white"
    toast.style.padding = "12px 20px"
    toast.style.borderRadius = "8px"
    toast.style.cursor = "pointer"
    toast.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)"
    toast.innerText = mensagem

    toast.onclick = function() { if(onClickFunc) onClickFunc(); toast.remove(); }

    document.body.appendChild(toast)
    setTimeout(()=>{ if(toast) toast.remove() }, 5000)
}

// Função de envio do pedido completo pelo WhatsApp
function enviarPedido() {
    if(carrinho.length === 0){ alert("Seu carrinho está vazio!"); return; }

    let endereco = document.getElementById('enderecoCliente').value || "Endereço não informado";
    let pagamento = document.getElementById('pagamento').value;
    let troco = document.getElementById('troco').value || "-";

    let msg = "Olá! Gostaria de fazer o pedido:\n\n";
    carrinho.forEach(item => { msg += `${item.qtd}x ${item.nome} - R$${item.preco.toFixed(2)} cada\n`; });

    msg += `\nTotal: R$${document.getElementById('total').innerText}\n`;
    msg += `Endereço: ${endereco}\n`;
    msg += `Pagamento: ${pagamento}\n`;
    msg += `Troco: ${troco}`;

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}

// 🍕 PIZZAS
function abrirPizzas(){
    document.getElementById("combosSemana").innerHTML = "";
    document.getElementById("tituloCombos").style.display = "none";

    let html = "<h2>🍕 Escolha sua Pizza</h2>"
    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry"}
    ]

    pizzas.forEach(p=>{
        html += `<div class="card" onclick="abrirMontagemPizza('${p.nome}')">
        <div class="card-content">
            <h3>${p.nome}</h3>
            <p>${p.desc}</p>
        </div>
        </div>`
    })
    document.getElementById("produtos").innerHTML = html
}

// 🍕 MONTAGEM PIZZA
function abrirMontagemPizza(nome){
    let html = `
    <h2>🍕 Montar Pizza - ${nome}</h2>
    <label>Tamanho:</label>
    <select id="tamanho">
        <option value="25">Pequena 25cm - R$30</option>
        <option value="30">Grande 30cm - R$40</option>
        <option value="35">Gigante 35cm - R$50</option>
    </select>
    <label>Borda:</label>
    <select id="borda">
        <option value="0">Normal</option>
        <option value="10">Catupiry (+10)</option>
        <option value="10">Cheddar (+10)</option>
    </select>
    <label>Meio a Meio:</label>
    <select id="meio">
        <option value="">Não</option>
        <option value="Calabresa">Calabresa</option>
        <option value="Frango com Catupiry">Frango com Catupiry</option>
        <option value="4 Queijos">4 Queijos</option>
        <option value="Portuguesa">Portuguesa</option>
        <option value="Marguerita">Marguerita</option>
        <option value="Baiana">Baiana</option>
        <option value="Napolitana">Napolitana</option>
        <option value="Milho com Bacon">Milho com Bacon</option>
        <option value="Moda da Casa">Moda da Casa</option>
    </select>
    <br><br>
    <button onclick="adicionarPizza('${nome}')" style="background:#ff6f00; color:white; border:none; border-radius:5px; padding:10px 20px;">
        Adicionar ao Carrinho
    </button>
    <br><br>
    <span onclick="abrirPizzas()" style="cursor:pointer;">⬅ Voltar</span>
    `
    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = document.getElementById("borda").value
    let meio = document.getElementById("meio").value

    let preco = 0
    if(tamanho==25) preco=30
    if(tamanho==30) preco=40
    if(tamanho==35) preco=50
    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda==10) nomeFinal += " / Borda recheada"

    addCarrinho(nomeFinal, preco)
    mostrarToast(`✅ ${nomeFinal} adicionado! Clique aqui para revisar no carrinho.`, scrollCarrinho)
    abrirPizzas()
}

// 🔥 FILTRO
function filtrar(tipo){
    if(tipo==="combo"){ mostrarCombos(); return }
    document.getElementById("combosSemana").innerHTML = ""
    document.getElementById("tituloCombos").style.display = "none"

    fetch("produtos.json")
    .then(res=>res.json())
    .then(produtos=>{
        let filtrados = produtos.filter(p=>p.categoria===tipo)
        let html = ""
        filtrados.forEach(p=>{
            html += `
            <div class="card">
                <img src="${p.foto}">
                <div class="card-content">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <p class="preco">R$ ${p.preco.toFixed(2)}</p>
                    <button onclick="addCarrinho('${p.nome}', ${p.preco})">
                        Adicionar
                    </button>
                </div>
            </div>`
        })
        document.getElementById("produtos").innerHTML = html
    })
}

// 🔥 COMBOS
function carregarCombosSemana(){
    fetch("produtos.json")
    .then(res=>res.json())
    .then(produtos=>{
        let combos = produtos.filter(p=>p.categoria==="combos")
        let html = ""
        combos.forEach(c=>{
            html += `
            <div class="card destaque">
                <img src="${c.foto}">
                <div class="card-content">
                    <h3>${c.nome}</h3>
                    <p>${c.descricao}</p>
                    <p class="preco">R$ ${c.preco.toFixed(2)}</p>
                    <button onclick="addCarrinho('${c.nome}', ${c.preco})">
                        Adicionar
                    </button>
                </div>
            </div>`
        })
        document.getElementById("combosSemana").innerHTML = html
    })
}

// 🎬 BANNER (LOCAL)
let banners = [
    {nome:"Combo Família", descricao:"2 pizzas grandes + refrigerantes", preco:99.90, foto:"imagens/banners/combo-familia.png"},
    {nome:"Combo Amigos", descricao:"Cerveja + carvão", preco:89.90, foto:"imagens/banners/combo-amigos.png"},
    {nome:"Combo Casal", descricao:"2 pizzas grandes + refrigerante", preco:79.90, foto:"imagens/banners/combo-casal.png"}
]

let bannerDiv = document.getElementById('banner');
let bannerIndex = 0;

// Mostra banner e adiciona ao carrinho quando clicado
function mostrarBanner(){
    let combo = banners[bannerIndex];
    bannerDiv.style.backgroundImage = `url('${combo.foto}')`;
    bannerDiv.style.backgroundSize = 'cover';
    bannerDiv.style.backgroundPosition = 'center';

    bannerDiv.onclick = function(){ 
        addBannerCarrinho(combo)
        mostrarToast(`✅ ${combo.nome} adicionado! Clique aqui para revisar no carrinho.`, scrollCarrinho)
    }

    bannerIndex = (bannerIndex + 1) % banners.length
}
setInterval(mostrarBanner,8000)
mostrarBanner()

</script>

</body>
</html>
