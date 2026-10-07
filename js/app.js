// js/app.js
// Controla el navbar según la sesión + botón de tema

document.addEventListener('DOMContentLoaded', () => {
  actualizarNavbar();
});

function actualizarNavbar() {
  const authArea = document.getElementById('authArea');
  if (!authArea) return;

  let usuarioActual = null;

  try {
    const data = localStorage.getItem('usuarioActual');
    if (data) {
      usuarioActual = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al leer la sesión:', error);
    localStorage.removeItem('usuarioActual');
  }

  // Botón de tema (siempre presente)
  const themeBtn = `
    <button type="button" id="theme-toggle" class="btn btn-sm" title="Cambiar tema claro/oscuro" aria-label="Cambiar tema">
      <i class="bi bi-moon-fill" id="theme-icon"></i>
    </button>
  `;

  if (usuarioActual) {
    const primerNombre = usuarioActual.nombre
      ? usuarioActual.nombre.split(' ')[0]
      : 'Usuario';
    const esAdmin = usuarioActual.rol === 'admin';

    authArea.innerHTML = `
      ${themeBtn}

      <a href="entradas.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-ticket-perforated"></i>
        <span class="d-none d-md-inline">Mis Entradas</span>
      </a>

      <a href="perfil.html" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-person-circle"></i>
        <span class="d-none d-md-inline">${primerNombre}</span>
      </a>

      ${esAdmin ? `
        <a href="admin.html" class="btn btn-warning btn-sm d-flex align-items-center gap-1">
          <i class="bi bi-shield-lock"></i>
          <span class="d-none d-md-inline">Admin</span>
        </a>
      ` : ''}

      <button type="button" onclick="cerrarSesion()" class="btn btn-outline-danger btn-sm">
        <i class="bi bi-box-arrow-right"></i>
        <span class="d-none d-md-inline">Salir</span>
      </button>
    `;
  } else {
    authArea.innerHTML = `
      ${themeBtn}

      <a href="login.html" class="btn btn-danger btn-sm d-flex align-items-center gap-1">
        <i class="bi bi-person-fill"></i> Iniciar Sesión
      </a>
    `;
  }

  // Actualizar el icono del tema después de inyectar el botón
  if (typeof window.getTheme === 'function') {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      const theme = window.getTheme();
      icon.className = theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  alert('Sesión cerrada correctamente.');
  window.location.href = 'index.html';
}