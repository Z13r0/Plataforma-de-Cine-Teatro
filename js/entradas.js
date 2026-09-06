document.addEventListener("DOMContentLoaded", () => {
  // Se llama al contenedor
  const contenedor = document.getElementById("contenedorEntradas");

  // Se recuperan las compras a través de LocalStorage
  const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

  // Ticket es leído por la URL
  const params = new URLSearchParams(window.location.search);
  const ticketId = params.get("ticketId");

  // Si no existe historial
  if (historial.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info">
        No tienes entradas todavía.
      </div>
    `;
    return;
  }

  // Se filtran las entradas
  const entradas = ticketId
    ? historial.filter((ticket) => ticket.idTicket === ticketId)
    : historial;

  // Permite ver las entradas
  entradas.forEach((ticket) => {
    contenedor.innerHTML += `
      <div class="card bg-black text-light border-secondary mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h3 class="text-danger">${ticket.titulo}</h3>
            <span class="badge bg-success">CONFIRMADA</span>
          </div>

          <hr>

          <p><strong>Ticket:</strong> ${ticket.idTicket}</p>

          <p><strong>Fecha:</strong> ${ticket.fecha}</p>

          <p><strong>Hora:</strong> ${ticket.hora}</p>

          <p><strong>Sala:</strong> ${ticket.sala}</p>

          <p><strong>Butacas:</strong> ${ticket.asientos.join(", ")}</p>

          <p><strong>Cantidad:</strong> ${ticket.cantidad}</p>

          <p class="fs-4 text-success">
            <strong>$${ticket.total.toLocaleString("es-CL")}</strong>
          </p>

          <div class="text-center mt-4">
            <div class="border border-secondary p-4 mx-auto" style="max-width: 220px;">
              <i class="bi bi-qr-code fs-1"></i>
              <p class="small text-secondary mt-2">QR DEMOSTRATIVO</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});