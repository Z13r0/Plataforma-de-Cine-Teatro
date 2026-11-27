// Microservicio de contenido: transporte HTTP, contenido y destacados.
// Un solo archivo por microservicio. El mapeo DTO del backend → modelo de vista
// vive en mappers/contenidoMapper.js.

import { API_BASE_URL } from "./config";
import {
  mapearContenido,
  mapearListaContenidos,
} from "./mappers/contenidoMapper";

// ============ TRANSPORTE HTTP ============

// Error HTTP con el código de estado para distinguir 404 de fallos reales.
class ErrorApi extends Error {
  constructor(ruta, status) {
    super(`Error ${status} al consultar ${ruta}`);
    this.name = "ErrorApi";
    this.status = status;
  }
}

// GET: consulta una ruta del gateway y devuelve su JSON.
async function get(ruta) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

// POST: envía datos como cuerpo JSON y devuelve el JSON creado.
async function post(ruta, datos) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

// PUT: reemplaza un recurso con el cuerpo JSON enviado y devuelve el JSON actualizado.
async function put(ruta, datos) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

// PATCH: aplica un cambio puntual indicado en la ruta (query param) y devuelve el JSON actualizado.
async function patch(ruta) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`, { method: "PATCH" });

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

// ============ CONTENIDO ============

// Catálogo de contenido activo (visible para el público).
export async function listarContenidos() {
  const contenidos = await get("/api/v1/contenidos");
  return mapearListaContenidos(contenidos).filter((contenido) => contenido.activo);
}

// Contenido por id. Devuelve null si no existe o no está activo (como "no encontrado").
export async function obtenerContenido(id) {
  let dto;
  try {
    dto = await get(`/api/v1/contenidos/${id}`);
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404) {
      return null;
    }
    throw error;
  }

  const contenido = mapearContenido(dto);
  return contenido.activo ? contenido : null;
}

// Catálogo completo para el admin: incluye el contenido inactivo.
export async function listarTodosContenidos() {
  const contenidos = await get("/api/v1/contenidos");
  return mapearListaContenidos(contenidos);
}

// Crea una película u obra. Recibe el formato del backend y devuelve el contenido creado.
export async function crearContenido(datos) {
  const dto = await post("/api/v1/contenidos", datos);
  return mapearContenido(dto);
}

// Actualiza una película u obra por id y devuelve el contenido actualizado.
export async function actualizarContenido(id, datos) {
  const dto = await put(`/api/v1/contenidos/${id}`, datos);
  return mapearContenido(dto);
}

// Activa o desactiva un contenido (papelera y restaurar del admin).
export async function cambiarActivo(id, activo) {
  const dto = await patch(`/api/v1/contenidos/${id}/activo?activo=${activo}`);
  return mapearContenido(dto);
}

// ============ DESTACADOS ============

// Presentación del carrusel por tipo de contenido: badge, colores del botón y su texto.
const PRESENTACION_POR_TIPO = {
  cine: {
    etiqueta: "Estreno de Cine",
    insignia: "bg-warning text-dark",
    boton: "btn-danger",
    textoBoton: "Ver Funciones",
  },
  teatro: {
    etiqueta: "Gran Obra de Teatro",
    insignia: "bg-primary",
    boton: "btn-primary",
    textoBoton: "Reservar Butacas",
  },
};

// Contenido destacado y activo (selección del admin) para el carrusel de inicio.
export async function listarDestacados() {
  const contenidos = await get("/api/v1/contenidos/destacados");
  return mapearListaContenidos(contenidos);
}

// Marca o quita el destacado de un contenido (el botón de estrella del admin).
export async function cambiarDestacado(id, destacado) {
  const dto = await patch(`/api/v1/contenidos/${id}/destacado?destacado=${destacado}`);
  return mapearContenido(dto);
}

// Slides del carrusel listos para renderizar (N destacados).
export async function obtenerDestacados() {
  const contenidos = await listarDestacados();

  return contenidos.map((contenido) => {
    const presentacion =
      PRESENTACION_POR_TIPO[contenido.tipo] || PRESENTACION_POR_TIPO.cine;

    return {
      id: contenido.id,
      tipo: contenido.tipo,
      titulo: contenido.titulo,
      imagen: contenido.imagen,
      descripcion: contenido.sinopsis,
      enlace: `/contenido/${contenido.tipo}/${contenido.id}`,
      ...presentacion,
    };
  });
}

// ============ CATÁLOGOS ============

// Normaliza un nombre para comparar sin distinguir mayúsculas ni espacios al borde.
function comparable(texto) {
  return String(texto).trim().toLowerCase();
}

// Los catálogos se normalizan a pares { id, nombre } para usarlos indistintamente
// en el formulario del admin (el nombre del formato viene como tipoFormato).
function mapearCatalogo(dto, campoId, campoNombre) {
  return { id: dto[campoId], nombre: dto[campoNombre] };
}

// Géneros existentes (solo lectura: se asumen cargados en la base de datos).
export async function listarGeneros() {
  const lista = await get("/api/v1/generos");
  return lista.map((dto) => mapearCatalogo(dto, "idGenero", "nombre"));
}

// Formatos existentes (solo lectura: se asumen cargados en la base de datos).
export async function listarFormatos() {
  const lista = await get("/api/v1/formatos");
  return lista.map((dto) => mapearCatalogo(dto, "idFormato", "tipoFormato"));
}

// Directores existentes (base para las sugerencias del autocompletar).
export async function listarDirectores() {
  const lista = await get("/api/v1/directores");
  return lista.map((dto) => mapearCatalogo(dto, "idDirector", "nombre"));
}

// Reparto existente (base para las sugerencias del autocompletar).
export async function listarReparto() {
  const lista = await get("/api/v1/repartos");
  return lista.map((dto) => mapearCatalogo(dto, "idActor", "nombreActor"));
}

// Crea un director nuevo en el backend.
export async function crearDirector(nombre) {
  const dto = await post("/api/v1/directores", { nombre });
  return mapearCatalogo(dto, "idDirector", "nombre");
}

// Crea un actor de reparto nuevo en el backend.
export async function crearReparto(nombreActor) {
  const dto = await post("/api/v1/repartos", { nombreActor });
  return mapearCatalogo(dto, "idActor", "nombreActor");
}

// Devuelve el director existente si el nombre coincide; si no existe, lo crea.
// Así jamás se duplican los que ya están en la base de datos.
export async function obtenerOCrearDirector(nombre, existentes = []) {
  const buscado = comparable(nombre);
  const existente = existentes.find((item) => comparable(item.nombre) === buscado);
  return existente ?? crearDirector(nombre.trim());
}

// Ídem para actores de reparto.
export async function obtenerOCrearReparto(nombreActor, existentes = []) {
  const buscado = comparable(nombreActor);
  const existente = existentes.find((item) => comparable(item.nombre) === buscado);
  return existente ?? crearReparto(nombreActor.trim());
}
