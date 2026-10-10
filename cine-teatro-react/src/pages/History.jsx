/**
 * History.jsx — Muestra el historial completo de compras realizadas, ordenadas de la más reciente a la más antigua.
 */
import { Link } from "react-router-dom";

export default function History() {
  // --- CARGA Y ORDENAMIENTO: Obtiene las compras del localStorage y las invierte para mostrar las nuevas primero ---
  const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]").slice().reverse();

  // --- VALIDACIÓN DE HISTORIAL VACÍO: Si no hay compras registradas, muestra un mensaje alternativo ---
  if (!historial.length) {
    return (
      <div className="card border-custom bg-card p-5 text-center">
        <p className="text-secondary mb-3">Aún no tienes compras.</p>
        <Link to="/peliculas" className="btn btn-danger">Ver cartelera</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="h2 fw-bold section-title mb-4">Historial de compras</h1>
      
      {/* --- LISTADO DE TICKETS: Mapea cada compra guardada en el historial --- */}
      {historial.map((t) => (
        <div className="card border-custom bg-card mb-3" key={t.idTicket}>
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
            
            {/* --- INFORMACIÓN PRINCIPAL DEL TICKET --- */}
            <div>
              <span className="badge bg-danger mb-1">{t.tipo}</span>
              <h5 className="fw-bold mb-1">{t.titulo}</h5>
              <p className="small text-secondary mb-0">
                {t.fecha} · {t.hora} · {(t.asientos || []).join(", ")}
              </p>
            </div>

            {/* --- MONTO Y ACCIÓN PARA VER EL DETALLE --- */}
            <div className="text-end">
              <p className="text-success fw-bold mb-2">${Number(t.total).toLocaleString("es-CL")}</p>
              <Link className="btn btn-outline-light btn-sm" to={`/entrada/${t.idTicket}`}>
                Ver entrada
              </Link>
            </div>

          </div>
        </div>
      ))}
    </>
  );
}