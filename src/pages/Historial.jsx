/**
 * Historial.jsx — Muestra el historial de compras del usuario.
 * Solo accesible si el usuario inició sesión.
 * Lee las compras desde localStorage (clave: historialCompras).
 */
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Historial() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  // Si no hay sesión, redirige al login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Mientras verifica la sesión
  if (!isLoggedIn) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3 text-secondary">Verificando sesión...</p>
      </div>
    );
  }

  // Carga y ordena las compras (más recientes primero)
  const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]")
    .slice()
    .reverse();

  // Filtra solo las compras del usuario actual (si tienen usuarioId)
  const misCompras = historial.filter(
    (t) => !t.usuarioId || t.usuarioId === user?.id
  );

  if (!misCompras.length) {
    return (
      <main className="container py-5">
        <h1 className="h2 fw-bold section-title mb-4">Historial de compras</h1>
        <div className="card border-custom bg-card p-5 text-center">
          <p className="text-secondary mb-3">Aún no tienes compras.</p>
          <Link to="/peliculas" className="btn btn-danger">
            Ver cartelera
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="h2 fw-bold section-title mb-4">Historial de compras</h1>
      <p className="text-secondary mb-4">
        Hola <strong>{user?.nombre}</strong>, aquí están tus compras.
      </p>

      {misCompras.map((t) => (
        <div className="card border-custom bg-card mb-3" key={t.idTicket}>
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <span className="badge bg-danger mb-1">{t.tipo}</span>
              <h5 className="fw-bold mb-1">{t.titulo}</h5>
              <p className="small text-secondary mb-0">
                {t.fecha} · {t.hora} · {(t.asientos || []).join(", ")}
              </p>
              {/* Muestra snacks si existen */}
              {t.snacks && t.snacks.length > 0 && (
                <p className="small text-secondary mb-0 mt-1">
                  Snacks: {t.snacks.map((s) => `${s.cantidad}x ${s.nombre}`).join(", ")}
                </p>
              )}
            </div>
            <div className="text-end">
              <p className="text-success fw-bold mb-2">
                ${Number(t.total).toLocaleString("es-CL")}
              </p>
              <Link className="btn btn-outline-light btn-sm" to={`/entrada/${t.idTicket}`}>
                Ver entrada
              </Link>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}