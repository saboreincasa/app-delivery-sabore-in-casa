// 🛒 CARRINHO 
let carrinho = []

// 🎁 FIDELIDADE
let pedidosValidos = Number(localStorage.getItem("pedidosValidos") || 0)
let freteGratis = false

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔥 FRETE INTELIGENTE
function calcularFrete(endereco){
    if(!endereco) return 20

    endereco = endereco.toLowerCase()

    const proximo = ["mantiqueira","jardim europa","serra verde","minas caixa","céu azul","rio branco","venda nova","parque são pedro","santa branca"]
    const medio = ["justinópolis","são benedito","floramar","planalto","itapoã","copacabana","santa mônica"]

    if(proximo.some(b => endereco.includes(b))) return 7
    if(medio.some(b => endereco.includes(b))) return 10

    return 20
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

// 🍕 PIZZAS (NÃO ALTERADO)
function abrirPizzas(){
    esconderCombos()

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

   const pizzas = [
    {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola", img:"imagens/pizzas/calabresa.png"},
    {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/franco_com_catupiry.png"},
    {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/pizzas/quatro_queios.png"},
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

// 🍕 MONTAGEM (PREÇO ATUALIZADO + NOME PREMIUM)
function abrirMontagemPizza(nome){

    let imagens = {
        "Calabresa":"imagens/pizzas/calabresa.png",
        "Frango com Catupiry":"imagens/pizzas/franco_com_catupiry.png",
        "4 Queijos":"imagens/pizzas/quatro_queios.png",
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
                    <option value="25">25cm - R$39,90</option>
                    <option value="30">30cm - R$49,90</option>
                    <option value="35">35cm - R$59,90</option>
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

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = Number(document.getElementById("borda").value)

    let preco = 0
    if(tamanho == 25) preco = 39.90
    if(tamanho == 30) preco = 49.90
    if(tamanho == 35) preco = 59.90

    preco += borda

    let nomeFinal = `Pizza ${nome} ${tamanho}cm (Massa Integral Artesanal)`

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// 🔥 FILTRO (INALTERADO)
function filtrar(tipo){
    if(tipo === "combo"){
        mostrarCombos()
        return
    } else {
        esconderCombos()
    }

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let filtrados = produtos.filter(p => p.categoria === tipo)

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
            </div>
            `
        })

        document.getElementById("produtos").innerHTML = html
    })
}

// 🔥 COMBOS (INALTERADO)
function carregarCombosSemana(){
    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let combos = produtos.filter(p => p.categoria === "combos")

        let html = ""

        combos.forEach(c=>{
            html += `
            <div class="card destaque">
                <img src="${c.foto}">
                <div class="card-content">
                    <h3>${c.nome}</h3>
                    <p>${c.descricao}</p>
                    <p class="preco">R$ ${c.preco.toFixed(2)}</p>
                    <button onclick="addCarrinho('${c.nome} - ${c.descricao}', ${c.preco})">
                        Adicionar
                    </button>
                </div>
            </div>
            `
        })

        document.getElementById("combosSemana").innerHTML = html
    })
}

// 🎬 BANNER (INALTERADO)
let banners = [
    {nome:"Combo Família", descricao:"2 pizzas grandes + refrigerantes", preco:99.90, foto:"imagens/banners/combo-familia.png"},
    {nome:"Combo Amigos", descricao:"Cerveja + carvão", preco:89.90, foto:"imagens/banners/combo-amigos.png"},
    {nome:"Combo Casal", descricao:"2 pizzas grandes + refrigerante", preco:79.90, foto:"imagens/banners/combo-casal.png"}
]

let bannerIndex = 0
let bannerDiv

function iniciarBanner(){
    bannerDiv = document.getElementById("banner")
    mostrarBanner()
    setInterval(mostrarBanner, 5000)
}

function mostrarBanner(){
    let combo = banners[bannerIndex]

    bannerDiv.style.backgroundImage = `url('${combo.foto}')`

    bannerDiv.onclick = function(){
        addCarrinho(combo.nome + " - " + combo.descricao, combo.preco)
        mostrarToast(combo)
    }

    bannerIndex++
    if(bannerIndex >= banners.length){
        bannerIndex = 0
    }
}

// 🛒 ADD (INALTERADO + gatilho)
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){ item.qtd++ } 
    else { carrinho.push({nome, preco, qtd:1}) }
    atualizarCarrinho()
}

// 🛒 ATUALIZAR (COM FRETE + SUGESTÕES)
function atualizarCarrinho(){
    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div style="display:flex; justify-content:space-between;">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>

            <div style="display:flex; align-items:center; gap:5px;">
                <button onclick="diminuir(${index})">➖</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">➕</button>
                <span style="color:red; cursor:pointer;" onclick="removerItem(${index})">remover</span>
            </div>
        </div>
        `

        total += subtotal
    })

    let endereco = document.getElementById("enderecoCliente").value
    let frete = freteGratis ? 0 : calcularFrete(endereco)

    total += frete

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)

    mostrarSugestoes()
}

// 🔁 CONTROLES
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

// 🔥 UPSELL / CROSS SELL
function mostrarSugestoes(){
    let lista = document.getElementById("lista")

    lista.innerHTML += `
    <div style="margin-top:10px; background:#fff3e0; padding:10px; border-radius:8px;">
        🔥 Adicione um refrigerante por apenas R$14,90
        <button onclick="addCarrinho('Coca-Cola 2L',14.90)">Adicionar</button>
    </div>
    `
}

// 📲 WHATSAPP PROFISSIONAL
function enviarPedido(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let endereco = document.getElementById("enderecoCliente").value || "Endereço não informado"
    let pagamento = document.getElementById("pagamento").value
    let troco = document.getElementById("troco").value || "-"

    let frete = freteGratis ? 0 : calcularFrete(endereco)

    let msg = "🧾 *PEDIDO SABORE IN CASA*\n\n"

    carrinho.forEach(item=>{
        msg += `• ${item.qtd}x ${item.nome}\n`
    })

    msg += `\n💰 Total: R$${document.getElementById("total").innerText}`
    msg += `\n🚚 Frete: R$${frete}`
    msg += `\n📍 Endereço: ${endereco}`
    msg += `\n💳 Pagamento: ${pagamento}`
    msg += `\n💵 Troco: ${troco}`

    pedidosValidos++
    localStorage.setItem("pedidosValidos", pedidosValidos)

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}

// 🔔 TOAST (INALTERADO)
function mostrarToast(combo){
    let toast = document.getElementById("toast")
    toast.innerText = `✅ ${combo.nome} adicionado! Clique para ver o carrinho`
    toast.className = "show"

    toast.onclick = function(){
        scrollCarrinho()
    }

    setTimeout(()=>{
        toast.className = toast.className.replace("show","")
    },4000)
}

// 📍 MAPA (INALTERADO)
function abrirMapa(){
    window.open(
        "https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378+Mantiqueira+Belo+Horizonte",
        "_blank"
    )
}
