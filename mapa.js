function calcularDistancia(origem,destino){

const service = new google.maps.DistanceMatrixService()

service.getDistanceMatrix({

origins:[origem],
destinations:[destino],
travelMode:"DRIVING"

}).then((res)=>{

let distancia = res.rows[0].elements[0].distance.text

console.log("Distância:",distancia)

})

}
