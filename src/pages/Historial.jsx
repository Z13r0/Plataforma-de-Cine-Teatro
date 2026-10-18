
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Historial() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Todas");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const misCompras = useMemo(() => {
    try {
      const compras = JSON.parse(
        localStorage.getItem("historialCompras") || "[]"
      );

      return compras
        .filter((compra) => !compra.usuarioId || compra.usuarioId === user?.id)
        .slice()
        .reverse();
    } catch {
      return [];
    }
  }, [user?.id]);

  if (!isLoggedIn) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3 text-secondary">Verificando sesión...</p>
      </div>
    );
  }

  const funcionesFiltradas = misCompras.filter((compra) => {
    if (filtro === "Todas") return true;

    const tipo = String(compra.tipo || "").toLowerCase();
    return filtro === "pelicula"
      ? tipo.includes("pelicula") || tipo.includes("película") || tipo.includes("cine")
      : tipo.includes("teatro") || tipo.includes("obra");
  });

  const totalInvertido = misCompras.reduce(
    (total, compra) => total + (Number(compra.total) || 0),
    0
  );

  const formatoPesos = (valor) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <main className="container py-5">
      <h1 className="h2 fw-bold section-title mb-2">Mi historial</h1>

      <p className="text-secondary mb-4">
        Hola <strong>{user?.nombre || "usuario"}</strong>, aquí puedes consultar
        tus compras de cine y teatro.
      </p>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-custom bg-card h-100">
            <div className="card-body">
              <i className="bi bi-ticket-perforated fs-2 text-danger" />
              <p className="text-secondary mb-1">Total de funciones</p>
              <h2 className="h3 fw-bold mb-0">{misCompras.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-custom bg-card h-100">
            <div className="card-body">
              <i className="bi bi-wallet2 fs-2 text-danger" />
              <p className="text-secondary mb-1">Total invertido</p>
              <h2 className="h3 fw-bold mb-0">{formatoPesos(totalInvertido)}</h2>
            </div>
          </div>
        </div>
      </div>

      <section className="card border-custom bg-card">
        <div className="card-body">
          <h2 className="h4 fw-bold mb-3">Mis funciones</h2>

          <div className="btn-group mb-4" role="group" aria-label="Filtrar funciones">
            {["Todas", "pelicula", "teatro"].map((opcion) => (
              <button
                key={opcion}
                type="button"
                className={`btn btn-sm ${
                  filtro === opcion ? "btn-danger" : "btn-outline-secondary"
                }`}
                onClick={() => setFiltro(opcion)}
              >
                {opcion === "Todas"
                  ? "Todas"
                  : opcion === "pelicula"
                    ? "Películas"
                    : "Teatro"}
              </button>
            ))}
          </div>

          {funcionesFiltradas.length === 0 ? (
            <div className="text-center text-secondary py-4">
              {misCompras.length === 0
                ? "Aún no tienes compras registradas."
                : "No hay funciones registradas en esta categoría."}
              <div className="mt-3">
                <Link to="/peliculas" className="btn btn-danger">
                  Ver cartelera
                </Link>
              </div>
            </div>
          ) : (
            funcionesFiltradas.map((compra, indice) => (
              <div
                className="card border-custom bg-card mb-3"
                key={compra.idTicket ?? `${compra.titulo}-${compra.fecha}-${indice}`}
              >
                <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <span className="badge bg-danger mb-1">
                      {compra.tipo || "Función"}
                    </span>
                    <h3 className="h5 fw-bold mb-1">
                      {compra.titulo || "Función sin título"}
                    </h3>
                    <p className="small text-secondary mb-1">
                      {compra.fecha || "Fecha no disponible"}
                      {compra.hora ? ` · ${compra.hora}` : ""}
                    </p>
                    {compra.asientos?.length > 0 && (
                      <p className="small text-secondary mb-0">
                        Asientos: {compra.asientos.join(", ")}
                      </p>
                    )}
                    {compra.snacks?.length > 0 && (
                      <p className="small text-secondary mb-0 mt-1">
                        Snacks: {compra.snacks
                          .map((snack) => `${snack.cantidad}x ${snack.nombre}`)
                          .join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="text-end">
                    <p className="text-success fw-bold mb-2">
                      {formatoPesos(Number(compra.total) || 0)}
                    </p>
                    {compra.idTicket && (
                      <Link
                        className="btn btn-outline-light btn-sm"
                        to={`/entrada/${compra.idTicket}`}
                      >
                        Ver entrada
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
