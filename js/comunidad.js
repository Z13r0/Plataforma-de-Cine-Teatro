// ======================================================
// js/comunidad.js
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  cargarSelectContenidos();
  mostrarComentarios();          // ← corregido (antes estaba mal escrito)
  rellenarNombreSiHaySesion();

  const form = document.getElementById("formComentario");
  if (form) {
    form.addEventListener("submit", guardarComentario);
  }
});

// Llena el select con películas y obras
function cargarSelectContenidos() {
  const select = document.getElementById("contenidoSeleccionado");
  if (!select) return;

  // Películas
  (DB.peliculas || []).forEach((peli) => {
    const option = document.createElement("option");
    option.value = `cine-${peli.id}`;
    option.textContent = `🎬 ${peli.titulo}`;
    select.appendChild(option);
  });

  // Obras
  (DB.obras || []).forEach((obra) => {
    const option = document.createElement("option");
    option.value = `teatro-${obra.id}`;
    option.textContent = `🎭 ${obra.titulo}`;
    select.appendChild(option);
  });

  // Contenido agregado por el admin
  const contenidoAdmin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
  contenidoAdmin.forEach((item) => {
    const option = document.createElement("option");
    option.value = `${item.tipo}-${item.id}`;
    option.textContent = `${item.tipo === "cine" ? "🎬" : "🎭"} ${item.titulo}`;
    select.appendChild(option);
  });
}

// Si hay sesión, rellena automáticamente el nombre
function rellenarNombreSiHaySesion() {
  const inputNombre = document.getElementById("nombreUsuario");
  if (!inputNombre) return;

  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    if (usuario && usuario.nombre) {
      inputNombre.value = usuario.nombre;
      inputNombre.readOnly = true; // opcional: no dejar cambiarlo
    }
  } catch (e) {}
}

// Guardar nuevo comentario
function guardarComentario(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const contenido = document.getElementById("contenidoSeleccionado").value;
  const valoracion = document.getElementById("valoracion").value;
  const texto = document.getElementById("textoComentario").value.trim();

  if (!nombre || !contenido || !texto) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const comentario = {
    id: Date.now(),
    nombre: nombre,
    contenido: contenido,
    valoracion: Number(valoracion),
    texto: texto,
    fecha: new Date().toLocaleString("es-CL")
  };

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.unshift(comentario); // más reciente primero
  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  // Limpiar solo el texto y la valoración (dejamos el nombre)
  document.getElementById("textoComentario").value = "";
  document.getElementById("valoracion").value = "5";
  document.getElementById("contenidoSeleccionado").value = "";

  mostrarComentarios();
  alert("¡Comentario publicado correctamente!");
}

// Mostrar los comentarios
function mostrarComentarios() {
  const contenedor = document.getElementById("listaComentarios");
  if (!contenedor) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  if (comentarios.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary text-center">
        Todavía no hay comentarios. ¡Sé el primero en opinar!
      </div>`;
    return;
  }

  contenedor.innerHTML = "";

  comentarios.forEach((com) => {
    // Estrellas
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      estrellas += i <= com.valoracion
        ? `<i class="bi bi-star-fill text-warning"></i>`
        : `<i class="bi bi-star text-secondary"></i>`;
    }

    // Título del contenido
    const [tipo, id] = com.contenido.split("-");
    let tituloContenido = "Contenido";

    if (tipo === "cine") {
      const peli = (DB.peliculas || []).find(p => p.id === Number(id));
      tituloContenido = peli ? peli.titulo : "Película";
    } else if (tipo === "teatro") {
      const obra = (DB.obras || []).find(o => o.id === Number(id));
      tituloContenido = obra ? obra.titulo : "Obra";
    }

    // También buscar en contenido del admin
    if (tituloContenido === "Película" || tituloContenido === "Obra") {
      const admin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
      const encontrado = admin.find(c => c.id === Number(id));
      if (encontrado) tituloContenido = encontrado.titulo;
    }

    const tarjeta = `
      <div class="card bg-black border-secondary">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 class="mb-0 text-danger">${com.nombre}</h6>
              <small class="text-secondary">${tituloContenido}</small>
            </div>
            <div class="text-end">
              <div>${estrellas}</div>
              <small class="text-secondary">${com.fecha}</small>
            </div>
          </div>
          <p class="mb-0">${com.texto}</p>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjeta;
  });
}