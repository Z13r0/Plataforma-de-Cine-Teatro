/**
 * Register.jsx — Pantalla de registro de usuarios nuevos con validaciones de formulario y manejo de sesión.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  emailValido,
  mensajeEmailInvalido,
  passwordValida,
  nombreValido,
} from "../utils/validations";

export default function Register() {
  // --- CONTEXTOS Y NAVEGACIÓN ---
  const { register } = useAuth(); // Función de registro proveniente del contexto de autenticación
  const navigate = useNavigate();   // Hook para redirigir tras un registro exitoso

  // --- ESTADOS (useState): Gestionan los campos del formulario y mensajes de error ---
  const [nombre, setNombre] = useState("");     // Nombre ingresado por el usuario
  const [email, setEmail] = useState("");       // Correo electrónico
  const [password, setPassword] = useState(""); // Contraseña de acceso
  const [terminos, setTerminos] = useState(false); // Aceptación de términos y condiciones
  const [error, setError] = useState("");       // Mensaje de error para mostrar en la interfaz

  // --- MANEJADOR DE ENVÍO: Valida todos los campos antes de registrar y redirigir ---
  const onSubmit = (e) => {
    e.preventDefault();
    // 1. Validaciones individuales de formato y longitud
    if (!nombreValido(nombre)) return setError("Nombre mínimo 2 caracteres.");
    if (!emailValido(email)) return setError(mensajeEmailInvalido());
    if (!passwordValida(password)) return setError("Contraseña mínimo 6 caracteres.");
    if (!terminos) return setError("Debes aceptar los Términos y Condiciones.");

    // 2. Intento de registro a través del contexto
    const res = register({ nombre: nombre.trim(), email, password });
    if (!res.ok) return setError(res.error); // Muestra error si el correo ya está registrado, etc.
    
    navigate("/"); // Redirige al inicio si el registro es exitoso
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card border-custom bg-card p-4">
          <h1 className="h3 fw-bold mb-4 text-center">Crear cuenta</h1>
          
          {/* --- MENSAJE DE ERROR --- */}
          {error && <div className="alert alert-danger py-2">{error}</div>}
          
          {/* --- FORMULARIO DE REGISTRO --- */}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            
            {/* --- CHECKBOX DE TÉRMINOS Y CONDICIONES --- */}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="tr" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
              <label className="form-check-label small" htmlFor="tr">Acepto los Términos y Condiciones</label>
            </div>
            
            <button type="submit" className="btn btn-danger w-100 fw-bold">Registrarme</button>
          </form>

          {/* --- ENLACE A INICIO DE SESIÓN --- */}
          <p className="text-center small text-secondary mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login" className="text-danger">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}