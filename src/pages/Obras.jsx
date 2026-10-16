import { useState } from "react";
import Buscador from "../components/Buscador";
import CardExtendido from "../components/CardExtendido";
import { DB, filtrarContenido, obtenerGeneros } from "../data/db";

const GENEROS = obtenerGeneros(DB.obras);
const FILTROS_INICIALES = { texto: "", genero: "", clasificacion: "" };

export default function Obras() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const resultados = filtrarContenido(DB.obras, filtros);

  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-4">Obras</h1>

      <Buscador filtros={filtros} onCambiar={setFiltros} generos={GENEROS} />

      <div className="row g-4">
        {resultados.length > 0 ? (
          resultados.map((obra) => (
            <div className="col-12" key={obra.id}>
              <CardExtendido id={obra.id} tipo={obra.tipo} />
            </div>
          ))
        ) : (
          <div className="text-center text-white py-5">
            <p className="fs-5">No se encontraron obras.</p>
          </div>
        )}
      </div>
    </main>
  );
}
