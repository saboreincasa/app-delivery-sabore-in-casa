// 🛒 CARRINHO  
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚚 TAXA POR BAIRRO (BH)
const taxas = {
    "mantiqueira": 5,
    "santa monica": 6,
    "planalto": 7,
    "venda nova": 4,
    "centro": 10
}

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔥 ESCONDER COMBOS
function esconderCombos(){
    document.getElementById("combosSemana").innerHTML = ""
    document.getElementById("tituloCombos").style.display = "none"
}

// 🔥 MOSTRAR COMBOS
function mostrarCombos(){
    document.getElementById("tituloCombos").style.display = "block"
    carregarCombosSemana()
    document.getElementById("produtos").innerHTML = ""
}

// 🍕 PIZZAS
function abrirPizzas(){
    esconderCombos()

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola", img:"imagens/pizzas/calabresa.png"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/franco_com_catupiry.png"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/pizzas/quatro_queijos.png"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha", img:"imagens/pizzas/portuguesa.png"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão", img:"imagens/pizzas/marguerita.png"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola", img:"imagens/pizzas/baiana.png"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão", img:"imagens/pizzas/napolitana.png"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela", img:"imagens/pizzas/milho_com_bacon.png"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry", img:"imagens/pizzas/moda_da_casa.png"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">
            <img src="${p.img}" onerror="this.src='imagens/pizza-padrao.png'">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p>${p.desc}</p>
                <button onclick="abrirMontagemPizza('${p.nome}')">
                    🍕 Montar Pizza
                </button>
            </div>
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
}

// 🍕 MONTAGEM
function abrirMontagemPizza(nome){

    let imagens = {
        "Calabresa":"imagens/pizzas/calabresa.png",
        "Frango com Catupiry":"imagens/pizzas/franco_com_catupiry.png",
        "4 Queijos":"imagens/pizzas/quatro_queijos.png",
        "Portuguesa":"imagens/pizzas/portuguesa.png",
        "Marguerita":"imagens/pizzas/marguerita.png",
        "Baiana":"imagens/pizzas/baiana.png",
        "Napolitana":"imagens/pizzas/napolitana.png",
        "Milho com Bacon":"imagens/pizzas/milho_com_bacon.png",
        "Moda da Casa":"imagens/pizzas/moda_da_casa.png"
    }

    let html = `
    <div class="montagem-box">
        <h2>🍕 ${nome}</h2>

        <img class="pizza-preview" src="${imagens[nome]}" onerror="this.src='imagens/pizza-padrao.png'">

        <div class="opcoes-pizza">

            <div class="campo">
                <label>Tamanho:</label>
                <select id="tamanho">
                    <option value="25">Pequena 25cm - R$30</option>
                    <option value="30">Grande 30cm - R$40</option>
                    <option value="35">Gigante 35cm - R$50</option>
                </select>
            </div>

            <div class="campo">
                <label>Borda:</label>
                <select id="borda">
                    <option value="0">Normal</option>
                    <option value="10">Catupiry (+10)</option>
                    <option value="10">Cheddar (+10)</option>
                </select>
            </div>

            <div class="campo">
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
            </div>

        </div>

        <button class="btn-montar" onclick="adicionarPizza('${nome}')">
            🛒 Adicionar ao Carrinho
        </button>

        <span class="voltar" onclick="abrirPizzas()">⬅ Voltar</span>
    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let bordaSelect = document.getElementById("borda")
    let borda = bordaSelect.value
    let bordaTexto = bordaSelect.options[bordaSelect.selectedIndex].text
    let meio = document.getElementById("meio").value

    let preco = tamanho == 25 ? 30 : tamanho == 30 ? 40 : 50
    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda != 0) nomeFinal += " / Borda " + bordaTexto

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// 🔥 UPSELL INTELIGENTE
function sugerirUpsell(){
    let temBebida = carrinho.some(i => i.nome.toLowerCase().includes("coca") || i.nome.toLowerCase().includes("cerveja"))
    let temDoce = carrinho.some(i => i.nome.toLowerCase().includes("halls"))

    let msg = []

    if(!temBebida) msg.push("🥤 Que tal uma bebida gelada?")
    if(!temDoce) msg.push("🍬 Adicionar um Halls?")

    if(msg.length > 0){
        alert("🔥 Sugestão:\n\n" + msg.join("\n"))
    }
}

// 🛒 ADD
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){ item.qtd++ } 
    else { carrinho.push({nome, preco, qtd:1}) }

    atualizarCarrinho()
    sugerirUpsell()
}

// 🛒 ATUALIZAR (PROFISSIONAL)
function atualizarCarrinho(){
    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div class="item-carrinho">
            <div class="info-item">
                <span class="nome-item">${item.nome}</span>
                <span class="preco-item">R$ ${subtotal.toFixed(2)}</span>
            </div>

            <div class="controle">
                <button onclick="diminuir(${index})">-</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">+</button>
            </div>
        </div>
        `

        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

// ➕➖
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }

// 📲 ENVIAR PEDIDO
function enviarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let endereco = document.getElementById("enderecoCliente").value || ""
    let pagamento = document.getElementById("pagamento").value
    let troco = document.getElementById("troco").value || "-"

    let taxaEntrega = 8
    let bairro = endereco.toLowerCase()

    for(let b in taxas){
        if(bairro.includes(b)){
            taxaEntrega = taxas[b]
        }
    }

    let total = parseFloat(document.getElementById("total").innerText)

    let msg = "🍕 *Pedido Sabore In Casa*\n\n"

    carrinho.forEach(item=>{
        msg += `${item.qtd}x ${item.nome} - R$${item.preco.toFixed(2)}\n`
    })

    msg += `\n💰 Total: R$${total.toFixed(2)}`
    msg += `\n🚚 Entrega: R$${taxaEntrega.toFixed(2)}`
    msg += `\n🧾 Total Final: R$${(total + taxaEntrega).toFixed(2)}`
    msg += `\n📍 Endereço: ${endereco}`
    msg += `\n💳 Pagamento: ${pagamento}`
    msg += `\n💵 Troco: ${troco}`

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}

// 🔔 TOAST
function mostrarToast(combo){
    let toast = document.getElementById("toast")
    toast.innerText = `✅ ${combo.nome} adicionado!`
    toast.className = "show"

    setTimeout(()=>{
        toast.className = toast.className.replace("show","")
    },3000)
}

// 📍 MAPA
function abrirMapa(){
    window.open("https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378+Mantiqueira+Belo+Horizonte")
}
