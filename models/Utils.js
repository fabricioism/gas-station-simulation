const capacidadMaxTanque = 65;
const capacidadMinTanque = 45;
const porcentajeMaxOcupado = 0.75;
//Valor obtenido como referencia de los medios de comunicación del porcentaje de autos que usan gasolina.
const porcentajeGasolina = 0.8;
const diesel = 0;
const gasolina = 1;
//Tiempo que toma preparar el carro para empezar a llenar el combustible en minutos
const tiempoPreLLenado = 0.5;
//Tiempo que toma retirar el carro de la bomba una vez que se le lleno combustible en minutos
const tiempoPosLlenado = 1;
//Tasa de tiempo de llegada maxima de carros a la estacion
const tasaLlegada = 2;
//La tasa a la que se simula el tiempo
const tasaSimulacion = 10;

module.exports.capacidadMaxTanque = capacidadMaxTanque;
module.exports.capacidadMinTanque = capacidadMinTanque;
module.exports.porcentajeMaxOcupado = porcentajeMaxOcupado;
module.exports.porcentajeGasolina = porcentajeGasolina;
module.exports.diesel = diesel;
module.exports.gasolina = gasolina;
module.exports.tiempoPreLLenado = tiempoPreLLenado;
module.exports.tiempoPosLlenado = tiempoPosLlenado;
module.exports.tasaLlegada = tasaLlegada;
module.exports.tasaSimulacion = tasaSimulacion;
