// Cartel de Obras de la Plataforma

/**
 * Theater.jsx
 * Misma idea que Movies.jsx, pero lista DB.obras (teatro).
 * Filtros: texto, género, clasificación, año.
 */

import { useMemo, useState } from "react";
import { DB } from "../data/db";
import PosterCard from "../components/PosterCard";


export default function Theater() {
  // --- ESTADOS (useState): Almacenan los criterios de búsqueda elegidos por el usuario ---
  const [q, setQ] = useState("");                       // Texto libre (búsqueda por título)
  const [genero, setGenero] = useState("");             // Género seleccionado (ej. "Comedia")
  const [clas, setClas] = useState("");                 // Clasificación seleccionada (ej. "PG-13")
  const [anio, setAnio] = useState("");                 // Año seleccionado (ej. "2026")
  const [showFilters, setShowFilters] = useState(false); // Controla si el panel de filtros se muestra en pantalla

  // --- CARGA DE DATOS: Recupera obras añadidas manualmente desde el panel de administración ---
  const admin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]").filter(
    (x) => x.tipo === "teatro"
  );

  // --- CONSOLIDACIÓN DE DATOS (useMemo): Une las obras por defecto de la DB con las del admin ---
  const base = useMemo(
    () => [
      ...(DB.obras || []).filter((o) => !o.estado || o.estado === "cartelera"),
      ...admin,
    ],
    [] // Se ejecuta una sola vez al montar el componente
  );

  // --- PROCESAMIENTO EN TIEMPO REAL: Aplica todos los filtros a la lista base ---
  const list = base.filter((o) => {
    // 1. Normalización del género: Las obras de la DB pueden traer sus géneros como un texto simple o como un arreglo (Array).
    // Si es un arreglo (ej: ["Drama", "Romance"]), los une en una sola cadena de texto ("Drama Romance") separada por espacios.
    // Si no tiene género asignado, usa un texto vacío "" para evitar errores al procesar.
    const g = Array.isArray(o.genero) ? o.genero.join(" ") : o.genero || "";

    // 2. Evaluación de condiciones (La obra debe cumplir TODOS los criterios activos para incluirse en 'list'):
    return (
      // Filtro por Texto: Pasa el título de la obra y la búsqueda 'q' a minúsculas para que no importen las mayúsculas/minúsculas.
      o.titulo.toLowerCase().includes(q.toLowerCase()) &&
      
      // Filtro por Género: Si el usuario no ha elegido un género (!genero), ignora este filtro (devuelve true).
      // Si eligió uno, verifica que el género de la obra contenga la palabra seleccionada.
      (!genero || g.toLowerCase().includes(genero.toLowerCase())) &&
      
      // Filtro por Clasificación: Si no hay clasificación seleccionada, lo ignora.
      // Si hay, exige una coincidencia exacta (ej: o.clasificacion === "Todo público").
      (!clas || o.clasificacion === clas) &&
      
      // Filtro por Año: Si no hay año seleccionado, lo ignora.
      // Si hay, convierte el año de la obra a Texto con String() para compararlo de forma segura con el estado 'anio'.
      (!anio || String(o.anio) === anio)
    );
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h2 fw-bold section-title mb-0">Cartelera de Teatro</h1>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={() => setShowFilters((s) => !s)}
        >
          <i className="bi bi-funnel" /> Filtros
        </button>
      </div>

      {showFilters && (
        <div className="filtros-panel mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Buscar obra..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={clas} onChange={(e) => setClas(e.target.value)}>
                <option value="">Clasificación</option>
                <option value="TE">TE</option>
                <option value="TE+7">TE+7</option>
                <option value="+14">+14</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Género</option>
                <option value="Drama">Drama</option>
                <option value="Musical">Musical</option>
                <option value="Comedia">Comedia</option>
                <option value="Familiar">Familiar</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" value={anio} onChange={(e) => setAnio(e.target.value)}>
                <option value="">Año</option>
                <option value="1986">1986</option>
                <option value="1980">1980</option>
                <option value="1975">1975</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        {list.map((o) => (
          <div className="col-6 col-md-4 col-lg-3" key={o.id}>
            {/* tipo="teatro" para armar la URL /detalle/teatro/101 */}
            <PosterCard item={o} tipo="teatro" />
          </div>
        ))}
      </div>
    </>
  );

}