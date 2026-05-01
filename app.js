// 🛒 CARRINHO 
let carrinho = []

// 📦 CONTROLE DE FIDELIDADE
let pedidosValidos = Number(localStorage.getItem("pedidosValidos") || 0)
let freteGratis = false

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔥 FRETE INTELIGENTE
function calcularFrete(endereco){
    endereco = endereco.toLowerCase()

    const proximo = ["mantiqueira","jardim europa","serra verde","minas caixa","céu azul","rio branco","venda nova"]
    const medio = ["justinópolis","são benedito","floramar","planalto","itapoã","copacabana"]
    
    if(proximo.some(b => endereco.includes(b))) return 7
    if(medio.some(b => endereco.includes(b))) return 10
    return 20
}

// 🎁 FIDELIDADE
function atualizarFidelidade(){
    let faltam = 5 - pedidosValidos
    if(pedidosValidos >= 5){
        freteGratis = true
        return "🎉 Você ganhou frete grátis!"
    }
    return `🎯 Faltam ${faltam} pedidos para frete grátis`
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
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/franco_com_catupiry.png"}
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
        </div>`
    })

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA (PREÇO NOVO + NOME PREMIUM)
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = Number(document.getElementById("borda").value)

    let preco = 0
    if(tamanho == 25) preco = 39.90
    if(tamanho == 30) preco = 49.90
    if(tamanho == 35) preco = 59.90

    preco += borda

    let nomeFinal = `Pizza ${nome} ${tamanho}cm (Massa Integral Artesanal)`

    addCarrinho(nomeFinal, preco)
}

// 🛒 ADD
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){ item.qtd++ } 
    else { carrinho.push({nome, preco, qtd:1}) }

    atualizarCarrinho()
}

// 🛒 ATUALIZAR
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
                <button onclick="diminuir(${index})">−</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">+</button>
                <span class="remover" onclick="removerItem(${index})">remover</span>
            </div>
        </div>`

        total += subtotal
    })

    // FRETE
    let endereco = document.getElementById("enderecoCliente").value
    let frete = freteGratis ? 0 : calcularFrete(endereco)

    total += frete

    document.getElementById("total").innerText = total.toFixed(2)

    mostrarSugestoes()
}

// ➕➖
function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

// 🔥 UPSELL + CROSS SELL
function mostrarSugestoes(){
    let div = document.getElementById("lista")

    let sugestoes = `
    <div class="sugestoes">
        <p>🔥 Aproveite:</p>

        <div>
            Coca-Cola 2L por apenas R$14,90 
            <button onclick="addCarrinho('Coca-Cola 2L',14.90)">Adicionar</button>
        </div>

        <div>
            Batata Crocante 
            <button onclick="addCarrinho('Batata Frita Crocante',18.90)">Adicionar</button>
        </div>

        <div>
            Nuggets 
            <button onclick="addCarrinho('Nuggets de Frango',22.90)">Adicionar</button>
        </div>
    </div>`

    div.innerHTML += sugestoes
}

// 📲 WHATSAPP PROFISSIONAL
function enviarPedido(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let endereco = document.getElementById("enderecoCliente").value || "-"
    let pagamento = document.getElementById("pagamento").value
    let troco = document.getElementById("troco").value || "-"

    let frete = freteGratis ? 0 : calcularFrete(endereco)

    let msg = "🧾 *PEDIDO SABORE IN CASA*\n\n"

    carrinho.forEach(item=>{
        msg += `• ${item.qtd}x ${item.nome}\n`
    })

    msg += `\n💰 Total: R$${document.getElementById("total").innerText}`
    msg += `\n🚚 Frete: R$${frete}`
    msg += `\n📍 Endereço: ${endereco}`
    msg += `\n💳 Pagamento: ${pagamento}`
    msg += `\n💵 Troco: ${troco}`
    msg += `\n\n${atualizarFidelidade()}`

    // ATUALIZA FIDELIDADE
    pedidosValidos++
    localStorage.setItem("pedidosValidos", pedidosValidos)

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}
