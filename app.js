let carrinho = []

// 🚀 INICIO
window.onload = function(){
  carregarCombosSemana()
  trocarBanner()
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
    {nome:"Calabresa",desc:"Molho, mussarela, calabresa, cebola"},
    {nome:"Frango com Catupiry",desc:"Molho, frango desfiado, catupiry"},
    {nome:"4 Queijos",desc:"Mussarela, provolone, parmesão, catupiry"},
    {nome:"Portuguesa",desc:"Presunto, ovo, cebola, ervilha"},
    {nome:"Marguerita",desc:"Mussarela, tomate, manjericão"},
    {nome:"Baiana",desc:"Calabresa, ovo, pimenta, cebola"},
    {nome:"Napolitana",desc:"Mussarela, tomate, parmesão"},
    {nome:"Atum",desc:"Atum, cebola, mussarela"},
    {nome:"Milho com Bacon",desc:"Milho, bacon, mussarela"},
    {nome:"Moda da Casa",desc:"Frango, bacon, milho, catupiry"}
  ]

  pizzas.forEach(p=>{
    html += `
      <div class="card" onclick="abrirMontagemPizza('${p.nome}')">
        <div class="card-content">
          <h3>${p.nome}</h3>
          <p>${p.desc}</p>
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
      <option value="Atum">Atum</option>
      <option value="Milho com Bacon">Milho com Bacon</option>
      <option value="Moda da Casa">Moda da Casa</option>
    </select>

    <br><br>

    <button onclick="adicionarPizza('${nome}')">
      Adicionar ao Carrinho
    </button>

    <br><br>

    <button onclick="abrirPizzas()">⬅ Voltar</button>
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

  if(meio){
    nomeFinal += " / Meio a Meio com " + meio
  }

  if(borda == 10){
    nomeFinal += " / Borda recheada"
  }

  addCarrinho(nomeFinal, preco)
  abrirPizzas()
}

// 🛒 CARRINHO PROFISSIONAL
function addCarrinho(nome, preco){
  let itemExistente = carrinho.find(i => i.nome === nome)
  if(itemExistente){
    itemExistente.qtd++
  }else{
    carrinho.push({nome, preco, qtd:1})
  }
  atualizarCarrinho()
}

function atualizarCarrinho(){
  let lista = document.getElementById("lista")
  let contador = document.getElementById("contador")
  let total = 0

  lista.innerHTML = ""

  carrinho.forEach((item,index)=>{
    let subtotal = item.preco * item.qtd

    lista.innerHTML += `
      <div class="item-carrinho">
        <div class="item-topo"><b>${item.nome}</b></div>
        <div class="item-linha">
          <div class="controle-qtd">
            <button class="btn-qtd" onclick="diminuir(${index})">−</button>
            <span class="qtd">${item.qtd}</span>
            <button class="btn-qtd" onclick="aumentar(${index})">+</button>
          </div>
          <button class="btn-remover" onclick="removerItem(${index})">✖ Remover</button>
        </div>
        <div class="item-subtotal">
          Subtotal: R$ ${subtotal.toFixed(2)}
        </div>
      </div>
    `
    total += subtotal
  })

  contador.innerText = carrinho.length
  document.getElementById("total").innerText = total.toFixed(2)
}

function aumentar(index){
  carrinho[index].qtd++
  atualizarCarrinho()
}

function diminuir(index){
  if(carrinho[index].qtd > 1){
    carrinho[index].qtd--
  }else{
    carrinho.splice(index,1)
  }
  atualizarCarrinho()
}

function removerItem(index){
  carrinho.splice(index,1)
  atualizarCarrinho()
}
