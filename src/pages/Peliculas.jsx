/**
 * Peliculas - Lista completa de películas desde la base de datos
 * Incluye búsqueda en tiempo real
 */
import { useMemo, useState } from "react";
import { DB } from "../data/db";
import Card from "../components/Card";

export default function Peliculas() {
  const [q, setQ] = useState("");

  // Filtrar películas según la búsqueda
  const lista = useMemo(() => {
    const base = DB.peliculas || [];
    return base.filter((p) =>
      p.titulo.toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);

  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-3">Cartelera de películas</h1>
      <input
        className="form-control mb-4"
        style={{ maxWidth: 320 }}
        placeholder="Buscar película..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="row g-3">
        {lista.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <Card {...p} tipo="cine" />
          </div>
        ))}
      </div>
      {lista.length === 0 && (
        <p className="text-muted-theme">No hay resultados.</p>
      )}
    </main>
  );
}