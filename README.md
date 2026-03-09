# 🍕 Sabore In Casa - App de Delivery

Aplicativo de delivery desenvolvido para a pizzaria **Sabore In Casa**.

## 📱 Funcionalidades

* Cardápio digital
* Escolha de tamanho da pizza

  * Pequena (25cm)
  * Média (30cm)
  * Gigante (35cm)
* Opção de borda

  * Catupiry (+R$10)
  * Cheddar (+R$10)
* Carrinho de compras
* Pedido via WhatsApp
* Pagamento via Pix
* Cálculo de entrega por mapa
* Impressão automática de pedidos
* Instalação como aplicativo (PWA)

## 🧾 Estrutura do projeto

/imagens -> imagens das pizzas e logo
index.html -> página principal
estilo.css -> design do aplicativo
app.js -> lógica do cardápio e carrinho
produtos.json -> lista de pizzas e produtos
pix.js -> geração de pagamento Pix
mapa.js -> cálculo de entrega
impressao.js -> impressão de pedidos
notificacao.js -> notificações do app
service-worker.js -> funcionamento offline
manifesto.json -> instalação como app
servidor.js -> servidor local

## 🚀 Como rodar o projeto

1. Instale o Node.js

2. Execute:

node servidor.js

3. Abra no navegador:

http://localhost:3000

## 👨‍🍳 Desenvolvido para

Pizzaria **Sabore In Casa**
