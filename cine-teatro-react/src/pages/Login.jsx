/**
 * Login.jsx — Pantalla de inicio de sesión con validación de correo, términos y condiciones, y redirección según el rol del usuario.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { emailValido, mensajeEmailInvalido } from "../utils/validations.js";

export default function Login() {
  // --- CONTEXTOS Y NAVEGACIÓN ---
  const { login } = useAuth(); // Función de inicio de sesión proveniente del contexto de autenticación
  const navigate = useNavigate(); // Hook para redirigir tras un login exitoso

  // --- ESTADOS (useState): Gestionan los campos del formulario y mensajes de error ---
  const [email, setEmail] = useState(""); // Correo electrónico ingresado
  const [password, setPassword] = useState(""); // Contraseña de acceso
  const [terminos, setTerminos] = useState(false); // Aceptación obligatoria de términos y condiciones
  const [error, setError] = useState(""); // Mensaje de error para mostrar en la interfaz

  // --- MANEJADOR DE ENVÍO: Valida los campos, intenta iniciar sesión y redirige según el rol ---
  const onSubmit = (e) => {
    e.preventDefault();
    // 1. Valida el formato del correo electrónico
    if (!emailValido(email)) return setError(mensajeEmailInvalido());
    // 2. Valida la aceptación de los términos y condiciones
    if (!terminos) return setError("Debes aceptar los Términos y Condiciones.");
    
    // 3. Intenta autenticar las credenciales a través del contexto
    const res = login(email, password);
    if (!res.ok) return setError(res.error); // Muestra error si las credenciales son incorrectas
    
    // 4. Redirige al panel de administración si es admin, o al inicio en caso contrario
    navigate(res.admin ? "/admin" : "/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card border-custom bg-card p-4">
          <h1 className="h3 fw-bold mb-4 text-center">Iniciar sesión</h1>
          
          {/* --- MENSAJE DE ERROR --- */}
          {error && <div className="alert alert-danger py-2">{error}</div>}
          
          {/* --- FORMULARIO DE ACCESO --- */}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            {/* --- CHECKBOX DE TÉRMINOS Y CONDICIONES --- */}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="t" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
              <label className="form-check-label small" htmlFor="t">Acepto los Términos y Condiciones</label>
            </div>
            
            <button className="btn btn-danger w-100 fw-bold" type="submit">Entrar</button>
          </form>

          {/* --- ENLACE A REGISTRO --- */}
          <p className="text-center small text-secondary mt-3 mb-0">
            ¿No tienes cuenta? <Link to="/registro" className="text-danger">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}