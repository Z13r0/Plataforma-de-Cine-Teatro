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

// Ejecuta una petición GET contra el gateway y devuelve el JSON de la respuesta.
async function pedir(ruta) {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new ErrorApi(ruta, respuesta.status);
  }
  return respuesta.json();
}

// ============ CONTENIDO ============

// Catálogo de contenido activo (visible para el público).
export async function listarContenidos() {
  const contenidos = await pedir("/api/v1/contenidos");
  return mapearListaContenidos(contenidos).filter((contenido) => contenido.activo);
}

// Contenido por id. Devuelve null si no existe o no está activo (como "no encontrado").
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
  const contenidos = await pedir("/api/v1/contenidos/destacados");
  return mapearListaContenidos(contenidos);
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
