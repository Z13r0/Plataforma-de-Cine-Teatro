/**
 * destacados.js — Destacados del carrusel de inicio desde el backend.
 * El contenido destacado lo define el administrador en el backend
 * (campo 'destacado' de Contenido; tarea futura: botón en el panel admin
 * que llame a PATCH /api/v1/contenidos/{id}/destacado).
 * Mientras nada esté destacado, la lista viene vacía y el carrusel
 * muestra su estado vacío.
 */
import { listarDestacados } from "./contenido";

/**
 * Presentación del carrusel por tipo de contenido:
 * etiqueta del badge, sus colores, el botón y su texto.
 */
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

/**
 * Devuelve los slides del carrusel listos para renderizar (N destacados).
 * Resuelve el contenido destacado del backend y le agrega la presentación.
 * @returns {Promise<Array>} Slides con { id, tipo, titulo, imagen, descripcion, enlace, etiqueta, insignia, boton, textoBoton }
 */
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
