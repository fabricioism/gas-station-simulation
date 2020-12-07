class Bomba {
  constructor(caudal) {
    this.caudal = caudal; //Caudal del flujo de combustible de la bomba
    this.carrosAtendidos = []; //Coleccion de autos que se han atendido en la bomba
    this.carrosPorAtender = []; //Coleccion de autos que quieren servirse de la bomba
    this.disponible = true; // Estado de disponibilidad de la bomba
  }

  /** Getters y Setters de caudal */
  get getCaudal() {
    return this.caudal;
  }

  set setCaudal(caudal) {
    this.caudal = caudal;
  }

  /** Getters y Setters de carrosAtendidos */
  get getCarrosAtendidos() {
    return this.carrosAtendidos;
  }

  set setCarrosAtendidos(carrosAtendidos) {
    this.carrosAtendidos = carrosAtendidos;
  }

  /** Getters y Setters de carrosPorAtender */
  get getCarrosPorAtender() {
    return this.carrosPorAtender;
  }

  set setCarrosPorAtender(carrosPorAtender) {
    this.carrosPorAtender = carrosPorAtender;
  }

  /** Getters y Setters de disponible */
  get getDisponible() {
    return this.disponible;
  }

  set setDisponible(disponible) {
    this.disponible = disponible;
  }

  /** Metodos adicionales */
  agregarCarroPorAtender(carro) {
    this.carrosPorAtender.push(carro);
  }

  obtenerCarroPorAtender() {
    let carroAtender = this.carrosPorAtender.shift();
    return carroAtender;
  }

  agregarCarroAtendido(carro) {
    this.carrosAtendidos.push(carro);
  }

  get getCantidadPorAtender() {
    return this.carrosPorAtender.length;
  }

  get getCantidadAtendidos() {
    return this.carrosAtendidos.length;
  }
}

module.exports.Bomba = Bomba;
