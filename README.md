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

/imagens -> imagens das pizzas, bebidas, combos e logo
index.html -> página principal
styles.css -> design do aplicativo
app.js -> lógica do cardápio e carrinho
integracao-sistema.js -> cardápio ao vivo + registro de vendas no sistema de gestão (Supabase)
produtos.json -> combos e snacks (pizzas/bebidas vêm do sistema de gestão)
pix.js -> geração de pagamento Pix
mapa.js -> cálculo de entrega
impressao.js -> impressão de pedidos
notificacao.js -> notificações do app
service-worker.js -> funcionamento offline (PWA)
manifest.json -> instalação como app
admin.html -> link para o painel de gestão (não indexado)
server.js -> servidor local (requer `npm install express`, ou use o comando abaixo sem dependências)

## 🚀 Como rodar o projeto

Não precisa de Node nem de instalar nada — é só servir os arquivos estáticos:

```
python -m http.server 8000
```

Depois abra http://localhost:8000 no navegador.

## 🔗 Integração com o sistema de gestão

O cardápio (pizzas e bebidas, com preço por sabor/tamanho) vem ao vivo do mesmo banco Supabase do [painel de gestão Sabore In Casa](https://saboreincasa.github.io/sabore-in-casa-sistema/), e cada pedido de pizza inteira ou bebida gera uma venda automaticamente lá. Se o Supabase ficar indisponível, o app cai para um cardápio de reserva local — o pedido pelo WhatsApp nunca fica bloqueado por isso. Detalhes em `integracao-sistema.js`.

## 👨‍🍳 Desenvolvido para

Pizzaria **Sabore In Casa**
