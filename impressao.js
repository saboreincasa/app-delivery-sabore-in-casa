const escpos = require("escpos")

function imprimirPedido(pedido){

const device = new escpos.USB()

const printer = new escpos.Printer(device)

device.open(()=>{

printer
.text("SABORE IN CASA")
.text("Novo Pedido")
.text(JSON.stringify(pedido))
.cut()
.close()

})

}
