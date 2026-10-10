/**
 * CartContext.jsx — Proveedor de contexto para gestionar el carrito de compras (entradas, butacas, confitería, totales y persistencia local).
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const KEY = "carritoCineTeatro";

// --- OBJETO INICIAL: Estructura vacía por defecto para el carrito de compras ---
const empty = () => ({
  contenidoId: null,
  tipo: "",
  titulo: "",
  imagen: "",
  fecha: "",
  hora: "",
  sala: "",
  salaNombre: "",
  funcionId: null,
  formato: "",
  entradas: [],
  butacas: [],
  confiteria: [],
  cargoServicio: 700,
});

export function CartProvider({ children }) {
  // --- ESTADO DEL CARRITO: Inicializa cargando los datos guardados en localStorage o usando la estructura vacía ---
  const [cart, setCart] = useState(() => {
    try {
      return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch {
      return empty();
    }
  });

  // --- EFECTO DE SINCRONIZACIÓN: Guarda automáticamente en localStorage cada vez que el carrito cambia ---
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart]);

  // --- CÁLCULO DE TOTALES (useMemo): Calcula subtotales de entradas, confitería, cargo por servicio y el monto final ---
  const totals = useMemo(() => {
    const subEntradas = (cart.entradas || []).reduce(
      (s, x) => s + x.precio * x.cantidad,
      0
    );
    const subConf = (cart.confiteria || []).reduce(
      (s, x) => s + x.precio * x.cantidad,
      0
    );
    const cargo = cart.cargoServicio || 0;
    return { subEntradas, subConf, cargo, total: subEntradas + subConf + cargo };
  }, [cart]);

  // --- FUNCIÓN PARA VACIAR EL CARRITO: Restablece el carrito a su estado inicial vacío ---
  const clear = () => setCart(empty());

  return (
    <CartContext.Provider value={{ cart, setCart, totals, clear }}>
      {children}
    </CartContext.Provider>
  );
}

// --- HOOK PERSONALIZADO: Facilita el consumo del contexto del carrito en los componentes ---
export const useCart = () => useContext(CartContext);