/**
 * contenidoMapper.js
 * Traduce el contrato del backend (ContenidoResponseDTO) al modelo de vista
 * que usan los componentes del frontend.
 *
 * Backend: idContenido, tipoContenido ("pelicula" | "obra_teatro"), duracionMinutos,
 *          clasificacionEdad (0, 7, 14, 18), posterUrl, activo, destacado,
 *          valoracion (decimal 0-5), generos[{nombre}], directores[{nombre}],
 *          formatos[{tipoFormato}], repartos[{nombreActor}]
 * Vista:   id, tipo ("cine" | "teatro"), duracion ("2h 28m"), clasificacion ("TE+7"),
 *          imagen, genero[], director, reparto, valoracion, sinopsis, activo, destacado
 */

/** Tipo de contenido del backend → tipo de vista usado en rutas y estilos. */
const TIPO_POR_TIPO_CONTENIDO = {
  pelicula: "cine",
  obra_teatro: "teatro",
};

/** Clasificación por edad del backend → etiqueta mostrada en la UI. */
const ETIQUETA_CLASIFICACION = {
  0: "TE",
  7: "TE+7",
  14: "+14",
  18: "+18",
};

/**
 * Convierte minutos a texto legible (ej: 120 → "2h", 50 → "50m").
 */
export function formatearDuracion(minutos) {
  if (minutos === null || minutos === undefined || Number.isNaN(Number(minutos))) {
    return "";
  }
  const total = Number(minutos);
  const horas = Math.floor(total / 60);
  const resto = total % 60;

  if (horas > 0 && resto > 0) return `${horas}h ${resto}m`;
  if (horas > 0) return `${horas}h`;
  return `${resto}m`;
}

/**
 * Mapea un ContenidoResponseDTO al modelo de vista.
 */
export function mapearContenido(dto) {
  return {
    id: dto.idContenido,
    tipo: TIPO_POR_TIPO_CONTENIDO[dto.tipoContenido] || "cine",
    titulo: dto.titulo,
    genero: (dto.generos || []).map((genero) => genero.nombre),
    duracion: formatearDuracion(dto.duracionMinutos),
    clasificacion: ETIQUETA_CLASIFICACION[dto.clasificacionEdad] ?? `+${dto.clasificacionEdad}`,
    formatos: (dto.formatos || []).map((formato) => formato.tipoFormato),
    director: (dto.directores || []).map((director) => director.nombre).join(", "),
    reparto: (dto.repartos || []).map((actor) => actor.nombreActor).join(", "),
    valoracion: dto.valoracion ?? null,
    imagen: dto.posterUrl,
    sinopsis: dto.sinopsis,
    activo: Boolean(dto.activo),
    destacado: Boolean(dto.destacado),
  };
}

/**
 * Mapea la lista de contenidos del backend al modelo de vista.
 */
export function mapearListaContenidos(dtos = []) {
  return dtos.map((dto) => mapearContenido(dto));
}
