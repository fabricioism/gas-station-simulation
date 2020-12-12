const socket = io(`http://localhost:3000`);

// Hypertimer para simulacion de tiempo
var hypertimer = hypertimer({ rate: 10 });

const btnIniciar = document.getElementById("btn-iniciar");
const porcentajeDiesel = document.getElementById("porcentaje-diesel");
const porcentajeGasolina = document.getElementById("porcentaje-gasolina");

// MANEJO DE RESPUESTAS SOCKETS
/* socket.on("nombre-evento", function (data) {
 *   //manejo de respuesta a nombre-evento
 * });
 */
socket.on("respuesta-iniciar", function (data) {
  if (data.exito) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
socket.on("respuesta-pausar", function (data) {
  if (data.exito) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
socket.on("respuesta-continuar", function (data) {
  if (data.exito) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
socket.on("respuesta-finalizar", function (data) {
  if (data.exito) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${data.mensaje}`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
socket.on("actualizacion", function (data) {
  actualizarPorcentajes(data);
  actualizarBombas(data);
  console.log("Actualizacion recibida", data);
});

// FIN MANEJO DE RESPUESTAS SOCKETS

// Gestion de la informacion
let temporizador = document.getElementById("temporizador");
let resetear = document.getElementById("resetear");
let pausar = document.getElementById('pausar');
let continuar = document.getElementById('continuar');
let botones = document.getElementById("botones");
let tiempo = 0,
  intervale = 0;
let verificador = false;

resetear.disabled = "disabled";

init();

/* iniciar, pausar, continuar, finalizar */

function init() {
    btnIniciar.addEventListener("click", function (e) {
      let data = obtenerInformacion();
      hypertimer.config({ rate: parseInt(data.velocidad_simulacion) });
      socket.emit("iniciar", data);
      gestionBombas(data);
      iniciarCronometro();
    });
    resetear.addEventListener("click", resetearCronometro);
    pausar.addEventListener("click",pausarCronometro);
}

function iniciarCronometro() {
  data = obtenerInformacion();
    intervalo = hypertimer.setInterval(function () {
      tiempo += 0.01;
      temporizador.innerHTML = `${tiempo.toFixed(2)}min`;
    }, 600);
    resetear.disabled = false;
    btnIniciar.style.display = 'none';
    pausar.style.display = 'block';
  } 

function continuarCronometro(){
  intervalo = hypertimer.setInterval(function () {
    tiempo += 0.01;
    temporizador.innerHTML = `${tiempo.toFixed(2)}min`;
  }, 600);
  continuar.style.display = 'none';
  pausar.style.display = 'block';
}

function pausarCronometro(){
  hypertimer.clearInterval(intervalo);
  socket.emit("pausar", {});
}

function resetearCronometro() {
  btnIniciar.className = "btn btn-info";
  btnIniciar.innerHTML = ` 
       <b>Iniciar</b>
     `;
  verificador = false;
  tiempo = 0.0;
  temporizador.innerHTML = `${tiempo}.00min`;
  hypertimer.clearInterval(intervalo);
  resetear.disabled = "disabled";
  document.getElementById("bombas").disabled = false;
  document.getElementById("diesel").disabled = false;
  document.getElementById("gasolina").disabled = false;
  document.getElementById("flujo").disabled = false;
  document.getElementById("velocidad").disabled = false;
  socket.emit("finalizar", {});
}

function obtenerInformacion() {
  let Entradas = {
    cantidad_bombas: document.getElementById("bombas").value,
    cantidad_diesel: document.getElementById("diesel").value,
    cantidad_gasolina: document.getElementById("gasolina").value,
    flujo_bombas: document.getElementById("flujo").value,
    velocidad_simulacion: document.getElementById("velocidad").value,
  };

  document.getElementById("bombas").disabled = "disabled";
  document.getElementById("diesel").disabled = "disabled";
  document.getElementById("gasolina").disabled = "disabled";
  document.getElementById("flujo").disabled = "disabled";
  document.getElementById("velocidad").disabled = "disabled";
  return Entradas;
}

function gestionBombas(data) {
  let contenedor_bombas = document.getElementById("contenedor_bombas");
  contenedor_bombas.innerHTML = "";

  for (let i = 0; i < data.cantidad_bombas; i++) {
    contenedor_bombas.innerHTML += `
        <div class="col-6 bomba">
        <h5>BOMBA # ${i + 1}</h5>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col" class="titulo-tabla">Atentidos</th>
              <th scope="col" class="titulo-tabla">Diesel</th>
              <th scope="col" class="titulo-tabla">Gasolina</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="atendidos-cantidad-${i}" class="cantidad-autos">0</td>
              <td id="atendidos-cantidad-diesel-${i}" class="cantidad-autos" style="color: #ffca2b">
                0
              </td>
              <td id="atendidos-cantidad-gasolina-${i}" class="cantidad-autos" style="color: #dc3545">
                0
              </td>
            </tr>
            <tr>
              <td id="atendidos-litros-${i}" class="cantidad-litros">0 litros</td>
              <td id="atendidos-litros-diesel-${i}" class="cantidad-litros" style="color: #ffca2b">
                0 litros
              </td>
              <td id="atendidos-litros-gasolina-${i}" class="cantidad-litros" style="color: #dc3545">
                0 litros
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

function actualizarPorcentajes(data) {
  nivelDiesel = Math.round(data.porcentajeDiesel);
  nivelGasolina = Math.round(data.porcentajeGasolina);
  porcentajeDiesel.style.width = `${nivelDiesel}%`;
  porcentajeDiesel.setAttribute("aria-valuenow", `${nivelDiesel}`);
  porcentajeGasolina.style.width = `${nivelGasolina}%`;
  porcentajeGasolina.setAttribute("aria-valuenow", `${nivelGasolina}`);
}

function actualizarBombas(data) {
  for (let i = 0; i < data.bombas.length; i++) {
    let bomba = data.bombas[i];
    let atendidosCantidad = document.getElementById(`atendidos-cantidad-${i}`);
    let atendidosCantidadDiesel = document.getElementById(
      `atendidos-cantidad-diesel-${i}`
    );
    let atendidosCantidadGasolina = document.getElementById(
      `atendidos-cantidad-gasolina-${i}`
    );
    let atendidosLitros = document.getElementById(`atendidos-litros-${i}`);
    let atendidosLitrosDiesel = document.getElementById(
      `atendidos-litros-diesel-${i}`
    );
    let atendidosLitrosGasolina = document.getElementById(
      `atendidos-litros-gasolina-${i}`
    );
    atendidosCantidad.innerHTML = bomba.atendidosCantidad;
    atendidosCantidadDiesel.innerHTML = bomba.atendidosCantidadDiesel;
    atendidosCantidadGasolina.innerHTML = bomba.atendidosCantidadGasolina;
    atendidosLitros.innerHTML = bomba.atendidosLitros.toFixed(2) + " litros";
    atendidosLitrosDiesel.innerHTML =
      bomba.atendidosLitrosDiesel.toFixed(2) + " litros";
    atendidosLitrosGasolina.innerHTML =
      bomba.atendidosLitrosGasolina.toFixed(2) + " litros";
  }
}
