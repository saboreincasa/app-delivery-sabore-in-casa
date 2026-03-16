function enviarPedido(){

let endereco = document.getElementById("enderecoCliente").value
let pagamento = document.getElementById("pagamento").value
let troco = document.getElementById("troco").value

if(carrinho.length == 0){
alert("Adicione produtos ao carrinho")
return
}

let pedido = Math.floor(Math.random()*9000)+1000

let msg = `🍕 *SABORE IN CASA*%0A`
msg += `Pedido Nº ${pedido}%0A%0A`

msg += `📋 *Itens do Pedido*%0A`

let total = 0

carrinho.forEach(item=>{
msg += `➡ ${item.qtd}x ${item.nome}%0A`
total += item.preco*item.qtd
})

let taxa = 6.99

msg += `%0A💰 *Resumo*%0A`
msg += `Subtotal: R$ ${total.toFixed(2)}%0A`
msg += `Entrega: R$ ${taxa}%0A`

msg += `%0A💵 *Total:* R$ ${(total+taxa).toFixed(2)}%0A%0A`

msg += `📍 *Endereço*%0A${endereco}%0A%0A`

msg += `💳 *Pagamento*%0A${pagamento}%0A`

if(pagamento=="Dinheiro"){
msg+=`Troco para: ${troco}%0A`
}

msg += `%0A⏱ Tempo estimado: 20 a 40 minutos%0A`

msg += `%0A🙏 Obrigado pela preferência!%0A`
msg += `Seu pedido entrou na fila de preparo 🍕🔥`

window.open(`https://wa.me/5531983391576?text=${msg}`)
}
