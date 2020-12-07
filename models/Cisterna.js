class Cisterna {
  constructor(capacidad, nivel, tipoCombustible) {
    this.capacidad = capacidad;
    this.nivel = nivel;
    this.tipoCombustible = tipoCombustible;
  }

  /** Getters y Setters de capacidad */
  get getCapacidad() {
    return this.capacidad;
  }

  set setCapacidad(capacidad) {
    this.capacidad = capacidad;
  }

  /** Getters y Setters de nivel */
  get getNivel() {
    return this.nivel;
  }

  set setNivel(nivel) {
    this.nivel = nivel;
  }

  /** Getters y Setters de tipoCombustible */
  get getTipoCombustible() {
    return this.tipoCombustible;
  }

  set setTipoCombustible(tipoCombustible) {
    this.tipoCombustible = tipoCombustible;
  }

  /** Metodos adicionales */
  bajarNivel(cantidad) {
    if (this.nivel > cantidad) {
      this.nivel -= cantidad;
      return true;
    } else {
      return false;
    }
  }

  get getPorcentajeOcupado() {
    return (this.nivel / this.capacidad) * 100;
  }
}

module.exports.Cisterna = Cisterna;
