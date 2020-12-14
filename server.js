const puerto = 3000;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const hypertimer = require("hypertimer");
const estacion = require("./models/Estacion");
const utils = require("./models/Utils");

const timer = hypertimer({
  rate: utils.tasaSimulacion,
});

app.use("/", express.static("front"));
app.use("/hypertimer", express.static("node_modules/hypertimer/dist"));

let simulando = false;
let finalizado = false;
let pausado = false;
let estacionSimulacion;
let timeouts = [];

io.on("connection", function (socket) {
  socket.on("variables-estado", function (data) {
    console.log(data);
    if (
      data.capacidadMaxTanque < 0 ||
      data.capacidadMinTanque < 0 ||
      data.capacidadMinTanque > data.capacidadMaxTanque ||
      data.tiempoPreLlenado < 0 ||
      data.tiempoPosLlenado < 0 ||
      data.porcentajeMaxOcupado < 0 ||
      data.porcentajeMaxOcupado > 1 ||
      data.porcentajeGasolina < 0 ||
      data.porcentajeGasolina > 1 ||
      data.tasaLlegada < 0
    ) {
      socket.emit("respuesta-variables-estado", {
        exito: false,
        mensaje:
          "Ingrese valores válidos. \n Capacidades deben ser mayores a 0 con capacidad mínima < capacidad máxima. \n Tiempos y tasas deben ser mayores a 0. \n Porcentajes deben estar entre 0 y 1.",
      });
    } else {
      utils.capacidadMaxTanque = data.capacidadMaxTanque;
      utils.capacidadMinTanque = data.capacidadMinTanque;
      utils.tiempoPreLLenado = data.tiempoPreLlenado;
      utils.tiempoPosLlenado = data.tiempoPosLlenado;
      utils.porcentajeMaxOcupado = data.porcentajeMaxOcupado;
      utils.porcentajeGasolina = data.porcentajeGasolina;
      utils.tasaLlegada = data.tasaLlegada;
      socket.emit("respuesta-variables-estado", {
        exito: true,
        mensaje: "Variables de estado guardadas.",
      });
    }
  });
  socket.on("iniciar", function (data) {
    console.log("Iniciando");
    if (!simulando) {
      timer.config({ rate: data.velocidad_simulacion }); //Configurando la tasa de velocidad de la simulación
      //Agregar a la sala simulando para enviarle actualizaciones
      socket.join("simulando");
      simulando = true;
      // Iniciar simulacion, solo permitir una simulacion para evitar problemas con sockets
      iniciar(data);
      //Respuesta de vuelta al cliente
      socket.emit("respuesta-iniciar", {
        exito: true,
        mensaje: "Simulación iniciada.",
      });
    } else {
      socket.emit("respuesta-iniciar", {
        exito: false,
        mensaje: "Parece que ya se está simulando.",
      });
    }
    //Empezar a enviar actualizaciones al cliente
    actualizar();
  });
  socket.on("pausar", function (data) {
    console.log("PAUSANDO");
    if (!pausado || simulando) {
      pausado = true;
      console.log("PAUSADO", pausado);
      // Pausar la simulacion
      // TODO
      timer.pause();
      //Respuesta de vuelta al cliente
      socket.emit("respuesta-pausar", {
        exito: true,
        mensaje: "Simulación pausada.",
      });
    } else {
      socket.emit("respuesta-pausar", {
        exito: false,
        mensaje:
          "Parece que ya se pausó o no se está simulando en este momento.",
      });
    }
  });
  socket.on("continuar", function (data) {
    console.log("CONTINUANDO");
    if (pausado) {
      pausado = false;
      simulando = true;
      // Continuar la simulacion
      // TODO
      timer.continue();
      timeoutAgregarCarro();
      //Respuesta de vuelta al cliente
      socket.emit("respuesta-continuar", {
        exito: true,
        mensaje: "Continuando con la simulación.",
      });
    } else {
      socket.emit("respuesta-continuar", {
        exito: false,
        mensaje: "Parece que la simulación no está pausada.",
      });
    }
  });
  socket.on("finalizar", function (data) {
    console.log("Finalizando");
    if (simulando) {
      simulando = false;
      pausado = false;
      finalizado = true;
      // Finalizar la simulacion
      timeouts.forEach((timeout) => {
        timer.clearTimeout(timeout);
      });
      //Respuesta de vuelta al cliente
      socket.emit("respuesta-finalizar", {
        exito: true,
        mensaje: "Simulación finalizada.",
      });
      // Remover de la sala simulando para evitar enviarle actualizaciones
    } else {
      socket.emit("respuesta-finalizar", {
        exito: false,
        mensaje: "Parece que no se está simulando en este momento.",
      });
    }
  });
  socket.on("disconnect", function () {
    socket.leave("simulando");
    simulando = 0;
    console.log("Desconectado");
  });
});

function iniciar(data) {
  pausado = false;
  finalizado = false;
  estacionSimulacion = new estacion.Estacion(
    data.cantidad_bombas,
    data.flujo_bombas,
    data.cantidad_diesel,
    data.cantidad_gasolina
  );
  timeoutAgregarCarro();
}

