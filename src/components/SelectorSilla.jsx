/**
 * SeatSelector.jsx
 * Muestra una grilla de butacas según la capacidad de la sala.
 * Permite seleccionar/deseleccionar asientos y notifica al padre.
 * Los asientos ocupados se simulan (puedes reemplazarlos por datos reales).
 */
import { useMemo, useState, useEffect } from "react";
import { DB } from "../data/db";

/**
 * Genera las filas y columnas según la capacidad de la sala.
 * Ejemplo: capacidad 40 → 5 filas × 8 columnas.
 */
function generarMapa(capacidad) {
  const columnas = 8;
  const filas = Math.ceil(capacidad / columnas);
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const mapa = [];

  for (let f = 0; f < filas; f++) {
    const fila = [];
    for (let c = 1; c <= columnas; c++) {
      const numero = f * columnas + c;
      if (numero > capacidad) break;
      fila.push(`${letras[f]}${c}`);
    }
    mapa.push(fila);
  }
  return mapa;
}

/**
 * @param {string} salaId - ID de la sala (ej: "S1", "ST")
 * @param {Array} value - Asientos ya seleccionados (controlado desde el padre)
 * @param {Function} onChange - Callback con el nuevo array de asientos
 * @param {number} maxSeleccion - Máximo de asientos que se pueden elegir (default 8)
 */
export default function SeatSelector({
  salaId = "S3",
  value = [],
  onChange,
  maxSeleccion = 8,
}) {
  const sala = DB.salas.find((s) => s.id === salaId) || DB.salas[2];
  const mapa = useMemo(() => generarMapa(sala.capacidad), [sala.capacidad]);

  // Simulación de asientos ya ocupados (en un proyecto real vendrían de la API)
  const ocupados = useMemo(() => {
    // Generamos algunos ocupados de forma determinista según la sala
    const todos = mapa.flat();
    return todos.filter((_, i) => i % 7 === 0 || i % 11 === 0).slice(0, 12);
  }, [mapa]);

  const [seleccionados, setSeleccionados] = useState(value);

  // Sincroniza si el padre cambia el valor
  useEffect(() => {
    setSeleccionados(value);
  }, [value]);

  /**
   * Alterna la selección de un asiento.
   * No permite seleccionar ocupados ni superar el máximo.
   */
  const toggleAsiento = (asiento) => {
    if (ocupados.includes(asiento)) return;

    let nueva;
    if (seleccionados.includes(asiento)) {
      nueva = seleccionados.filter((a) => a !== asiento);
    } else {
      if (seleccionados.length >= maxSeleccion) {
        alert(`Puedes seleccionar máximo ${maxSeleccion} asientos.`);
        return;
      }
      nueva = [...seleccionados, asiento];
    }

    setSeleccionados(nueva);
    onChange?.(nueva);
  };

  /**
   * Devuelve la clase CSS según el estado del asiento.
   */
  const claseAsiento = (asiento) => {
    if (ocupados.includes(asiento)) return "btn-secondary opacity-50";
    if (seleccionados.includes(asiento)) return "btn-danger";
    return "btn-outline-light";
  };

  return (
    <div className="card border-custom bg-card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Selecciona tus butacas</h5>
        <small className="text-secondary">{sala.nombre}</small>
      </div>

      <div className="card-body">
        {/* Pantalla / Escenario */}
        <div className="text-center mb-4">
          <div
            className="mx-auto rounded py-2 px-4 bg-secondary text-white small fw-semibold"
            style={{ maxWidth: 320 }}
          >
            {salaId === "ST" ? "ESCENARIO" : "PANTALLA"}
          </div>
        </div>

        {/* Grilla de butacas */}
        <div className="d-flex flex-column align-items-center gap-2">
          {mapa.map((fila, idx) => (
            <div key={idx} className="d-flex gap-1 flex-wrap justify-content-center">
              {fila.map((asiento) => (
                <button
                  key={asiento}
                  type="button"
                  className={`btn btn-sm ${claseAsiento(asiento)}`}
                  style={{ minWidth: 42, fontSize: "0.75rem" }}
                  onClick={() => toggleAsiento(asiento)}
                  disabled={ocupados.includes(asiento)}
                  title={
                    ocupados.includes(asiento)
                      ? "Ocupado"
                      : seleccionados.includes(asiento)
                      ? "Seleccionado"
                      : "Disponible"
                  }
                >
                  {asiento}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Leyenda */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4 small">
          <span>
            <span className="btn btn-sm btn-outline-light me-1" style={{ pointerEvents: "none" }}>
              A1
            </span>
            Disponible
          </span>
          <span>
            <span className="btn btn-sm btn-danger me-1" style={{ pointerEvents: "none" }}>
              A1
            </span>
            Seleccionado
          </span>
          <span>
            <span className="btn btn-sm btn-secondary opacity-50 me-1" style={{ pointerEvents: "none" }}>
              A1
            </span>
            Ocupado
          </span>
        </div>

        {/* Resumen de selección */}
        {seleccionados.length > 0 && (
          <div className="mt-3 p-3 bg-dark rounded text-center">
            <strong>{seleccionados.length}</strong> asiento
            {seleccionados.length > 1 ? "s" : ""}:{" "}
            <span className="text-danger">{seleccionados.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}