const carro = require("./Carro.js");
const bomba = require("./Bomba.js");
const cisterna = require("./Cisterna");

class Estacion {
  constructor(cantidadBombas, caudalBombas, nivelDiesel, nivelGasolina) {
    this.bombas = [];
    for (let i = 0; i < cantidadBombas; i++) {
      let bomba = new bomba.Bomba(caudalBombas);
      this.bombas.push(bomba);
    }
    this.nivelDieselInicial = nivelDiesel;
    this.nivelGasolinaInicial = nivelGasolina;
    this.nivelDiesel = nivelDiesel;
    this.nivelGasolina = nivelGasolina;
  }

  /** Getters y Setters de cantidadBombas */
  get getBombas() {
    return this.bombas;
  }

  set setBombas(bombas) {
    this.bombas = bombas;
  }

  /** Getters y Setters de nivelDiesel */
  get getNivelDiesel() {
    return this.nivelDiesel;
  }

  set setNivelDiesel(nivelDiesel) {
    this.nivelDiesel = nivelDiesel;
  }

  /** Getters y Setters de nivelGasolina */
  get getNivelGasolina() {
    return this.nivelGasolina;
  }

  set setNivelGasolina(nivelGasolina) {
    this.nivelGasolina = nivelGasolina;
  }

  /** Metodos adicionales */
  get getPorcentajeDieselLLeno() {
    return (this.nivelDiesel / this.nivelDieselInicial) * 100;
  }

  get getPorcentajeGasolinaLLeno() {
    return (this.nivelGasolina / this.nivelGasolinaInicial) * 100;
  }

  agregarCarro() {
    let bombaMenorCantidadPorAtender = 0;
    let menorCantidadPorAtender = this.bombas[0].getCantidadPorAtender();
    let carroAsignado = false;
    for (let i = 0; i < this.bombas.length; i++) {
      if (this.bombas[i].getDisponible()) {
        // Agregar a la primer bomba disponible
        this.bombas[i].agregarCarroPorAtender(new carro.Carro());
        carroAsignado = true;
        break;
      } else {
        // Si la bomba no esta disponible ir guardando cual tiene menor cola por si ninguna esta disponible
        if (this.bombas[i].getCantidadPorAtender() < menorCantidadPorAtender) {
          bombaMenorCantidadPorAtender = i;
          menorCantidadPorAtender = this.bombas[i].getCantidadPorAtender();
        }
      }
    }
    // Si ninguna bomba esta disponible se agrega a la que tiene la menor cola
    if (!carroAsignado) {
      this.bombas[bombaMenorCantidadPorAtender].agregarCarroPorAtender(
        new carro.Carro()
      );
    }
  }
}

module.exports.Estacion = Estacion;
