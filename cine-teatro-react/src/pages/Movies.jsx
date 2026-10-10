/**
 * Movies.jsx — Muestra el catálogo de películas en cartelera con funcionalidad de búsqueda en tiempo real por título.
 */
import { useMemo, useState } from "react";
import { DB } from "../data/db.js";
import PosterCard from "../components/PosterCard.jsx";

export default function Movies() {
  // --- ESTADO Y CARGA DE DATOS: Define la consulta de búsqueda y filtra las películas que están en cartelera ---
  const [q, setQ] = useState("");
  const base = useMemo(
    () => (DB.peliculas || []).filter((p) => !p.estado || p.estado === "cartelera"),
    []
  );
  
  // --- FILTRADO EN TIEMPO REAL: Evalúa el título de las películas según el texto ingresado en la búsqueda ---
  const list = base.filter((p) => p.titulo.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <h1 className="h2 fw-bold section-title mb-4">Cartelera de Películas</h1>
      
      {/* --- CAMPO DE BÚSQUEDA --- */}
      <input
        className="form-control mb-4"
        style={{ maxWidth: 360 }}
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      
      {/* --- GRILLA DE PELÍCULAS: Mapea y renderiza las tarjetas de póster correspondientes --- */}
      <div className="row g-4">
        {list.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <PosterCard item={p} tipo="cine" />
          </div>
        ))}
      </div>
    </>
  );
}