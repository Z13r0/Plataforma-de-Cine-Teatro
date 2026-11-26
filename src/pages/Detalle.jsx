/**
 * Detalle.jsx — Página de detalle de película u obra.
 * El contenido se resuelve desde el servicio de contenido (API).
 *
 * NOTA: los horarios/funciones aún no tienen microservicio, por lo que el flujo
 * de compra (horarios, butacas, snacks y compra) queda inoperante y se muestra
 * "Próximamente funciones" hasta que exista el ms de funciones.
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Contenido from "../components/Contenido";
import { obtenerContenido } from "../api/contenido";

export default function Detalle() {
  const { tipo, id } = useParams();
  // Estado de la carga: se guarda junto al id consultado para detectar cambios de ruta
  const [resultado, setResultado] = useState({
    id: null,
    contenido: null,
    cargando: true,
    error: false,
  });

  useEffect(() => {
    let vivo = true;

    obtenerContenido(id)
      .then((datos) => {
        if (vivo) setResultado({ id, contenido: datos, cargando: false, error: false });
      })
      .catch(() => {
        if (vivo) setResultado({ id, contenido: null, cargando: false, error: true });
      });

    return () => {
      vivo = false;
    };
  }, [id]);

  // Si el id de la ruta cambió, se muestra carga hasta que llegue el resultado nuevo
  const cargando = resultado.id !== id || resultado.cargando;
  const error = !cargando && resultado.error;
  const contenido = !cargando && !error ? resultado.contenido : null;

  if (cargando) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status" />
        <p className="text-secondary mt-2">Cargando contenido…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5 text-center">
        <h2 className="h4">No se pudo cargar el contenido</h2>
        <p className="text-secondary">
          Ocurrió un problema al consultar el contenido. Intenta nuevamente más tarde.
        </p>
        <Link to="/peliculas" className="btn btn-danger mt-3">
          Volver a películas
        </Link>
      </main>
    );
  }

  if (!contenido) {
    return (
      <main className="container py-5 text-center">
        <h2 className="h4">Contenido no encontrado</h2>
        <p className="text-secondary">
          No existe el ítem con id <strong>{id}</strong> de tipo{" "}
          <strong>{tipo}</strong>.
        </p>
        <Link to="/peliculas" className="btn btn-danger mt-3">
          Volver a películas
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-lg-5">
          <Contenido contenido={contenido} />
        </div>

        <div className="col-lg-7">
          <h2 className="h2 fw-bold mb-3 mt-4">HORARIO</h2>
          <div className="alert alert-secondary">
            <i className="bi bi-calendar-event me-2" />
            <strong>Próximamente funciones.</strong> Este contenido aún no tiene
            funciones programadas. El horario, la selección de butacas y la compra
            estarán disponibles cuando se habilite el servicio de funciones.
          </div>
        </div>
      </div>
    </main>
  );
}
