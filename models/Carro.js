const utils = require("./Utils.js");

class Carro {
  constructor() {
    // Capacidad maxima del tanque, se genera de manera pseudo-aleatorio según el rango [capacidadMinTanque, capacidadMaxTanque]
    this.capacidadMaxima = Math.round(
      Math.random() * (utils.capacidadMaxTanque - utils.capacidadMinTanque) +
        utils.capacidadMinTanque
    );
    // Capacidad ocupada o llena del tanque, se genera de manera pseudo-aleatorio segun el rango [0, this.capacidadMaxima*porcentajeMaxOcupado)
    this.capacidadOcupada =
      Math.random() * (this.capacidadMaxima * utils.porcentajeMaxOcupado);
    // Cantidad a llenar en la estación, se genera de manera pseudo-aleatorio segun el rango [0, this.capacidadMaxima-this.capacidadOcpada)
    this.cantidadLlenar =
      Math.random() * (this.capacidadMaxima - this.capacidadOcupada);
    // Tipo de combustible usado, generado de manera random, si se encuentra por debajo del porcentajeGasolina sera gasolina, sino diesel
    this.tipoCombustible =
      Math.random() < utils.porcentajeGasolina ? utils.gasolina : utils.diesel;
    this.cantidadLlenarInicial = this.cantidadLlenar;
  }

  /** Getters y Setters de capacidadMaxima */
  get getCapacidadMaxima() {
    return this.capacidadMaxima;
  }

  set setCapacidadMaxima(capacidadMaxima) {
    this.capacidadMaxima = capacidadMaxima;
  }

  /** Getters y Setters de capacidadOcupada */
  get getCapacidadOcupada() {
    return this.capacidadOcupada;
  }

  set setCapacidadOcupada(capacidadOcupada) {
    this.capacidadOcupada = capacidadOcupada;
  }

  /** Getters y Setters de cantidadLlenar */
  get getCantidadLlenar() {
    return this.cantidadLlenar;
  }

  set setCantidadLlenar(cantidadLlenar) {
    this.cantidadLlenar = cantidadLlenar;
  }

  /** Getters y Setters de cantidadLlenarInicial */
  get getCantidadLlenarInicial() {
    return this.cantidadLlenarInicial;
  }

  set setCantidadLlenarInicial(cantidadLlenarInicial) {
    this.cantidadLlenarInicial = cantidadLlenarInicial;
  }

  /** Getters y Setters de tipoCombustible */
  get getTipoCombustible() {
    return this.tipoCombustible;
  }

  set setTipoCOmbustible(tipoCombustible) {
    this.tipoCombustible = tipoCombustible;
  }

  /** Metodos adicionales */
  llenar(cantidad) {
    this.capacidadOcupada += cantidad;
    this.cantidadLlenar -= cantidad;
  }
}

module.exports.Carro = Carro;