function timeoutAgregarCarro() {
  if (!pausado && !finalizado) {
    console.log("Carro agregado");
    let t = Math.round(Math.random() * utils.tasaLlegada * 60 * 1000);
    timeouts["llegadaCarros"] = timer.setTimeout(function () {
      estacionSimulacion.agregarCarro();
      timeoutAgregarCarro();
    }, t);
    atender();
  }
}

/** Funcion que se encarga de atender la llegada de un auto a la bomba, dentro de ella se hacen las actualizaciones */
function atender() {
  //Revisar si aun hay combustible en la estacion, aunque sea solo de un tipo
  if (
    estacionSimulacion.getCisternaDiesel.getNivel > 0 ||
    estacionSimulacion.getCisternaGasolina.getNivel > 0
  ) {
    //Recorrer todas las bombas
    for (let i = 0; i < estacionSimulacion.bombas.length; i++) {
      //Revisar las que tengan carros por atender y esten disponibles para poner a atender
      if (
        estacionSimulacion.bombas[i].getDisponible &&
        estacionSimulacion.bombas[i].getCantidadPorAtender > 0
      ) {
        //Obtener el siguiente carro a atender de la bomba
        let carroAtender = estacionSimulacion.bombas[
          i
        ].obtenerCarroPorAtender();
        let seraAtendido = false;
        //Revisar si hay combustible del tipo que desea
        switch (carroAtender.getTipoCombustible) {
          case utils.diesel:
            //El carro es diesel y hay diesel
            if (estacionSimulacion.getCisternaDiesel.getNivel > 0) {
              seraAtendido = true;
              //Se le abastecerá todo lo solicitado al carro
              if (
                estacionSimulacion.getCisternaDiesel.getNivel >=
                carroAtender.getCantidadLlenar
              ) {
                estacionSimulacion.getCisternaDiesel.bajarNivel(
                  carroAtender.getCantidadLlenar
                );
                carroAtender.llenar(carroAtender.getCantidadLlenar);
              }
              //Se le abatecio solo lo que quedaba disponible
              else {
                carroAtender.llenar(
                  estacionSimulacion.getCisternaDiesel.getNivel
                );
                estacionSimulacion.getCisternaDiesel.bajarNivel(
                  estacionSimulacion.getCisternaDiesel.getNivel
                );
              }
            }
            //El carro es diesel y no hay diesel, reducir i para que al aumento del for vuelva a revisar la misma bomba
            else {
              i--;
            }
            break;
          case utils.gasolina:
            if (estacionSimulacion.getCisternaGasolina.getNivel > 0) {
              seraAtendido = true;
              //Se le abatecio todo lo solicitado al carro
              if (
                estacionSimulacion.getCisternaGasolina.getNivel >=
                carroAtender.getCantidadLlenar
              ) {
                estacionSimulacion.getCisternaGasolina.bajarNivel(
                  carroAtender.getCantidadLlenar
                );
                carroAtender.llenar(carroAtender.getCantidadLlenar);
              }
              //Se le abatecio solo lo que quedaba disponible
              else {
                carroAtender.llenar(
                  estacionSimulacion.getCisternaGasolina.getNivel
                );
                estacionSimulacion.getCisternaGasolina.bajarNivel(
                  estacionSimulacion.getCisternaGasolina.getNivel
                );
              }
            }
            //El carro es gasolina y no hay gasolina, reducir i para que al aumento del for vuelva a revisar la misma bomba
            else {
              i--;
            }
            break;
          default:
        }
        if (seraAtendido) {
          //Mover el carro a atendiendo
          estacionSimulacion.bombas[i].setCarroAtendiendo = carroAtender;
          //La bomba ahora esta ocupada
          estacionSimulacion.bombas[i].setDisponible = false;
          //Timeout para terminar llenado del carro
          let t =
            Math.round(
              utils.tiempoPreLLenado +
                estacionSimulacion.bombas[i].obtenerTiempoAtencion(
                  carroAtender
                ) +
                utils.tiempoPosLlenado
            ) *
            60 *
            1000;
          timeouts[`bomba-${i}`] = timer.setTimeout(function () {
            estacionSimulacion.bombas[i].setDisponible = true;
            estacionSimulacion.bombas[i].agregarCarroAtendido(
              estacionSimulacion.bombas[i].getCarroAtendiendo
            );
            atender();
          }, t);
        }
      }
    }
  } else {
    finalizado = true;
    simulando = false;
    console.log("No hay combustible");
  }
  actualizar();
}

function actualizar() {
  //Objeto el cual se enviará en cada actualización
  let porcentajesCombustible = {
    porcentajeDiesel: estacionSimulacion.getCisternaDiesel.getPorcentajeOcupado,
    porcentajeGasolina:
      estacionSimulacion.getCisternaGasolina.getPorcentajeOcupado,
    finalizado,
  };

  let bombas = estacionSimulacion.obtenerActualizacionBombas();
  let resumen = estacionSimulacion.obtenerActualizacionResumen(bombas);
  let data = { ...porcentajesCombustible, bombas, resumen };
  io.in("simulando").emit("actualizacion", data);
}

http.listen(puerto, function () {
  console.log("Servicio iniciado en puerto", puerto);
});
