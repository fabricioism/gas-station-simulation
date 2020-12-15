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
    let i = Math.floor(Math.random() * this.bombas.length);
    this.bombas[i].agregarCarroPorAtender(new carro.Carro());
  }

  obtenerActualizacionBombas() {
    let bombas = this.bombas;
    let cargaUtilBombas = [];

    for (const bomba of bombas) {
      let atendidosLitrosGasolina = 0,
        atendidosCantidadGasolina = 0,
        atendidosLitrosDiesel = 0,
        atendidosCantidadDiesel = 0;

      if (!bomba.getDisponible) {
        let carroActual = bomba.getCarroAtendiendo;
        let tipo = carroActual.getTipoCombustible;
        switch (tipo) {
          case utils.gasolina:
            atendidosLitrosGasolina += carroActual.getCantidadLlenada;
            atendidosCantidadGasolina++;
            break;

          case utils.diesel:
            atendidosLitrosDiesel += carroActual.getCantidadLlenada;
            atendidosCantidadDiesel++;
            break;

          default:
            break;
        }
      }

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

      cargaUtilBombas.push({
        atendidosCantidad: atendidosCantidadGasolina + atendidosCantidadDiesel,
        atendidosLitros: atendidosLitrosGasolina + atendidosLitrosDiesel,
        atendidosLitrosGasolina,
        atendidosCantidadGasolina,
        atendidosLitrosDiesel,
        atendidosCantidadDiesel,
        porAtender: bomba.getCarrosPorAtender.length,
        porAtenderGasolina: bomba.getCarrosPorAtender.filter(
          (item) => item.getTipoCombustible == utils.gasolina
        ).length,
        porAtenderDiesel: bomba.getCarrosPorAtender.filter(
          (item) => item.getTipoCombustible == utils.diesel
        ).length,
      });
    }

    return cargaUtilBombas;
  }

  obtenerValor(bombas, llave) {
    let valor = 0;

    for (let i = 0; i < bombas.length; i++) {
      const bomba = bombas[i];
      valor += bomba[llave] ? bomba[llave] : 0;
    }

    return valor;
  }

  obtenerActualizacionResumen(bombas) {
    let noAtendidosCantidadGasolina = parseInt(
      this.obtenerValor(bombas, "porAtenderGasolina")
    );

    let noAtendidosCantidadDiesel = parseInt(
      this.obtenerValor(bombas, "porAtenderDiesel")
    );

    let noAtendidosCantidad =
      noAtendidosCantidadGasolina + noAtendidosCantidadDiesel;

    let atendidosCantidad = this.obtenerValor(bombas, "atendidosCantidad");

    let atendidosCantidadGasolina = this.obtenerValor(
      bombas,
      "atendidosCantidadGasolina"
    );

    let atendidosCantidadDiesel = this.obtenerValor(
      bombas,
      "atendidosCantidadDiesel"
    );

    let porcentajeAtendidosGasolina = isNaN(
      (atendidosCantidadGasolina / atendidosCantidad) * 100
    )
      ? 0
      : (atendidosCantidadGasolina / atendidosCantidad) * 100;

    let porcentajeAtendidosDiesel = isNaN(
      (atendidosCantidadDiesel / atendidosCantidad) * 100
    )
      ? 0
      : (atendidosCantidadDiesel / atendidosCantidad) * 100;

    let atendidosLitrosGasolina = this.obtenerValor(
      bombas,
      "atendidosLitrosGasolina"
    );

    let atendidosLitrosDiesel = this.obtenerValor(
      bombas,
      "atendidosLitrosDiesel"
    );

    let atendidosLitros = atendidosLitrosDiesel + atendidosLitrosGasolina;

    let ventaPromedioDiesel = isNaN(
      atendidosLitrosDiesel / atendidosCantidadDiesel
    )
      ? 0
      : atendidosLitrosDiesel / atendidosCantidadDiesel;

    let ventaPromedioGasolina = isNaN(
      atendidosLitrosGasolina / atendidosCantidadGasolina
    )
      ? 0
      : atendidosLitrosGasolina / atendidosCantidadGasolina;

    let ventaPromedio = isNaN(atendidosLitros / atendidosCantidad)
      ? 0
      : atendidosLitros / atendidosCantidad;
    return {
      atendidosCantidad,
      atendidosCantidadGasolina,
      atendidosCantidadDiesel,
      noAtendidosCantidad,
      noAtendidosCantidadGasolina,
      noAtendidosCantidadDiesel,
      porcentajeAtendidosGasolina,
      porcentajeAtendidosDiesel,
      atendidosLitros,
      atendidosLitrosGasolina,
      atendidosLitrosDiesel,
      ventaPromedioDiesel,
      ventaPromedioGasolina,
      ventaPromedio,
    };
  }
}

module.exports.Estacion = Estacion;
