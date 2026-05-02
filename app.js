// 🛒 CARRINHO 
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 📍 BASE DE ENTREGA
const baseEndereco = "Rua Maria de Lourdes da Cruz, 378 - Mantiqueira"

// 🧭 FRETE POR BAIRRO
const freteBairros = {
    // 🟢 0–3KM
    "mantiqueira": 7,
    "jardim europa": 7,
    "serra verde": 7,
    "minas caixa": 7,
    "ceu azul": 7,
    "rio branco": 7,
    "venda nova": 7,
    "parque sao pedro": 7,
    "lagoinha leblon": 7,
    "jardim dos comerciantes": 7,
    "santa branca": 7,

    // 🟡 3–6KM
    "justinopolis": 10,
    "sao benedito": 10,
    "floramar": 10,
    "heliopolis": 10,
    "planalto": 10,
    "itapoa": 10,
    "santa monica": 10,
    "copacabana": 10,
    "sao joao batista": 10,
    "sao bernardo": 10,
    "jardim atlantico": 10,
    "santa amelia": 10,

    // 🔴 6–10KM
    "centro": 20,
    "pampulha": 20,
    "castelo": 20,
    "ouro preto": 20,
    "caicara": 20,
    "padre eustaquio": 20,
    "dom bosco": 20,
    "alipio de melo": 20,
    "nova pampulha": 20,
    "vespasiano": 20,
    "contagem": 20
}

// 🚚 CALCULAR FRETE
function calcularFrete() {

    let bairro = (document.getElementById("bairro")?.value || "").toLowerCase().trim()

    if (!bairro) return 20

    return freteBairros[bairro] || 20
}

// 🍕 CONTAR ITENS FRETE GRÁTIS
function contarItensFreteGratis(){

    let total = 0

    carrinho.forEach(item=>{
        if(item.tipo === "pizza" || item.tipo === "combo"){
            total += item.qtd
        }
    })

    return total
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

        <img class="pizza-preview" src="${imagens[nome]}">

        <button onclick="adicionarPizza('${nome}')">
            🛒 Adicionar ao Carrinho
        </button>

        <span onclick="abrirPizzas()">⬅ Voltar</span>

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){
    addCarrinho(nome, 30, "pizza")
    abrirPizzas()
}

// 🛒 ADD CARRINHO
function addCarrinho(nome, preco, tipo = "outro"){

    let item = carrinho.find(i => i.nome === nome)

    if(item){
        item.qtd++
    } else {
        carrinho.push({nome, preco:Number(preco), qtd:1, tipo})
    }

    atualizarCarrinho()
}

// 🛒 ATUALIZAR CARRINHO (IFOOD STYLE)
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let total = 0

    if(!lista) return

    lista.innerHTML = ""

    let itensFrete = contarItensFreteGratis()
    let frete = calcularFrete()

    carrinho.forEach((item, index)=>{

        let subtotal = item.preco * item.qtd
        total += subtotal

        lista.innerHTML += `
        <div>
            <b>${item.nome}</b> x${item.qtd}
            <br>R$ ${subtotal.toFixed(2)}
        </div>
        `
    })

    // 🎯 FRETE GRÁTIS LÓGICA
    let freteMsg = ""
    if(itensFrete >= 5){
        frete = 0
        freteMsg = "🎉 FRETE GRÁTIS ATIVADO"
    } else {
        freteMsg = `🚚 Faltam ${5 - itensFrete} pizza/combos para FRETE GRÁTIS`
    }

    total += frete

    document.getElementById("total").innerText = total.toFixed(2)

    // 📦 INFO FRETE NO CARRINHO
    let info = document.getElementById("infoFrete")
    if(!info){
        let div = document.createElement("div")
        div.id = "infoFrete"
        document.getElementById("carrinho").prepend(div)
        info = div
    }

    info.innerHTML = `
        <b>Frete:</b> R$ ${frete} <br>
        ${freteMsg}
    `
}
