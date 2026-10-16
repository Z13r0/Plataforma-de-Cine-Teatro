/**
 * Admin.jsx
 * Panel de administración para gestionar contenido (películas, obras, funciones).
 */
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { user, isAdmin } = useAuth();

  // Si no está logueado o no es admin, redirigir
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 fw-bold">Panel de Administración</h1>
          <p className="text-muted">Bienvenido, {user.nombre}</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-film me-2" />
                Películas
              </h5>
              <p className="card-text text-muted-theme">
                Gestiona el catálogo de películas en cartelera.
              </p>
              <button className="btn btn-outline-light w-100">
                Ver películas
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card bg-card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-masks me-2" />
                Obras de Teatro
              </h5>
              <p className="card-text text-muted-theme">
                Administra las obras y funciones teatrales.
              </p>
              <button className="btn btn-outline-light w-100">
                Ver obras
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card bg-card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-calendar-event me-2" />
                Funciones
              </h5>
              <p className="card-text text-muted-theme">
                Configura horarios y salas para las funciones.
              </p>
              <button className="btn btn-outline-light w-100">
                Ver funciones
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card bg-card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-people me-2" />
                Usuarios
              </h5>
              <p className="card-text text-muted-theme">
                Consulta los usuarios registrados en el sistema.
              </p>
              <button className="btn btn-outline-light w-100">
                Ver usuarios
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card bg-card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-ticket-perforated me-2" />
                Ventas
              </h5>
              <p className="card-text text-muted-theme">
                Revisa el historial de ventas y transacciones.
              </p>
              <button className="btn btn-outline-light w-100">
                Ver ventas
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
