import "./Card.css";
import { Link } from "react-router-dom";

/**
 * Estilos visuales según el tipo de contenido (cine o teatro)
 */
const ESTILOS_POR_TIPO = {
  cine: {
    etiqueta: "Cine",
    insignia: "bg-danger",
    reloj: "text-danger",
    boton: "btn-outline-danger",
  },
  teatro: {
    etiqueta: "Teatro",
    insignia: "bg-primary",
    reloj: "text-primary",
    boton: "btn-outline-primary",
  },
};

/**
 * Card - Componente reutilizable para mostrar películas y obras
 * @param {Object} props - Datos del contenido
 * @param {number} props.id - ID del contenido
 * @param {string} props.titulo - Título del contenido
 * @param {string|Array} props.genero - Género(s) del contenido
 * @param {string} props.duracion - Duración del contenido
 * @param {number} props.valoracion - Valoración del contenido
 * @param {string} props.imagen - URL de la imagen
 * @param {string} props.tipo - Tipo de contenido ("cine" o "teatro")
 */
export default function Card({
  id,
  titulo = "Título",
  genero = "Descripción",
  duracion = "Duración",
  valoracion = "Sin valoración",
  imagen = null,
  tipo = "cine",
}) {
  const estilo = ESTILOS_POR_TIPO[tipo];

  // Formatear géneros si es un array
  const generoTexto = Array.isArray(genero) ? genero.join(", ") : genero;

  // Determinar la ruta de detalle según el tipo
  const detallePath = tipo === "cine" ? `/peliculas/${id}` : `/obras/${id}`;

  return (
    <div className="card h-100 bg-secondary bg-opacity-10 border-secondary text-light card-hover shadow-sm">
      <span className={`position-absolute top-0 start-0 m-2 badge ${estilo.insignia}`}>
        {estilo.etiqueta}
      </span>
      {imagen ? (
        <img
          src={imagen}
          alt={titulo}
          className="card-img-top object-fit-cover"
          style={{ height: "280px" }}
        />
      ) : (
        <div
          className="card-img-top bg-body-secondary d-flex align-items-center justify-content-center"
          style={{ height: "280px" }}
        >
          <i className="bi bi-film fs-1 text-secondary" />
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-truncate">{titulo}</h5>
        <p className="card-text text-secondary small mb-2">{generoTexto}</p>
        <div className="d-flex justify-content-between align-items-center small mb-3">
          <span>
            <i className={`bi bi-clock me-1 ${estilo.reloj}`} />
            {duracion}
          </span>
          <span className="badge bg-dark border border-secondary text-warning">
            ⭐ {valoracion}
          </span>
        </div>
        <Link
          to={detallePath}
          className={`btn ${estilo.boton} w-100 mt-auto`}
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}