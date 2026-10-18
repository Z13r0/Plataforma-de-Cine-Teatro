/**
 * Detalle.jsx — Página de detalle de película u obra.
 * Lee la selección de Compra Rápida (si existe) y precarga asientos.
 */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Contenido from "../components/Contenido";
import DetalleHorario from "../components/DetalleHorario";
import SeatSelector from "../components/SelectorSilla";
import SnacksSection from "../components/SeccionSnacks";
import QuickPurchaseButton from "../components/CompraRapida";
import { getContentById, DB } from "../data/db";

export default function Detalle() {
  const { tipo, id } = useParams();
  const [snacks, setSnacks] = useState([]);
  const [asientos, setAsientos] = useState([]);
  const [funcionInfo, setFuncionInfo] = useState(null);

  const contenido = getContentById(id, tipo);

  /**
   * Lee la selección guardada por el botón de Compra Rápida.
   */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("compraRapida");
      if (!raw) return;

      const data = JSON.parse(raw);

      if (String(data.contenidoId) === String(id) && data.tipo === tipo) {
        setAsientos(data.asientos || []);
        setFuncionInfo({
          funcionId: data.funcionId,
          fecha: data.fecha,
          hora: data.hora,
          salaId: data.salaId,
        });
      }

      sessionStorage.removeItem("compraRapida");
    } catch {
      // ignorar errores de parseo
    }
  }, [id, tipo]);

  if (!contenido) {
    return (
      <main className="container py-5 text-center">
        <h2 className="h4">Contenido no encontrado</h2>
        <p className="text-secondary">
          No existe el ítem con id <strong>{id}</strong> de tipo{" "}
          <strong>{tipo}</strong>.
        </p>
        <Link to="/peliculas" className="btn btn-danger mt-3">
          Volver a películas
        </Link>
      </main>
    );
  }

  const esTeatro = tipo === "teatro" || tipo === "obra";
  const salaId = funcionInfo?.salaId || (esTeatro ? "ST" : "S2");
  const sala = DB.salas.find((s) => s.id === salaId) || DB.salas[2];

  const funcionActual = {
    id,
    titulo: contenido.titulo || "Función",
    tipo: esTeatro ? "Teatro" : "Cine",
    precio: sala?.precioBase || 5000,
    fecha: funcionInfo?.fecha || new Date().toLocaleDateString("es-CL"),
    hora: funcionInfo?.hora || "",
    salaId,
  };

  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-lg-5">
          <Contenido id={id} tipo={tipo} />
        </div>

        <div className="col-lg-7">
          {funcionInfo && (
            <div className="alert alert-success d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-lightning-fill" />
              <div>
                <strong>Compra rápida:</strong> {funcionInfo.fecha} ·{" "}
                {funcionInfo.hora}
                {asientos.length > 0 && (
                  <>
                    {" "}
                    · Asientos: <strong>{asientos.join(", ")}</strong>
                  </>
                )}
              </div>
            </div>
          )}

          <DetalleHorario id={id} tipo={tipo} />

          <div className="mt-4">
            <SeatSelector
              salaId={salaId}
              value={asientos}
              onChange={setAsientos}
            />
          </div>

          <div className="mt-4">
            <SnacksSection tipo={tipo} onChange={setSnacks} />
          </div>

          <div className="mt-4">
            <QuickPurchaseButton
              funcion={funcionActual}
              snacksSeleccionados={snacks}
              asientos={asientos}
            />
          </div>
        </div>
      </div>
    </main>
  );
}