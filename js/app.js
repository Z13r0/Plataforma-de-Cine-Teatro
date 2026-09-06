// Archivo: js/app.js
// Controla el navbar según la sesión del usuario

document.addEventListener("DOMContentLoaded", () => {
  actualizarNavbar();
});

function actualizarNavbar() {
  const authArea = document.getElementById("authArea");

  // Si la página no tiene el contenedor, no hacemos nada
  if (!authArea) return;

  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  if (usuarioActual) {
    // Usuario logueado
    authArea.innerHTML = `
      <a href="entradas.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-ticket-perforated"></i> Mis Entradas
      </a>
      
      <span class="text-light small">
        Hola, <strong>${usuarioActual.nombre.split(" ")[0]}</strong>
      </span>
      
      <button onclick="cerrarSesion()" class="btn btn-outline-danger btn-sm">
        <i class="bi bi-box-arrow-right"></i> Salir
      </button>
    `;
  } else {
    // No hay sesión
    authArea.innerHTML = `
      <a href="entradas.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-ticket-perforated"></i> Mis Entradas
      </a>
      
      <a href="login.html" class="btn btn-danger btn-sm">
        <i class="bi bi-person-fill"></i> Iniciar Sesión
      </a>
    `;
  }
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  alert("Sesión cerrada correctamente.");
  window.location.href = "index.html";
}