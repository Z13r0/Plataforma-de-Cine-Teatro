/**
 * Navbar.jsx — Barra de navegación superior sticky con diseño responsivo, alternador de tema, menú de enlaces principales y controles de sesión según el rol del usuario.
 */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const NAV_ITEMS = [
  { label: "Inicio", to: "/", end: true },
  { label: "Películas", to: "/peliculas" },
  { label: "Obras", to: "/obras" },
  { label: "Comunidad", to: "/comunidad" },
  { label: "Historial", to: "/historial" },
];

export default function Navbar() {
  // --- CONTEXTOS Y NAVEGACIÓN ---
  const { theme, toggle } = useTheme(); // Control del tema visual (claro/oscuro)
  const { user, logout } = useAuth();   // Datos del usuario autenticado y función de cierre de sesión
  const navigate = useNavigate();       // Hook para redireccionar tras salir

  // --- ESTADO PARA EFECTO DE SCROLL ---
  const [scrolled, setScrolled] = useState(false);

  // --- EFECTO DE SCROLL: Detecta el desplazamiento vertical para aplicar una sombra cinematográfica ---
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- MANEJADOR DE CIERRE DE SESIÓN: Cierra sesión y redirige al inicio ---
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-cinemark ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="container">
        
        {/* --- LOGOTIPO DE LA APLICACIÓN --- */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-film fs-3" />
          <span>Cine & Teatro</span>
        </Link>

        {/* --- BOTÓN HAMBURGUESA (Menú móvil) --- */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* --- CONTENEDOR COLAPSIBLE DE ENLACES Y CONTROLES --- */}
        <div className="collapse navbar-collapse" id="navbarMain">
          
          {/* --- ENLACES DE NAVEGACIÓN PRINCIPAL --- */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {NAV_ITEMS.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink className="nav-link" to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* --- CONTROLES DE TEMA Y AUTENTICACIÓN --- */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            
            {/* --- BOTÓN ALTERNADOR DE TEMA --- */}
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={toggle}
              title="Cambiar tema"
            >
              <i
                className={`bi ${
                  theme === "dark" ? "bi-sun-fill" : "bi-moon-fill"
                }`}
              />
            </button>

            {/* --- RENDERIZADO CONDICIONAL SEGÚN ESTADO DE SESIÓN --- */}
            {user ? (
              <>
                {/* Enlace al perfil de usuario */}
                <NavLink className="btn btn-outline-light btn-sm" to="/perfil">
                  <i className="bi bi-person me-1" />
                  {user.nombre}
                </NavLink>

                {/* Enlace rápido a mis compras */}
                <NavLink className="btn btn-outline-light btn-sm" to="/historial">
                  <i className="bi bi-ticket-perforated me-1" />
                  Mis compras
                </NavLink>

                {/* Enlace al panel de administración (solo si el rol es 'admin') */}
                {user.rol === "admin" && (
                  <NavLink className="btn btn-outline-light btn-sm" to="/admin">
                    Admin
                  </NavLink>
                )}

                {/* Botón de cierre de sesión */}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            ) : (
              /* Botón de inicio de sesión para usuarios no autenticados */
              <Link className="btn btn-danger btn-sm" to="/login">
                <i className="bi bi-person-fill me-1" />
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
