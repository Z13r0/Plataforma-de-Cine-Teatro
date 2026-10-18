/**
 * BotonCompraFlotante.jsx
 * Botón flotante de Compra Rápida (solo en Inicio).
 * Abre un modal para elegir película/obra, horario y butacas.
 * Luego redirige al detalle con la selección guardada.
 */
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DB, getFunciones } from "../data/db";

export default function BotonCompraFlotante() {
  const location = useLocation();
  const navigate = useNavigate();

  // ===== TODOS LOS HOOKS VAN PRIMERO =====
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState("cine");
  const [contenidoId, setContenidoId] = useState("");
  const [funcionId, setFuncionId] = useState("");
  const [asientos, setAsientos] = useState([]);

  const listaContenido = tipo === "teatro" ? DB.obras : DB.peliculas;

  const funciones = useMemo(() => {
    if (!contenidoId) return [];
    return getFunciones(contenidoId, tipo);
  }, [contenidoId, tipo]);

  const funcionSeleccionada = funciones.find(
    (f) => String(f.id) === String(funcionId)
  );

  const sala =
    DB.salas.find((s) => s.id === funcionSeleccionada?.salaId) || DB.salas[2];

  const asientosDisponibles = useMemo(() => {
    if (!sala) return [];
    const letras = "ABCDEFGH";
    const columnas = 8;
    const filas = Math.ceil(sala.capacidad / columnas);
    const lista = [];
    for (let f = 0; f < filas; f++) {
      for (let c = 1; c <= columnas; c++) {
        const num = f * columnas + c;
        if (num > sala.capacidad) break;
        lista.push(`${letras[f]}${c}`);
      }
    }
    return lista;
  }, [sala]);

  // ===== return condicional DESPUÉS de los hooks =====
  if (location.pathname !== "/") {
    return null;
  }

  const toggleAsiento = (asiento) => {
    setAsientos((prev) => {
      if (prev.includes(asiento)) {
        return prev.filter((a) => a !== asiento);
      }
      if (prev.length >= 6) {
        alert("En compra rápida puedes seleccionar máximo 6 asientos.");
        return prev;
      }
      return [...prev, asiento];
    });
  };

  const handleContinuar = () => {
    if (!contenidoId) {
      alert("Selecciona una película u obra.");
      return;
    }
    if (!funcionId) {
      alert("Selecciona un horario.");
      return;
    }
    if (asientos.length === 0) {
      alert("Selecciona al menos un asiento.");
      return;
    }

    sessionStorage.setItem(
      "compraRapida",
      JSON.stringify({
        tipo,
        contenidoId,
        funcionId,
        asientos,
        fecha: funcionSeleccionada?.fecha,
        hora: funcionSeleccionada?.hora,
        salaId: funcionSeleccionada?.salaId,
      })
    );

    setAbierto(false);
    navigate(`/contenido/${tipo}/${contenidoId}`);
  };

  const handleCerrar = () => {
    setAbierto(false);
    setContenidoId("");
    setFuncionId("");
    setAsientos([]);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-compra-rapida"
        onClick={() => setAbierto(true)}
        title="Compra rápida"
      >
        <i className="bi bi-lightning-fill me-2" />
        Compra Rápida
      </button>

      {abierto && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={handleCerrar}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-card border-custom">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  <i className="bi bi-lightning-fill text-danger me-2" />
                  Compra Rápida
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCerrar}
                />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Tipo</label>
                  <div className="btn-group w-100">
                    <button
                      type="button"
                      className={`btn ${tipo === "cine" ? "btn-danger" : "btn-outline-light"}`}
                      onClick={() => {
                        setTipo("cine");
                        setContenidoId("");
                        setFuncionId("");
                        setAsientos([]);
                      }}
                    >
                      Películas
                    </button>
                    <button
                      type="button"
                      className={`btn ${tipo === "teatro" ? "btn-danger" : "btn-outline-light"}`}
                      onClick={() => {
                        setTipo("teatro");
                        setContenidoId("");
                        setFuncionId("");
                        setAsientos([]);
                      }}
                    >
                      Obras
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    {tipo === "teatro" ? "Obra" : "Película"}
                  </label>
                  <select
                    className="form-select"
                    value={contenidoId}
                    onChange={(e) => {
                      setContenidoId(e.target.value);
                      setFuncionId("");
                      setAsientos([]);
                    }}
                  >
                    <option value="">— Selecciona —</option>
                    {listaContenido.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                {contenidoId && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Fecha y hora</label>
                    {funciones.length === 0 ? (
                      <p className="text-secondary small mb-0">
                        No hay funciones disponibles.
                      </p>
                    ) : (
                      <select
                        className="form-select"
                        value={funcionId}
                        onChange={(e) => {
                          setFuncionId(e.target.value);
                          setAsientos([]);
                        }}
                      >
                        <option value="">— Selecciona horario —</option>
                        {funciones.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.fecha} · {f.hora}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                {funcionId && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Butacas <span className="text-secondary">(máx. 6)</span>
                    </label>

                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {asientosDisponibles.slice(0, 40).map((asiento) => (
                        <button
                          key={asiento}
                          type="button"
                          className={`btn btn-sm ${
                            asientos.includes(asiento)
                              ? "btn-danger"
                              : "btn-outline-light"
                          }`}
                          style={{ minWidth: 40, fontSize: "0.75rem" }}
                          onClick={() => toggleAsiento(asiento)}
                        >
                          {asiento}
                        </button>
                      ))}
                    </div>

                    {asientos.length > 0 && (
                      <p className="small text-success mb-2">
                        Seleccionados: <strong>{asientos.join(", ")}</strong>
                      </p>
                    )}

                    <div className="alert alert-warning py-2 small mb-0">
                      <i className="bi bi-info-circle me-1" />
                      Al continuar irás a la página de detalle para elegir
                      confitería y completar la compra.
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleCerrar}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleContinuar}
                  disabled={!contenidoId || !funcionId || asientos.length === 0}
                >
                  Continuar al detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}