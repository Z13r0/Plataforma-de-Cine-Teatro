import { Link } from "react-router-dom";
import "./CardExtendido.css";
import { getContentById, getFunciones } from "../data/db";

const COLOR_CLASIFICACION = {
  TE: "bg-success",
  "TE+7": "bg-info text-dark",
  "+14": "bg-warning text-dark",
  "+18": "bg-danger",
};

export default function CardExtendido({ id, tipo = "cine" }) {
  const contenido = getContentById(id, tipo);

  if (!contenido) {
    return null;
  }

  const { titulo, genero, sinopsis, duracion, clasificacion, imagen } = contenido;
  const generoTexto = Array.isArray(genero) ? genero.join(" / ") : genero;
  const funciones = getFunciones(id, tipo);
  const colorClasificacion = COLOR_CLASIFICACION[clasificacion] || "bg-secondary";

  return (
    <div className="card bg-black border-secondary overflow-hidden card-hover">
      <div className="row g-0 align-items-center">
        <div className="col-12 col-md-4 col-lg-3">
          {imagen ? (
            <img
              src={imagen}
              alt={titulo}
              className="img-fluid w-100 card-extendido__imagen"
            />
          ) : (
            <div className="card-extendido__imagen bg-body-secondary d-flex align-items-center justify-content-center">
              <i className="bi bi-film fs-1 text-secondary" />
            </div>
          )}
        </div>

        <div className="col-12 col-md-8 col-lg-9">
          <div className="card-body p-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <span className={`badge ${colorClasificacion} mb-2`}>{clasificacion}</span>
              <span className="badge bg-secondary mb-2 ms-1">{generoTexto}</span>

              <h3 className="card-title fw-bold mb-1">{titulo}</h3>

              <p className="text-secondary small mb-2">
                <i className="bi bi-clock me-1" />
                {duracion}
              </p>

              <p className="card-text text-light opacity-75 small mb-0 card-extendido__sinopsis">
                {sinopsis}
              </p>
            </div>

            <div className="text-lg-end">
              <span className="d-block text-secondary small mb-2 fw-semibold">
                Horarios disponibles:
              </span>
              <div className="d-flex flex-wrap gap-2 justify-content-lg-end mb-3">
                {funciones.length > 0 ? (
                  funciones.map((funcion) => (
                    <a
                      key={funcion.id}
                      href="#"
                      className="btn btn-outline-danger btn-sm"
                    >
                      {funcion.hora}
                    </a>
                  ))
                ) : (
                  <span className="text-secondary small">Sin funciones disponibles</span>
                )}
              </div>

              <Link to={`/contenido/${tipo}/${id}`} className="btn btn-danger btn-sm">
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
