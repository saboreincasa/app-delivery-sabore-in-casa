const express = require("express")

const app = express()

app.use(express.json())

app.post("/pedido",(req,res)=>{

console.log("Novo pedido:",req.body)

imprimirPedido(req.body)

res.send("Pedido recebido")

})

app.listen(3000)
