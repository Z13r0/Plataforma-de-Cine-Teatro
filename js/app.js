// Archivo: js/app.js
// Controla el navbar según la sesión del usuario

document.addEventListener("DOMContentLoaded", () => {
  actualizarNavbar();
});

function actualizarNavbar() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  let usuarioActual = null;

  try {
    const data = localStorage.getItem("usuarioActual");
    if (data) {
      usuarioActual = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error al leer la sesión:", error);
    localStorage.removeItem("usuarioActual");
  }

  if (usuarioActual) {
    // Usuario logueado
    const primerNombre = usuarioActual.nombre ? usuarioActual.nombre.split(" ")[0] : "Usuario";
    const esAdmin = usuarioActual.rol === "admin";

    authArea.innerHTML = `
      <a href="entradas.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-ticket-perforated"></i> Mis Entradas
      </a>

      <a href="perfil.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-person-circle"></i> Perfil
      </a>

      ${esAdmin ? `
        <a href="admin.html" class="btn btn-warning btn-sm d-flex align-items-center gap-1">
          <i class="bi bi-shield-lock"></i> Admin
        </a>
      ` : ""}

      <button onclick="cerrarSesion()" class="btn btn-outline-danger btn-sm">
        <i class="bi bi-box-arrow-right"></i> Salir
      </button>
    `;
  } else {
    // No hay sesión
    authArea.innerHTML = `
      <a href="login.html" class="btn btn-danger btn-sm d-flex align-items-center gap-1">
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