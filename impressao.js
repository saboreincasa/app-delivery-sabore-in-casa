// impressao.js

function imprimirPedido() {
  let conteudo = "<h2>Pedido Sabore in Casa</h2>";
  let itens = document.getElementById("itensCarrinho").innerHTML;
  conteudo += itens;
  let win = window.open("", "PRINT", "height=600,width=800");
  win.document.write(conteudo);
  win.document.close();
  win.print();
}
