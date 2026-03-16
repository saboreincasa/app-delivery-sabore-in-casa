function abrirCarrinho(){

let carrinho=JSON.parse(localStorage.getItem("carrinho"))||[];

let texto="Pedido:%0A";

carrinho.forEach(p=>{

texto+=p.tamanho+" "+p.sabor1+" / "+p.sabor2+" "+p.preco+"%0A";

});

window.open("https://wa.me/5531983391576?text="+texto);

}
