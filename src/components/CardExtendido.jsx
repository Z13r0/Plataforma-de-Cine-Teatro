import "./Card.css";
import "./CardExtendido.css";
import { DB, ESTILOS_POR_TIPO, getContentById, getFunciones } from "../data/db";

export default function CardExtendido({ id, tipo = "cine" }) {
  const contenido = getContentById(id, tipo);

  if (!contenido) {
    return null;
  }

  const { titulo, genero, sinopsis, duracion, valoracion, imagen } = contenido;
  const generoTexto = Array.isArray(genero) ? genero.join(", ") : genero;
  const estilo = ESTILOS_POR_TIPO[tipo] || ESTILOS_POR_TIPO.cine;
  const funciones = getFunciones(id, tipo);
  const salas = Object.fromEntries(DB.salas.map((sala) => [sala.id, sala.nombre]));

  return (
    <div className="card h-100 bg-secondary bg-opacity-10 border-secondary text-light card-hover shadow-sm overflow-hidden">
      <span className={`position-absolute top-0 start-0 m-2 badge ${estilo.insignia}`}>
        {estilo.etiqueta}
      </span>

      <div className="row g-0">
        <div className="col-12 col-md-3 card-extendido__portada">
          {imagen ? (
            <img
              src={imagen}
              alt={titulo}
              className="card-extendido__imagen"
            />
          ) : (
            <div className="card-extendido__imagen bg-body-secondary d-flex align-items-center justify-content-center">
              <i className="bi bi-film fs-1 text-secondary" />
            </div>
          )}
        </div>

        <div className="col-12 col-md-9">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title fw-bold">{titulo}</h5>
            <p className="card-text text-secondary small mb-2">{generoTexto}</p>
            <p className="card-text small mb-0">{sinopsis}</p>
            <div className="d-flex justify-content-between align-items-center small mt-auto">
              <span>
                <i className={`bi bi-clock me-1 ${estilo.reloj}`} />
                {duracion}
              </span>
              <span className="badge bg-dark border border-secondary text-warning">
                ⭐ {valoracion}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top border-secondary p-3">
        <p className="small fw-semibold text-uppercase text-secondary mb-2">Funciones</p>
        {funciones.length > 0 ? (
          <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
            {funciones.map((funcion) => (
              <li
                key={funcion.id}
                className={`badge ${estilo.insignia} card-extendido__funcion`}
              >
                {funcion.fecha} · {funcion.hora} · {salas[funcion.salaId] ?? funcion.salaId}
              </li>
            ))}
          </ul>
        ) : (
          <p className="small text-secondary mb-0">Sin funciones disponibles</p>
        )}
      </div>
    </div>
  );
}
