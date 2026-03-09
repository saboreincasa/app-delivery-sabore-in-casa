function gerarPix(){

let total = calcularTotal()

let chave = "31983391576"

let nome = "SABORE IN CASA"

let codigoPix =
`00020126580014BR.GOV.BCB.PIX0136${chave}520400005303986540${total}5802BR5920${nome}6009SAOPAULO62070503***6304`

document.getElementById("pixcode").innerText = codigoPix

}
