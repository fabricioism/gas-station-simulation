const fs = require("fs");

// Constantes
const diesel = 0;
const gasolina = 1;
const tasaSimulacion = 10; // Valor por defecto, puede ser otro ingresado por el usuario
// Fin Constantes

// Variables de estado
var capacidadMaxTanque = null;
var capacidadMinTanque = null;
var porcentajeMaxOcupado = null;
var porcentajeGasolina = null;
var tiempoPreLlenado = null;
var tiempoPosLlenado = null;
var tasaLlegada = null;
// Fin Variables de estado

function obtenerCapacidadMaxTanque() {
  if (capacidadMaxTanque == null) cargarDatos();
  return capacidadMaxTanque;
}

function obtenerCapacidadMinTanque() {
  if (capacidadMinTanque == null) cargarDatos();
  return capacidadMinTanque;
}

function obtenerPorcentajeMaxOcupado() {
  if (porcentajeMaxOcupado == null) cargarDatos();
  return porcentajeMaxOcupado;
}

function obtenerPorcentajeGasolina() {
  if (porcentajeGasolina == null) cargarDatos();
  return porcentajeGasolina;
}

function obtenerTiempoPreLlenado() {
  if (tiempoPreLlenado == null) cargarDatos();
  return tiempoPreLlenado;
}

function obtenerTiempoPosLlenado() {
  if (tiempoPosLlenado == null) cargarDatos();
  return tiempoPosLlenado;
}

function obtenerTasaLlegada() {
  if (tasaLlegada == null) cargarDatos();
  return tasaLlegada;
}

function cargarDatos() {
  let archivo = fs.readFileSync("models/variables-estado.json");
  let variablesEstado = JSON.parse(archivo);
  capacidadMaxTanque = variablesEstado.capacidadMaxTanque;
  capacidadMinTanque = variablesEstado.capacidadMinTanque;
  porcentajeMaxOcupado = variablesEstado.porcentajeMaxOcupado;
  porcentajeGasolina = variablesEstado.porcentajeGasolina;
  tiempoPreLlenado = variablesEstado.tiempoPreLlenado;
  tiempoPosLlenado = variablesEstado.tiempoPosLlenado;
  tasaLlegada = variablesEstado.tasaLlegada;
}

function guardarDatos() {
  let variablesEstadoJSON = {
    capacidadMaxTanque,
    capacidadMinTanque,
    porcentajeMaxOcupado,
    porcentajeGasolina,
    tiempoPreLlenado,
    tiempoPosLlenado,
    tasaLlegada,
  };
  fs.writeFileSync("models/variables-estado.json", JSON.stringify(variablesEstadoJSON));
}

function actualizarDatos(data) {
  capacidadMaxTanque = data.capacidadMaxTanque;
  capacidadMinTanque = data.capacidadMinTanque;
  porcentajeMaxOcupado = data.porcentajeMaxOcupado;
  porcentajeGasolina = data.porcentajeGasolina;
  tiempoPreLlenado = data.tiempoPreLlenado;
  tiempoPosLlenado = data.tiempoPosLlenado;
  tasaLlegada = data.tasaLlegada;
  guardarDatos();
}

function obtenerDatos() {
  cargarDatos();
  let variablesEstadoJSON = {
    capacidadMaxTanque,
    capacidadMinTanque,
    porcentajeMaxOcupado,
    porcentajeGasolina,
    tiempoPreLlenado,
    tiempoPosLlenado,
    tasaLlegada,
  };
  return variablesEstadoJSON;
}

module.exports.diesel = diesel;
module.exports.gasolina = gasolina;
module.exports.tasaSimulacion = tasaSimulacion;
module.exports.obtenerCapacidadMaxTanque = obtenerCapacidadMaxTanque;
module.exports.obtenerCapacidadMinTanque = obtenerCapacidadMinTanque;
module.exports.obtenerPorcentajeMaxOcupado = obtenerPorcentajeMaxOcupado;
module.exports.obtenerPorcentajeGasolina = obtenerPorcentajeGasolina;
module.exports.obtenerTiempoPreLlenado = obtenerTiempoPreLlenado;
module.exports.obtenerTiempoPosLlenado = obtenerTiempoPosLlenado;
module.exports.obtenerTasaLlegada = obtenerTasaLlegada;
module.exports.actualizarDatos = actualizarDatos;
module.exports.obtenerDatos = obtenerDatos;
