// notificacao.js

function notificar(msg) {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("Sabore in Casa", { body: msg, icon: "imagens/logo.png" });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") new Notification("Sabore in Casa", { body: msg, icon: "imagens/logo.png" });
      });
    }
  } else {
    alert(msg);
  }
}

// Exemplo: notificação de pedido recebido
function pedidoRecebido() {
  notificar("Seu pedido foi recebido! 🍕");
}
