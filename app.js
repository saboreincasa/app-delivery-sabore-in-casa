// 🛒 CARRINHO
let carrinho = []

const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔥 UPSSELL
function mostrarUpsell(){
    let box = document.getElementById("upsellBox")

    box.style.display = "block"

    box.innerHTML = `
        <b>🔥 Complete seu pedido</b><br><br>

        🥤 Coca-Cola 2L - R$12,00<br>
        🍟 Batata Crocante - R$18,90<br>
        🍗 Nuggets - R$22,90<br>

        <button onclick="addCarrinho('Coca-Cola 2L', 12)">
            Adicionar Coca
        </button>
    `
}

// 🔥 CROSS-SELL (CORRIGIDO)
function mostrarCrossSell(){

    let box = document.getElementById("crossSell")

    let temPizza = carrinho.some(i => i.nome.toLowerCase().includes("pizza"))
    let temBebida = carrinho.some(i => i.nome.toLowerCase().includes("coca") || i.nome.toLowerCase().includes("heineken"))

    let html = "<h4>🔥 Você também pode gostar</h4>"

    if(temPizza){
        html += `
        🥤 Adicione uma bebida<br>
        🍟 Adicione um snack<br>
        `
    }

    if(temBebida){
        html += `
        🍕 Aproveite uma pizza<br>
        🎁 Veja nossos combos<br>
        `
    }

    box.innerHTML = html
}

// 🍕 PIZZAS
function abrirPizzas(){

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola", img:"imagens/pizzas/calabresa.png"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/franco_com_catupiry.png"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card pizza-card">

            <img src="${p.img}">

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

// 🍕 MONTAGEM (INTACTO)
function abrirMontagemPizza(nome){

    let html = `
    <div class="montagem-box">

        <h2>🍕 ${nome}</h2>

        <button class="btn-montar" onclick="adicionarPizza('${nome}')">
            🛒 Adicionar ao Carrinho
        </button>

        <span onclick="abrirPizzas()">⬅ Voltar</span>

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR
function adicionarPizza(nome){
    addCarrinho(nome + " Pizza", 40)
    abrirPizzas()
    mostrarUpsell()
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

    carrinho.forEach((item)=>{

        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div>
            ${item.nome} x${item.qtd} - R$${subtotal.toFixed(2)}
        </div>
        `

        total += subtotal
    })

    document.getElementById("total").innerText = total.toFixed(2)

    mostrarCrossSell()
}

// 🔧 OUTROS
function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

function iniciarBanner(){}
function carregarCombosSemana(){}
function abrirMapa(){}
function filtrar(){}
function enviarPedido(){}
function mostrarToast(){}
