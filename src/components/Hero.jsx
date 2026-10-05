import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="p-4 p-md-5 mb-4 rounded-3 bg-black border border-danger border-opacity-25 text-white text-center text-md-start position-relative overflow-hidden shadow">
      <div className="row align-items-center py-2">
        <div className="col-lg-8">
          <span className="badge bg-danger mb-2 px-3 py-2 fs-6">
            Temporada 2026
          </span>
          <h1 className="display-4 fw-bold">Bienvenido a Cine &amp; Teatro</h1>
          <p className="fs-5 text-light opacity-75">
            Vive la magia del séptimo arte y las mejores obras teatrales en un solo
            lugar. Reserva tus entradas en tiempo real.
          </p>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
            <Link to="/peliculas" className="btn btn-danger btn-lg px-4 fw-semibold">
              <i className="bi bi-film me-1" />
              Ver Películas
            </Link>
            <Link to="/obras" className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-mask me-1" />
              Ver Obras
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}