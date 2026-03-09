const notifier = require("node-notifier")

function novoPedido(){

notifier.notify({

title:"Novo Pedido",
message:"Pedido recebido"

})

}
