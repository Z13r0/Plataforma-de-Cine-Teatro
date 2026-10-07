document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("contenedorHistorial");
  if (!cont) return;

  const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]").slice().reverse();

  if (!historial.length) {
    cont.innerHTML = `
      <div class="card border-custom bg-card p-5 text-center">
        <p class="text-secondary mb-3">Aún no tienes compras.</p>
        <a href="peliculas.html" class="btn btn-danger">Ver cartelera</a>
      </div>`;
    return;
  }

  cont.innerHTML = historial.map(t => `
    <div class="card border-custom bg-card mb-3 card-hover">
      <div class="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <span class="badge bg-danger mb-1">${t.tipo === "teatro" ? "TEATRO" : "CINE"}</span>
          <h5 class="fw-bold mb-1">${t.titulo}</h5>
          <p class="small text-secondary mb-0">${t.fecha} · ${t.hora} · ${t.sala || ""}</p>
          <p class="small mb-0">Butacas: ${(t.asientos || []).join(", ")}</p>
        </div>
        <div class="text-end">
          <p class="fs-5 text-success fw-bold mb-2">$${Number(t.total).toLocaleString("es-CL")}</p>
          <a href="entradas.html?ticketId=${t.idTicket}" class="btn btn-outline-light btn-sm">Ver entrada</a>
        </div>
      </div>
    </div>
  `).join("");
});