document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorEntradas");
  if (!contenedor) return;

  const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
  const params = new URLSearchParams(window.location.search);
  const ticketId = params.get("ticketId");

  if (historial.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary border-custom">
        No tienes entradas todavía. <a href="peliculas.html" class="text-danger">Ver cartelera</a>
      </div>`;
    return;
  }

  const entradas = ticketId
    ? historial.filter((t) => t.idTicket === ticketId)
    : historial.slice().reverse();

  if (entradas.length === 0) {
    contenedor.innerHTML = `<div class="alert alert-warning">No se encontró esa entrada.</div>`;
    return;
  }

  contenedor.innerHTML = "";

  entradas.forEach((ticket) => {
    const confiteriaHtml = (ticket.confiteria && ticket.confiteria.length)
      ? ticket.confiteria.map(c =>
          `<li>${c.cantidad} × ${c.nombre} — $${(c.precio * c.cantidad).toLocaleString("es-CL")}</li>`
        ).join("")
      : "<li class='text-secondary'>Sin confitería</li>";

    contenedor.innerHTML += `
      <div class="card border-custom bg-card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <span class="badge bg-danger mb-2">${ticket.tipo === "teatro" ? "TEATRO" : "CINE"}</span>
              <h3 class="text-danger mb-1">${ticket.titulo}</h3>
              <p class="text-secondary small mb-0">Ticket: ${ticket.idTicket}</p>
            </div>
            <span class="badge bg-success">CONFIRMADA</span>
          </div>
          <hr class="border-custom">
          <div class="row g-3">
            <div class="col-md-6">
              <p class="mb-1"><strong>Fecha:</strong> ${ticket.fecha}</p>
              <p class="mb-1"><strong>Hora:</strong> ${ticket.hora}</p>
              <p class="mb-1"><strong>Sala:</strong> ${ticket.sala}</p>
              <p class="mb-1"><strong>Butacas:</strong> ${(ticket.asientos || []).join(", ")}</p>
              <p class="mb-1"><strong>Cliente:</strong> ${ticket.cliente || "-"}</p>
              <p class="mb-0"><strong>Correo:</strong> ${ticket.email || "-"}</p>
            </div>
            <div class="col-md-6">
              <p class="mb-1"><strong>Confitería:</strong></p>
              <ul class="small mb-2">${confiteriaHtml}</ul>
              ${ticket.cargoServicio ? `<p class="small mb-1">Cargo por servicio: $${Number(ticket.cargoServicio).toLocaleString("es-CL")}</p>` : ""}
              <p class="fs-4 text-success mb-0"><strong>Total: $${Number(ticket.total).toLocaleString("es-CL")}</strong></p>
            </div>
          </div>
          <div class="text-center mt-4">
            <div class="border border-custom p-4 mx-auto rounded" style="max-width:220px;">
              <i class="bi bi-qr-code fs-1"></i>
              <p class="small text-secondary mt-2 mb-0">QR DEMOSTRATIVO</p>
              <p class="small text-secondary">${ticket.idTicket}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});