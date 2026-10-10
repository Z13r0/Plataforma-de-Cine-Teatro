/**
 * CartSidebar.jsx — Componente de barra lateral que muestra el resumen actual del carrito de compras (título, función, asientos, confitería y desglose de totales).
 */
import { useCart } from "../context/CartContext.jsx";

export default function CartSidebar() {
  // --- CONTEXTO DEL CARRITO: Obtiene los datos del carrito y los totales calculados ---
  const { cart, totals } = useCart();

  // --- VALIDACIÓN DE CARRITO VACÍO: Muestra un mensaje alternativo si no hay una película o obra seleccionada ---
  if (!cart.titulo) {
    return (
      <div className="p-4 rounded border border-custom bg-card">
        <p className="text-secondary mb-0">Resumen vacío</p>
      </div>
    );
  }

  return (
    // --- CONTENEDOR PRINCIPAL: Panel fijo con diseño sticky para acompañar el scroll ---
    <div
      className="p-4 rounded border border-custom bg-card sticky-top"
      style={{ top: 80 }}
    >
      <h5 className="fw-bold">Resumen</h5>
      <p className="mb-1 fw-semibold">{cart.titulo}</p>
      
      {/* --- DETALLES DE LA FUNCIÓN --- */}
      <p className="small text-secondary">
        {cart.fecha} · {cart.hora} · {cart.salaNombre || cart.sala}
      </p>
      <p className="small">Formato: {cart.formato || "—"}</p>
      
      {/* --- BUTACAS SELECCIONADAS --- */}
      <p className="small">
        Butacas: {(cart.butacas || []).join(", ") || "—"}
      </p>
      
      {/* --- LISTADO DE CONFITERÍA (Si existe alguna seleccionada) --- */}
      {(cart.confiteria || []).length > 0 && (
        <ul className="small mb-2">
          {cart.confiteria.map((c) => (
            <li key={c.id}>
              {c.nombre} x{c.cantidad}
            </li>
          ))}
        </ul>
      )}
      
      <hr className="border-custom" />
      
      {/* --- DESGLOSE DE PRECIOS Y TOTALES --- */}
      <p className="small mb-1">
        Entradas: ${totals.subEntradas.toLocaleString("es-CL")}
      </p>
      <p className="small mb-1">
        Confitería: ${totals.subConf.toLocaleString("es-CL")}
      </p>
      <p className="small mb-1">
        Cargo servicio: ${totals.cargo.toLocaleString("es-CL")}
      </p>
      <p className="fs-5 text-success fw-bold mb-0">
        Total: ${totals.total.toLocaleString("es-CL")}
      </p>
    </div>
  );
}