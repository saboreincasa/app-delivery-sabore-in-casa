if(Notification.permission!=="granted"){

Notification.requestPermission()

}

function notificar(msg){

if(Notification.permission==="granted"){

new Notification(msg)

}

}
