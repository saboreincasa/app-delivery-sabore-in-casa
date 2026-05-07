// 🛒 CARRINHO 
let carrinho = []

// 🔢 CONTADOR DE PEDIDOS
let numeroPedido = Number(localStorage.getItem("numeroPedido")) || 0

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

// 🍕 MONTAGEM
function abrirMontagemPizza(nome){

    let imagens = {
        "Calabresa":"imagens/pizzas/calabresa.png",
        "Frango com Catupiry":"imagens/pizzas/franco_com_catupiry.png",
        "4 Queijos":"imagens/pizzas/quatro_queijos.png",
        "Portuguesa":"imagens/pizzas/portuguesa.png",
        "Marguerita":"imagens/pizzas/marguerita.png",
        "Baiana":"imagens/pizzas/baiana.png",
        "Napolitana":"imagens/pizzas/napolitana.png",
        "Milho com Bacon":"imagens/pizzas/milho_com_bacon.png",
        "Moda da Casa":"imagens/pizzas/moda_da_casa.png"
    }

    let html = `
    <div class="montagem-box">

        <h2>🍕 ${nome}</h2>

        <img class="pizza-preview" src="${imagens[nome]}" onerror="this.src='imagens/pizza-padrao.png'">

        <div class="opcoes-pizza">

            <div class="campo">
                <label>Tamanho:</label>
                <select id="tamanho">
                    <option value="25">Pequena 25cm - R$42.90</option>
                    <option value="30">Grande 30cm - R$54.90</option>
                    <option value="35">Gigante 35cm - R$69.90</option>
                </select>
            </div>

            <div class="campo">
                <label>Borda:</label>
                <select id="borda">
                    <option value="0">Normal</option>
                    <option value="10">Catupiry (+10)</option>
                    <option value="10">Cheddar (+10)</option>
                </select>
            </div>

            <div class="campo">
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
            </div>

        </div>

        <button class="btn-montar" onclick="adicionarPizza('${nome}')">
            🛒 Adicionar ao Carrinho
        </button>

        <span class="voltar" onclick="abrirPizzas()">⬅ Voltar</span>

    </div>
    `

    document.getElementById("produtos").innerHTML = html
}

// 🍕 ADICIONAR PIZZA
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

// 🔥 FILTRO
function filtrar(tipo){

    if(tipo === "combo"){
        mostrarCombos()
        return
    } else {
        esconderCombos()
    }

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let filtrados = produtos.filter(p => p.categoria === tipo)

        let html = ""

        filtrados.forEach(p=>{
            html += `
            <div class="card">
                <img src="${p.foto}" onerror="this.src='imagens/sem-imagem.png'">
                <div class="card-content">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <p class="preco">R$ ${Number(p.preco).toFixed(2)}</p>
                    <button onclick="addCarrinho('${p.nome}', ${p.preco}, '${tipo}')">
                        Adicionar
                    </button>
                </div>
            </div>
            `
        })

        document.getElementById("produtos").innerHTML = html
    })
}

// 🔥 COMBOS
function carregarCombosSemana(){
    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let combos = produtos.filter(p => p.categoria === "combos")

        let html = ""

        combos.forEach(c=>{
            html += `
            <div class="card destaque">
                <img src="${c.foto}" onerror="this.src='imagens/sem-imagem.png'">
                <div class="card-content">
                    <h3>${c.nome}</h3>
                   <p style="display:flex; flex-direction:column; gap:4px;">
    ${c.descricao
        .split("+")
        .map(item => `<span>${item.trim()}</span>`)
        .join("")}
</p>
                    <p class="preco">R$ ${Number(c.preco).toFixed(2)}</p>
                   <button onclick="abrirMontagemCombo('${c.nome}')">
 🛒 Montar Combo
                    </button>
                </div>
            </div>
            `
        })

        document.getElementById("combosSemana").innerHTML = html
    })
}

