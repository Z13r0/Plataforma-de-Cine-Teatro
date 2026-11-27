import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel as CarruselBootstrap } from "bootstrap";
import { obtenerDestacados } from "../api/contenido";

/**
 * Carousel.jsx — Carrusel de destacados de la página de inicio.
 * Los slides vienen del servicio de destacados (selección del admin en el backend).
 * Estados: cargando, error, vacío (sin destacados) y carrusel con N slides.
 */
export default function Carousel() {
  const referencia = useRef(null);
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let vivo = true;

    obtenerDestacados()
      .then((slides) => {
        if (vivo) setDestacados(slides);
      })
      .catch(() => {
        if (vivo) setError(true);
      })
      .finally(() => {
        if (vivo) setCargando(false);
      });

    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    // Sin slides no hay carrusel que instanciar (estados cargando/error/vacío)
    if (!referencia.current) return;
    const carrusel = CarruselBootstrap.getOrCreateInstance(referencia.current);
    return () => carrusel.dispose();
  }, [destacados.length]);

  return (
    <section className="mb-5">
      <h2 className="h3 fw-bold mb-3 border-start border-4 border-danger ps-2">Estrenos Destacados</h2>

      {cargando && (
        <div className="text-center py-4">
          <div className="spinner-border text-danger" role="status" />
          <p className="text-secondary mt-2">Cargando destacados…</p>
        </div>
      )}

      {!cargando && error && (
        <div className="alert alert-warning text-center mb-0" role="status">
          No se pudieron cargar los destacados. Intenta nuevamente más tarde.
        </div>
      )}

      {!cargando && !error && destacados.length === 0 && (
        // Estado vacío: aún no hay contenido destacado seleccionado
        <div className="alert alert-secondary text-center mb-0" role="status">
          Aún no hay contenido destacado. Próximamente se mostrarán aquí los estrenos seleccionados.
        </div>
      )}

      {!cargando && !error && destacados.length > 0 && (
        <div
          id="carruselDestacados"
          ref={referencia}
          className="carousel slide shadow-lg rounded-3 overflow-hidden"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {destacados.map((item, indice) => (
              <button
                key={`indicador-${item.tipo}-${item.id}-${indice}`}
                type="button"
                data-bs-target="#carruselDestacados"
                data-bs-slide-to={indice}
                className={indice === 0 ? "active" : ""}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {destacados.map((item, indice) => (
              <div
                key={`slide-${item.tipo}-${item.id}-${indice}`}
                className={`carousel-item ${indice === 0 ? "active" : ""}`}
                data-bs-interval="4000"
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="d-block w-100 object-fit-cover"
                  style={{ height: "380px" }}
                />
                <div className="carousel-caption bg-dark bg-opacity-75 rounded p-3 text-start">
                  <span className={`badge ${item.insignia}`}>{item.etiqueta}</span>
                  <h3 className="fw-bold">{item.titulo}</h3>
                  <p className="mb-1">{item.descripcion}</p>
                  <Link to={item.enlace} className={`btn ${item.boton} btn-sm`}>
                    {item.textoBoton}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carruselDestacados" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carruselDestacados" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      )}
    </section>
  );
}
