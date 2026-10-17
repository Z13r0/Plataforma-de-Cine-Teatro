/**
 * AdminUsuarios - Gestión de usuarios registrados
 * Permite ver los usuarios del sistema
 */
import { useState, useEffect } from "react";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Cargar usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(users);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 fw-bold mb-4">Gestión de Usuarios</h2>

      {usuarios.length === 0 ? (
        <div className="card bg-card p-4 text-center">
          <p className="text-muted mb-0">No hay usuarios registrados</p>
        </div>
      ) : (
        <div className="card bg-card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge ${u.rol === "admin" ? "bg-danger" : "bg-primary"}`}>
                          {u.rol || "usuario"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-light me-2">
                          <i className="bi bi-pencil" />
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
