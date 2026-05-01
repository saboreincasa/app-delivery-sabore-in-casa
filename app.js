// 🛒 CARRINHO
let carrinho = []

const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔥 UPSSELL (FORA DA PIZZA)
function mostrarUpsell(){
    let box = document.getElementById("upsellBox")

    box.style.display = "block"

    box.innerHTML = `
        <b>🔥 Complete seu pedido</b><br>

        🥤 Coca-Cola 2L<br>
        🍟 Batata Crocante<br>
        🍗 Nuggets<br>

        <button onclick="addCarrinho('Coca-Cola 2L', 12)">
            Adicionar
        </button>
    `
}

// 🔥 CROSS-SELL
function mostrarCrossSell(){
    let box = document.getElementById("crossSell")

    let temPizza = carrinho.find(i => i.nome.includes("cm"))
    let temBebida = carrinho.find(i => i.nome.includes("Coca") || i.nome.includes("Heineken"))

    let html = "<h4>🔥 Você também pode gostar</h4>"

    if(temPizza){
        html += `
        🥤 Bebidas recomendadas<br>
        🍟 Snacks<br>
        `
    }

    if(temBebida){
        html += `
        🍕 Pizza promocional<br>
        🎁 Combo especial<br>
        `
    }

    box.innerHTML = html
}

// 🍕 PIZZAS (SEM MEXER)
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

// 🍕 MONTAGEM (NÃO ALTERADO)
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

// 🍕 ADICIONAR (NÃO ALTERADO)
function adicionarPizza(nome){
    addCarrinho(nome, 40)

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
            ${item.nome} x${item.qtd} - R$${subtotal}
        </div>
        `

        total += subtotal
    })

    document.getElementById("total").innerText = total

    mostrarCrossSell()
}

// 🧠 OUTROS (SEM MEXER)
function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

function iniciarBanner(){}
function carregarCombosSemana(){}
function abrirMapa(){}
function filtrar(){}
function enviarPedido(){}
function mostrarToast(){}
