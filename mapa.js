// mapa.js

// Função simples para simular localização de entrega
function mostrarEntrega() {
  const mapaDiv = document.getElementById("mapa");
  if (!mapaDiv) {
    const div = document.createElement("div");
    div.id = "mapa";
    div.style.height = "200px";
    div.style.background = "#eee";
    div.innerText = "Mapa do entregador (simulado)";
    document.body.appendChild(div);
  }
}

// Chamar quando pedido for finalizado
function pedidoSaiuParaEntrega() {
  mostrarEntrega();
  notificar("Seu pedido está a caminho!");
}
