// 🛒 CARRINHO 
let carrinho = []

const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// =========================
// 🎨 UI HELPERS (NOVO)
// =========================

function btnPlusMinus(html){
    return `<button class="btn-qty">${html}</button>`
}

function btnAdd(){
    return `<button class="btn-add">➕ Adicionar</button>`
}

// =========================
// 🍕 PIZZAS
// =========================

function abrirPizzas(){

    limparProdutos()
    esconderCombos()

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

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">
            <img src="${p.img}" onerror="this.src='imagens/pizza-padrao.png'">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p>${p.desc}</p>
                <button onclick="abrirMontagemPizza('${p.nome}')" class="btn-add">
                    🍕 Montar Pizza
                </button>
            </div>
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
}

// =========================
// 🍕 MONTAGEM
// =========================

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

    document.getElementById("produtos").innerHTML = `
    <div class="montagem-box">

        <h2>🍕 ${nome}</h2>

        <img src="${imagens[nome]}" class="pizza-preview">

        <label>Tamanho</label>
        <select id="tamanho">
            <option value="25">25cm</option>
            <option value="30">30cm</option>
            <option value="35">35cm</option>
        </select>

        <label>Borda</label>
        <select id="borda">
            <option value="0">Normal</option>
            <option value="10">Catupiry</option>
        </select>

        <label>Meio</label>
        <select id="meio">
            <option value="">Não</option>
            <option value="Calabresa">Calabresa</option>
        </select>

        <button class="btn-add" onclick="adicionarPizza('${nome}')">
            🛒 Adicionar
        </button>

        <span onclick="abrirPizzas()">⬅ Voltar</span>

    </div>`
}

// =========================
// 🍕 ADICIONAR
// =========================

function adicionarPizza(nome){

    let tamanho = document.getElementById("tamanho").value
    let borda = Number(document.getElementById("borda").value)
    let meio = document.getElementById("meio").value

    let preco = tamanho == 25 ? 30 : tamanho == 30 ? 40 : 50
    preco += borda

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / " + meio

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// =========================
// 🔥 FILTRO
// =========================

function filtrar(tipo){

    limparProdutos()

    if(tipo === "combo"){
        mostrarCombos()
        return
    }

    esconderCombos()

    fetch("produtos.json")
    .then(r=>r.json())
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
                    <p><b>R$ ${p.preco.toFixed(2)}</b></p>

                    <button class="btn-add" onclick="addCarrinho('${p.nome}', ${p.preco})">
                        ➕ Adicionar
                    </button>

                </div>
            </div>
            `
        })

        document.getElementById("produtos").innerHTML = html
    })
}

// =========================
// 🛒 CARRINHO MELHORADO UI
// =========================

function addCarrinho(nome, preco){

    let item = carrinho.find(i=>i.nome===nome)

    item ? item.qtd++ : carrinho.push({nome,preco,qtd:1})

    atualizarCarrinho()
}

function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item,i)=>{

        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div class="cart-item">

            <div class="cart-info">
                <b>${item.nome}</b>
                <span>R$ ${subtotal.toFixed(2)}</span>
            </div>

            <div class="cart-actions">

                <button class="btn-qty" onclick="diminuir(${i})">➖</button>

                <span>${item.qtd}</span>

                <button class="btn-qty" onclick="aumentar(${i})">➕</button>

                <button class="btn-remove" onclick="remover(${i})">
                    ❌ Remover
                </button>

            </div>

        </div>
        `

        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

// =========================
// CONTROLES
// =========================

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }

function diminuir(i){
    carrinho[i].qtd--
    if(carrinho[i].qtd<=0) carrinho.splice(i,1)
    atualizarCarrinho()
}

function remover(i){ carrinho.splice(i,1); atualizarCarrinho() }

// =========================
// FIX LIMPAR
// =========================

function limparProdutos(){
    document.getElementById("produtos").innerHTML = ""
}
