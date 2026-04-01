// 🛒 CARRINHO
let carrinho = []

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    trocarBanner()
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
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão"},
        {nome:"Atum",desc:"Atum, cebola, mussarela"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card" onclick="abrirMontagemPizza('${p.nome}')">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p>${p.desc}</p>
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
        <option value="Atum">Atum</option>
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
    if(tamanho == 25) preco = 30
    if(tamanho == 30) preco = 40
    if(tamanho == 35) preco = 50
    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda == 10) nomeFinal += " / Borda recheada"

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// 🔥 FILTRO (ESSA É A PARTE QUE FALTAVA)
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

// 🔥 COMBOS CORRIGIDO
function carregarCombosSemana(){
    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let combos = produtos.filter(p => p.categoria === "combo")

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

// 🎬 BANNER
let banners = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    "https://images.unsplash.com/photo-1601924582975-7e9c7b4f9d19",
    "https://images.unsplash.com/photo-1548365328-9f547fb0953d"
]

let bannerIndex = 0
function trocarBanner(){
    let banner = document.getElementById("banner")
    banner.style.backgroundImage = `url(${banners[bannerIndex]})`
    bannerIndex++
    if(bannerIndex >= banners.length){
        bannerIndex = 0
    }
}
setInterval(trocarBanner, 3000)

// 🛒 CARRINHO
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){
        item.qtd++
    } else {
        carrinho.push({nome, preco, qtd:1})
    }
    atualizarCarrinho()
}

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

            <div>
                <button onclick="diminuir(${index})">➖</button>
                ${item.qtd}
                <button onclick="aumentar(${index})">➕</button>
                <button onclick="removerItem(${index})">❌</button>
            </div>
        </div>
        `

        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

function aumentar(i){
    carrinho[i].qtd++
    atualizarCarrinho()
}

function diminuir(i){
    carrinho[i].qtd--
    if(carrinho[i].qtd <= 0){
        carrinho.splice(i,1)
    }
    atualizarCarrinho()
}

function removerItem(i){
    carrinho.splice(i,1)
    atualizarCarrinho()
}
