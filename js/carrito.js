// js/carrito.js
// Manejo central del carrito de compra (tipo Cinemark)

const Carrito = {
  KEY: "carritoCineTeatro",

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || this._vacio();
    } catch {
      return this._vacio();
    }
  },

  _vacio() {
    return {
      contenidoId: null,
      tipo: null,
      titulo: "",
      imagen: "",
      fecha: "",
      hora: "",
      sala: "",
      salaNombre: "",
      funcionId: null,
      formato: "2D",
      entradas: [],
      butacas: [],
      confiteria: [],
      cargoServicio: 0,
      modo: "invitado", // invitado | logueado
      cliente: { nombre: "", email: "" }
    };
  },

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  // Totales
  calcular(c = null) {
    const cart = c || this.get();
    const subEntradas = (cart.entradas || []).reduce((s, e) => s + e.precio * e.cantidad, 0);
    const subConf = (cart.confiteria || []).reduce((s, p) => s + p.precio * p.cantidad, 0);
    const cargo = cart.cargoServicio || 0;
    return {
      subEntradas,
      subConf,
      cargo,
      total: subEntradas + subConf + cargo
    };
  },

  // Render del sidebar en cualquier página
  renderSidebar(containerId = "resumenSidebar") {
    const el = document.getElementById(containerId);
    if (!el) return;

    const cart = this.get();
    const t = this.calcular(cart);

    el.innerHTML = `
      <h4 class="fw-bold mb-3">RESUMEN</h4>
      <div class="mb-3">
        <p class="text-secondary small mb-1">Película / Obra</p>
        <div class="d-flex gap-2 align-items-center">
          ${cart.imagen ? `<img src="${cart.imagen}" style="width:50px;height:70px;object-fit:cover;border-radius:6px;">` : ""}
          <div>
            <strong>${cart.titulo || "-"}</strong><br>
            <span class="small text-secondary">${cart.formato || ""}</span>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <p class="text-secondary small mb-1">Cine, día y horario</p>
        <p class="mb-0"><i class="bi bi-geo-alt"></i> ${cart.salaNombre || cart.sala || "-"}</p>
        <p class="mb-0 small">${cart.fecha || ""} · ${cart.hora || ""}</p>
      </div>
      ${(cart.entradas || []).length ? `
        <div class="mb-3">
          <p class="text-secondary small mb-1">Entradas</p>
          ${(cart.entradas || []).map(e => `
            <div class="d-flex justify-content-between small">
              <span>${e.cantidad} × ${e.nombre}</span>
              <span>$${(e.precio * e.cantidad).toLocaleString("es-CL")}</span>
            </div>
          `).join("")}
          ${cart.cargoServicio ? `
            <div class="d-flex justify-content-between small text-secondary">
              <span>Cargo por servicio</span>
              <span>$${cart.cargoServicio.toLocaleString("es-CL")}</span>
            </div>
          ` : ""}
        </div>
      ` : ""}
      ${(cart.butacas || []).length ? `
        <div class="mb-3">
          <p class="text-secondary small mb-1">Asientos</p>
          <p class="mb-0">${cart.butacas.join(", ")}</p>
        </div>
      ` : ""}
      ${(cart.confiteria || []).length ? `
        <div class="mb-3">
          <p class="text-secondary small mb-1">Confitería</p>
          ${cart.confiteria.map(p => `
            <div class="d-flex justify-content-between small">
              <span>${p.cantidad} × ${p.nombre}</span>
              <span>$${(p.precio * p.cantidad).toLocaleString("es-CL")}</span>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <hr>
      <div class="d-flex justify-content-between fw-bold fs-5">
        <span>TOTAL</span>
        <span class="text-success">$${t.total.toLocaleString("es-CL")}</span>
      </div>
    `;
  }
};