// 🎬 BANNER
let banners = [
    {nome:"Combo Família", descricao:"2 Pizzas Gigantes 35cm + 2 Refrigerantes 2l", preco:168.90, foto:"imagens/banners/combo-familia.png"},
    {nome:"Combo Amigos", descricao:"6 Heinekens + 6 Brahmas + 1 Pizza Gigante 35cm", preco:169.90, foto:"imagens/banners/combo-amigos.png"},
    {nome:"Combo Casal", descricao:"1 Pizza Gigante 35cm + 1 Refrigerante 2l", preco:82.90, foto:"imagens/banners/combo-casal.png"}
]

let bannerIndex = 0
let bannerDiv

function iniciarBanner(){
    bannerDiv = document.getElementById("banner")
    if(!bannerDiv) return

    mostrarBanner()
    setInterval(mostrarBanner, 5000)
}

function mostrarBanner(){
    let combo = banners[bannerIndex]

    bannerDiv.style.backgroundImage = `url('${combo.foto}')`

   bannerDiv.onclick = function(){

    mostrarToast(combo)

    setTimeout(()=>{
        abrirMontagemCombo(combo.nome)
    }, 800)
}

    bannerIndex++
    if(bannerIndex >= banners.length){
        bannerIndex = 0
    }
}

// 🛒 CARRINHO
function addCarrinho(nome, preco, tipo = "outro"){

    let item = carrinho.find(i => i.nome === nome)

    if(item){
        item.qtd++
    } else {
        carrinho.push({
            nome,
            preco: Number(preco),
            qtd: 1,
            tipo
        })
    }

    atualizarCarrinho()
}
// 📊 CONTADOR FRETE GRÁTIS
function contarItensFreteGratis(){

    let total = 0

    carrinho.forEach(item=>{
        if(item.tipo === "pizza" || item.tipo === "combo"){
            total += item.qtd
        }
    })

    return total
}

