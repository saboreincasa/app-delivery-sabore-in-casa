// pix.js

// Você pode usar uma imagem estática ou biblioteca JS para QR Code
// Aqui vamos usar um QR Code estático para a chave PIX

document.addEventListener("DOMContentLoaded", () => {
  const qr = document.getElementById("qrcode");
  // Link para PIX com chave telefone
  const pixLink = "pix:31983391576";
  // Pode substituir por QRCode gerado dinamicamente
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixLink)}`;
});
