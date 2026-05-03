// 🛒 CARRINHO
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// ===============================
// 🚀 INICIALIZAÇÃO BLINDADA
// ===============================
window.onload = function () {

    safeRun(() => carregarCombosSemana(), "combos")
    safeRun(() => iniciarBanner(), "banner")
}

// 🛡️ FUNÇÃO DE SEGURANÇA GLOBAL
function safeRun(fn, name = "função") {
    try {
        fn()
    } catch (e) {
        console.log("❌ Erro em:", name, e)
    }
}

// ===============================
// 🔥 COMBOS
// ===============================
function esconderCombos() {
    let el = document.getElementById("combosSemana")
    let title = document.getElementById("tituloCombos")

    if (el) el.innerHTML = ""
    if (title) title.style.display = "none"
}

function mostrarCombos() {
    let title = document.getElementById("tituloCombos")
    let produtos = document.getElementById("produtos")

    if (title) title.style.display = "block"
    if (produtos) produtos.innerHTML = ""

    carregarCombosSemana()
}

// ===============================
// 🍕 PIZZAS
// ===============================
function abrirPizzas() {

    esconderCombos()

    let produtos = document.getElementById("produtos")
    if (!produtos) return

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        { nome: "Calabresa", desc: "Molho, mussarela, calabresa, cebola", img: "imagens/pizzas/calabresa.png" },
        { nome: "Frango com Catupiry", desc: "Molho, frango desfiado, catupiry", img: "imagens/pizzas/franco_com_catupiry.png" },
        { nome: "4 Queijos", desc: "Mussarela, provolone, parmesão, catupiry", img: "imagens/pizzas/quatro_queijos.png" },
        { nome: "Portuguesa", desc: "Presunto, ovo, cebola, ervilha", img: "imagens/pizzas/portuguesa.png" },
        { nome: "Marguerita", desc: "Mussarela, tomate, manjericão", img: "imagens/pizzas/marguerita.png" },
        { nome: "Baiana", desc: "Calabresa, ovo, pimenta, cebola", img: "imagens/pizzas/baiana.png" },
        { nome: "Napolitana", desc: "Mussarela, tomate, parmesão", img: "imagens/pizzas/napolitana.png" },
        { nome: "Milho com Bacon", desc: "Milho, bacon, mussarela", img: "imagens/pizzas/milho_com_bacon.png" },
        { nome: "Moda da Casa", desc: "Frango, bacon, milho, catupiry", img: "imagens/pizzas/moda_da_casa.png" }
    ]

    pizzas.forEach(p => {
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

    produtos.innerHTML = html
}

// ===============================
// 🍕 MONTAGEM
// ===============================
function abrirMontagemPizza(nome) {

    let imagens = {
        "Calabresa": "imagens/pizzas/calabresa.png",
        "Frango com Catupiry": "imagens/pizzas/franco_com_catupiry.png",
        "4 Queijos": "imagens/pizzas/quatro_queijos.png",
        "Portuguesa": "imagens/pizzas/portuguesa.png",
        "Marguerita": "imagens/pizzas/marguerita.png",
        "Baiana": "imagens/pizzas/baiana.png",
        "Napolitana": "imagens/pizzas/napolitana.png",
        "Milho com Bacon": "imagens/pizzas/milho_com_bacon.png",
        "Moda da Casa": "imagens/pizzas/moda_da_casa.png"
    }

    let produtos = document.getElementById("produtos")
    if (!produtos) return

    produtos.innerHTML = `
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
}

// ===============================
// 🍕 ADICIONAR PIZZA
// ===============================
function adicionarPizza(nome) {

    let tamanho = document.getElementById("tamanho").value
    let bordaSelect = document.getElementById("borda")
    let borda = Number(bordaSelect.value)
    let bordaTexto = bordaSelect.options[bordaSelect.selectedIndex].text
    let meio = document.getElementById("meio").value

    let preco = 0
    if (tamanho == 25) preco = 42.90
    if (tamanho == 30) preco = 54.90
    if (tamanho == 35) preco = 69.90

    preco += borda

    let nomeFinal = `${nome} ${tamanho}cm`

    if (meio) nomeFinal += " / Meio a Meio com " + meio
    if (borda != 0) nomeFinal += " / Borda " + bordaTexto

    addCarrinho(nomeFinal, preco, "pizza")
    abrirPizzas()
}

// ===============================
// 🛒 CARRINHO
// ===============================
function addCarrinho(nome, preco, tipo = "outro") {

    let item = carrinho.find(i => i.nome === nome)

    if (item) {
        item.qtd++
    } else {
        carrinho.push({ nome, preco: Number(preco), qtd: 1, tipo })
    }

    atualizarCarrinho()
}

function atualizarCarrinho() {

    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let totalEl = document.getElementById("total")

    if (!lista || !totalEl) return

    let total = 0
    lista.innerHTML = ""

    carrinho.forEach((item, index) => {

        let subtotal = item.preco * item.qtd
        total += subtotal

        lista.innerHTML += `
        <div style="display:flex; justify-content:space-between;">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>

            <div style="display:flex; gap:5px;">
                <button onclick="diminuir(${index})">➖</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">➕</button>
                <span onclick="removerItem(${index})" style="color:red; cursor:pointer;">X</span>
            </div>
        </div>
        `
    })

    if (contador) contador.innerText = carrinho.length
    totalEl.innerText = total.toFixed(2)
}

function aumentar(i) { carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i) { carrinho[i].qtd--; if (carrinho[i].qtd <= 0) carrinho.splice(i, 1); atualizarCarrinho() }
function removerItem(i) { carrinho.splice(i, 1); atualizarCarrinho() }

// ===============================
// 📦 PEDIDO
// ===============================
function enviarPedido() {

    if (carrinho.length === 0) {
        alert("Carrinho vazio!")
        return
    }

    let msg = "🛒 NOVO PEDIDO\n\n"

    carrinho.forEach(i => {
        msg += `${i.qtd}x ${i.nome} - R$${i.preco.toFixed(2)}\n`
    })

    let total = document.getElementById("total").innerText

    msg += `\nTOTAL: R$${total}`

    window.location.href =
        `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`
}

// ===============================
// 🎬 BANNER (BLINDADO)
// ===============================
function iniciarBanner() {

    let bannerDiv = document.getElementById("banner")
    if (!bannerDiv) return

    let banners = [
        "imagens/banners/combo-familia.png",
        "imagens/banners/combo-amigos.png",
        "imagens/banners/combo-casal.png"
    ]

    let i = 0

    function loop() {
        if (!bannerDiv) return

        bannerDiv.style.backgroundImage = `url('${banners[i]}')`
        i++

        if (i >= banners.length) i = 0
    }

    loop()
    setInterval(loop, 5000)
}