// 🛒 ATUALIZAR CARRINHO
function atualizarCarrinho(){

    let lista = document.getElementById("lista")
    let contador = document.getElementById("contador")
    let total = 0

    if(!lista) return

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

            <div style="display:flex; gap:5px;">
                <button onclick="diminuir(${index})">➖</button>
                <span>${item.qtd}</span>
                <button onclick="aumentar(${index})">➕</button>
               <span onclick="removerItem(${index})" style="cursor:pointer; font-weight:bold;">
    <span style="color:red;">X</span>
    <span style="color:white;"> Remover</span>
</span>
            </div>
        </div>
        `
    })

    if(contador) contador.innerText = carrinho.length
    let totalEl = document.getElementById("total")
if(totalEl){
    totalEl.innerText = total.toFixed(2)
}

    let info = document.getElementById("infoFrete")
    if(info){
        let itens = contarItensFreteGratis()
        let falta = 5 - itens

        if(itens >= 5){
            info.innerHTML = "🎉 FRETE GRÁTIS ATIVADO!"
        } else {
           info.innerHTML = `🚚 Faltam ${falta} item(s) para ganhar FRETE GRÁTIS`
        }
    }
}

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

function mostrarToast(combo){

    let toast = document.getElementById("toast")
    if(!toast) return

    if(combo.nome.includes("Família")){
    toast.innerText = `👨‍👩‍👧‍👦 ${combo.nome} perfeito pra dividir!`
}
else if(combo.nome.includes("Casal")){
    toast.innerText = `❤️ ${combo.nome} clima perfeito garantido!`
}
else if(combo.nome.includes("Amigos")){
    toast.innerText = `🍻 ${combo.nome} partiu resenha!`
}
else{
    toast.innerText = `🔥 ${combo.nome} adicionado!`
}
    toast.className = "show"

    setTimeout(()=>{
        toast.className = ""
    },4000)
}

function abrirMapa(){
    window.open("https://www.google.com/maps?q=Rua+Maria+de+Lourdes+da+Cruz+378+Belo+Horizonte")
}
// ===============================
// 🚚 SISTEMA DE FRETE INTELIGENTE
// ===============================

const bairrosProximos = [
"Mantiqueira","Juliana","São Benedito","São Tomás","Serra Verde",
"Jardim Vitória","Vila Clóris","Jardim Da Glória","Nova Pampulha",
"Gávea","Célvia","Minas Caixa","Céu Azul","Rio Branco","Venda Nova",
"Parque São Pedro","Lagoinha Leblon","Jardim Dos Comerciários","Santa Branca"
]

const bairrosMedios = [
"Justinópolis","São Benedito","Floramar","Heliópolis","Planalto",
"Itapoã","Santa Mônica","Copacabana","São João Batista",
"São Bernardo","Jardim Atlântico","Santa Amélia",
"Centro De Vespasiano","Caieiras","Célvia","Nossa Senhora De Fátima",
"Morro Alto","Gávea II","Jardim Leblon","Piratininga",
"São José","Santa Isabel","Santa Fé","Vereda","Florença",
"Pedra Branca","Jardim Colonial","Jardim Verona",
"Botafogo","Areias","Veneza","Céu Azul"
]

const bairrosLongos = [
"Centro De Ribeirão Das Neves","Belo Vale","Barcelona","Alterosa",
"Bom Sossego","Rosaneves","Sevilha","Contagem","Santa Luzia",
"Pampulha","Castelo","Ouro Preto","Caiçara","Padre Eustáquio",
"Dom Bosco","Alípio De Melo","Nova Pampulha","Guarani",
"Centro De Belo Horizonte","Lagoa Da Pampulha","Vespasiano",
"Justinópolis","Jardim Europa"
]

function calcularFretePorBairro(bairro){

    if(!bairro) return 20

    let b = bairro.toLowerCase()

    if(bairrosProximos.some(x => x.toLowerCase() === b)) return 7
    if(bairrosMedios.some(x => x.toLowerCase() === b)) return 10
    if(bairrosLongos.some(x => x.toLowerCase() === b)) return 20

    return 20
}

function abrirAbaBairros(){

    let existente = document.getElementById("modalBairros")

    if(existente){
        existente.remove()
    }

    let html = `
    <div id="modalBairros" style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.8);
        z-index:9999;
        overflow:auto;
        padding:20px;
    ">

        <div style="
            background:#fff;
            color:#000;
            padding:20px;
            border-radius:10px;
            max-width:600px;
            margin:auto;
        ">

            <h2>🚚 Tabela de Frete por Bairro</h2>

            <h3>🟢 R$7 (0–3km)</h3>
            <p>${bairrosProximos.join(", ")}</p>

            <h3>🟡 R$10 (3–6km)</h3>
            <p>${bairrosMedios.join(", ")}</p>

            <h3>🔴 R$20 (6–10km)</h3>
            <p>${bairrosLongos.join(", ")}</p>

            <button onclick="document.getElementById('modalBairros').remove()" 
            style="
                margin-top:20px;
                padding:10px;
                width:100%;
                background:red;
                color:#fff;
                border:none;
                border-radius:5px;
            ">
                Fechar
            </button>

        </div>

    </div>
    `

    document.body.insertAdjacentHTML("beforeend", html)
}

function abrirModalBairros(){

    let modal = document.getElementById("modalBairro")

    if(modal){
        modal.remove()
    }

    let html = `
    <div id="modalBairro" style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.7);
        z-index:99999;
        display:flex;
        justify-content:center;
        align-items:center;
    ">

       <div style="
    background:#fff;
    color:#000;
    width:90%;
    max-width:400px;
    padding:20px;
    border-radius:12px;
