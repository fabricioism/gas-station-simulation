class Almacen {
  constructor(capacidad, nivel) {
    this.capacidad = capacidad;
    this.nivel = nivel;
  }

  /** Getters y Setters de capacidad */
  get getCapacidad() {
    return this.capacidad;
  }

  /** Getters y Setters de nivel */
  get getNivel() {
    return this.nivel;
  }

  /** Se resta al nivel actual la cantidad enviada como parámetro */
  set setNivel(cantidad) {
    this.nivel -= cantidad;
  }
}

module.exports.Almacen = Almacen;
