// ======================================================
// DETALLE.JS
// Muestra información de una película u obra.
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  // Leemos los parámetros de la URL (ejemplo: detalle.html?id=1&tipo=cine)
  const params = new URLSearchParams(window.location.search);

  // ID del contenido y tipo
  const id = Number(params.get("id"));
  const tipo = params.get("tipo");

  // Contenedor HTML
  const contenedor = document.getElementById("contenedorDetalle");

  // CONTENIDO BASE DE LAS PELÍCULAS U OBRAS
  const contenidoBase = tipo === "teatro" ? DB.obras : DB.peliculas;

  // CONTENIDO AGREGADO POR ADMIN
  const contenidoAdmin = JSON.parse(localStorage.getItem("contenidoAdmin")) || [];

  // Filtramos según tipo
  const contenidoNuevo = contenidoAdmin.filter((item) => item.tipo === tipo);

  // Unimos contenido original y nuevo
  const contenidoCompleto = [...contenidoBase, ...contenidoNuevo];

  // Buscamos el contenido
  const contenido = contenidoCompleto.find((item) => Number(item.id) === id);

  // Sistema de Validación
  if (!contenido) {
    contenedor.innerHTML = `
      <div class="alert alert-danger">
        No se encontró el contenido.
      </div>
    `;
    return;
  }

  // Se muestra la información
  contenedor.innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-md-5">
        <img
          src="${contenido.imagen}"
          class="img-fluid rounded shadow"
          alt="${contenido.titulo}"
        >
      </div>

      <div class="col-12 col-md-7">
        <span class="badge bg-danger mb-3">
          ${tipo === "teatro" ? "TEATRO" : "PELÍCULA"}
        </span>

        <h1 class="fw-bold">${contenido.titulo}</h1>

        <p class="text-warning">
          ★ ${contenido.valoracion || 0}
        </p>

        <p class="text-secondary">
          ${contenido.genero}
        </p>

        <p>${contenido.sinopsis}</p>

        <hr>

        <p>
          <strong>Duración:</strong> ${contenido.duracion}
        </p>

        <p>
          <strong>Clasificación:</strong> ${contenido.clasificacion}
        </p>

        <p>
          <strong>Director:</strong> ${contenido.director}
        </p>

        <p>
          <strong>Reparto:</strong> ${contenido.reparto}
        </p>

        <a
          href="funciones.html?contenidoId=${contenido.id}&tipo=${tipo}"
          class="btn btn-danger mt-3"
        >
          <i class="bi bi-calendar-event"></i>
          Ver funciones
        </a>
      </div>
    </div>
  `;
});