">

            <h2>🏘️ Selecione seu bairro</h2>

            <div style="max-height:300px; overflow:auto;">

                ${gerarListaBairros()}

            </div>

            <button onclick="fecharModalBairro()" style="
                margin-top:15px;
                width:100%;
                padding:10px;
                background:red;
                color:#fff;
                border:none;
                border-radius:8px;
            ">Fechar</button>

        </div>

    </div>
    `

    document.body.insertAdjacentHTML("beforeend", html)
}

function fecharModalBairro(){
    document.getElementById("modalBairro").remove()
}

function gerarListaBairros(){

    const todos = [
        ...bairrosProximos,
        ...bairrosMedios,
        ...bairrosLongos
    ]

    return todos.map(b=>`
        <div onclick="selecionarBairro('${b}')" style="
            padding:10px;
            border-bottom:1px solid #ddd;
            cursor:pointer;
        ">
            📍 ${b}
        </div>
    `).join("")
}

function selecionarBairro(nome){

    document.getElementById("bairroSelecionado").value = nome
    fecharModalBairro()

    let frete = calcularFretePorBairro(nome)

    document.getElementById("freteInfo").innerHTML =
    "🚚 Frete calculado: R$ " + frete
}

// 🔥 ===============================
// 🎁 SISTEMA DE COMBOS (FINAL LIMPO)
// ===============================

function abrirMontagemCombo(nome){

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let combo = produtos.find(p => p.nome === nome)

if(!combo){
    alert("Combo não encontrado")
    return
}

let desc = combo.descricao.toLowerCase()

let bebidas = produtos.filter(p => {

    if(p.categoria !== "bebidas") return false

    let nomeBebida = p.nome.toLowerCase()

   if(desc.includes("amigos")){
    return false
}

   if(desc.includes("refrigerante")){
    return nomeBebida.includes("2l") || nomeBebida.includes("2000")
}

    if(desc.includes("lata") || desc.includes("350ml")){
        return nomeBebida.includes("350") || nomeBebida.includes("lata")
    }

    return false
})

let qtdPizzas = desc.includes("família") ? 2 : 1

       let semRefri = nome.toLowerCase().includes("amigos")

        const pizzasOptions = `
            <option value="">Selecione</option>
            <option>Calabresa</option>
            <option>Frango com Catupiry</option>
            <option>4 Queijos</option>
            <option>Portuguesa</option>
            <option>Marguerita</option>
            <option>Baiana</option>
            <option>Napolitana</option>
            <option>Milho com Bacon</option>
            <option>Moda da Casa</option>
        `

      let refriOptions = `<option value="">Selecione</option>`

bebidas.forEach(b => {
    refriOptions += `<option value="${b.nome}">
        ${b.nome}
    </option>`
})

        let html = `
        <div class="montagem-box">

            <h2>🎁 ${combo.nome}</h2>

            <img class="pizza-preview" src="${combo.foto}" onerror="this.src='imagens/sem-imagem.png'">

            <div class="opcoes-pizza">
        `

        for(let i=1;i<=qtdPizzas;i++){
            html += `
            <div class="campo">
                <label>Pizza ${i}:</label>
                <select id="pizza${i}">
                    ${pizzasOptions}
                </select>
            </div>
            `
        }

html += `
<div class="campo">
    <label>Borda:</label>
    <select id="borda">
        <option value="0">Normal</option>
        <option value="10">Catupiry +R$10</option>
        <option value="10">Cheddar +R$10</option>
    </select>
</div>
`

if(!semRefri){

    let qtdRefri = desc.includes("família") ? 2 : 1

    for(let i = 1; i <= qtdRefri; i++){
        html += `
        <div class="campo">
            <label>Refrigerante ${i}:</label>
            <select id="refri${i}">
                ${refriOptions}
            </select>
        </div>
        `
    }
}


         html += `
    </div>

    <div class="campo">
        <label>🥤 Bebidas Extras (opcional):</label>

        <div id="extrasBebidas"></div>

       <button onclick="adicionarLinhaBebida()" style="
    margin:12px auto 0 auto;
    display:block;
    background:#ff9800;
    border:none;
    padding:10px 20px;
    color:#fff;
    border-radius:8px;
    cursor:pointer;
    font-weight:bold;
">
    + Adicionar Bebida
</button>
    </div>

    <button class="btn-montar"
        onclick="adicionarComboFinal('${combo.nome}', ${combo.preco}, ${qtdPizzas}, ${semRefri})">
        🛒 Adicionar Combo
    </button>

    <span class="voltar" onclick="mostrarCombos()">⬅ Voltar</span>

