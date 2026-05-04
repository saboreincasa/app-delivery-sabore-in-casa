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
                    <option value="25">Pequena 25cm - R$42.90</option>
                    <option value="30">Grande 30cm - R$54.90</option>
                    <option value="35">Gigante 35cm - R$69.90</option>
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

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){

    let tamanho = document.getElementById("tamanho").value
    let bordaSelect = document.getElementById("borda")
    let borda = Number(bordaSelect.value)
    let bordaTexto = bordaSelect.options[bordaSelect.selectedIndex].text
    let meio = document.getElementById("meio").value

    let preco = 0
    if(tamanho == 25) preco = 42.90
    if(tamanho == 30) preco = 54.90
    if(tamanho == 35) preco = 69.90

    preco += borda

    let nomeFinal = `${nome} ${tamanho}cm`

    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda != 0) nomeFinal += " / Borda " + bordaTexto

    addCarrinho(nomeFinal, preco, "pizza")
    abrirPizzas()
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
                <img src="${c.foto}" onerror="this.src='imagens/sem-imagem.png'">
                <div class="card-content">
                    <h3>${c.nome}</h3>

                    <p style="display:flex; flex-direction:column; gap:4px;">
                        ${c.descricao.split("+").map(i=>`<span>${i.trim()}</span>`).join("")}
                    </p>

                    <p class="preco">R$ ${Number(c.preco).toFixed(2)}</p>

                    <button onclick="abrirComboInteligente('${c.nome}', ${c.preco})">
                        🛒 Montar Combo
                    </button>

                </div>
            </div>
            `
        })

        document.getElementById("combosSemana").innerHTML = html
    })
}

// 🧠 COMBO INTELIGENTE (ATUALIZADO)
function abrirComboInteligente(nome, preco){

    let html = `
    <div class="montagem-box">

        <h2>🔥 ${nome}</h2>

        <h3>🍕 Escolha 2 sabores de pizza</h3>

        <select id="pizza1">
            <option>Calabresa</option>
            <option>Frango com Catupiry</option>
            <option>Portuguesa</option>
            <option>Marguerita</option>
            <option>Baiana</option>
            <option>Napolitana</option>
            <option>Milho com Bacon</option>
            <option>Moda da Casa</option>
        </select>

        <select id="pizza2">
            <option>Calabresa</option>
            <option>Frango com Catupiry</option>
            <option>Portuguesa</option>
            <option>Marguerita</option>
            <option>Baiana</option>
            <option>Napolitana</option>
            <option>Milho com Bacon</option>
            <option>Moda da Casa</option>
        </select>

        <h3>🥤 Refrigerante</h3>

        <select id="refri">
            <option>Coca-Cola 2L</option>
            <option>Guaraná 2L</option>
            <option>Pepsi 2L</option>
        </select>

        <h3>🧀 Borda da Pizza</h3>

        <select id="bordaCombo">
            <option value="0">Normal</option>
            <option value="10">Catupiry (+10)</option>
            <option value="10">Cheddar (+10)</option>
        </select>

        <button onclick="finalizarCombo('${nome}', ${preco})">
            🛒 Adicionar Combo
        </button>

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🛒 FINALIZAR COMBO
function finalizarCombo(nome, preco){

    let p1 = document.getElementById("pizza1").value
    let p2 = document.getElementById("pizza2").value
    let refri = document.getElementById("refri").value
    let borda = document.getElementById("bordaCombo").value

    let descricao = `${nome} | ${p1} + ${p2} | ${refri} | Borda ${borda}`

    addCarrinho(descricao, preco, "combo")
    mostrarCombos()
}

// 🛒 BASE
function addCarrinho(nome, preco, tipo){
    let item = carrinho.find(i=>i.nome===nome)

    if(item) item.qtd++
    else carrinho.push({nome, preco:Number(preco), qtd:1, tipo})

    atualizarCarrinho()
}
