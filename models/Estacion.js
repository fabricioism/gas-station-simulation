const carro = require("./Carro.js");
const bomba = require("./Bomba.js");
const cisterna = require("./Cisterna");
const utils = require("./Utils");

class Estacion {
  constructor(cantidadBombas, caudalBombas, nivelDiesel, nivelGasolina) {
    this.bombas = [];
    for (let i = 0; i < cantidadBombas; i++) {
      this.bombas.push(new bomba.Bomba(caudalBombas));
    }
    this.cisternaDiesel = new cisterna.Cisterna(
      nivelDiesel,
      nivelDiesel,
      utils.diesel
    );
    this.cisternaGasolina = new cisterna.Cisterna(
      nivelGasolina,
      nivelGasolina,
      utils.gasolina
    );
  }

  /** Getters y Setters de cantidadBombas */
  get getBombas() {
    return this.bombas;
  }

  set setBombas(bombas) {
    this.bombas = bombas;
  }

  /** Getters y Setters de cisternaDiesel */
  get getCisternaDiesel() {
    return this.cisternaDiesel;
  }

  set setCisternaDiesel(cisternaDiesel) {
    this.cisternaDiesel = cisternaDiesel;
  }

  /** Getters y Setters de cisternaDiesel */
  get getCisternaGasolina() {
    return this.cisternaGasolina;
  }

  set setCisternaGasolina(cisternaGasolina) {
    this.cisternaGasolina = cisternaGasolina;
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
    let menorCantidadPorAtender = this.bombas[0].getCantidadPorAtender;
    let carroAsignado = false;
    for (let i = 0; i < this.bombas.length; i++) {
      if (this.bombas[i].getDisponible) {
        // Agregar a la primer bomba disponible
        this.bombas[i].agregarCarroPorAtender(new carro.Carro());
        carroAsignado = true;
        break;
      } else {
        // Si la bomba no esta disponible ir guardando cual tiene menor cola por si ninguna esta disponible
        if (this.bombas[i].getCantidadPorAtender < menorCantidadPorAtender) {
          bombaMenorCantidadPorAtender = i;
          menorCantidadPorAtender = this.bombas[i].getCantidadPorAtender;
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

  obtenerActualizacionBombas() {
    let bombas = this.bombas;
    let cargaUtil = [];

    for (const bomba of bombas) {
      let atendidosLitrosGasolina = 0,
        atendidosCantidadGasolina = 0,
        atendidosLitrosDiesel = 0,
        atendidosCantidadDiesel = 0;

      for (let i = 0; i < bomba.carrosAtendidos.length; i++) {
        const carro = bomba.carrosAtendidos[i];

        let tipo = carro.getTipoCombustible;

        switch (tipo) {
          case utils.gasolina:
            atendidosLitrosGasolina += carro.getCantidadLlenada;
            atendidosCantidadGasolina++;
            break;

          case utils.diesel:
            atendidosLitrosDiesel += carro.getCantidadLlenada;
            atendidosCantidadDiesel++;
            break;

          default:
            break;
        }
      }

      // Solo tomando dos cifras despues del punto de los litros vendidos
      atendidosLitrosGasolina = atendidosLitrosGasolina;
      atendidosLitrosDiesel = atendidosLitrosDiesel;

      cargaUtil.push({
        atendidosCantidad: atendidosCantidadGasolina + atendidosCantidadDiesel,
        atendidosLitros: atendidosLitrosGasolina + atendidosLitrosDiesel,
        atendidosLitrosGasolina,
        atendidosCantidadGasolina,
        atendidosLitrosDiesel,
        atendidosCantidadDiesel,
        porAtender: bomba.getCarrosPorAtender.length,
      });
    }
    return cargaUtil;
  }
}

module.exports.Estacion = Estacion;
