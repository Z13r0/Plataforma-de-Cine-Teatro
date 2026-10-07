// js/admin.js — Panel admin alineado al modelo actual (datos + localStorage)

document.addEventListener("DOMContentLoaded", () => {
  // Solo admin
  const user = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  if (!user || user.rol !== "admin") {
    alert("Acceso solo para administradores.");
    window.location.href = "login.html";
    return;
  }

  const KEY_CONTENIDO = "contenidoAdmin";
  const KEY_FUNCIONES = "funcionesAdmin";

  function getContenidoAdmin() {
    return JSON.parse(localStorage.getItem(KEY_CONTENIDO) || "[]");
  }
  function saveContenidoAdmin(arr) {
    localStorage.setItem(KEY_CONTENIDO, JSON.stringify(arr));
  }
  function getFuncionesAdmin() {
    return JSON.parse(localStorage.getItem(KEY_FUNCIONES) || "[]");
  }
  function saveFuncionesAdmin(arr) {
    localStorage.setItem(KEY_FUNCIONES, JSON.stringify(arr));
  }

  /** Todo el contenido: DB base + admin */
  function todoContenido() {
    const admin = getContenidoAdmin();
    const baseCine = (DB.peliculas || []).map(p => ({ ...p, tipo: "cine", _origen: "base" }));
    const baseTeatro = (DB.obras || []).map(o => ({ ...o, tipo: "teatro", _origen: "base" }));
    const extra = admin.map(a => ({ ...a, _origen: "admin" }));
    return [...baseCine, ...baseTeatro, ...extra];
  }

  function todasFunciones() {
    const adminF = getFuncionesAdmin();
    const base = (DB.funciones || []).map(f => ({ ...f, _origen: "base" }));
    return [...base, ...adminF.map(f => ({ ...f, _origen: "admin" }))];
  }

  let filtroTipo = "todos";

  // ----- LISTA CONTENIDO -----
  function renderContenido() {
    const lista = document.getElementById("listaContenido");
    if (!lista) return;
    let items = todoContenido();
    if (filtroTipo === "cine") items = items.filter(i => i.tipo === "cine");
    if (filtroTipo === "teatro") items = items.filter(i => i.tipo === "teatro");

    if (!items.length) {
      lista.innerHTML = `<p class="text-secondary">No hay contenido.</p>`;
      return;
    }

    lista.innerHTML = items.map(item => {
      const genero = Array.isArray(item.genero) ? item.genero.join(", ") : item.genero;
      const puedeBorrar = item._origen === "admin";
      return `
        <div class="card border-custom bg-card">
          <div class="card-body d-flex gap-3 align-items-start">
            <img src="${item.imagen || ""}" alt="" style="width:56px;height:80px;object-fit:cover;border-radius:6px"
                 onerror="this.src='https://placehold.co/56x80'">
            <div class="flex-grow-1">
              <span class="badge ${item.tipo === "teatro" ? "bg-primary" : "bg-danger"} mb-1">${item.tipo}</span>
              <span class="badge bg-secondary mb-1">${item.estado || "cartelera"}</span>
              ${item._origen === "admin" ? '<span class="badge bg-warning text-dark mb-1">Admin</span>' : ""}
              <h6 class="fw-bold mb-0">${item.titulo}</h6>
              <p class="small text-secondary mb-1">${genero || ""} · ${item.clasificacion || ""} · ${item.anio || ""}</p>
              <div class="d-flex gap-2 mt-2">
                ${puedeBorrar ? `
                  <button type="button" class="btn btn-sm btn-outline-light btn-edit" data-id="${item.id}">Editar</button>
                  <button type="button" class="btn btn-sm btn-outline-danger btn-del" data-id="${item.id}">Eliminar</button>
                ` : `<span class="small text-secondary">Catálogo base (solo lectura)</span>`}
              </div>
            </div>
          </div>
        </div>`;
    }).join("");

    lista.querySelectorAll(".btn-del").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!confirm("¿Eliminar este contenido?")) return;
        const id = Number(btn.dataset.id);
        saveContenidoAdmin(getContenidoAdmin().filter(c => Number(c.id) !== id));
        renderContenido();
        llenarSelectContenido();
      });
    });

    lista.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", () => cargarEdicion(Number(btn.dataset.id)));
    });
  }

  function cargarEdicion(id) {
    const item = getContenidoAdmin().find(c => Number(c.id) === id);
    if (!item) return;
    document.getElementById("editId").value = item.id;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("titulo").value = item.titulo || "";
    document.getElementById("genero").value = Array.isArray(item.genero) ? item.genero.join(", ") : (item.genero || "");
    document.getElementById("anio").value = item.anio || "";
    document.getElementById("duracion").value = item.duracion || "";
    document.getElementById("clasificacion").value = item.clasificacion || "TE";
    document.getElementById("formatos").value = (item.formatos || []).join(", ");
    document.getElementById("director").value = item.director || "";
    document.getElementById("reparto").value = item.reparto || "";
    document.getElementById("imagen").value = item.imagen || "";
    document.getElementById("sinopsis").value = item.sinopsis || "";
    document.getElementById("estado").value = item.estado || "cartelera";
    document.getElementById("fechaEstreno").value = item.fechaEstreno || "";
    document.getElementById("formTitulo").textContent = "Editar contenido";
    document.getElementById("btnCancelar").classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    document.getElementById("formContenido").reset();
    document.getElementById("editId").value = "";
    document.getElementById("formTitulo").textContent = "Agregar película / obra";
    document.getElementById("btnCancelar").classList.add("d-none");
  }

  document.getElementById("btnCancelar")?.addEventListener("click", resetForm);

  document.getElementById("formContenido")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("editId").value;
    const generoRaw = document.getElementById("genero").value.trim();
    const formatosRaw = document.getElementById("formatos").value.trim();

    const data = {
      id: editId ? Number(editId) : Date.now(),
      tipo: document.getElementById("tipo").value,
      titulo: document.getElementById("titulo").value.trim(),
      genero: generoRaw.split(",").map(s => s.trim()).filter(Boolean),
      anio: Number(document.getElementById("anio").value) || null,
      duracion: document.getElementById("duracion").value.trim(),
      clasificacion: document.getElementById("clasificacion").value,
      formatos: formatosRaw ? formatosRaw.split(",").map(s => s.trim()).filter(Boolean) : ["2D"],
      director: document.getElementById("director").value.trim(),
      reparto: document.getElementById("reparto").value.trim(),
      imagen: document.getElementById("imagen").value.trim(),
      sinopsis: document.getElementById("sinopsis").value.trim(),
      valoracion: 0,
      estado: document.getElementById("estado").value,
      fechaEstreno: document.getElementById("fechaEstreno").value.trim(),
      restricciones: { activa: false, texto: "", items: [] }
    };

    let arr = getContenidoAdmin();
    if (editId) {
      arr = arr.map(c => Number(c.id) === data.id ? data : c);
    } else {
      // IDs: cine < 100 usa timestamp; teatro admin puede ser > 1000
      if (data.tipo === "teatro" && data.id < 200) data.id = Date.now();
      arr.push(data);
    }
    saveContenidoAdmin(arr);
    resetForm();
    renderContenido();
    llenarSelectContenido();
    alert("Contenido guardado. Aparecerá en cartelera junto al catálogo base.");
  });

  // Filtros
  function setFiltro(tipo, btn) {
    filtroTipo = tipo;
    ["filtroTodos", "filtroCine", "filtroTeatro"].forEach(id => {
      document.getElementById(id)?.classList.remove("active");
    });
    btn.classList.add("active");
    renderContenido();
  }
  document.getElementById("filtroTodos")?.addEventListener("click", function () { setFiltro("todos", this); });
  document.getElementById("filtroCine")?.addEventListener("click", function () { setFiltro("cine", this); });
  document.getElementById("filtroTeatro")?.addEventListener("click", function () { setFiltro("teatro", this); });

  // ----- FUNCIONES -----
  function llenarSelectContenido() {
    const sel = document.getElementById("funContenido");
    if (!sel) return;
    const items = todoContenido().filter(i => !i.estado || i.estado === "cartelera");
    sel.innerHTML = items.map(i =>
      `<option value="${i.id}|${i.tipo}">${i.titulo} (${i.tipo})</option>`
    ).join("");
  }

  function llenarSalas() {
    const sel = document.getElementById("funSala");
    if (!sel || !DB.salas) return;
    sel.innerHTML = DB.salas.map(s =>
      `<option value="${s.id}">${s.nombre} ($${s.precioBase})</option>`
    ).join("");
  }

  function renderFunciones() {
    const lista = document.getElementById("listaFunciones");
    if (!lista) return;
    const funcs = todasFunciones().slice().reverse();
    const contenido = todoContenido();

    if (!funcs.length) {
      lista.innerHTML = `<p class="text-secondary">No hay funciones.</p>`;
      return;
    }

    lista.innerHTML = funcs.map(f => {
      const item = contenido.find(c => Number(c.id) === Number(f.contenidoId) && c.tipo === f.tipo);
      const sala = (DB.salas || []).find(s => s.id === f.salaId);
      const puedeBorrar = f._origen === "admin";
      return `
        <div class="card border-custom bg-card mb-2">
          <div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <strong>${item ? item.titulo : "ID " + f.contenidoId}</strong>
              <span class="badge bg-secondary ms-1">${f.tipo}</span>
              <p class="small text-secondary mb-0">${f.fecha} · ${f.hora} · ${sala ? sala.nombre : f.salaId}</p>
            </div>
            ${puedeBorrar
              ? `<button type="button" class="btn btn-sm btn-outline-danger btn-del-fun" data-id="${f.id}">Eliminar</button>`
              : `<span class="small text-secondary">Base</span>`}
          </div>
        </div>`;
    }).join("");

    lista.querySelectorAll(".btn-del-fun").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!confirm("¿Eliminar función?")) return;
        const id = Number(btn.dataset.id);
        saveFuncionesAdmin(getFuncionesAdmin().filter(f => Number(f.id) !== id));
        renderFunciones();
      });
    });
  }

  document.getElementById("formFuncion")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const [contenidoId, tipo] = document.getElementById("funContenido").value.split("|");
    const fecha = document.getElementById("funFecha").value;
    const hora = document.getElementById("funHora").value;
    const salaId = document.getElementById("funSala").value;

    const arr = getFuncionesAdmin();
    arr.push({
      id: Date.now(),
      contenidoId: Number(contenidoId),
      tipo,
      salaId,
      fecha,
      hora,
      _origen: "admin"
    });
    saveFuncionesAdmin(arr);
    e.target.reset();
    renderFunciones();
    alert("Función agregada.");
  });

  // ----- COMPRAS -----
  function renderCompras() {
    const lista = document.getElementById("listaCompras");
    if (!lista) return;
    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]").slice().reverse();
    if (!historial.length) {
      lista.innerHTML = `<p class="text-secondary">No hay compras registradas.</p>`;
      return;
    }
    lista.innerHTML = historial.map(t => `
      <div class="card border-custom bg-card mb-2">
        <div class="card-body">
          <div class="d-flex justify-content-between flex-wrap gap-2">
            <div>
              <span class="badge bg-danger">${t.tipo || "cine"}</span>
              <strong class="ms-1">${t.titulo}</strong>
              <p class="small text-secondary mb-0">${t.fecha} ${t.hora} · ${t.cliente || ""} · ${t.email || ""}</p>
              <p class="small mb-0">Butacas: ${(t.asientos || []).join(", ")} · Ticket: ${t.idTicket}</p>
            </div>
            <strong class="text-success">$${Number(t.total || 0).toLocaleString("es-CL")}</strong>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Para que detalle/peliculas vean funciones admin, fusionar en runtime no es global;
  // opcional: exponer helper. Las páginas ya leen contenidoAdmin.
  // Fusionar funciones admin en una copia usable:
  window.getFuncionesCompletas = function () {
    return todasFunciones();
  };

  // Init
  renderContenido();
  llenarSelectContenido();
  llenarSalas();
  renderFunciones();
  renderCompras();

  // Al cambiar de tab, refrescar compras
  document.querySelectorAll('#adminTabs button[data-bs-toggle="tab"]').forEach(btn => {
    btn.addEventListener("shown.bs.tab", (e) => {
      if (e.target.getAttribute("data-bs-target") === "#tabCompras") renderCompras();
      if (e.target.getAttribute("data-bs-target") === "#tabFunciones") renderFunciones();
    });
  });
});