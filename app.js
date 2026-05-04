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
                    <button onclick="addCarrinho('${c.nome} - ${c.descricao}', ${c.preco}, 'combo')">
                        Adicionar
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
        addCarrinho(combo.nome + " - " + combo.descricao, combo.preco, "combo")
        mostrarToast(combo)
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
        carrinho.push({nome, preco: Number(preco), qtd:1, tipo})
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
    document.getElementById("total").innerText = total.toFixed(2)

    let info = document.getElementById("infoFrete")
    if(info){
        let itens = contarItensFreteGratis()
        let falta = 5 - itens

        if(itens >= 5){
            info.innerHTML = "🎉 FRETE GRÁTIS ATIVADO!"
        } else {
            info.innerHTML = `🚚 Faltam ${falta} item(s) para FRETE GRÁTIS`
        }
    }
}

function aumentar(i){ carrinho[i].qtd++; atualizarCarrinho() }
function diminuir(i){ carrinho[i].qtd--; if(carrinho[i].qtd<=0) carrinho.splice(i,1); atualizarCarrinho() }
function removerItem(i){ carrinho.splice(i,1); atualizarCarrinho() }

function scrollCarrinho(){
    document.getElementById("carrinho").scrollIntoView({behavior:"smooth"})
}

// 📦 ENVIAR PEDIDO
function enviarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    let enderecoEl = document.getElementById("enderecoCliente")
    let pagamentoEl = document.getElementById("pagamento")
    let trocoEl = document.getElementById("troco")

    let endereco = enderecoEl ? enderecoEl.value : "Não informado"
    let pagamento = pagamentoEl ? pagamentoEl.value : "Não informado"
    let troco = trocoEl ? trocoEl.value : "-"

    let msg = "🛒 *NOVO PEDIDO*\n\n"

    carrinho.forEach(item=>{
        msg += `🍕 ${item.qtd}x ${item.nome} - R$${item.preco.toFixed(2)}\n`
    })

    let itens = contarItensFreteGratis()

    if(itens >= 5){
        msg += `\n🎉 FRETE GRÁTIS ATIVADO`
    } else {
        msg += `\n🚚 Faltam ${5 - itens} item(s) para FRETE GRÁTIS`
    }

    let totalEl = document.getElementById("total")
    let total = totalEl ? totalEl.innerText : "0.00"

    msg += `\n\n💰 Total: R$${total}`
    msg += `\n📍 Endereço: ${endereco}`
    msg += `\n💳 Pagamento: ${pagamento}`
    msg += `\n💵 Troco: ${troco}`

    let url = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(msg)}`

    window.location.href = url
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
// ===============================
// 🧩 MELHORIAS VISUAIS (SEM MEXER NO CÓDIGO PRINCIPAL)
// ===============================

// 🍕 CABEÇALHO DECORATIVO DA PIZZA (caso queira usar na tela)
function inserirPizzaCabecalho(){

    let el = document.querySelector("body")

    let html = `
    <div id="pizzaHeaderDecor" style="
        text-align:center;
        margin-top:10px;
        margin-bottom:10px;
    ">
        <img src="imagens/pizzas/pizza-cabecalho.png"
        style="
            width:140px;
            max-width:40%;
            filter: drop-shadow(0px 5px 10px rgba(0,0,0,0.5));
        ">
    </div>
    `

    if(!document.getElementById("pizzaHeaderDecor")){
        el.insertAdjacentHTML("afterbegin", html)
    }
}

// chama automaticamente
inserirPizzaCabecalho()


// ===============================
// 🎨 BOTÕES PADRÃO MAIS BONITOS (SEM ALTERAR HTML EXISTENTE)
// ===============================
let style = document.createElement("style")
style.innerHTML = `

.btn-montar, button{
    background: linear-gradient(135deg,#ff2d2d,#ff7a00);
    color:white;
    border:none;
    padding:10px 14px;
    border-radius:12px;
    cursor:pointer;
    font-weight:bold;
    transition:0.3s;
    box-shadow:0px 3px 10px rgba(0,0,0,0.2);
}

.btn-montar:hover, button:hover{
    transform:scale(1.05);
    filter:brightness(1.1);
}

.pizza-card img{
    border-radius:12px;
}

.montagem-box{
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn{
    from{opacity:0; transform:translateY(10px)}
    to{opacity:1; transform:translateY(0)}
}

/* select mais bonito */
select{
    padding:8px;
    border-radius:8px;
    border:1px solid #ccc;
    outline:none;
}

/* pizza destaque */
.pizza-preview{
    border-radius:15px;
    box-shadow:0px 5px 15px rgba(0,0,0,0.3);
}
`

document.head.appendChild(style)


// ===============================
// 🍕 CORREÇÃO IMPORTANTE DA BORDA (SEM MEXER NO RESTO)
// ===============================

function corrigirBordaSelect(){

    let borda = document.getElementById("borda")
    if(!borda) return

    let opcoes = borda.querySelectorAll("option")

    if(opcoes.length >= 3){
        opcoes[1].text = "Catupiry (+10)"
        opcoes[2].text = "Cheddar (+10)"
    }
}

// executa quando abrir montagem
document.addEventListener("click", function(){
    corrigirBordaSelect()
})


// ===============================
// 🍕 AJUSTE FINAL (4 QUEIJOS NÃO DUPLICA MEIO A MEIO)
// ===============================

function bloquearMeio4Queijos(){

    let meio = document.getElementById("meio")
    if(!meio) return

    let opt = meio.querySelectorAll("option")

    opt.forEach(o=>{
        if(o.value === "4 Queijos"){
            o.disabled = true
        }
    })
}

document.addEventListener("click", bloquearMeio4Queijos)
