/**
 * Navbar.jsx — Barra de navegación superior de la aplicación: muestra el logotipo, enlaces principales, alternador de tema y controles de sesión de usuario.
 */
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  // --- CONTEXTOS: Obtiene el tema actual y función de alternancia, así como los datos de autenticación ---
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-cinemark">
      <div className="container">
        
        {/* --- LOGOTIPO Y ENLACE DE INICIO --- */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-film me-2" />
          Cine & Teatro
        </Link>
        
        {/* --- CONTROLES DERECHOS: Enlaces, Alternador de Tema y Estado de Sesión --- */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          <NavLink className="nav-link" to="/">Inicio</NavLink>
          <NavLink className="nav-link" to="/peliculas">Películas</NavLink>
          <NavLink className="nav-link" to="/teatro">Teatro</NavLink>
          
          {/* --- BOTÓN PARA CAMBIAR TEMA (Oscuro / Claro) --- */}
          <button type="button" className="btn btn-outline-light btn-sm" onClick={toggle}>
            <i className={`bi ${theme === "dark" ? "bi-sun-fill" : "bi-moon-fill"}`} />
          </button>
          
          {/* --- RENDERIZADO CONDICIONAL DE SESIÓN: Muestra nombre y salir si hay usuario, o botón de acceso si no --- */}
          {user ? (
            <>
              <span className="small">{user.nombre}</span>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <Link className="btn btn-danger btn-sm" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}