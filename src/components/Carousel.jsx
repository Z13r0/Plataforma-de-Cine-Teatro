import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel as CarruselBootstrap } from "bootstrap";

export default function Carousel() {
  const referencia = useRef(null);

  useEffect(() => {
    const carrusel = CarruselBootstrap.getOrCreateInstance(referencia.current);
    return () => carrusel.dispose();
  }, []);

  return (
    <section className="mb-5">
      <h2 className="h3 fw-bold mb-3 border-start border-4 border-danger ps-2">Estrenos Destacados</h2>

      <div
        id="carruselDestacados"
        ref={referencia}
        className="carousel slide shadow-lg rounded-3 overflow-hidden"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carruselDestacados" data-bs-slide-to="0" className="active" />
          <button type="button" data-bs-target="#carruselDestacados" data-bs-slide-to="1" />
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
              alt="Cine"
              className="d-block w-100 object-fit-cover"
              style={{ height: "380px" }}
            />
            <div className="carousel-caption bg-dark bg-opacity-75 rounded p-3 text-start">
              <span className="badge bg-warning text-dark">Estreno de Cine</span>
              <h3 className="fw-bold">Sci-Fi Odyssey 2026</h3>
              <p className="mb-1">Una aventura intergaláctica sin precedentes en formato IMAX.</p>
                <Link to="/contenido/cine/3" className="btn btn-danger btn-sm">Ver Funciones</Link>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="4000">
            <img
              src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop"
              alt="Teatro"
              className="d-block w-100 object-fit-cover"
              style={{ height: "380px" }}
            />
            <div className="carousel-caption bg-dark bg-opacity-75 rounded p-3 text-start">
              <span className="badge bg-primary">Gran Obra de Teatro</span>
              <h3 className="fw-bold">El Fantasma de la Ópera</h3>
              <p className="mb-1">La obra clásica vuelve al escenario principal en vivo.</p>
                <Link to="/contenido/teatro/103" className="btn btn-primary btn-sm">Reservar Butacas</Link>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carruselDestacados" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselDestacados" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>
    </section>
  );
}