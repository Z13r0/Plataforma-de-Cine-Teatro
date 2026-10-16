import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UserPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex={-1}
      id="userPanel"
      aria-labelledby="userPanelLabel"
    >
      <div className="offcanvas-header border-bottom border-secondary">
        <h5 className="offcanvas-title" id="userPanelLabel">
          Mi cuenta
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        />
      </div>

      <div className="offcanvas-body">
        {user ? (
          <>
            <p className="fw-semibold mb-1">{user.nombre}</p>
            <p className="small text-secondary mb-3">{user.email}</p>
            <Link
              to="/historial"
              className="btn btn-outline-light w-100 mb-2"
              data-bs-dismiss="offcanvas"
            >
              Mis compras
            </Link>
            {user.rol === "admin" && (
              <Link
                to="/admin"
                className="btn btn-outline-light w-100 mb-2"
                data-bs-dismiss="offcanvas"
              >
                Admin
              </Link>
            )}
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <p className="small text-secondary mb-3">
              Accede para ver tu perfil y tus compras.
            </p>
            {/* Mismo tipo de acciones que en feature */}
            <Link
              to="/login"
              className="btn btn-danger w-100 mb-2"
              data-bs-dismiss="offcanvas"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="btn btn-outline-light w-100"
              data-bs-dismiss="offcanvas"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </div>
  );
}