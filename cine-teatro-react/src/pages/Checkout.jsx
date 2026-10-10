/**
 * Checkout.jsx
 * Pantalla de pago: permite comprar como invitado o usuario logueado,
 * seleccionar método de pago, validar términos, generar ticket y limpiar el carrito.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
import { emailValido, mensajeEmailInvalido } from "../utils/validations";

export default function Checkout() {
  // --- CONTEXTOS Y NAVEGACIÓN ---
  const { user } = useAuth();         // Obtiene el usuario autenticado actual
  const { cart, totals, clear } = useCart(); // Obtiene el carrito, totales y función para vaciarlo
  const navigate = useNavigate();     // Hook para redireccionar de ruta

  // --- ESTADOS (useState): Gestionan los datos del formulario y validaciones ---
  const [modoInvitado, setModoInvitado] = useState(!user); // Activa el modo invitado si no hay sesión iniciada
  const [nombre, setNombre] = useState(user?.nombre || ""); // Nombre del cliente
  const [email, setEmail] = useState(user?.email || "");   // Correo del cliente
  const [pago, setPago] = useState("simulado");             // Método de pago seleccionado
  const [terminos, setTerminos] = useState(false);          // Estado de aceptación de términos
  const [error, setError] = useState("");                   // Mensaje de error en pantalla

  // --- VALIDACIÓN DE CARRITO VACÍO: Si no hay película o butacas seleccionadas, redirige a la cartelera ---
  if (!cart.titulo || !(cart.butacas || []).length) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Completa butacas antes de pagar.</p>
        <Link to="/peliculas" className="btn btn-danger">Cartelera</Link>
      </div>
    );
  }

  // --- FUNCIÓN DE CONFIRMACIÓN: Valida los datos, genera el ticket, lo guarda y limpia el carrito ---
  const confirmar = () => {
    setError("");
    // 1. Valida que se hayan aceptado los términos y condiciones
    if (!terminos) {
      setError("Debes aceptar los Términos y Condiciones.");
      return;
    }
    // 2. Valida los datos del invitado si está comprando sin iniciar sesión
    if (modoInvitado || !user) {
      if (!nombre.trim() || nombre.trim().length < 2) {
        setError("Ingresa un nombre válido.");
        return;
      }
      if (!emailValido(email)) {
        setError(mensajeEmailInvalido());
        return;
      }
    }

    // 3. Creación del objeto ticket con toda la información de la compra
    const idTicket = `T-${Date.now()}`;
    const ticket = {
      idTicket,
      titulo: cart.titulo,
      tipo: cart.tipo,
      fecha: cart.fecha,
      hora: cart.hora,
      sala: cart.salaNombre || cart.sala,
      asientos: cart.butacas,
      confiteria: cart.confiteria || [],
      total: totals.total,
      cargoServicio: cart.cargoServicio,
      cliente: user?.nombre || nombre,
      email: user?.email || email,
      metodoPago: pago,
      creadoEn: new Date().toISOString(),
    };

    // 4. Guarda el ticket en el historial de compras del almacenamiento local (localStorage)
    const hist = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    hist.push(ticket);
    localStorage.setItem("historialCompras", JSON.stringify(hist));

    clear(); // Vacía el carrito de compras
    navigate(`/entrada/${idTicket}`); // Redirige a la vista del comprobante/entrada
  };

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <h1 className="fw-bold mb-4">Pago</h1>
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {/* --- SECCIÓN DE IDENTIFICACIÓN: Invitado o Usuario Logueado --- */}
        <div className="card border-custom bg-card mb-4">
          <div className="card-body">
            <h5 className="mb-2">¿Cómo quieres continuar?</h5>
            {!user && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button type="button" className="btn btn-danger" onClick={() => setModoInvitado(true)}>
                  Comprar como invitado
                </button>
                <Link to="/login" className="btn btn-outline-light">Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-outline-light">Crear cuenta</Link>
              </div>
            )}
            {user && (
              <p className="text-secondary small mb-0">
                Sesión: <strong>{user.nombre}</strong> ({user.email})
              </p>
            )}
            {(modoInvitado || !user) && !user && (
              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <label className="form-label">Nombre *</label>
                  <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Correo *</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- SECCIÓN DE MÉTODOS DE PAGO --- */}
        <div className="card border-custom bg-card mb-4">
          <div className="card-body">
            <h5 className="mb-3">Método de pago</h5>
            {["webpay", "khipu", "simulado"].map((m) => (
              <div className="form-check mb-2" key={m}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="pago"
                  id={m}
                  value={m}
                  checked={pago === m}
                  onChange={() => setPago(m)}
                />
                <label className="form-check-label" htmlFor={m}>
                  {m === "simulado" ? "Pago simulado" : m.charAt(0).toUpperCase() + m.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECCIÓN DE TÉRMINOS Y CONDICIONES --- */}
        <div className="card border-custom bg-card mb-4">
          <div className="card-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="terminos">
                Acepto los términos y la política de privacidad.
              </label>
            </div>
          </div>
        </div>

        {/* --- BOTÓN DE CONFIRMACIÓN DE PAGO --- */}
        <button type="button" className="btn btn-danger btn-lg w-100 fw-bold" onClick={confirmar}>
          Confirmar y pagar · ${totals.total.toLocaleString("es-CL")}
        </button>
      </div>
      
      {/* --- COLUMNA LATERAL: Resumen del carrito --- */}
      <div className="col-lg-5">
        <CartSidebar />
      </div>
    </div>
  );
}