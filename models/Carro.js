const capacidadMaxTanque = 65;
const capacidadMinTanque = 45;
const porcentajeMaxOcupado = 0.75;
//Valor obtenido como referencia de los medios de comunicación del porcentaje de autos que usan gasolina.
const porcentajeGasolina = 0.8;

class Carro {
  static diesel = 0;
  static gasolina = 1;

  constructor() {
    // Capacidad maxima del tanque, se genera de manera pseudo-pseudo-aleatoria según el rango [capacidadMinTanque, capacidadMaxTanque]
    this.capacidadMaxima = Math.round(
      Math.random() * (capacidadMaxTanque - capacidadMinTanque) +
        capacidadMinTanque
    );
    // Capacidad ocupada o llena del tanque, se genera de manera pseudo-aleatoria segun el rango [0, this.capacidadMaxima*porcentajeMaxOcupado)
    this.capacidadOcupada =
      Math.random() * (this.capacidadMaxima * porcentajeMaxOcupado);
    // Cantidad a llenar en la estación, se genera de manera pseudo-aleatoria segun el rango [0, this.capacidadMaxima-this.capacidadOcpada)
    this.cantidadLlenar =
      Math.random() * (this.capacidadMaxima - this.capacidadOcupada);
    // Tipo de combustible usado, generado de manera random, si se encuentra por debajo del porcentajeGasolina sera gasolina, sino diesel
    this.tipoCombustible =
      Math.random() < porcentajeGasolina ? Carro.gasolina : Carro.diesel;
  }

  /** Getters y Setters */
  get getCapacidadMaxima() {
    return this.capacidadMaxima;
  }

  get getCapacidadOcupada() {
    return this.capacidadOcupada;
  }

  set setCapacidadOcupada(cantidad) {
    this.capacidadOcupada += cantidad;
  }

  get getCantidadLlenar() {
    return this.cantidadLlenar;
  }

  get getTipoCombustible() {
    return this.tipoCombustible;
  }
}

module.exports.Carro = Carro;
