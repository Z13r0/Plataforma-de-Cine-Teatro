// ======================================================
// js/perfil.js
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");

  if (!usuario) {
    alert("Debes iniciar sesión para ver tu perfil.");
    window.location.href = "login.html";
    return;
  }

  // Mostrar datos del usuario
  document.getElementById("nombrePerfil").textContent = usuario.nombre || "Usuario";
  document.getElementById("emailPerfil").textContent = usuario.email || "-";

  const rolBadge = document.getElementById("rolPerfil");
  if (usuario.rol === "admin") {
    rolBadge.textContent = "Administrador";
    rolBadge.className = "badge bg-warning text-dark";
  } else {
    rolBadge.textContent = "Cliente";
    rolBadge.className = "badge bg-secondary";
  }

  mostrarMisComentarios(usuario);
  mostrarMisEntradas(usuario);
});

function mostrarMisComentarios(usuario) {
  const contenedor = document.getElementById("misComentarios");
  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");

  // Filtrar comentarios del usuario actual (por nombre)
  const misComentarios = comentarios.filter(c => c.nombre === usuario.nombre);

  if (misComentarios.length === 0) {
    contenedor.innerHTML = `<p class="text-secondary mb-0">Aún no has publicado comentarios.</p>`;
    return;
  }

  contenedor.innerHTML = misComentarios.slice(0, 5).map(com => {
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      estrellas += i <= com.valoracion
        ? `<i class="bi bi-star-fill text-warning"></i>`
        : `<i class="bi bi-star text-secondary"></i>`;
    }

    return `
      <div class="border-bottom border-secondary pb-3 mb-3">
        <div class="d-flex justify-content-between">
          <strong>${com.texto.substring(0, 60)}${com.texto.length > 60 ? "..." : ""}</strong>
          <span>${estrellas}</span>
        </div>
        <small class="text-secondary">${com.fecha}</small>
      </div>
    `;
  }).join("");
}

function mostrarMisEntradas(usuario) {
  const contenedor = document.getElementById("misEntradas");
  const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");

  // Filtrar entradas del usuario (si guardaste el email o nombre)
  const misEntradas = entradas.filter(e => 
    e.usuario === usuario.nombre || e.email === usuario.email
  );

  if (misEntradas.length === 0) {
    contenedor.innerHTML = `<p class="text-secondary mb-0">Aún no tienes entradas compradas.</p>`;
    return;
  }

  contenedor.innerHTML = misEntradas.slice(0, 5).map(e => `
    <div class="border-bottom border-secondary pb-3 mb-3">
      <div class="d-flex justify-content-between">
        <strong>${e.titulo || "Entrada"}</strong>
        <span class="text-success">$${e.total || 0}</span>
      </div>
      <small class="text-secondary">
        ${e.fecha || e.fechaCompra || ""} 
        ${e.butacas ? "• Butacas: " + e.butacas.join(", ") : ""}
      </small>
    </div>
  `).join("");
}