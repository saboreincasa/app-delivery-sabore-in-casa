// 🛒 CARRINHO
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

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
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/frango.png"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/pizzas/4queijos.png"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha", img:"imagens/pizzas/portuguesa.png"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão", img:"imagens/pizzas/marguerita.png"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola", img:"imagens/pizzas/baiana.png"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão", img:"imagens/pizzas/napolitana.png"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela", img:"imagens/pizzas/milho.png"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry", img:"imagens/pizzas/moda.png"}
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
        "Frango com Catupiry":"imagens/pizzas/frango.png",
        "4 Queijos":"imagens/pizzas/4queijos.png",
        "Portuguesa":"imagens/pizzas/portuguesa.png",
        "Marguerita":"imagens/pizzas/marguerita.png",
        "Baiana":"imagens/pizzas/baiana.png",
        "Napolitana":"imagens/pizzas/napolitana.png",
        "Milho com Bacon":"imagens/pizzas/milho.png",
        "Moda da Casa":"imagens/pizzas/moda.png"
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

// 🍕 ADICIONAR PIZZA (🔥 CORRIGIDO)
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let bordaSelect = document.getElementById("borda")
    let borda = bordaSelect.value
    let bordaTexto = bordaSelect.options[bordaSelect.selectedIndex].text
    let meio = document.getElementById("meio").value

    let preco = 0
    if(tamanho == 25) preco = 30
    if(tamanho == 30) preco = 40
    if(tamanho == 35) preco = 50

    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`

    if(meio) nomeFinal += " / Meio a Meio com " + meio

    // 🔥 AQUI A MELHORIA
    if(borda != 0){
        if(bordaTexto.includes("Catupiry")){
            nomeFinal += " / Borda Catupiry"
        } else if(bordaTexto.includes("Cheddar")){
            nomeFinal += " / Borda Cheddar"
        }
    }

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}
