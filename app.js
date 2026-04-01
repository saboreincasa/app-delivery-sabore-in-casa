// 🛒 CARRINHO
let carrinho = []

// 🚀 INICIO CORRIGIDO
document.addEventListener("DOMContentLoaded", () => {
    carregarCombosSemana()
    trocarBanner()
})

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

// 🍕 FILTRO
function filtrar(tipo){
    if(tipo === "combos"){
        mostrarCombos()
        return
    } else {
        esconderCombos()
    }

    let html = ""

    if(tipo==="bebidas"){
        html += "<h2>🥤 Bebidas</h2>"
        const bebidas = [
            {nome:"Coca-Cola 2L",preco:12,foto:"imagens/bebidas/coca-cola-2l.png"},
            {nome:"Guaraná 2L",preco:10,foto:"imagens/bebidas/guarana-2l.png"},
            {nome:"Heineken Latão",preco:8,foto:"imagens/bebidas/heineken-latao.png"}
        ]

        bebidas.forEach(b=>{
            html += `
            <div class="card">
                <img src="${b.foto}" onerror="this.src='imagens/erro.png'">
                <div class="card-content">
                    <h3>${b.nome}</h3>
                    <p class="preco">R$ ${b.preco}</p>
                    <button onclick="addCarrinho('${b.nome}', ${b.preco})">Adicionar</button>
                </div>
            </div>
            `
        })
    }

    if(tipo==="snaks"){
        html += "<h2>🍟 Snaks</h2>"
        const snaks = [
            {nome:"Batata Frita",preco:15,foto:"imagens/snaks/batata-frita.png"},
            {nome:"Nuggets",preco:20,foto:"imagens/snaks/nuggets-frango.png"}
        ]

        snaks.forEach(s=>{
            html += `
            <div class="card">
                <img src="${s.foto}" onerror="this.src='imagens/erro.png'">
                <div class="card-content">
                    <h3>${s.nome}</h3>
                    <p class="preco">R$ ${s.preco}</p>
                    <button onclick="addCarrinho('${s.nome}', ${s.preco})">Adicionar</button>
                </div>
            </div>
            `
        })
    }

    document.getElementById("produtos").innerHTML = html
}

// 🎁 COMBOS
function getCombos(){
    return [
        {nome:"Combo Família",preco:99.90,img:"imagens/combos/combo-familia.png"},
        {nome:"Combo Casal",preco:79.90,img:"imagens/combos/combo-casal.png"},
        {nome:"Combo Amigos",preco:89.90,img:"imagens/combos/combo-amigos.png"},
        {nome:"Combo Solteiro",preco:39.90,img:"imagens/combos/combo-solteiro.png"}
    ]
}

// ⭐ HOME
function carregarCombosSemana(){
    let combos = getCombos()
    let html = ""

    combos.forEach(c=>{
        html += `
        <div class="card destaque">
            <img src="${c.img}" onerror="this.src='imagens/erro.png'">
            <div class="card-content">
                <h3>${c.nome}</h3>
                <p class="preco">R$ ${c.preco}</p>
                <button onclick="addCarrinho('${c.nome}', ${c.preco})">Adicionar</button>
            </div>
        </div>
        `
    })

    document.getElementById("combosSemana").innerHTML = html
}

// 🎬 BANNER CORRIGIDO
let banners = [
    "imagens/combos/combo-familia.png",
    "imagens/combos/combo-casal.png",
    "imagens/combos/combo-amigos.png",
    "imagens/combos/combo-solteiro.png"
]

let bannerIndex = 0

function trocarBanner(){
    let banner = document.getElementById("banner")
    banner.style.backgroundImage = `url('${banners[bannerIndex]}')`

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

    carrinho.forEach((item,index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div class="item-carrinho">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>

            <div class="controle">
                <button onclick="diminuir(${index})">➖</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">➕</button>
                <button class="btn-remover" onclick="removerItem(${index})">❌</button>
            </div>
        </div>
        `

        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){
    if(carrinho[i].qtd > 1){ carrinho[i].qtd-- }
    else{ carrinho.splice(i,1) }
    atualizarCarrinho()
}
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

// 📲 WHATSAPP
function enviarPedido(){
    const numero = "5531983391576"
    let texto = "Pedido:%0A"

    carrinho.forEach(i=>{
        texto += `${i.qtd}x ${i.nome} - R$ ${(i.preco*i.qtd).toFixed(2)}%0A`
    })

    window.open(`https://wa.me/${numero}?text=${texto}`)
}

// 📍 MAPA
function abrirMapa(){
    window.open("https://maps.google.com?q=Rua+Maria+de+Lourdes+da+Cruz+378")
}

// 🛒 SCROLL
function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}
