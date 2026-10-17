import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Perfil() {
  const { user, logout } = useAuth();

  // Sin sesión: no hay "mis" datos
  if (!user) {
    return (
      <main
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div className="w-100" style={{ maxWidth: 520 }}>
          <div className="card shadow border-0 p-5 text-center">
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
        </div>
      </main>
    );
  }

  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <div className="w-100" style={{ maxWidth: 520 }}>
        <h1 className="h2 fw-bold mb-4 text-center">Mi perfil</h1>
        <div className="card shadow border-0 p-4">
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
      </div>
    </main>
  );
}
