document.addEventListener("DOMContentLoaded", () => {
  const cart = Carrito.get();
  if (!cart.titulo || !cart.butacas.length) {
    alert("Primero selecciona función y butacas.");
    window.location.href = "index.html";
    return;
  }

  const tipo = cart.tipo === "teatro" ? "teatro" : "cine";
  const productos = DB.confiteria[tipo] || [];
  const categorias = [...new Set(productos.map(p => p.categoria))];

  const tabs = document.getElementById("tabsConf");
  const grid = document.getElementById("gridProductos");

  // Tabs
  tabs.innerHTML = categorias.map((cat, i) => `
    <li class="nav-item">
      <button class="nav-link ${i === 0 ? "active" : ""}" data-cat="${cat}">${cat}</button>
    </li>
  `).join("");

  function render(cat) {
    const lista = productos.filter(p => p.categoria === cat);
    grid.innerHTML = lista.map(p => {
      const enCart = (cart.confiteria || []).find(x => x.id === p.id);
      const cant = enCart ? enCart.cantidad : 0;
      return `
        <div class="col-6 col-md-4">
          <div class="card card-hover h-100">
            <img src="${p.imagen}" class="card-img-top" style="height:140px;object-fit:cover;" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title mb-1">${p.nombre}</h6>
              <p class="small text-secondary mb-2">${p.descripcion}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <strong>$${p.precio.toLocaleString("es-CL")}</strong>
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-light btn-menos" data-id="${p.id}">−</button>
                  <span class="btn btn-outline-light disabled" id="cant-${p.id}">${cant}</span>
                  <button class="btn btn-outline-light btn-mas" data-id="${p.id}">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Eventos + / −
    grid.querySelectorAll(".btn-mas").forEach(btn => {
      btn.addEventListener("click", () => cambiarCantidad(Number(btn.dataset.id), 1));
    });
    grid.querySelectorAll(".btn-menos").forEach(btn => {
      btn.addEventListener("click", () => cambiarCantidad(Number(btn.dataset.id), -1));
    });
  }

  function cambiarCantidad(id, delta) {
    const p = productos.find(x => x.id === id);
    if (!p) return;
    let conf = cart.confiteria || [];
    let item = conf.find(x => x.id === id);
    if (!item && delta > 0) {
      conf.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 });
    } else if (item) {
      item.cantidad += delta;
      if (item.cantidad <= 0) conf = conf.filter(x => x.id !== id);
    }
    cart.confiteria = conf;
    Carrito.save(cart);
    const span = document.getElementById("cant-" + id);
    if (span) {
      const actual = conf.find(x => x.id === id);
      span.textContent = actual ? actual.cantidad : 0;
    }
    Carrito.renderSidebar();
  }

  tabs.querySelectorAll(".nav-link").forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.querySelectorAll(".nav-link").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      render(tab.dataset.cat);
    });
  });

  if (categorias[0]) render(categorias[0]);
  Carrito.renderSidebar();

  document.getElementById("btnContinuarPago").addEventListener("click", () => {
    window.location.href = "pago.html";
  });
  document.getElementById("btnSaltar").addEventListener("click", () => {
    window.location.href = "pago.html";
  });

  // Arreglar link volver butacas con params
  const c = Carrito.get();
  document.getElementById("btnVolverButacas").href =
    `butacas.html?id=${c.contenidoId}&tipo=${c.tipo}&funcionId=${c.funcionId}`;
});