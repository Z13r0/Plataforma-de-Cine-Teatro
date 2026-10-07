document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const tipo = params.get("tipo") || "cine";
  const contenedor = document.getElementById("contenedorDetalle");

  const base = tipo === "teatro" ? DB.obras : DB.peliculas;
  const admin = (JSON.parse(localStorage.getItem("contenidoAdmin")) || []).filter(i => i.tipo === tipo);
  const contenido = [...base, ...admin].find(i => Number(i.id) === id);

  if (!contenido) {
    contenedor.innerHTML = `<div class="alert alert-danger">No se encontró el contenido.</div>`;
    return;
  }

  const generos = Array.isArray(contenido.genero) ? contenido.genero : [contenido.genero];
  const formatos = contenido.formatos || ["2D"];
  const rest = contenido.restricciones || { activa: false };

  // Funciones de este contenido
  const funciones = DB.funciones.filter(f => f.contenidoId === id && f.tipo === tipo);

  contenedor.innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-lg-4">
        <img src="${contenido.imagen}" class="img-fluid rounded shadow w-100" alt="${contenido.titulo}" style="max-height:500px;object-fit:cover;">
        <div class="mt-3 d-flex gap-2 flex-wrap">
          <span class="badge bg-secondary">${contenido.duracion}</span>
          <span class="badge bg-danger">${contenido.clasificacion}</span>
        </div>
        <div class="mt-2 d-flex gap-2 flex-wrap">
          ${generos.map(g => `<span class="badge border border-secondary">${g}</span>`).join("")}
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <span class="badge bg-danger mb-2">${tipo === "teatro" ? "TEATRO" : "PELÍCULA"}</span>
        <h1 class="fw-bold mb-2">${contenido.titulo}</h1>
        <p class="text-warning mb-3">★ ${contenido.valoracion || "-"}</p>
        <p class="mb-4">${contenido.sinopsis}</p>

        <div class="row g-3 mb-4 small">
          <div class="col-6 col-md-3"><strong class="text-secondary d-block">Duración</strong>${contenido.duracion}</div>
          <div class="col-6 col-md-3"><strong class="text-secondary d-block">Clasificación</strong>${contenido.clasificacion}</div>
          <div class="col-6 col-md-3"><strong class="text-secondary d-block">Director</strong>${contenido.director}</div>
          <div class="col-6 col-md-3"><strong class="text-secondary d-block">Formatos</strong>${formatos.join(" · ")}</div>
        </div>
        <p class="small mb-4"><strong class="text-secondary">Reparto:</strong> ${contenido.reparto}</p>

        ${rest.activa ? `
          <div class="mb-4">
            <button class="btn btn-outline-warning btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#boxRest">
              Ver restricciones
            </button>
            <div class="collapse mt-2" id="boxRest">
              <div class="p-3 border rounded bg-card small">
                <p class="mb-2">${rest.texto}</p>
                <ul class="mb-0">${(rest.items || []).map(i => `<li>${i}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
        ` : ""}

        <h4 class="fw-bold mb-3">Horarios</h4>
        <div class="d-flex flex-wrap gap-2 mb-4" id="listaHorarios">
          ${funciones.length === 0
            ? `<p class="text-secondary">No hay funciones disponibles.</p>`
            : funciones.map(f => {
                const sala = DB.salas.find(s => s.id === f.salaId);
                return `
                  <button class="btn btn-outline-light btn-horario"
                    data-funcion-id="${f.id}"
                    data-fecha="${f.fecha}"
                    data-hora="${f.hora}"
                    data-sala="${f.salaId}"
                    data-sala-nombre="${sala ? sala.nombre : f.salaId}"
                    data-precio="${sala ? sala.precioBase : 5000}">
                    ${f.fecha} · ${f.hora}<br><small>${sala ? sala.nombre : ""}</small>
                  </button>
                `;
              }).join("")
          }
        </div>

        <button id="btnComprar" class="btn btn-danger btn-lg px-5" disabled>
          Comprar entradas
        </button>
      </div>
    </div>
  `;

  let funcionSeleccionada = null;

  document.querySelectorAll(".btn-horario").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-horario").forEach(b => b.classList.remove("btn-danger", "active"));
      document.querySelectorAll(".btn-horario").forEach(b => b.classList.add("btn-outline-light"));
      btn.classList.remove("btn-outline-light");
      btn.classList.add("btn-danger", "active");

      funcionSeleccionada = {
        funcionId: Number(btn.dataset.funcionId),
        fecha: btn.dataset.fecha,
        hora: btn.dataset.hora,
        sala: btn.dataset.sala,
        salaNombre: btn.dataset.salaNombre,
        precio: Number(btn.dataset.precio)
      };
      document.getElementById("btnComprar").disabled = false;
    });
  });

  document.getElementById("btnComprar").addEventListener("click", () => {
    if (!funcionSeleccionada) return;

    // Guardar inicio del carrito
    const cart = Carrito.get();
    cart.contenidoId = contenido.id;
    cart.tipo = tipo;
    cart.titulo = contenido.titulo;
    cart.imagen = contenido.imagen;
    cart.fecha = funcionSeleccionada.fecha;
    cart.hora = funcionSeleccionada.hora;
    cart.sala = funcionSeleccionada.sala;
    cart.salaNombre = funcionSeleccionada.salaNombre;
    cart.funcionId = funcionSeleccionada.funcionId;
    cart.formato = (contenido.formatos && contenido.formatos[0]) || "2D";
    cart.entradas = [{
      nombre: "General",
      cantidad: 1,
      precio: funcionSeleccionada.precio
    }];
    cart.cargoServicio = DB.cargoServicio || 700;
    cart.butacas = [];
    cart.confiteria = [];
    Carrito.save(cart);

    // Ir a butacas (o primero a modal login si quieres)
    window.location.href = `butacas.html?id=${contenido.id}&tipo=${tipo}&funcionId=${funcionSeleccionada.funcionId}`;
  });
});