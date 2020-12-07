const puerto = 3000;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const carro = require("./models/Carro.js");
const bomba = require("./models/Bomba");
const cisterna = require("./models/Cisterna");
const estacion = require("./models/Estacion");

app.use("/", express.static("front"));

let simulando = false;
let pausado = false;

io.on("connection", function (socket) {
  socket.on("iniciar", function (data) {
    console.log("Iniciando");
    console.log(JSON.stringify(data));
    if (!simulando) {
      //Agregar a la sala simulando para enviarle actualizaciones
      socket.join("simulando");
      simulando = true;
      // Iniciar simulacion, solo permitir una simulacion para evitar problemas con sockets
      // TODO
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
    actualizar();
  });
  socket.on("pausar", function (data) {
    console.log("Pausando");
    if (!pausado || !simulando) {
      pausado = true;
      // Pausar la simulacion
      // TODO
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
  socket.on("finalizar", function (data) {
    console.log("Finalizando");
    if (simulando) {
      simulando = false;
      pausado = false;
      // Finalizar la simulacion
      // TODO
      //Respuesta de vuelta al cliente
      socket.emit("respuesta-finalizar", {
        exito: true,
        mensaje: "Simulación finalizada.",
      });
      // Remover de la sala simulando para evitar enviarle actualizaciones
      socket.leave("simulando");
    } else {
      socket.emit("respuesta-finalizar", {
        exito: false,
        mensaje: "Parece que no se está simulando en este momento.",
      });
    }
  });
  socket.on("disconnect", function () {
    simulando = 0;
    console.log("Desconectado");
  });
});

function actualizar() {
  io.in("simulando").emit("actualizacion", {
    data: "Ejemplo de actualizacion",
  });
}

http.listen(puerto, function () {
  console.log("Servicio iniciado en puerto", puerto);
});
