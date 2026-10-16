import { useState } from "react";
import Buscador from "../components/Buscador";
import CardExtendido from "../components/CardExtendido";
import { DB, filtrarContenido, obtenerGeneros } from "../data/db";

const GENEROS = obtenerGeneros(DB.peliculas);
const FILTROS_INICIALES = { texto: "", genero: "", clasificacion: "" };

export default function Peliculas() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const resultados = filtrarContenido(DB.peliculas, filtros);

  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-4">Películas</h1>

      <Buscador filtros={filtros} onCambiar={setFiltros} generos={GENEROS} />

      <div className="row g-4">
        {resultados.length > 0 ? (
          resultados.map((pelicula) => (
            <div className="col-12" key={pelicula.id}>
              <CardExtendido id={pelicula.id} tipo={pelicula.tipo} />
            </div>
          ))
        ) : (
          <div className="text-center text-white py-5">
            <p className="fs-5">No se encontraron películas que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
    </main>
  );
}
