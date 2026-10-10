/**
 * Seats.jsx
 * Muestra el mapa de butacas disponibles para una función.
 * Al continuar, actualiza el carrito y ajusta la cantidad de entradas.
 */

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";

// --- CONFIGURACIÓN DEL MAPA: Define las filas y los números de los asientos ---
const FILAS = ["A", "B", "C", "D", "E", "F"];
const NUMS = [1, 2, 3, 4, 5, 6, 7, 8];

// --- BUTACAS OCUPADAS: Simula asientos que no se pueden seleccionar ---
const OCUPADOS = new Set(["A3", "B5", "C1", "D8", "E2"]);

export default function Seats() {
  // --- CARRITO: Obtiene los datos de la compra, su actualización y los totales ---
  const { cart, setCart, totals } = useCart();

  // --- NAVEGACIÓN: Permite avanzar a la siguiente página de la compra ---
  const navigate = useNavigate();

  // --- ESTADO (useState): Guarda las butacas seleccionadas por el usuario ---
  const [seleccion, setSeleccion] = useState(cart.butacas || []);

  // --- VALIDACIÓN: Impide seleccionar butacas si no existe una función elegida ---
  if (!cart.titulo) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">No hay una función seleccionada.</p>
        <Link to="/peliculas" className="btn btn-danger">
          Ir a películas
        </Link>
      </div>
    );
  }

  // --- PRECIO: Obtiene el precio de una entrada o utiliza $5.000 por defecto ---
  const precioUnitario = cart.entradas?.[0]?.precio || 5000;

  // --- SELECCIÓN DE BUTACAS: Agrega o quita un asiento de la selección actual ---
  const toggle = (codigo) => {
    // Impide seleccionar asientos que ya están ocupados.
    if (OCUPADOS.has(codigo)) return;

    // Si el asiento ya está seleccionado, lo elimina; de lo contrario, lo agrega.
    setSeleccion((prev) =>
      prev.includes(codigo)
        ? prev.filter((c) => c !== codigo)
        : [...prev, codigo]
    );
  };

  // --- CONTINUAR COMPRA: Guarda las butacas y actualiza la cantidad de entradas ---
  const continuar = () => {
    // Exige seleccionar al menos una butaca antes de continuar.
    if (seleccion.length === 0) {
      alert("Selecciona al menos una butaca.");
      return;
    }

    // Actualiza el carrito con las butacas y la cantidad de entradas seleccionadas.
    setCart((prev) => ({
      ...prev,
      butacas: seleccion,

      // Calcula la cantidad de entradas según el número de butacas elegidas.
      entradas: [
        {
          nombre: "General",
          cantidad: seleccion.length,
          precio: precioUnitario,
        },
      ],
    }));

    // Dirige al usuario a la selección de productos de confitería.
    navigate("/confiteria");
  };

  // --- TOTAL PREVIO: Calcula el precio de las entradas más el cargo por servicio ---
  const totalPreview = useMemo(() => {
    return seleccion.length * precioUnitario + (cart.cargoServicio || 0);
  }, [seleccion, precioUnitario, cart.cargoServicio]);

  return (
    <div className="row g-4">
      {/* --- MAPA DE BUTACAS: Muestra la selección de asientos y el resumen de compra --- */}
      <div className="col-lg-8">
        <h1 className="fw-bold">Selecciona tu butaca</h1>

        {/* Identifica la película u obra seleccionada. */}
        <p className="text-danger fs-5 mb-1">{cart.titulo}</p>

        {/* Muestra la fecha, hora y sala de la función elegida. */}
        <p className="text-secondary">
          {cart.fecha} · {cart.hora} · {cart.salaNombre}
        </p>

        {/* --- PANTALLA: Referencia visual para orientar la ubicación de las butacas --- */}
        <div className="text-center mb-3">
          <div
            className="bg-secondary rounded py-2 mx-auto text-dark fw-bold"
            style={{ maxWidth: 420 }}
          >
            PANTALLA
          </div>
        </div>

        {/* --- FILAS: Genera dinámicamente las filas y sus respectivos asientos --- */}
        <div className="d-flex flex-column align-items-center gap-1 mb-4">
          {FILAS.map((fila) => (
            <div key={fila} className="d-flex gap-1 align-items-center">
              {/* Identifica la fila actual del mapa. */}
              <span
                className="small text-secondary"
                style={{ width: 20 }}
              >
                {fila}
              </span>

              {/* Genera los ocho asientos de cada fila. */}
              {NUMS.map((n) => {
                // Combina la letra de la fila y el número para identificar cada butaca.
                const codigo = `${fila}${n}`;

                // Comprueba si el asiento está ocupado o seleccionado.
                const ocupada = OCUPADOS.has(codigo);
                const sel = seleccion.includes(codigo);

                return (
                  <button
                    key={codigo}
                    type="button"

                    // Cambia el color según el estado de la butaca.
                    className={`btn btn-sm butaca ${
                      ocupada
                        ? "btn-secondary"
                        : sel
                        ? "btn-danger"
                        : "btn-outline-light"
                    }`}

                    // Deshabilita los asientos ocupados.
                    disabled={ocupada}

                    // Actualiza la selección cuando el usuario pulsa una butaca.
                    onClick={() => toggle(codigo)}

                    // Muestra el código del asiento al pasar el cursor.
                    title={codigo}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* --- LEYENDA: Explica el significado de los colores de las butacas --- */}
        <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap small">
          <span>
            <span
              className="btn btn-outline-light btn-sm me-1"
              style={{ pointerEvents: "none" }}
            >
              1
            </span>
            Disponible
          </span>

          <span>
            <span
              className="btn btn-danger btn-sm me-1"
              style={{ pointerEvents: "none" }}
            >
              1
            </span>
            Seleccionada
          </span>

          <span>
            <span
              className="btn btn-secondary btn-sm me-1"
              style={{ pointerEvents: "none" }}
              disabled
            >
              1
            </span>
            Ocupada
          </span>
        </div>

        {/* --- RESUMEN: Muestra la cantidad y los códigos de las butacas elegidas --- */}
        <div className="text-center">
          <p>
            Butacas: <strong>{seleccion.length}</strong> (
            {seleccion.join(", ") || "—"})
          </p>

          {/* Presenta el costo estimado de las entradas y el cargo por servicio. */}
          <p className="fs-5">
            Total aprox.:{" "}
            <strong className="text-success">
              ${totalPreview.toLocaleString("es-CL")}
            </strong>
          </p>

          {/* Valida la selección y continúa con el siguiente paso de la compra. */}
          <button
            type="button"
            className="btn btn-danger btn-lg px-5"
            onClick={continuar}
          >
            Continuar a confitería
          </button>
        </div>
      </div>

      {/* --- BARRA LATERAL: Muestra el resumen y los valores actuales del carrito --- */}
      <div className="col-lg-4">
        <CartSidebar />

        {/* Presenta el total calculado por el contexto del carrito. */}
        <p className="small text-secondary mt-2">
          Total carrito actual: ${totals.total.toLocaleString("es-CL")}
        </p>
      </div>
    </div>
  );
}