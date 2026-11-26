import { Link } from "react-router-dom";
import "./Card.css";
import { ESTILOS_POR_TIPO } from "../data/db";

/**
 * Card.jsx — Tarjeta de película u obra.
 * Recibe el contenido ya resuelto (modelo de vista) mediante props.
 */
export default function Card({ contenido }) {
  if (!contenido) {
    return null;
  }

  const { id, tipo, titulo, genero, duracion, valoracion, imagen } = contenido;
  const descripcion = Array.isArray(genero) ? genero.join(", ") : genero;
  const estilo = ESTILOS_POR_TIPO[tipo] || ESTILOS_POR_TIPO.cine;

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
        <p className="card-text text-secondary small mb-2">{descripcion}</p>
        <div className="d-flex justify-content-between align-items-center small mb-3">
          <span>
            <i className={`bi bi-clock me-1 ${estilo.reloj}`} />
            {duracion}
          </span>
          <span className="badge bg-dark border border-secondary text-warning">
            ⭐ {valoracion ?? "—"}
          </span>
        </div>
        <Link
          to={`/contenido/${tipo}/${id}`}
          className={`btn ${estilo.boton} w-100 mt-auto`}>
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}
