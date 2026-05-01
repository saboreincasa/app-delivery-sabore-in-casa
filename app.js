let carrinho = []
const whatsappNumero = "5531983391576"

// 🚚 TAXA POR BAIRRO (INTELIGENTE)
function calcularEntrega(bairro){
    bairro = bairro.toLowerCase()

    if(bairro.includes("mantiqueira")) return 7
    if(bairro.includes("centro")) return 20
    if(bairro.includes("venda nova")) return 10

    return 12 // padrão
}

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
}

// 🔎 BUSCA
function buscarProduto(){
    let termo = document.getElementById("busca").value.toLowerCase()

    fetch("produtos.json")
    .then(res=>res.json())
    .then(produtos=>{
        let filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo))

        let html = ""
        filtrados.forEach(p=>{
            html += `
            <div class="card">
                <img src="${p.foto}">
                <div class="card-content">
                    <h3>${p.nome} <small>${p.tag || ""}</small></h3>
                    <p>${p.descricao}</p>
                    <p class="preco">R$ ${p.preco.toFixed(2)}</p>
                    <button onclick="addCarrinho('${p.nome}', ${p.preco})">Adicionar</button>
                </div>
            </div>
            `
        })

        document.getElementById("produtos").innerHTML = html
    })
}

// 🛒 CARRINHO
function addCarrinho(nome, preco){
    let item = carrinho.find(i => i.nome === nome)
    if(item){ item.qtd++ }
    else { carrinho.push({nome, preco, qtd:1}) }

    atualizarCarrinho()
    mostrarUpsell(nome)
}

// 💰 FRETE + TOTAL
function atualizarCarrinho(){
    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item,index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div>
            ${item.qtd}x ${item.nome} - R$ ${subtotal.toFixed(2)}
        </div>
        `

        total += subtotal
    })

    let bairro = document.getElementById("enderecoCliente").value
    let entrega = calcularEntrega(bairro)

    // regra frete grátis
    let totalItens = carrinho.reduce((s,i)=>s+i.qtd,0)
    if(totalItens >= 5) entrega = 0

    total += entrega

    document.getElementById("total").innerText = total.toFixed(2)
}

// 🎯 UPSELL
function mostrarUpsell(nome){
    if(nome.toLowerCase().includes("pizza")){
        toast("🔥 Leve uma Coca-Cola por apenas R$14.90!")
    }
    if(nome.toLowerCase().includes("combo")){
        toast("⚡ Adicione batata frita e aumente seu pedido!")
    }
}

function toast(msg){
    let t = document.getElementById("toast")
    t.innerText = msg
    t.className = "show"

    setTimeout(()=> t.className = "", 3000)
}

// 📲 WHATSAPP
function enviarPedido(){
    if(carrinho.length === 0){
        alert("Carrinho vazio")
        return
    }

    let bairro = document.getElementById("enderecoCliente").value
    let entrega = calcularEntrega(bairro)

    let msg = "Pedido:\n\n"

    carrinho.forEach(i=>{
        msg += `${i.qtd}x ${i.nome}\n`
    })

    msg += `\nBairro: ${bairro}`
    msg += `\nEntrega: R$${entrega}`

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url)
}

// 🗺️ MAPA
function abrirMapa(){
    window.open("https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378+BH")
}
