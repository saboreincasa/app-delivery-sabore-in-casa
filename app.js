// 🛒 CARRINHO 
let carrinho = []

const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🍕 PREÇOS ATUALIZADOS
const precosPizza = {
    25: 39.90,
    30: 54.90,
    35: 69.90
}

// 🔥 UPSSELL AUTOMÁTICO
function sugerirUpsell(){
    setTimeout(()=>{
        let escolha = confirm("🔥 Quer adicionar uma bebida gelada ou batata por um preço especial?")
        if(escolha){
            filtrar('bebidas')
        }
    },1000)
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = document.getElementById("borda").value

    let preco = precosPizza[tamanho] + Number(borda)

    addCarrinho(`${nome} ${tamanho}cm`, preco)

    sugerirUpsell()
    abrirPizzas()
}

// 🚚 FRETE INTELIGENTE
function calcularFrete(){
    let quantidade = carrinho.reduce((total, item)=> total + item.qtd,0)

    if(quantidade >= 5){
        return 0
    }

    return 6 // média BH
}

// 🛒 ATUALIZAR CARRINHO
function atualizarCarrinho(){
    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div>
            <b>${item.nome}</b> - R$ ${subtotal.toFixed(2)}
            <button onclick="removerItem(${index})">❌</button>
        </div>
        `

        total += subtotal
    })

    let frete = calcularFrete()

    document.getElementById("total").innerText = (total + frete).toFixed(2)
}

// 🛒 RESTO IGUAL
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){ item.qtd++ } 
    else { carrinho.push({nome, preco, qtd:1}) }
    atualizarCarrinho()
}

function removerItem(i){
    carrinho.splice(i,1)
    atualizarCarrinho()
}

// 📲 ENVIAR PEDIDO
function enviarPedido(){

    let frete = calcularFrete()

    let msg = "Pedido:\n\n"

    carrinho.forEach(item=>{
        msg += `${item.qtd}x ${item.nome}\n`
    })

    msg += `\nFrete: R$${frete}`
    msg += `\nTotal: R$${document.getElementById("total").innerText}`

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`)
}
