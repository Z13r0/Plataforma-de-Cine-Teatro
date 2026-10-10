/**
 * Snacks.jsx
 * Muestra los productos de confitería según el tipo de contenido.
 * Permite modificar cantidades, continuar al pago o saltar este paso.
 */

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "../data/db";
import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";

export default function Snacks() {
  // --- CARRITO: Obtiene los datos de la compra y permite actualizarlos ---
  const { cart, setCart } = useCart();

  // --- NAVEGACIÓN: Permite avanzar a la página de pago ---
  const navigate = useNavigate();

  // --- ESTADO (useState): Guarda las cantidades seleccionadas de cada producto ---
  // Utiliza el ID de cada producto como clave y su cantidad como valor.
  const [qty, setQty] = useState(() => {
    const map = {};

    // Recupera las cantidades guardadas previamente en el carrito.
    (cart.confiteria || []).forEach((c) => {
      map[c.id] = c.cantidad;
    });

    return map;
  });

  // --- VALIDACIÓN: Impide continuar si no existe una compra en curso ---
  if (!cart.titulo) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">No hay compra en curso.</p>
        <Link to="/" className="btn btn-danger">
          Inicio
        </Link>
      </div>
    );
  }

  // --- PRODUCTOS: Carga la confitería correspondiente al tipo de contenido ---
  const productos = useMemo(() => {
    // Selecciona el menú de teatro o cine según el carrito.
    const key = cart.tipo === "teatro" ? "teatro" : "cine";

    // Devuelve los productos disponibles o un arreglo vacío si no existen.
    return DB.confiteria?.[key] || [];
  }, [cart.tipo]);

  // --- CANTIDADES: Aumenta o disminuye las unidades de un producto ---
  const setCantidad = (id, delta) => {
    setQty((prev) => {
      // Copia las cantidades actuales para actualizar el estado sin modificarlas directamente.
      const next = { ...prev };

      // Calcula la nueva cantidad y evita que sea inferior a cero.
      const n = Math.max(0, (next[id] || 0) + delta);

      // Elimina el producto si su cantidad llega a cero.
      if (n === 0) delete next[id];
      else next[id] = n;

      return next;
    });
  };

  // --- CONTINUAR AL PAGO: Guarda los productos seleccionados en el carrito ---
  const irAPago = () => {
    // Filtra los productos con cantidades mayores a cero y prepara sus datos.
    const confiteria = productos
      .filter((p) => qty[p.id] > 0)
      .map((p) => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        cantidad: qty[p.id],
      }));

    // Actualiza la confitería del carrito sin perder los demás datos de la compra.
    setCart((prev) => ({ ...prev, confiteria }));

    // Redirige al usuario a la página de pago.
    navigate("/pago");
  };

  return (
    <div className="row g-4">
      {/* --- MENÚ: Muestra los productos disponibles para agregar a la compra --- */}
      <div className="col-lg-8">
        <h1 className="fw-bold mb-2">Confitería</h1>

        {/* Informa si el menú corresponde al cine o al teatro. */}
        <p className="text-secondary mb-4">
          Opcional. Menú {cart.tipo === "teatro" ? "de teatro" : "de cine"}.
        </p>

        {/* --- LISTADO: Genera una tarjeta para cada producto disponible --- */}
        <div className="row g-3">
          {productos.map((p) => (
            <div className="col-md-6" key={p.id}>
              <div className="card border-custom bg-card h-100">
                <div className="card-body d-flex justify-content-between align-items-center gap-2">
                  <div>
                    {/* Nombre y descripción del producto. */}
                    <h6 className="fw-bold mb-1">{p.nombre}</h6>
                    <p className="small text-secondary mb-1">
                      {p.descripcion}
                    </p>

                    {/* Muestra el precio con formato de moneda chilena. */}
                    <p className="mb-0 text-success">
                      ${p.precio.toLocaleString("es-CL")}
                    </p>
                  </div>

                  {/* --- CONTROLES: Permiten modificar la cantidad del producto --- */}
                  <div className="d-flex align-items-center gap-2">
                    {/* Resta una unidad sin permitir cantidades negativas. */}
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm"
                      onClick={() => setCantidad(p.id, -1)}
                    >
                      −
                    </button>

                    {/* Muestra la cantidad seleccionada o cero si no hay unidades. */}
                    <span>{qty[p.id] || 0}</span>

                    {/* Agrega una unidad del producto seleccionado. */}
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm"
                      onClick={() => setCantidad(p.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- NAVEGACIÓN: Permite volver, continuar al pago o saltar la confitería --- */}
        <div className="mt-4 d-flex flex-wrap gap-2">
          {/* Regresa a la selección de butacas. */}
          <Link to="/butacas" className="btn btn-outline-light">
            ← Volver
          </Link>

          {/* Guarda los productos seleccionados y continúa al pago. */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={irAPago}
          >
            Continuar al pago
          </button>

          {/* Omite la confitería, vacía su selección y avanza al pago. */}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setCart((prev) => ({ ...prev, confiteria: [] }));
              navigate("/pago");
            }}
          >
            Saltar
          </button>
        </div>
      </div>

      {/* --- BARRA LATERAL: Muestra el resumen de la compra actual --- */}
      <div className="col-lg-4">
        <CartSidebar />
      </div>
    </div>
  );
}