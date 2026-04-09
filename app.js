// 🛒 CARRINHO
let carrinho = []

// Número do WhatsApp
const whatsappNumero = "5531983391576"

// 🚀 INICIO
window.onload = function(){
    trocarBanner()
}

// 🔥 ESCONDER (AGORA NÃO PRECISA MAIS DE COMBOS SEPARADO)
function esconderCombos(){}

// 🔥 MOSTRAR COMBOS (CORRIGIDO)
function mostrarCombos(){

    let html = "<h2>🔥 Combos da Semana</h2>"

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let combos = produtos.filter(p => p.categoria === "combos")

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

        document.getElementById("produtos").innerHTML = html
    })
}

// 🍕 PIZZAS
function abrirPizzas(){

    let html = "<h2>🍕 Escolha sua Pizza</h2>"

    const pizzas = [
        {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola", img:"imagens/calabresa.jpg"},
        {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry", img:"imagens/frango.jpg"},
        {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/4queijos.jpg"},
        {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha", img:"imagens/portuguesa.jpg"},
        {nome:"Marguerita",desc:"Mussarela, tomate, manjericão", img:"imagens/marguerita.jpg"},
        {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola", img:"imagens/baiana.jpg"},
        {nome:"Napolitana",desc:"Mussarela, tomate, parmesão", img:"imagens/napolitana.jpg"},
        {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela", img:"imagens/milho.jpg"},
        {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry", img:"imagens/moda.jpg"}
    ]

    pizzas.forEach(p=>{
        html += `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}">
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
    <h2>🍕 Montar Pizza - ${nome}</h2>

    <label>Tamanho:</label>
    <select id="tamanho">
        <option value="25">Pequena 25cm - R$30</option>
        <option value="30">Grande 30cm - R$40</option>
        <option value="35">Gigante 35cm - R$50</option>
    </select>

    <label>Borda:</label>
    <select id="borda">
        <option value="0">Normal</option>
        <option value="10">Catupiry (+10)</option>
        <option value="10">Cheddar (+10)</option>
    </select>

    <label>Meio a Meio:</label>
    <select id="meio">
        <option value="">Não</option>
        <option value="Calabresa">Calabresa</option>
        <option value="Frango com Catupiry">Frango com Catupiry</option>
        <option value="4 Queijos">4 Queijos</option>
        <option value="Portuguesa">Portuguesa</option>
        <option value="Marguerita">Marguerita</option>
        <option value="Baiana">Baiana</option>
        <option value="Napolitana">Napolitana</option>
        <option value="Milho com Bacon">Milho com Bacon</option>
        <option value="Moda da Casa">Moda da Casa</option>
    </select>

    <br><br>
    <button onclick="adicionarPizza('${nome}')" style="background:#ff6f00; color:white; border:none; border-radius:5px; padding:10px 20px;">
        Adicionar ao Carrinho
    </button>

    <br><br>
    <span onclick="abrirPizzas()" style="cursor:pointer;">⬅ Voltar</span>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
function adicionarPizza(nome){
    let tamanho = document.getElementById("tamanho").value
    let borda = document.getElementById("borda").value
    let meio = document.getElementById("meio").value

    let preco = 0
    if(tamanho == 25) preco = 30
    if(tamanho == 30) preco = 40
    if(tamanho == 35) preco = 50
    preco += Number(borda)

    let nomeFinal = `${nome} ${tamanho}cm`
    if(meio) nomeFinal += " / Meio a Meio com " + meio
    if(borda == 10) nomeFinal += " / Borda recheada"

    addCarrinho(nomeFinal, preco)
    abrirPizzas()
}

// 🔥 FILTRO
function filtrar(tipo){

    if(tipo === "combos"){
        mostrarCombos()
        return
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

// 🎬 BANNER
let banners = [
    {nome:"Combo Família", descricao:"2 pizzas grandes + refrigerantes", preco:99.90, foto:"imagens/banners/combo-familia.png"},
    {nome:"Combo Amigos", descricao:"Cerveja + carvão", preco:89.90, foto:"imagens/banners/combo-amigos.png"},
    {nome:"Combo Casal", descricao:"2 pizzas grandes + refrigerante", preco:79.90, foto:"imagens/banners/combo-casal.png"}
]

let bannerIndex = 0

function mostrarBanner(){
    let bannerDiv = document.getElementById("banner")

    let combo = banners[bannerIndex]
    bannerDiv.style.backgroundImage = `url('${combo.foto}')`
    bannerDiv.style.backgroundSize = 'cover'
    bannerDiv.style.backgroundPosition = 'center'

    bannerDiv.onclick = function(){
        addCarrinho(combo.nome, combo.preco)
        mostrarToast(combo)
    }

    bannerIndex++
    if(bannerIndex >= banners.length){
        bannerIndex = 0
    }
}

function trocarBanner(){
    mostrarBanner()
    setInterval(mostrarBanner, 8000)
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
    let contador = document.getElementById("contador")
    let total = 0

    lista.innerHTML = ""

    carrinho.forEach((item, index)=>{
        let subtotal = item.preco * item.qtd

        lista.innerHTML += `
        <div style="display:flex; justify-content:space-between;">
            <div>
                <b>${item.nome}</b><br>
                R$ ${subtotal.toFixed(2)}
            </div>

            <div style="display:flex; align-items:center; gap:5px;">
                <button onclick="diminuir(${index})">➖</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">➕</button>
                <button onclick="removerItem(${index})">❌</button>
            </div>
        </div>
        `

        total += subtotal
    })

    contador.innerText = carrinho.length
    document.getElementById("total").innerText = total.toFixed(2)
}

function aumentar(i){
    carrinho[i].qtd++
    atualizarCarrinho()
}

function diminuir(i){
    carrinho[i].qtd--
    if(carrinho[i].qtd <= 0){
        carrinho.splice(i,1)
    }
    atualizarCarrinho()
}

function removerItem(i){
    carrinho.splice(i,1)
    atualizarCarrinho()
}

// 🛒 SCROLL
function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({
        behavior: "smooth"
    })
}

// 📲 WHATSAPP
function enviarPedido(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let endereco = document.getElementById("enderecoCliente").value || "Endereço não informado"
    let pagamento = document.getElementById("pagamento").value
    let troco = document.getElementById("troco").value || "-"

    let msg = "Olá! Gostaria de fazer o pedido:\n\n"

    carrinho.forEach(item=>{
        msg += `${item.qtd}x ${item.nome} - R$${item.preco.toFixed(2)} cada\n`
    })

    msg += `\nTotal: R$${document.getElementById("total").innerText}\n`
    msg += `Endereço: ${endereco}\n`
    msg += `Pagamento: ${pagamento}\n`
    msg += `Troco: ${troco}`

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(msg)}`
    window.open(url,"_blank")
}

// 🔔 TOAST
function mostrarToast(combo){
    let toast = document.getElementById("toast")
    toast.innerText = `✅ ${combo.nome} adicionado! Clique para ver o carrinho`
    toast.className = "show"

    toast.onclick = function(){
        scrollCarrinho()
    }

    setTimeout(()=>{
        toast.className = toast.className.replace("show","")
    },4000)
}
