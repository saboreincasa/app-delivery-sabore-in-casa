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

// 🍕 PIZZAS (🔥 COM IMAGEM + BOTÃO MONTAR)
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

// 🍕 ADICIONAR PIZZA (🔥 CORRIGIDO AQUI)
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = document.getElementById("borda").value
    let meio = document.getElementById("meio").value

    let selectBorda = document.getElementById("borda")
    let nomeBorda = selectBorda.options[selectBorda.selectedIndex].text

    let preco = 0
    if(tamanho == 25) preco = 30
    if(tamanho == 30) preco = 40
    if(tamanho == 35) preco = 50
    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / Meio a Meio com " + meio

    if(borda != 0){
        nomeFinal += " / Borda " + nomeBorda
    }

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// 🔥 FILTRO
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

// 🔥 COMBOS
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
                    <button onclick="addCarrinho('${c.nome}', ${c.preco})">
                        Adicionar
                    </button>
                </div>
            </div>
            `
        })

        document.getElementById("combosSemana").innerHTML = html
    })
}

// 🎬 RESTANTE DO CÓDIGO IGUAL...
