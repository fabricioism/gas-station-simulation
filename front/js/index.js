const socket = io(`http://localhost:3000`);

const btnIniciar = document.getElementById("btn-iniciar");

btnIniciar.addEventListener("click", function (e) {
  console.log("Boton iniciar");
  socket.emit("iniciar", { data: "prueba" });
});

// MANEJO DE RESPUESTAS SOCKETS
/* socket.on("nombre-evento", function (data) {
 *   //manejo de respuesta a nombre-evento
 * });
 */

socket.on("respuesta-iniciar", function (data) {
  console.log("Respuesta iniciar recibida", JSON.stringify(data));
});

// FIN MANEJO DE RESPUESTAS SOCKETS
