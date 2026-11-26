import { useEffect, useState } from "react";
import Card from "./Card";
import { listarContenidos } from "../api/contenido";

/**
 * Cartelera.jsx — Listado de películas y obras en la página de inicio.
 * Carga el catálogo desde el servicio de contenido (API).
 */
export default function Cartelera() {
  const [contenidos, setContenidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let vivo = true;

    listarContenidos()
      .then((lista) => {
        if (vivo) setContenidos(lista);
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

  const peliculas = contenidos.filter((contenido) => contenido.tipo === "cine");
  const obras = contenidos.filter((contenido) => contenido.tipo === "teatro");

  return (
    <section>
      <h2 className="h3 fw-bold mb-4 border-start border-4 border-danger ps-2">
        Peliculas
      </h2>
      {cargando && (
        <div className="text-center py-4">
          <div className="spinner-border text-danger" role="status" />
          <p className="text-secondary mt-2">Cargando cartelera…</p>
        </div>
      )}
      {error && (
        <p className="text-secondary text-center py-4">
          No se pudo cargar la cartelera. Intenta nuevamente más tarde.
        </p>
      )}
      <div className="row g-4">
        {peliculas.map((pelicula) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pelicula.id}>
            <Card contenido={pelicula} />
          </div>
        ))}
      </div>
      <h2 className="h3 fw-bold mb-4 mt-4 border-start border-4 border-primary ps-2">
        Obras
      </h2>
      <div className="row g-4">
        {obras.map((obra) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={obra.id}>
            <Card contenido={obra} />
          </div>
        ))}
      </div>
    </section>
  );
}
