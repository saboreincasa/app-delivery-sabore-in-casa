function notificar(){

Notification.requestPermission().then(p=>{

if(p==="granted"){

new Notification("Pedido recebido 🍕");

}

});

}
