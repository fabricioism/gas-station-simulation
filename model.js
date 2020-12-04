const capacidadMaxTanque = 65;
const capacidadMinTanque = 45;
const porcentajeMaxOcupado = 0.75;
const porcentajeGasolina = 0.8;

class Carro {
  static diesel = 0;
  static gasolina = 1;

  constructor(alto, ancho) {
    // Capacidad maxima del tanque, se genera de manera aleatoria segun el rango [capacidadMinTanque, capacidadMaxTanque]
    this.capacidadMaxima = Math.round(
      Math.random() * (capacidadMaxTanque - capacidadMinTanque) +
        capacidadMinTanque
    );
    // Capacidad ocupada o llena del tanque, se genera de manera aleatoria segun el rango [0, this.capacidadMaxima*porcentajeMaxOcupado)
    this.capacidadOcpada =
      Math.random() * (this.capacidadMaxima * porcentajeMaxOcupado);
    // Cantidad a llenar en la estación, se genera de manera aleatoria segun el rango [0, this.capacidadMaxima-this.capacidadOcpada)
    this.cantidadLlenar =
      Math.random() * (this.capacidadMaxima - this.capacidadOcpada);
    // Tipo de combustible usado, generado de manera random, si se encuentra por debajo del porcentajeGasolina sera gasolina, sino diesel
    this.tipoCombustible =
      Math.random() < porcentajeGasolina ? Carro.gasolina : Carro.diesel;
  }
}

module.exports.Carro = Carro;
