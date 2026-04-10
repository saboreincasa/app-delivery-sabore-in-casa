const pizzas = [
{ nome:"Calabresa", desc:"Molho, mussarela, calabresa, cebola", img:"imagens/calabresa.jpg"},
{ nome:"Frango com Catupiry", desc:"Molho, frango desfiado, catupiry", img:"imagens/frango.jpg"},
{ nome:"4 Queijos", desc:"Mussarela, provolone, parmesão, catupiry", img:"imagens/4queijos.jpg"},
{ nome:"Portuguesa", desc:"Presunto, ovo, cebola, ervilha", img:"imagens/portuguesa.jpg"},
{ nome:"Marguerita", desc:"Mussarela, tomate, manjericão", img:"imagens/marguerita.jpg"}
];

const lista = document.getElementById("listaPizzas");
const detalhe = document.getElementById("detalhePizza");
const config = document.getElementById("configPizza");

let pizzaAtual = null;

// LISTAR
pizzas.forEach((pizza, index) => {
    lista.innerHTML += `
    <div class="pizza-card">

        <img src="${pizza.img}" class="pizza-img" onerror="this.src='imagens/erro.png'">

        <div class="pizza-info">

            <div class="pizza-nome">${pizza.nome}</div>

            <div class="pizza-desc">🧾 ${pizza.desc}</div>

            <button onclick="abrirDetalhe(${index})">
                🍕 Montar Pizza
            </button>

        </div>

    </div>
    `;
});

// DETALHE
function abrirDetalhe(index){
    pizzaAtual = pizzas[index];

    lista.style.display = "none";
    detalhe.style.display = "block";

    document.getElementById("imgDetalhe").src = pizzaAtual.img;
    document.getElementById("nomeDetalhe").innerText = pizzaAtual.nome;
    document.getElementById("descDetalhe").innerText = pizzaAtual.desc;
}

// IR MONTAGEM
function irMontagem(){
    detalhe.style.display = "none";
    config.style.display = "block";

    document.getElementById("nomePizza").innerText = "🍕 " + pizzaAtual.nome;

    let select = document.getElementById("meio");
    select.innerHTML = `<option value="">Não</option>`;

    pizzas.forEach(p => {
        if(p.nome !== pizzaAtual.nome){
            select.innerHTML += `<option value="${p.nome}">${p.nome}</option>`;
        }
    });

    atualizarPreco();
}

// VOLTAR
function voltarLista(){
    detalhe.style.display = "none";
    lista.style.display = "block";
}

function voltarDetalhe(){
    config.style.display = "none";
    detalhe.style.display = "block";
}

// PREÇO
function atualizarPreco(){
    let tamanho = document.getElementById("tamanho").value;
    let borda = document.getElementById("borda").value;

    let preco = 0;

    if(tamanho == 25) preco = 30;
    if(tamanho == 30) preco = 40;
    if(tamanho == 35) preco = 50;

    preco += Number(borda);

    document.getElementById("preco").innerText = "Total: R$ " + preco;
}

// ADICIONAR
function adicionarPizza(){
    let tamanho = document.getElementById("tamanho").value;
    let bordaSelect = document.getElementById("borda");
    let meio = document.getElementById("meio").value;

    let textoBorda = bordaSelect.options[bordaSelect.selectedIndex].text;

    let preco = 0;

    if(tamanho == 25) preco = 30;
    if(tamanho == 30) preco = 40;
    if(tamanho == 35) preco = 50;

    preco += Number(bordaSelect.value);

    let nomeFinal = `${pizzaAtual.nome} ${tamanho}cm`;

    if(meio){
        nomeFinal += " / Meio a Meio com " + meio;
    }

    if(bordaSelect.value != 0){
        nomeFinal += " / " + textoBorda;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: nomeFinal,
        preco: preco
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Pizza adicionada!");

    voltarLista();
}
