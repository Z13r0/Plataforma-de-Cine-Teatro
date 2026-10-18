/**
 * Compra rapida.jsx
 * Botón de compra rápida. Si el usuario no está logueado, lo manda al login.
 * Guarda la compra en localStorage (historialCompras).
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

/**
 * @param {Object} funcion - Datos de la función seleccionada
 * @param {Array} snacksSeleccionados - Snacks elegidos
 * @param {Array} asientos - Asientos seleccionados
 * @param {Function} onSuccess - Callback opcional al terminar
 */
export default function QuickPurchaseButton({
  funcion,
  snacksSeleccionados = [],
  asientos = [],
  onSuccess,
}) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);

  const calcularTotal = () => {
    const precioEntrada = funcion?.precio || 5000;
    const totalEntradas = precioEntrada * (asientos.length || 1);
    const totalSnacks = snacksSeleccionados.reduce(
      (acc, s) => acc + s.precio * s.cantidad,
      0
    );
    return totalEntradas + totalSnacks;
  };

  const handleCompra = async () => {
    if (!isLoggedIn) {
      // Guarda la intención de compra para después del login
      sessionStorage.setItem(
        "compraPendiente",
        JSON.stringify({ funcion, snacksSeleccionados, asientos })
      );
      navigate("/login");
      return;
    }

    if (!funcion) {
      alert("Selecciona una función primero.");
      return;
    }

    setProcesando(true);

    try {
      // Simula el proceso de compra
      await new Promise((r) => setTimeout(r, 800));

      const compra = {
        idTicket: Date.now(),
        usuarioId: user.id,
        tipo: funcion.tipo || "Cine",
        titulo: funcion.titulo,
        fecha: funcion.fecha || new Date().toLocaleDateString("es-CL"),
        hora: funcion.hora || "",
        asientos: asientos.length ? asientos : ["Sin asignar"],
        snacks: snacksSeleccionados,
        total: calcularTotal(),
      };

      // Guarda en el historial
      const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
      historial.push(compra);
      localStorage.setItem("historialCompras", JSON.stringify(historial));

      onSuccess?.(compra);
      navigate("/historial");
    } catch (err) {
      console.error(err);
      alert("Error al procesar la compra.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
      onClick={handleCompra}
      disabled={procesando}
    >
      {procesando ? (
        <>
          <span className="spinner-border spinner-border-sm" />
          Procesando...
        </>
      ) : (
        <>
          <i className="bi bi-lightning-fill" />
          Compra Rápida — ${calcularTotal().toLocaleString("es-CL")}
        </>
      )}
    </button>
  );
}