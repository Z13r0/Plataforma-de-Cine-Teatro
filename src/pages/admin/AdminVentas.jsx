/**
 * AdminVentas - Historial de ventas y transacciones
 * Permite ver todas las ventas realizadas en el sistema
 */
import { useState, useEffect } from "react";

export default function AdminVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Cargar ventas del localStorage (si existe)
    const sales = JSON.parse(localStorage.getItem("ventas") || "[]");
    setVentas(sales);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 fw-bold mb-4">Historial de Ventas</h2>

      {ventas.length === 0 ? (
        <div className="card bg-card p-4 text-center">
          <p className="text-muted mb-0">No hay ventas registradas</p>
        </div>
      ) : (
        <div className="card bg-card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Película/Obra</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.usuario}</td>
                      <td>{v.contenido}</td>
                      <td>{v.fecha}</td>
                      <td>${v.monto}</td>
                      <td>
                        <span className="badge bg-success">Completado</span>
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
