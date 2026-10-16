import Card from "./Card";
import { DB } from "../data/db";

/**
 * Cartelera - Muestra las películas y obras destacadas
 * Combina contenido de cine y teatro desde la base de datos
 */
export default function Cartelera() {
  // Obtener las primeras 2 películas y 2 obras para mostrar en cartelera
  const peliculasDestacadas = (DB.peliculas || []).slice(0, 2);
  const obrasDestacadas = (DB.obras || []).slice(0, 2);
  const cartelera = [
    ...peliculasDestacadas.map((p) => ({ ...p, tipo: "cine" })),
    ...obrasDestacadas.map((o) => ({ ...o, tipo: "teatro" })),
  ];

  return (
    <section>
      <h2 className="h3 fw-bold mb-4 border-start border-4 border-danger ps-2">
        En Cartelera
      </h2>
      <div className="row g-4">
        {cartelera.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={`${item.tipo}-${item.id}`}>
            <Card {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}