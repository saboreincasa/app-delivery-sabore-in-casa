let carrinho = []
const whatsappNumero = "5531983391576"

window.onload = function(){
    carregarCombosSemana()
    mostrarBanner()
}

// 🔥 PIZZAS COM IMAGEM
function abrirPizzas(){
    esconderCombos()

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        {nome:"Calabresa", img:"imagens/calabresa.jpg"},
        {nome:"Frango com Catupiry", img:"imagens/frango.jpg"},
        {nome:"4 Queijos", img:"imagens/4queijos.jpg"},
        {nome:"Portuguesa", img:"imagens/portuguesa.jpg"},
        {nome:"Marguerita", img:"imagens/marguerita.jpg"},
        {nome:"Baiana", img:"imagens/baiana.jpg"},
        {nome:"Napolitana", img:"imagens/napolitana.jpg"},
        {nome:"Milho com Bacon", img:"imagens/milho.jpg"},
        {nome:"Moda da Casa", img:"imagens/moda.jpg"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">
            <div class="img-wrapper">
                <img src="${p.img}">
                <div class="overlay-card">
                    <button onclick="abrirMontagemPizza('${p.nome}')">
                        🍕 Montar
                    </button>
                </div>
            </div>
            <div class="card-content">
                <h3>${p.nome}</h3>
            </div>
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
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

// 🔥 ESCONDER/MOSTRAR
function esconderCombos(){
    document.getElementById("combosSemana").innerHTML = ""
    document.getElementById("tituloCombos").style.display = "none"
}

function mostrarCombos(){
    document.getElementById("tituloCombos").style.display = "block"
    carregarCombosSemana()
    document.getElementById("produtos").innerHTML = ""
}

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
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div class="item-carrinho">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>
            <div class="controle">
                <button onclick="diminuir(${index})">-</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">+</button>
            </div>
        </div>
        `

        total += subtotal
    })

    document.getElementById("total").innerText = total.toFixed(2)
}

// CONTROLE
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){
    carrinho[i].qtd--
    if(carrinho[i].qtd <= 0) carrinho.splice(i,1)
    atualizarCarrinho()
}

// WHATSAPP
function enviarPedido(){
    let msg = "Pedido:\n\n"

    carrinho.forEach(item=>{
        msg += `${item.qtd}x ${item.nome}\n`
    })

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}
