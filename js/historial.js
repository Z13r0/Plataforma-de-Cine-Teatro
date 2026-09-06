document.addEventListener("DOMContentLoaded", () => {
  // Se busca el contenedor
  const contenedor = document.getElementById("contenedorHistorial");

  // Se recupera el historial
  const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");

  // Si no hay historial
  if (historial.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-info">
        No tienes compras registradas.
      </div>
    `;
    return;
  }

  // Se muestra de más nuevo a viejo
  historial
    .slice()
    .reverse()
    .forEach((ticket) => {
      // Creamos una tarjeta
      contenedor.innerHTML += `
        <div class="card bg-black border-secondary text-light mb-3">
          <div class="card-body">
            <h4 class="text-danger">${ticket.titulo}</h4>

            <p class="mb-1">
              <strong>Ticket:</strong> ${ticket.idTicket}
            </p>

            <p class="mb-1">
              <strong>Fecha compra:</strong> ${ticket.fechaCompra}
            </p>

            <p class="mb-1">
              <strong>Función:</strong> ${ticket.fecha} - ${ticket.hora}
            </p>

            <p class="mb-1">
              <strong>Butacas:</strong> ${ticket.asientos.join(", ")}
            </p>

            <p class="text-success fw-bold">
              $${ticket.total.toLocaleString("es-CL")}
            </p>

            <a href="entradas.html?ticketId=${ticket.idTicket}" class="btn btn-outline-danger">
              Ver entrada
            </a>
          </div>
        </div>
      `;
    });
});