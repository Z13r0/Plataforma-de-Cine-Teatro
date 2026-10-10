/**
 * Profile.jsx — Muestra los datos de la sesión actual del usuario y permite acceder al historial, panel de administración o cerrar sesión.
 */
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  // --- CONTEXTO DE AUTENTICACIÓN: Obtiene el usuario actual y la función de cierre de sesión ---
  const { user, logout } = useAuth();

  // --- VALIDACIÓN DE SESIÓN: Si no hay un usuario autenticado, muestra un mensaje para que inicie sesión ---
  if (!user) {
    return (
      <div className="card border-custom bg-card p-5 text-center">
        <p className="mb-3 text-secondary">No has iniciado sesión.</p>
        <Link to="/login" className="btn btn-danger">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="h2 fw-bold section-title mb-4">Mi perfil</h1>
      
      {/* --- TARJETA DE INFORMACIÓN DEL USUARIO --- */}
      <div className="card border-custom bg-card p-4" style={{ maxWidth: 480 }}>
        <p>
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p>
          <strong>Correo:</strong> {user.email}
        </p>
        <p className="mb-3">
          <strong>Rol:</strong> {user.rol || "usuario"}
        </p>
        
        {/* --- ACCIONES DE PERFIL (Historial, Panel Admin y Cerrar Sesión) --- */}
        <div className="d-flex flex-wrap gap-2">
          <Link to="/historial" className="btn btn-outline-light">
            Ver mis compras
          </Link>
          
          {/* --- ACCESO CONDICIONAL: Muestra el botón de admin solo si el usuario tiene rol de administrador --- */}
          {user.rol === "admin" && (
            <Link to="/admin" className="btn btn-outline-light">
              Panel admin
            </Link>
          )}
          
          <button type="button" className="btn btn-outline-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}