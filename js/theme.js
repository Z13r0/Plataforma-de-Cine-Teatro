// js/theme.js
// Sistema de tema claro/oscuro - versión robusta

(function () {
  const html = document.documentElement;
  const STORAGE_KEY = 'cine-teatro-theme';

  // Aplicar tema ANTES de pintar la página (evita flash)
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateIcon(theme);
  }

  function updateIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.className = theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  // Aplicar inmediatamente
  applyTheme(getPreferredTheme());

  // Delegación de eventos: funciona aunque el botón se cree después
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#theme-toggle');
    if (!btn) return;

    e.preventDefault();
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });

  // Por si el icono se crea más tarde (cuando app.js inyecta el navbar)
  document.addEventListener('DOMContentLoaded', function () {
    updateIcon(html.getAttribute('data-theme'));
  });

  // Exponer función por si se necesita desde otros scripts
  window.setTheme = applyTheme;
  window.getTheme = () => html.getAttribute('data-theme');
})();