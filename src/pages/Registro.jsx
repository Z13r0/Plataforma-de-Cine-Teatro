/**
 * Registro — crear cuenta (estilo page corta de refactor).
 * Usa AuthContext.register + validaciones de email.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { emailValido, passwordValida, nombreValido } from "../utils/validations";

// Este componente renderiza un formulario de registro con validaciones y manejo de errores.

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState("");

  // Esta función se ejecuta al enviar el formulario. Valida los campos y llama a register del AuthContext.

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!nombreValido(nombre)) return setError("Nombre mínimo 2 caracteres.");
    if (!emailValido(email)) return setError("Correo no permitido (@gmail.com, @duocuc.cl…).");
    if (!passwordValida(password)) return setError("Contraseña mínimo 6 caracteres.");
    if (!terminos) return setError("Debes aceptar los Términos y Condiciones.");

    // Llama a la función register del AuthContext con los datos del formulario.

    const res = register({ nombre, email, password });
    // Si tu AuthContext usa register(nombre, email, password), ajústalo.
    if (!res.ok) return setError(res.error);
    navigate("/");
  };

  // Renderiza el formulario de registro con validaciones y mensajes de error.

  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <div className="w-100" style={{ maxWidth: 420 }}>
        <div className="card shadow border-0 p-4 bg-card">
          <h1 className="h4 fw-bold mb-3 text-center">Crear cuenta</h1>
          {error && <div className="alert alert-danger py-2">{error}</div>}
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
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="t" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
              <label className="form-check-label small" htmlFor="t">Acepto los Términos y Condiciones</label>
            </div>
            <button type="submit" className="btn btn-danger w-100">Registrarme</button>
          </form>
          <p className="small text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login" className="text-danger">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
}