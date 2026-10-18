/**
 * Entrada.jsx — Página de entrada digital (ticket).
 * Muestra los datos de la compra y un QR de demostración.
 * Se accede desde /entrada/:idTicket
 */
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";

export default function Entrada() {
  const { idTicket } = useParams();

  // Busca la compra en el historial guardado en localStorage
  const ticket = useMemo(() => {
    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    return historial.find((t) => String(t.idTicket) === String(idTicket));
  }, [idTicket]);

  if (!ticket) {
    return (
      <main className="container py-5 text-center">
        <div className="card border-custom bg-card p-5">
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3" />
          <h2 className="h4">Entrada no encontrada</h2>
          <p className="text-secondary">
            No existe una entrada con el código <strong>{idTicket}</strong>.
          </p>
          <Link to="/historial" className="btn btn-danger mt-3">
            Volver al historial
          </Link>
        </div>
      </main>
    );
  }

  // URL de un QR de demostración (usa el id del ticket)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CINE-TEATRO-${ticket.idTicket}`;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-custom bg-card overflow-hidden">
            {/* Cabecera */}
            <div className="card-header bg-danger text-white text-center py-3">
              <i className="bi bi-ticket-perforated fs-3 d-block mb-1" />
              <h1 className="h4 mb-0">Entrada Digital</h1>
              <small>Cine & Teatro</small>
            </div>

            <div className="card-body p-4">
              {/* Título y tipo */}
              <div className="text-center mb-4">
                <span className="badge bg-danger mb-2">{ticket.tipo}</span>
                <h2 className="h3 fw-bold">{ticket.titulo}</h2>
              </div>

              {/* Datos principales */}
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <p className="small text-secondary mb-0">Fecha</p>
                  <p className="fw-semibold mb-0">{ticket.fecha}</p>
                </div>
                <div className="col-6">
                  <p className="small text-secondary mb-0">Hora</p>
                  <p className="fw-semibold mb-0">{ticket.hora || "—"}</p>
                </div>
                <div className="col-6">
                  <p className="small text-secondary mb-0">Asientos</p>
                  <p className="fw-semibold mb-0">
                    {(ticket.asientos || []).join(", ") || "—"}
                  </p>
                </div>
                <div className="col-6">
                  <p className="small text-secondary mb-0">Total pagado</p>
                  <p className="fw-semibold text-success mb-0">
                    ${Number(ticket.total).toLocaleString("es-CL")}
                  </p>
                </div>
              </div>

              {/* Snacks */}
              {ticket.snacks && ticket.snacks.length > 0 && (
                <div className="mb-4">
                  <p className="small text-secondary mb-1">Confitería</p>
                  <ul className="list-unstyled mb-0">
                    {ticket.snacks.map((s, i) => (
                      <li key={i} className="small">
                        {s.cantidad}× {s.nombre} — $
                        {(s.precio * s.cantidad).toLocaleString("es-CL")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* QR de demostración */}
              <div className="text-center border-top pt-4">
                <p className="small text-secondary mb-2">
                  Presenta este código en la entrada
                </p>
                <img
                  src={qrUrl}
                  alt={`QR entrada ${ticket.idTicket}`}
                  className="img-fluid rounded"
                  style={{ maxWidth: 180 }}
                />
                <p className="small text-secondary mt-2 mb-0">
                  Código: <code>{ticket.idTicket}</code>
                </p>
              </div>
            </div>

            <div className="card-footer text-center">
              <Link to="/historial" className="btn btn-outline-light btn-sm me-2">
                Volver al historial
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer me-1" />
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}