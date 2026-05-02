// 🛒 CARRINHO 
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
    ativarAutoCompleteBairros() // 🔥 NOVO
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
                </select>
            </div>

            <div class="campo">
                <label>Meio a Meio:</label>
                <select id="meio">
                    <option value="">Não</option>
                    <option value="Calabresa">Calabresa</option>
                    <option value="Frango com Catupiry">Frango com Catupiry</option>
                </select>
            </div>

        </div>

        <button onclick="adicionarPizza('${nome}')">Adicionar</button>
    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){

    let tamanho = document.getElementById("tamanho").value
    let borda = Number(document.getElementById("borda").value)
    let meio = document.getElementById("meio").value

    let preco = tamanho == 25 ? 30 : tamanho == 30 ? 40 : 50
    preco += borda

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / " + meio

    addCarrinho(nomeFinal, preco, "pizza")
    abrirPizzas()
}

// 🔥 FILTRO (igual seu)
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
                    <p>R$ ${p.preco}</p>
                    <button onclick="addCarrinho('${p.nome}', ${p.preco}, '${tipo}')">
                        Adicionar
                    </button>
                </div>
            </div>
            `
        })

        document.getElementById("produtos").innerHTML = html
    })
}

// 🧠 FRETE INTELIGENTE COMPLETO
const freteBairros = {
    "mantiqueira": 7,
    "venda nova": 7,
    "serra verde": 7,
    "pampulha": 20,
    "centro": 20
}

function calcularFrete(){

    let bairro = (document.getElementById("bairro")?.value || "").toLowerCase().trim()

    if(!bairro) return 20

    return freteBairros[bairro] || 20
}

// 🛒 CARRINHO
function addCarrinho(nome, preco, tipo="outro"){

    let item = carrinho.find(i => i.nome === nome)

    if(item){
        item.qtd++
    } else {
        carrinho.push({nome, preco:Number(preco), qtd:1, tipo})
    }

    atualizarCarrinho()
}

// 🛒 ATUALIZAR
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach(item=>{
        let subtotal = item.preco * item.qtd
        total += subtotal

        lista.innerHTML += `
        <div>
            ${item.nome} - R$ ${subtotal}
        </div>
        `
    })

    let frete = calcularFrete()
    document.getElementById("total").innerText = (total + frete).toFixed(2)
}

// 🔥 AUTO COMPLETE BAIRROS (NOVO PROFISSIONAL)
function ativarAutoCompleteBairros(){

    const bairros = [
        "Mantiqueira","Venda Nova","Serra Verde","Minas Caixa","Pampulha",
        "Centro","Santa Branca","Floramar","Itapoã","Planalto"
    ]

    let input = document.getElementById("bairro")

    if(!input) return

    input.addEventListener("input", function(){
        let val = this.value.toLowerCase()

        let match = bairros.filter(b =>
            b.toLowerCase().startsWith(val)
        )

        console.log("Sugestões:", match) // futuro dropdown (se quiser upgrade)
    })
}
