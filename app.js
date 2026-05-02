// 🛒 CARRINHO 
let carrinho = []

// 📦 CONTROLE DE PEDIDOS (FIDELIDADE)
let pedidosCliente = 0

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
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

    let html = "<h2>🍕 Pizzas (Massa Integral Artesanal)</h2>"

    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry"},
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">
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
    <div class="montagem-box">

        <h2>🍕 ${nome} (Massa Integral)</h2>

        <div class="opcoes-pizza">

            <div class="campo">
                <label>Tamanho:</label>
                <select id="tamanho">
                    <option value="25">25cm - R$39.90</option>
                    <option value="30">30cm - R$49.90</option>
                    <option value="35">35cm - R$59.90</option>
                </select>
            </div>

        </div>

        <button onclick="adicionarPizza('${nome}')">
            🛒 Adicionar
        </button>

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR
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

// 🔁 CROSS SELL + UPSELL
function mostrarSugestoes(){

    let div = document.getElementById("sugestoes")
    if(!div) return

    div.innerHTML = `
    <h3>🔥 Quer turbinar seu pedido?</h3>

    <button onclick="addCarrinho('Coca-Cola 2L',14.90)">🥤 Coca 2L R$14,90</button>
    <button onclick="addCarrinho('Batata Crocante',33.90)">🍟 Batata R$33,90</button>
    <button onclick="addCarrinho('Nuggets',35.90)">🍗 Nuggets R$35,90</button>
    <button onclick="addCarrinho('Halls',5.90)">🍬 Halls R$5,90</button>
    `
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

// 📲 ENVIO
function enviarPedido(){

    let bairro = document.getElementById("bairro").value || ""
    let frete = calcularFrete(bairro)

    // 🎁 fidelidade
    let pedidosValidos = carrinho.filter(i => i.nome.includes("Pizza") || i.nome.includes("Combo")).length

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
        msg += `\n🎁 Frete GRÁTIS desbloqueado!`
    } else {
        msg += `\n📦 Faltam ${5 - pedidosCliente} pedidos para frete grátis`
    }

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`)
}
