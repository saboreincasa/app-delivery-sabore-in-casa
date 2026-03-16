const chavePix = "31983391576"

function mostrarPix(){

alert(
"Pagamento via PIX\n\n"+
"Chave PIX:\n"+
chavePix+
"\n\nApós pagar envie o comprovante no WhatsApp."
)

navigator.clipboard.writeText(chavePix)

}
