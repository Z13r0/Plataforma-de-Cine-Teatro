/**
 * Ticket.jsx — Muestra el detalle de una entrada específica buscándola por su ID en la URL.
 */
import { Link, useParams } from "react-router-dom";

export default function Ticket() {
  // --- OBTENCIÓN DE PARÁMETROS Y DATOS ---
  const { ticketId } = useParams(); // Obtiene el ID del ticket desde la URL
  const hist = JSON.parse(localStorage.getItem("historialCompras") || "[]"); // Carga el historial de compras
  const t = hist.find((x) => x.idTicket === ticketId); // Busca el ticket que coincide con el ID

  // --- VALIDACIÓN DE ENTRADA NO ENCONTRADA: Si no existe el ticket, muestra un mensaje de error ---
  if (!t) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Entrada no encontrada.</p>
        <Link to="/historial" className="btn btn-outline-light">Historial</Link>
      </div>
    );
  }

  return (
    // --- TARJETA DE VISUALIZACIÓN DEL TICKET ---
    <div className="card border-custom bg-card p-4 mx-auto" style={{ maxWidth: 480 }}>
      <h1 className="h3 fw-bold">Tu entrada</h1>
      <p className="badge bg-danger">{t.tipo}</p>
      <h2 className="h4">{t.titulo}</h2>
      <p className="text-secondary mb-1">{t.fecha} · {t.hora}</p>
      <p className="mb-1">Sala: {t.sala}</p>
      <p className="mb-1">Butacas: {(t.asientos || []).join(", ")}</p>
      <p className="mb-1">Cliente: {t.cliente}</p>
      <p className="fs-4 text-success fw-bold">Total: ${Number(t.total).toLocaleString("es-CL")}</p>
      
      {/* --- SECCIÓN DE CÓDIGO QR SIMULADO --- */}
      <div className="border border-custom rounded p-4 text-center my-3 bg-elevated">
        <p className="small text-secondary mb-1">QR demo</p>
        <strong>{t.idTicket}</strong>
      </div>

      {/* --- BOTONES DE NAVEGACIÓN --- */}
      <Link to="/historial" className="btn btn-outline-light me-2">Historial</Link>
      <Link to="/" className="btn btn-danger">Inicio</Link>
    </div>
  );
}