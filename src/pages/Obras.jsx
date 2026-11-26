import { useEffect, useState } from "react";
import Buscador from "../components/Buscador";
import CardExtendido from "../components/CardExtendido";
import { listarContenidos } from "../api/contenido";
import { filtrarContenido, obtenerGeneros } from "../data/db";

const FILTROS_INICIALES = { texto: "", genero: "", clasificacion: "" };

/**
 * Obras.jsx — Catálogo de obras de teatro (tipo "teatro") desde el servicio de contenido.
 */
export default function Obras() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [obras, setObras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let vivo = true;

    listarContenidos()
      .then((lista) => {
        if (vivo) {
          setObras(lista.filter((contenido) => contenido.tipo === "teatro"));
        }
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

  const generos = obtenerGeneros(obras);
  const resultados = filtrarContenido(obras, filtros);

  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-4">Obras de Teatro</h1>

      <Buscador filtros={filtros} onCambiar={setFiltros} generos={generos} />

      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" />
          <p className="text-secondary mt-2">Cargando obras…</p>
        </div>
      )}

      {error && (
        <div className="text-center text-white py-5">
          <p className="fs-5">No se pudo cargar el catálogo. Intenta nuevamente más tarde.</p>
        </div>
      )}

      <div className="row g-4">
        {!cargando && !error && resultados.length > 0 ? (
          resultados.map((obra) => (
            <div className="col-12" key={obra.id}>
              <CardExtendido contenido={obra} />
            </div>
          ))
        ) : (
          !cargando &&
          !error && (
            <div className="text-center text-white py-5">
              <p className="fs-5">No se encontraron obras que coincidan con la búsqueda.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
