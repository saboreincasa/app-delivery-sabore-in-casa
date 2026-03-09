let carrinho = []

function addCarrinho(nome,valor){

carrinho.push({nome,valor})

alert(nome + " adicionado")

}

function calcularTotal(){

let total = 0

carrinho.forEach(p=>{

total += p.valor

})

/* taxa de entrega */

total += 10

return total

}
