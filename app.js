// 🛒 CARRINHO 
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    carregarCombosSemana()
    iniciarBanner()
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
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/pizzas/franco_com_catupiry.png"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/pizzas/quatro_queijos.png"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha", img:"imagens/pizzas/portuguesa.png"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão", img:"imagens/pizzas/marguerita.png"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola", img:"imagens/pizzas/baiana.png"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão", img:"imagens/pizzas/napolitana.png"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela", img:"imagens/pizzas/milho_com_bacon.png"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry", img:"imagens/pizzas/moda_da_casa.png"}
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
        </div>
        `
    })

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA (mantido)
function adicionarPizza(nome){

    let tamanho = document.getElementById("tamanho").value
    let bordaSelect = document.getElementById("borda")
    let borda = Number(bordaSelect.value)
    let bordaTexto = bordaSelect.options[bordaSelect.selectedIndex].text
    let meio = document.getElementById("meio").value

    let preco = 0
    if(tamanho == 25) preco = 42.90
    if(tamanho == 30) preco = 54.90
    if(tamanho == 35) preco = 69.90

    preco += borda

    let nomeFinal = `${nome} ${tamanho}cm`

    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda != 0) nomeFinal += " / Borda " + bordaTexto

    addCarrinho(nomeFinal, preco, "pizza")
    abrirPizzas()
}

// 🛒 CARRINHO
function addCarrinho(nome, preco, tipo = "outro"){
    let item = carrinho.find(i => i.nome === nome)

    if(item){
        item.qtd++
    } else {
        carrinho.push({nome, preco: Number(preco), qtd:1, tipo})
    }

    atualizarCarrinho()
}

// 📊 FRETE GRÁTIS
function contarItensFreteGratis(){
    let total = 0
    carrinho.forEach(item=>{
        if(item.tipo === "pizza" || item.tipo === "combo"){
            total += item.qtd
        }
    })
    return total
}

// 🛒 ATUALIZAR
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd
        total += subtotal

        lista.innerHTML += `
        <div style="display:flex; justify-content:space-between;">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>
            <div>
                <button onclick="diminuir(${index})">➖</button>
                ${item.qtd}
                <button onclick="aumentar(${index})">➕</button>
                <span onclick="removerItem(${index})">❌</span>
            </div>
        </div>`
    })

    if(contador) contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

// 📦 ENVIAR PEDIDO (CORRIGIDO)
function enviarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let numeroPedido = Date.now().toString().slice(-6)

    let rua = document.getElementById("rua")?.value || ""
    let numero = document.getElementById("numero")?.value || ""
    let complemento = document.getElementById("complemento")?.value || ""
    let bairro = document.getElementById("bairroSelecionado")?.value || ""

    if(!rua || !numero || !bairro){
        alert("Preencha o endereço completo!")
        return
    }

    let endereco = `${rua}, Nº ${numero}`
    if(complemento) endereco += ` (${complemento})`
    endereco += ` - ${bairro}`

    let pagamento = document.getElementById("pagamento")?.value || "Não informado"
    let troco = document.getElementById("troco")?.value || "-"

    let frete = calcularFretePorBairro(bairro)

    let itens = contarItensFreteGratis()
    if(itens >= 5) frete = 0

    let total = Number(document.getElementById("total").innerText || 0)
    let totalFinal = total + frete

    let pedidosCliente = Number(localStorage.getItem("pedidosCliente") || 0)
    pedidosCliente++
    localStorage.setItem("pedidosCliente", pedidosCliente)

    let msg = `🛒 *NOVO PEDIDO #${numeroPedido}*\n\n`

    carrinho.forEach(item=>{
        msg += `🍕 ${item.qtd}x ${item.nome} - R$${item.preco.toFixed(2)}\n`
    })

    msg += `\n💰 Produtos: R$${total.toFixed(2)}`
    msg += `\n🚚 Frete: R$${frete.toFixed(2)}`
    msg += `\n💵 Total Final: R$${totalFinal.toFixed(2)}`

    msg += `\n\n📍 Endereço: ${endereco}`
    msg += `\n💳 Pagamento: ${pagamento}`
    msg += `\n💵 Troco: ${troco}`

    if(pagamento.toLowerCase().includes("pix")){
        msg += `\n📸 Envie o comprovante do PIX`
    }

    let url = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`
    window.location.href = url
}
