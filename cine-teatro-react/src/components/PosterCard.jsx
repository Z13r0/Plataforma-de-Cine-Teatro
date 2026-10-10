/**
 * PosterCard.jsx — Componente de tarjeta de póster para mostrar información resumida de películas u obras de teatro con enlace a su vista de detalle.
 */
import { Link } from "react-router-dom";

export default function PosterCard({ item, tipo }) {
  // --- NORMALIZACIÓN DE GÉNERO: Convierte el género a un texto separado por puntos si es un arreglo, o usa una cadena vacía ---
  const genero = Array.isArray(item.genero) ? item.genero.join(" · ") : item.genero || "";
  
  return (
    // --- ENLACE A DETALLE: Redirige a la ruta dinámica utilizando el tipo y el ID del ítem ---
    <Link to={`/detalle/${tipo}/${item.id}`} className="text-decoration-none text-reset">
      <div className="poster-card">
        
        {/* --- IMAGEN DE PÓSTER CON MANEJO DE ERROR --- */}
        <img
          src={item.imagen}
          alt={item.titulo}
          onError={(e) => {
            e.target.src = "https://placehold.co/300x450/1a1a1a/666?text=Poster";
          }}
        />
        
        {/* --- METADATOS DE LA TARJETA (Título, clasificación, duración, año y género) --- */}
        <div className="poster-meta">
          <div className="d-flex justify-content-between gap-1 mb-1">
            <h6 className="mb-0 fw-bold text-truncate">{item.titulo}</h6>
            <span className="badge bg-danger flex-shrink-0">{item.clasificacion}</span>
          </div>
          <p className="small text-secondary mb-1">
            {item.duracion} · {item.anio || ""}
          </p>
          <p className="small text-secondary mb-0 text-truncate">{genero}</p>
        </div>
      </div>
    </Link>
  );
}