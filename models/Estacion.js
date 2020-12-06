const carro = require("./Carro.js");
const bomba = require("./Bomba.js");
const almacen = require("./Almacen");

class Estacion {
  constructor(
    cantidadBombas,
    cantidadCarros,
    nivelDiesel,
    nivelGasolina,
    tiempoSimulacion
  ) {
    this.cantidadBombas = cantidadBombas;
    this.cantidadCarros = cantidadCarros;
    this.nivelDiesel = nivelDiesel;
    this.nivelGasolina = nivelGasolina;
    this.tiempoSimulacion = tiempoSimulacion;
  }

  /** Getters y setters */
  get getCantidadBombas() {
    return this.cantidadBombas;
  }

  get getCantidadCarros() {
    return this.cantidadCarros;
  }

  get getNivelDiesel() {
    return this.nivelDiesel;
  }

  get getNivelGasolina() {
    return this.nivelGasolina;
  }

  get getTiempoSimulacion() {
    return this.tiempoSimulacion;
  }
}

module.exports.Estacion = Estacion;
