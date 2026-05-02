// 🛒 CARRINHO 
let carrinho = []
let produtosDB = []

// 📦 FIDELIDADE
let pedidosCliente = 0

// 📲 WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarProdutos()
    iniciarBanner()
}

// 🔥 CARREGAR JSON GLOBAL
function carregarProdutos(){
    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {
        produtosDB = produtos
        carregarCombosSemana()
    })
}

// 🚚 FRETE INTELIGENTE
function calcularFrete(bairro){

    bairro = bairro.toLowerCase()

    const perto = ["mantiqueira","jardim europa","serra verde","minas caixa","céu azul","rio branco","venda nova"]
    const medio = ["justinopolis","planalto","itapoa","santa monica","copacabana"]

    if(perto.includes(bairro)) return 7
    if(medio.includes(bairro)) return 10

    return 20
}

// 🔥 COMBOS (JSON)
function carregarCombosSemana(){

    let combos = produtosDB.filter(p => p.categoria === "combos")

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
}

// 🍕 PIZZAS
function abrirPizzas(){

    let html = "<h2>🍕 Pizzas (Massa Integral Artesanal)</h2>"

    const pizzas = [
        "Calabresa",
        "Frango com Catupiry"
    ]

    pizzas.forEach(nome=>{
        html += `
        <div class="card">
            <h3>${nome}</h3>
            <button onclick="abrirMontagemPizza('${nome}')">
                Montar Pizza
            </button>
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
}

// 🍕 MONTAGEM
function abrirMontagemPizza(nome){

    let html = `
    <div>
        <h2>${nome} (Massa Integral)</h2>

        <select id="tamanho">
            <option value="25">25cm - R$39.90</option>
            <option value="30">30cm - R$49.90</option>
            <option value="35">35cm - R$59.90</option>
        </select>

        <button onclick="adicionarPizza('${nome}')">Adicionar</button>
    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADD PIZZA
function adicionarPizza(nome){

    let tamanho = document.getElementById("tamanho").value

    let preco = 0
    if(tamanho == 25) preco = 39.90
    if(tamanho == 30) preco = 49.90
    if(tamanho == 35) preco = 59.90

    let nomeFinal = `${nome} ${tamanho}cm (Massa Integral)`

    addCarrinho(nomeFinal, preco)
}

// 🛒 ADD
function addCarrinho(nome, preco){

    let item = carrinho.find(i => i.nome === nome)

    if(item){
        item.qtd++
    } else {
        carrinho.push({nome, preco: Number(preco), qtd:1})
    }

    atualizarCarrinho()
}

// 🔥 UPSELL + CROSS SELL (USANDO JSON)
function mostrarSugestoes(){

    let div = document.getElementById("sugestoes")
    if(!div) return

    let bebidas = produtosDB.filter(p => p.categoria === "bebidas").slice(0,2)
    let snaks = produtosDB.filter(p => p.categoria === "snaks").slice(0,2)

    let html = "<h3>🔥 Quer turbinar seu pedido?</h3>"

    bebidas.forEach(b=>{
        html += `<button onclick="addCarrinho('${b.nome}', ${b.preco})">🥤 ${b.nome} R$${b.preco}</button>`
    })

    snaks.forEach(s=>{
        html += `<button onclick="addCarrinho('${s.nome}', ${s.preco})">🍟 ${s.nome} R$${s.preco}</button>`
    })

    div.innerHTML = html
}

// 🛒 ATUALIZAR
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{

        let subtotal = item.preco * item.qtd
        total += subtotal

        lista.innerHTML += `
        <div>
            <b>${item.nome}</b><br>
            R$ ${subtotal.toFixed(2)}

            <div>
                <button onclick="diminuir(${index})">-</button>
                ${item.qtd}
                <button onclick="aumentar(${index})">+</button>
                <span style="color:red;cursor:pointer" onclick="removerItem(${index})">remover</span>
            </div>
        </div>
        `
    })

    document.getElementById("total").innerText = total.toFixed(2)

    mostrarSugestoes()
}

// 🔧 CONTROLES
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

// 📲 WHATSAPP PROFISSIONAL
function enviarPedido(){

    let bairro = document.getElementById("bairro").value || ""
    let frete = calcularFrete(bairro)

    let pedidosValidos = carrinho.filter(i => 
        i.nome.includes("Pizza") || i.nome.includes("Combo")
    ).length

    if(pedidosValidos > 0){
        pedidosCliente++
    }

    if(pedidosCliente >= 5){
        frete = 0
    }

    let total = Number(document.getElementById("total").innerText)
    let totalFinal = total + frete

    let msg = "🍕 *PEDIDO SABORE IN CASA*\n\n"

    carrinho.forEach(item=>{
        msg += `${item.qtd}x ${item.nome} - R$${item.preco}\n`
    })

    msg += `\n💰 Total: R$${total.toFixed(2)}`
    msg += `\n🚚 Frete: R$${frete}`
    msg += `\n💵 Total Final: R$${totalFinal.toFixed(2)}`

    if(frete === 0){
        msg += `\n🎁 Frete GRÁTIS desbloqueado`
    } else {
        msg += `\n📦 Faltam ${5 - pedidosCliente} pedidos para frete grátis`
    }

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`)
}