</div>
`

        document.getElementById("produtos").innerHTML = html
        setTimeout(()=>{
    document.getElementById("produtos").scrollIntoView({behavior:"smooth"})
},100)
    })
}


// 🛒 FINALIZAR COMBO
function adicionarComboFinal(nome, preco, qtdPizzas, semRefri){

    let extras = ""
    let total = preco

    for(let i=1;i<=qtdPizzas;i++){
        let pizza = document.getElementById(`pizza${i}`)?.value
        if(pizza){
            extras += ` | Pizza ${i}: ${pizza}`
        }
    }

    let borda = document.getElementById("borda")?.value
    let bordaTexto = document.getElementById("borda")?.selectedOptions[0]?.text

    if(Number(borda) === 10){
        extras += ` | Borda ${bordaTexto}`
        total += 10
    }

if(!semRefri){

   let qtdRefri = nome.toLowerCase().includes("família") ? 2 : 1

    for(let i = 1; i <= qtdRefri; i++){
        let refri = document.getElementById(`refri${i}`)?.value
        if(refri){
            extras += ` | Refri ${i}: ${refri}`
        }
    }
}

let bebidasExtras = document.querySelectorAll("#extrasBebidas > div")

bebidasExtras.forEach(div => {

    let select = div.querySelector(".bebidaSelect")
    let id = div.id.split("_")[1]
    let qtd = Number(document.getElementById("qtd_" + id).innerText)

    let nomeBebida = select.value
    let preco = Number(select.selectedOptions[0]?.dataset.preco || 0)

    if(nomeBebida){
        extras += ` | ${qtd}x ${nomeBebida}`
        total += preco * qtd
    }
})
    let nomeFinal = nome + extras

    addCarrinho(nomeFinal, total, "combo")

    mostrarCombos()
}
// ===============================
// 🥤 SISTEMA PREMIUM DE BEBIDAS
// ===============================

function adicionarLinhaBebida(){

    fetch("produtos.json")
    .then(res => res.json())
    .then(produtos => {

        let bebidas = produtos.filter(p => p.categoria === "bebidas")

        let options = `<option value="">Selecione</option>`
        bebidas.forEach(b=>{
            options += `<option value="${b.nome}" data-preco="${b.preco}">
                ${b.nome} - R$${b.preco.toFixed(2)}
            </option>`
        })

        let id = Date.now()

        let linha = `
        <div id="bebida_${id}" style="
            display:flex;
            align-items:center;
            gap:8px;
            margin-top:8px;
        ">

            <select class="bebidaSelect">
                ${options}
            </select>

            <button onclick="diminuirBebida(${id})">−</button>

            <span id="qtd_${id}">1</span>

            <button onclick="aumentarBebida(${id})">+</button>

            <button onclick="removerLinhaBebida(${id})">X</button>

        </div>
        `

        document.getElementById("extrasBebidas")
        .insertAdjacentHTML("beforeend", linha)
    })
}

function aumentarBebida(id){
    let el = document.getElementById("qtd_" + id)
    el.innerText = Number(el.innerText) + 1
}

function diminuirBebida(id){
    let el = document.getElementById("qtd_" + id)
    let val = Number(el.innerText)
    if(val > 1){
        el.innerText = val - 1
    }
}

function removerLinhaBebida(id){
    document.getElementById("bebida_" + id).remove()
}


// ===============================
// 💳 GERADOR DE PIX EMV/BR CODE
// ===============================

/**
 * Gera o código PIX (Copia e Cola / QR Code) no padrão EMV BR Code
 * com valor fixo — compatível com todos os bancos brasileiros.
 *
 * @param {string} chavePix   - Chave PIX (telefone, CPF, email, CNPJ ou chave aleatória)
 * @param {string} nomeRecebedor - Nome do recebedor (até 25 caracteres)
 * @param {string} cidade     - Cidade do recebedor (até 15 caracteres)
 * @param {number} valor      - Valor da transação em reais (ex: 82.90)
 * @param {string} txid       - Identificador da transação (até 25 caracteres, sem espaços)
 * @returns {string}          - Código PIX EMV pronto para gerar QR Code ou copiar
 */
function gerarCodigoPix(chavePix, nomeRecebedor, cidade, valor, txid = "PEDIDO") {

    // Formata valor com 2 casas decimais sem vírgula
    const valorFormatado = valor.toFixed(2)

    // Limpa e normaliza campos de texto (remove acentos e caracteres especiais)
    const limpar = (str, maxLen) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")  // remove acentos
            .replace(/[^a-zA-Z0-9 ]/g, "")    // só letras, números e espaço
            .substring(0, maxLen)
            .trim()
    }

    const nome   = limpar(nomeRecebedor, 25)
    const cid    = limpar(cidade, 15)
    const tx     = limpar(txid, 25).replace(/ /g, "")

    // Helper: formata campo EMV (ID + tamanho 2 dígitos + valor)
    const campo = (id, valor) => {
        const tam = String(valor.length).padStart(2, "0")
        return `${id}${tam}${valor}`
    }

    // --- Monta Merchant Account Info (ID 26) ---
    // GUI = identificador do arranjo PIX
    const gui = campo("00", "BR.GOV.BCB.PIX")
    // Chave PIX
    const chave = campo("01", chavePix)
    // Campo 26 completo
    const merchantAccountInfo = campo("26", gui + chave)

    // --- Monta Additional Data (ID 62) ---
    // txid dentro do campo 62
    const txidField = campo("05", tx || "***")
    const additionalData = campo("62", txidField)

    // --- Monta o payload SEM CRC ---
    let payload =
        campo("00", "01")                  // Payload Format Indicator
      + merchantAccountInfo                // Merchant Account Information
      + campo("52", "0000")               // Merchant Category Code
      + campo("53", "986")                // Transaction Currency (BRL)
      + campo("54", valorFormatado)       // Transaction Amount
      + campo("58", "BR")                 // Country Code
      + campo("59", nome)                 // Merchant Name
      + campo("60", cid)                  // Merchant City
      + additionalData                    // Additional Data Field
      + "6304"                            // CRC placeholder (ID + 4 chars reservados)

    // --- Calcula CRC16-CCITT ---
    function crc16(str) {
        let crc = 0xFFFF
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8
            for (let j = 0; j < 8; j++) {
                if (crc & 0x8000) {
                    crc = (crc << 1) ^ 0x1021
                } else {
                    crc <<= 1
                }
                crc &= 0xFFFF
            }
        }
        return crc.toString(16).toUpperCase().padStart(4, "0")
    }

    return payload + crc16(payload)
}


// ===============================
// 📦 ENVIAR PEDIDO (com PIX dinâmico)
// ===============================

function enviarPedido(){

    let nomeCliente = document.getElementById("nomeCliente")?.value

    if(!nomeCliente || nomeCliente.trim() === ""){
        let campo = document.getElementById("nomeCliente")
        campo.style.border = "2px solid red"
        campo.placeholder = "Digite seu nome primeiro 👈"
        campo.focus()
        return
    }

    // 🔢 NÚMERO DO PEDIDO
    numeroPedido++
    localStorage.setItem("numeroPedido", numeroPedido)
    let numeroFormatado = numeroPedido.toString().padStart(2, "0")

    // 📍 ENDEREÇO
    let rua          = document.getElementById("rua")?.value || ""
    let numero       = document.getElementById("numero")?.value || ""
    let bairro       = document.getElementById("bairroSelecionado")?.value || ""
    let complemento  = document.getElementById("complemento")?.value || ""

    let enderecoCompleto = `${rua}, Nº ${numero} - ${bairro}`
    if(complemento) enderecoCompleto += ` (${complemento})`

    // 💳 PAGAMENTO
    let pagamento = document.getElementById("pagamento")?.value || "Não informado"
    let troco     = document.getElementById("troco")?.value || "-"

    // 🚚 FRETE
    let frete = calcularFretePorBairro(bairro)

    // 💰 TOTAL
    let subtotal = Number(document.getElementById("total")?.innerText || 0)

    // 🎉 FRETE GRÁTIS
    let itens = contarItensFreteGratis()
    if(itens >= 5) frete = 0

    let totalFinal = subtotal + frete

    // 🧾 MENSAGEM WHATSAPP
    let msg = `🍕 *SABORE IN CASA* 🍕\n`
    msg += `📦 *Pedido Nº ${numeroFormatado}*\n`
    msg += "━━━━━━━━━━━━━━━━━━━━━━━\n\n"
    msg += `👤 *Cliente:* ${nomeCliente}\n\n`
    msg += "🛒 *ITENS:*\n"

    carrinho.forEach(item=>{
        msg += `• ${item.qtd}x ${item.nome}\n`
    })

    msg += "\n━━━━━━━━━━━━━━━━━━━━━━━\n"

    if(itens >= 5){
        msg += "🎉 *FRETE GRÁTIS ATIVADO*\n"
    } else {
        msg += `🚚 Faltam ${5 - itens} item(s) para frete grátis\n`
    }

    msg += `\n💰 Subtotal: R$${subtotal.toFixed(2)}`
    msg += `\n🚚 Frete: R$${frete.toFixed(2)}`
    msg += `\n💵 *TOTAL: R$${totalFinal.toFixed(2)}*\n`
    msg += `\n📍 ${enderecoCompleto}\n`
    msg += `💳 ${pagamento}\n`

    // 💳 SE PIX: gera código dinâmico com valor exato
    if(pagamento === "Pix"){

        // Gera txid único baseado no número do pedido
        const txid = "SABORECASA" + numeroFormatado

        // Gera o código PIX com o valor total real
        const codigoPix = gerarCodigoPix(
            "31983391576",       // ← sua chave PIX (telefone)
            "Carlos Henrique",   // ← nome do recebedor
            "Belo Horizonte",    // ← cidade
            totalFinal,          // ← valor calculado automaticamente
            txid                 // ← identificador do pedido
        )

        msg += "\n━━━━━━━━━━━━━━━━━━━━━━━\n"
        msg += "💳 *PAGAMENTO VIA PIX*\n\n"
        msg += `💰 *Valor exato: R$${totalFinal.toFixed(2)}*\n\n`
        msg += "📋 *PIX COPIA E COLA:*\n"
        msg += `\`${codigoPix}\`\n\n`
        msg += "⚠️ *IMPORTANTE:*\n"
        msg += "• Cole o código acima no seu banco\n"
        msg += "• O valor já estará preenchido automaticamente\n"
        msg += "• Envie o comprovante após o pagamento\n"
        msg += "• Pedido entra em preparo após confirmação\n"
        msg += "━━━━━━━━━━━━━━━━━━━━━━━\n"

        // Abre modal PIX antes de redirecionar pro WhatsApp
        mostrarModalPix(totalFinal, codigoPix, () => {
            finalizarPedido(msg)
        })

        return
    }

    if(pagamento === "Dinheiro"){
        msg += `💵 Troco para: R$${troco}\n`
    }

    msg += "\n🙏 Obrigado pela preferência!"

    finalizarPedido(msg)
}

