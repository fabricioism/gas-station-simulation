class Bomba {
  constructor(caudal) {
    this.caudal = caudal; //Caudal del flujo de combustible de la bomba
    this.coleccionCarrosAtendidos = []; //Coleccion de autos que se han atendido en la bomba
    this.coleccionCarrosPorAtender = []; //Coleccion de autos que quieren servirse de la bomba
    this.estado = true; // Estado de disponibilidad de la bomba
  }

  /** Getters y Setters */
  //Caudal
  get getCaudal() {
    return this.caudal;
  }

  //Estado
  get getEstado() {
    return this.estado;
  }

  set setEstado(estado) {
    this.estado = estado;
  }

  //ColeccionCarrosPorAtender
  get getColeccionCarrosPorAtender() {
    return this.coleccionCarrosPorAtender;
  }

  //Metodo que inserta a la coleccion un nuevo auto a los carros que quieren usar esta bomba
  set setMeterCarroColeccionPorAtender(carro) {
    this.coleccionCarrosPorAtender.push(carro);
  }

  //Metodo que saca de la coleccion de autos por atender un carro ya atendido, el que sigue en la fila
  set setSacarCarroColeccionPorAtender() {
    let carroRemovido = this.coleccionCarrosPorAtender.shift();
    return carroRemovido;
  }

  //ColeccionCarrosAtendidos
  get getColeccionCarrosAtendidos() {
    return this.getColeccionCarrosAtendidos;
  }

  //Insertar un nuevo carro en la fila de autos atendidos
  set setColeccionCarrosAtendidos(carro) {
    this.coleccionCarrosAtendidos.push(carro);
  }
}

module.exports.Bomba = Bomba;
