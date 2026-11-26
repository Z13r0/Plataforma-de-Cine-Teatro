/**
 * contenido.js — Servicio de contenido contra el gateway (API real).
 * Único punto de acceso a películas y obras para los componentes del frontend.
 * Cuando el backend cambie, solo se ajusta este archivo (los componentes no se tocan).
 *
 * Endpoints usados (vía gateway):
 *   GET  /api/v1/contenidos            → catálogo completo
 *   GET  /api/v1/contenidos/{id}       → contenido por id
 *   GET  /api/v1/contenidos/destacados → contenido activo y destacado
 */
import { API_BASE_URL } from "./config";
import { mapearContenido, mapearListaContenidos } from "./mappers/contenidoMapper";

/** Error HTTP con el código de estado para poder distinguir 404 de fallos reales. */
class ErrorApi extends Error {
  constructor(ruta, status) {
    super(`Error ${status} al consultar ${ruta}`);
    this.name = "ErrorApi";
    this.status = status;
  }
}

/** Ejecuta una petición GET contra el gateway y devuelve el JSON de la respuesta. */
async function pedir(ruta) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

/**
 * Catálogo de contenido activo (visible para el público).
 * @returns {Promise<Array>} Lista del modelo de vista (id, tipo, titulo, genero, ...)
 */
export async function listarContenidos() {
  const contenidos = await pedir("/api/v1/contenidos");
  return mapearListaContenidos(contenidos).filter((contenido) => contenido.activo);
}

/**
 * Contenido por id. Devuelve null si no existe o no está activo (como "no encontrado").
 * @param {number} id - idContenido del backend
 */
export async function obtenerContenido(id) {
  let dto;
  try {
    dto = await pedir(`/api/v1/contenidos/${id}`);
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404) {
      return null;
    }
    throw error;
  }

  const contenido = mapearContenido(dto);
  return contenido.activo ? contenido : null;
}

/**
 * Contenido destacado y activo (selección del admin) para el carrusel de inicio.
 * @returns {Promise<Array>} Lista del modelo de vista.
 */
export async function listarDestacados() {
  const contenidos = await pedir("/api/v1/contenidos/destacados");
  return mapearListaContenidos(contenidos);
}
