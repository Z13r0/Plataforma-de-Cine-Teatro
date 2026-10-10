import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, logout } = useAuth();

  // Sin sesión: no hay “mis” datos
  if (!user) {
    return (
      <div className="card border-custom bg-card p-5 text-center">
        <h1 className="h4 fw-bold mb-3">Mi perfil</h1>
        <p className="text-secondary mb-4">
          Debes iniciar sesión para ver tu perfil y tus compras.
        </p>
        <Link to="/login" className="btn btn-danger me-2">
          Iniciar sesión
        </Link>
        <Link to="/registro" className="btn btn-outline-light">
          Crear cuenta
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="h2 fw-bold section-title mb-4">Mi perfil</h1>
      <div className="card border-custom bg-card p-4" style={{ maxWidth: 520 }}>
        <p className="mb-2">
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p className="mb-2">
          <strong>Correo:</strong> {user.email}
        </p>
        <p className="mb-4">
          <strong>Rol:</strong> {user.rol || "usuario"}
        </p>

        <div className="d-flex flex-wrap gap-2">
          {/* Aquí se ven las compras */}
          <Link to="/historial" className="btn btn-danger">
            <i className="bi bi-ticket-perforated me-1" />
            Ver mis compras
          </Link>

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