/**
 * SnacksSection.jsx
 * Muestra la confitería según el tipo (cine o teatro)
 * usando los datos de src/data/db.js
 */
import { useState } from "react";
import { DB } from "../data/db";

/**
 * @param {"cine"|"teatro"|"obra"} tipo - Tipo de contenido
 * @param {Function} onChange - Callback con el array de snacks seleccionados
 */
export default function SnacksSection({ tipo = "cine", onChange }) {
  // Determina el catálogo según el tipo
  const esTeatro = tipo === "teatro" || tipo === "obra";
  const catalogo = esTeatro ? DB.confiteria.teatro : DB.confiteria.cine;

  const [seleccionados, setSeleccionados] = useState({});

  /**
   * Actualiza la cantidad de un snack y notifica al componente padre.
   */
  const actualizarCantidad = (snackId, cantidad) => {
    const nueva = { ...seleccionados };

    if (cantidad <= 0) {
      delete nueva[snackId];
    } else {
      nueva[snackId] = cantidad;
    }

    setSeleccionados(nueva);

    // Convierte a array y avisa al padre
    const lista = Object.entries(nueva).map(([id, cant]) => {
      const snack = catalogo.find((s) => s.id === Number(id));
      return {
        id: snack.id,
        nombre: snack.nombre,
        precio: snack.precio,
        cantidad: cant,
      };
    });

    onChange?.(lista);
  };

  /**
   * Calcula el total de la confitería seleccionada.
   */
  const total = Object.entries(seleccionados).reduce((acc, [id, cant]) => {
    const snack = catalogo.find((s) => s.id === Number(id));
    return acc + (snack?.precio || 0) * cant;
  }, 0);

  return (
    <div className="card border-custom bg-card mt-4">
      <div className="card-header">
        <h5 className="mb-0">
          {esTeatro ? "Confitería de Teatro" : "Confitería de Cine"}
        </h5>
      </div>

      <div className="card-body">
        <div className="row g-3">
          {catalogo.map((snack) => (
            <div key={snack.id} className="col-md-6 col-lg-4">
              <div className="border rounded p-3 h-100 d-flex flex-column">
                {snack.imagen && (
                  <img
                    src={snack.imagen}
                    alt={snack.nombre}
                    className="img-fluid rounded mb-2"
                    style={{ height: 80, objectFit: "cover" }}
                  />
                )}
                <h6 className="mb-1">{snack.nombre}</h6>
                {snack.descripcion && (
                  <p className="small text-secondary mb-1">{snack.descripcion}</p>
                )}
                <p className="text-danger fw-bold mb-2">
                  ${snack.precio.toLocaleString("es-CL")}
                </p>

                <div className="d-flex align-items-center gap-2 mt-auto">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      actualizarCantidad(snack.id, (seleccionados[snack.id] || 0) - 1)
                    }
                    disabled={!seleccionados[snack.id]}
                  >
                    −
                  </button>

                  <span
                    className="fw-bold"
                    style={{ minWidth: 24, textAlign: "center" }}
                  >
                    {seleccionados[snack.id] || 0}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      actualizarCantidad(snack.id, (seleccionados[snack.id] || 0) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <div className="mt-3 p-3 bg-dark rounded d-flex justify-content-between">
            <span>Total confitería:</span>
            <strong className="text-success">
              ${total.toLocaleString("es-CL")}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}