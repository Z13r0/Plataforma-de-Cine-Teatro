/**
 * DetalleObra - Muestra información detallada de una obra de teatro
 * Incluye sinopsis, reparto, funciones disponibles y confitería
 */
import { useParams, Link } from "react-router-dom";
import { getContentById, getFunciones } from "../data/db";

export default function DetalleObra() {
  const { id } = useParams();
  const obra = getContentById(id, "teatro");
  const funciones = getFunciones(id, "teatro");

  if (!obra) {
    return (
      <main className="container py-4">
        <div className="alert alert-warning">
          Obra no encontrada. <Link to="/obras">Volver a obras</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <Link to="/obras" className="btn btn-outline-light mb-3">
        <i className="bi bi-arrow-left me-2" />
        Volver
      </Link>

      <div className="row g-4">
        {/* Imagen y info principal */}
        <div className="col-md-4">
          <img
            src={obra.imagen}
            alt={obra.titulo}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h1 className="h2 fw-bold mb-3">{obra.titulo}</h1>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {obra.genero.map((g) => (
              <span key={g} className="badge bg-secondary">
                {g}
              </span>
            ))}
          </div>
          <p className="mb-3">{obra.sinopsis}</p>
          <div className="row g-2 mb-3">
            <div className="col-sm-6">
              <strong>Duración:</strong> {obra.duracion}
            </div>
            <div className="col-sm-6">
              <strong>Director:</strong> {obra.director}
            </div>
            <div className="col-sm-6">
              <strong>Clasificación:</strong> {obra.clasificacion}
            </div>
            <div className="col-sm-6">
              <strong>Valoración:</strong> ⭐ {obra.valoracion}
            </div>
          </div>
          <div className="mb-3">
            <strong>Reparto:</strong> {obra.reparto}
          </div>
          <div className="mb-3">
            <strong>Formatos:</strong> {obra.formatos.join(", ")}
          </div>

          {/* Restricciones si existen */}
          {obra.restricciones?.activa && (
            <div className="alert alert-warning">
              <strong>⚠️ Restricción:</strong> {obra.restricciones.texto}
              <ul className="mb-0 mt-2">
                {obra.restricciones.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Funciones disponibles */}
      <section className="mt-5">
        <h2 className="h4 fw-bold mb-3">Funciones disponibles</h2>
        {funciones.length > 0 ? (
          <div className="row g-3">
            {funciones.map((f) => (
              <div className="col-md-4 col-lg-3" key={f.id}>
                <div className="card bg-card">
                  <div className="card-body">
                    <h5 className="card-title">{f.fecha}</h5>
                    <p className="card-text fs-4 fw-bold">{f.hora}</p>
                    <p className="card-text small text-muted">
                      Sala: {f.salaId}
                    </p>
                    <button className="btn btn-primary w-100">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No hay funciones programadas.</p>
        )}
      </section>
    </main>
  );
}
