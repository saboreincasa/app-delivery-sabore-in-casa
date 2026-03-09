// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Endpoint para receber pedidos
app.post("/pedido", (req, res) => {
  const pedido = req.body;
  // Salvar pedido em JSON local (simulando banco)
  fs.readFile("pedidos.json", (err, data) => {
    let pedidos = [];
    if (!err) pedidos = JSON.parse(data);
    pedidos.push(pedido);
    fs.writeFile("pedidos.json", JSON.stringify(pedidos, null, 2), () => {
      res.json({ status: "Pedido recebido com sucesso!" });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
