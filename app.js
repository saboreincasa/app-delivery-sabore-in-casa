let carrinho = []
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 📦 TAXA INTELIGENTE
function calcularTaxa(endereco){
    endereco = endereco.toLowerCase()

    if(endereco.includes("mantiqueira")) return 7
    if(endereco.includes("centro")) return 20

    return 10
}

// 🍕 PIZZAS
function abrirPizzas(){
    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        {nome:"Calabresa", img:"imagens/pizzas/calabresa.png"},
        {nome:"Frango com Catupiry", img:"imagens/pizzas/franco_com_catupiry.png"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">
            <img src="${p.img}">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <button onclick="addCarrinho('${p.nome}',40)">Adicionar</button>
            </div>
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
}

// 🔥 FILTRO
function filtrar(tipo){

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let filtrados = produtos.filter(p => p.categoria === tipo || (tipo==="combo" && p.categoria==="combos"))

        let html = ""

        filtrados.forEach(p=>{
            html += `
            <div class="card">
                <img src="${p.foto}">
                <div class="card-content">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    ${p.tag ? `<span>${p.tag}</span>` : ""}
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
    filtrar("combo")
}

// 🎬 BANNER
let banners = [
    {nome:"Combo Família", preco:109.90, foto:"imagens/banners/combo-familia.png"}
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
        addCarrinho(combo.nome, combo.preco)
    }
}

// 🛒 CARRINHO
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)

    if(item){ item.qtd++ }
    else { carrinho.push({nome, preco, qtd:1}) }

    atualizarCarrinho()
}

function atualizarCarrinho(){
    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div>
            ${item.qtd}x ${item.nome} - R$ ${subtotal.toFixed(2)}
        </div>
        `

        total += subtotal
    })

    document.getElementById("total").innerText = total.toFixed(2)
}

// 📲 ENVIAR PEDIDO
function enviarPedido(){

    let endereco = document.getElementById("enderecoCliente").value
    let taxa = calcularTaxa(endereco)

    let total = 0
    let msg = "Pedido:\n"

    carrinho.forEach(item=>{
        total += item.preco * item.qtd
        msg += `${item.qtd}x ${item.nome}\n`
    })

    total += taxa

    msg += `\nEntrega: R$${taxa}`
    msg += `\nTotal: R$${total}`

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}

// 📍 MAPA
function abrirMapa(){
    window.open("https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378")
}