function finalizarPedido(msg){
    let url = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`
    window.location.href = url
}


// ===============================
// 📲 MODAL PIX (com QR Code + Copia e Cola)
// ===============================

function mostrarModalPix(valor, codigoPix, callback){

    let existente = document.getElementById("modalPix")
    if(existente) existente.remove()

    let html = `
    <div id="modalPix" style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.85);
        z-index:99999;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:15px;
    ">

        <div style="
            background:#fff;
            color:#000;
            padding:25px;
            border-radius:16px;
            max-width:420px;
            width:100%;
            text-align:center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        ">

            <h2 style="color:#2d9e57; margin-bottom:5px;">📲 Pague com PIX</h2>

            <p style="font-size:22px; font-weight:bold; color:#333; margin:10px 0;">
                R$ ${valor.toFixed(2).replace(".", ",")}
            </p>

            <p style="font-size:13px; color:#666; margin-bottom:15px;">
                Valor já preenchido automaticamente no seu banco 🎉
            </p>

            <!-- QR Code gerado via API pública -->
            <div style="
                background:#f5f5f5;
                border-radius:12px;
                padding:12px;
                margin-bottom:15px;
                display:flex;
                justify-content:center;
            ">
                <img
                    id="qrcodePix"
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(codigoPix)}"
                    alt="QR Code PIX"
                    style="width:200px; height:200px; border-radius:8px;"
                    onerror="this.style.display='none'; document.getElementById('qrErro').style.display='block'"
                />
                <p id="qrErro" style="display:none; color:#999; font-size:13px;">
                    Use o código abaixo para pagar
                </p>
            </div>

            <!-- Copia e Cola -->
            <p style="font-size:13px; font-weight:bold; color:#333; margin-bottom:6px;">
                📋 PIX Copia e Cola:
            </p>

            <div style="
                background:#f0f0f0;
                border-radius:8px;
                padding:10px;
                font-size:11px;
                word-break:break-all;
                color:#444;
                text-align:left;
                max-height:80px;
                overflow:auto;
                margin-bottom:12px;
                font-family:monospace;
            " id="codigoPixTexto">
                ${codigoPix}
            </div>

            <button onclick="copiarCodigoPix()" style="
                width:100%;
                background:#2d9e57;
                color:#fff;
                border:none;
                padding:12px;
                border-radius:8px;
                font-size:15px;
                font-weight:bold;
                cursor:pointer;
                margin-bottom:8px;
            ">
                📋 Copiar Código PIX
            </button>

            <p style="font-size:12px; color:#888; margin-bottom:15px;">
                👤 Recebedor: <b>Carlos Henrique</b><br>
                ⚠️ Envie o comprovante após o pagamento
            </p>

            <div style="display:flex; gap:8px;">
                <button onclick="confirmarPix()" style="
                    flex:1;
                    background:#2d9e57;
                    color:#fff;
                    border:none;
                    padding:12px;
                    border-radius:8px;
                    font-weight:bold;
                    cursor:pointer;
                ">✅ Já paguei!</button>

                <button onclick="fecharModalPix()" style="
                    flex:1;
                    background:#e53935;
                    color:#fff;
                    border:none;
                    padding:12px;
                    border-radius:8px;
                    font-weight:bold;
                    cursor:pointer;
                ">❌ Cancelar</button>
            </div>

        </div>
    </div>
    `

    document.body.insertAdjacentHTML("beforeend", html)
    window._callbackPix = callback
}

function copiarCodigoPix(){
    let codigo = document.getElementById("codigoPixTexto")?.innerText?.trim()
    if(!codigo) return

    if(navigator.clipboard){
        navigator.clipboard.writeText(codigo).then(()=>{
            mostrarToastSimples("✅ Código PIX copiado!")
        }).catch(()=>{
            copiarFallback(codigo)
        })
    } else {
        copiarFallback(codigo)
    }
}

function copiarFallback(texto){
    let input = document.createElement("textarea")
    input.value = texto
    document.body.appendChild(input)
    input.select()
    document.execCommand("copy")
    document.body.removeChild(input)
    mostrarToastSimples("✅ Código PIX copiado!")
}

function mostrarToastSimples(mensagem){
    let toast = document.getElementById("toast")
    if(toast){
        let textoAnterior = toast.innerText
        toast.innerText = mensagem
        toast.className = "show"
        setTimeout(()=>{
            toast.className = ""
            toast.innerText = textoAnterior
        }, 3000)
    }
}

function fecharModalPix(){
    document.getElementById("modalPix")?.remove()
}

function confirmarPix(){
    fecharModalPix()
    if(window._callbackPix) window._callbackPix()
}
