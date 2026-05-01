let carrinho = []
const whatsappNumero = "5531983391576"

// 🚚 FRETE POR BAIRRO
const taxas = {
    mantiqueira:5,
    floramar:6,
    planalto:7,
    itapoa:7,
    centro:10
}

// 🎟 CUPONS
const cupons = {
    "PRIMEIRA10":0.10,
    "VIP15":0.15
}

// 🚀 INIT
window.onload = ()=>{
    carregarCombosSemana()
}

// 🧠 UPSSELL VISUAL
function mostrarUpsell(){
    let box = document.getElementById("upsellBox")

    box.innerHTML = `
    <b>🔥 Complete seu pedido</b>

    <div class="upsell-item">
        Coca-Cola 2L - R$14,90
        <button onclick="addCarrinho('Coca-Cola 2L',14.90)">Adicionar</button>
    </div>

    <div class="upsell-item">
        Batata Frita - R$22,90
        <button onclick="addCarrinho('Batata Frita',22.90)">Adicionar</button>
    </div>
    `

    box.style.display = "block"

    setTimeout(()=> box.style.display="none",5000)
}

// 🛒 ADD
function addCarrinho(nome,preco){

    let item = carrinho.find(i=>i.nome===nome)

    if(item) item.qtd++
    else carrinho.push({nome,preco,qtd:1})

    if(nome.toLowerCase().includes("pizza")){
        mostrarUpsell()
    }

    atualizarCarrinho()
}

// 🛒 ATUALIZAR
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let total = 0

    lista.innerHTML=""

    carrinho.forEach((item,i)=>{
        let sub = item.preco * item.qtd

        lista.innerHTML+=`
        <div>
        ${item.qtd}x ${item.nome} - R$${sub.toFixed(2)}
        </div>
        `

        total+=sub
    })

    // 🚚 FRETE
    let bairro = document.getElementById("enderecoCliente").value.toLowerCase()
    let frete = taxas[bairro] || 10

    let qtdPizza = carrinho.filter(i=>i.nome.includes("cm")).length
    let qtdCombo = carrinho.filter(i=>i.nome.includes("Combo")).length

    if(qtdPizza>=5 || qtdCombo>=5){
        frete = 0
    }

    document.getElementById("freteInfo").innerText = "Frete: R$"+frete

    total+=frete

    // 🎟 CUPOM
    let cupom = document.getElementById("cupom").value.toUpperCase()

    if(cupons[cupom]){
        total = total - (total * cupons[cupom])
    }

    document.getElementById("total").innerText = total.toFixed(2)

    // 📊 BARRA FRETE
    let meta = 100
    let porcentagem = (total/meta)*100
    if(porcentagem>100) porcentagem=100

    document.getElementById("barraFrete").style.width = porcentagem+"%"
}

// 📦 FILTRO
function filtrar(tipo){
    fetch("produtos.json")
    .then(r=>r.json())
    .then(produtos=>{
        let html=""

        produtos.filter(p=>p.categoria===tipo).forEach(p=>{
            html+=`
            <div>
            <b>${p.nome}</b><br>
            R$${p.preco}
            <button onclick="addCarrinho('${p.nome}',${p.preco})">+</button>
            </div>
            `
        })

        document.getElementById("produtos").innerHTML=html
    })
}

// 🍕 PIZZAS
function abrirPizzas(){
    document.getElementById("produtos").innerHTML=`
    <button onclick="addCarrinho('Pizza Calabresa 30cm',40)">Calabresa</button>
    <button onclick="addCarrinho('Pizza Frango 30cm',40)">Frango</button>
    `
}

// 🟢 WHATS
function enviarPedido(){

    let bairro = document.getElementById("enderecoCliente").value
    let total = document.getElementById("total").innerText
    let pagamento = document.getElementById("pagamento").value

    let msg="🛒 *PEDIDO*\n\n"

    carrinho.forEach(i=>{
        msg+=`${i.qtd}x ${i.nome}\n`
    })

    msg+=`\n💰 Total: R$${total}`
    msg+=`\n📍 Bairro: ${bairro}`
    msg+=`\n💳 Pagamento: ${pagamento}`

    window.open(`https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`)
}
