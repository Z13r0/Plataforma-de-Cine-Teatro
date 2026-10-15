import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { emailValido } from "../utils/validations";

/*
    InicioCuenta.jsx
    Página de inicio de sesión.
    Valida el correo y los términos, llama a login() de utils/auth
    y redirige según el rol del usuario (admin o usuario).
*/
export default function InicioCuenta() {
  /*
      navigate permite cambiar de ruta después de un login exitoso
      (por ejemplo, ir al inicio o al panel admin).
  */
  const navigate = useNavigate();

  /*
      Estados del formulario:
      - email / password: datos que escribe el usuario
      - terminos: si aceptó los Términos y Condiciones
      - error: mensaje para mostrar si algo falla
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState("");

  /*
      onSubmit se ejecuta al enviar el formulario.
      1) Evita que el navegador recargue la página (preventDefault).
      2) Valida el formato del correo.
      3) Exige aceptar los términos.
      4) Intenta iniciar sesión con auth.login.
      5) Si falla, muestra el error; si ok, redirige según el rol.
  */
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailValido(email)) {
      setError("Usa un correo permitido (@gmail.com, @duocuc.cl, etc.).");
      return;
    }

    if (!terminos) {
      setError("Debes aceptar los Términos y Condiciones.");
      return;
    }

    const res = login(email, password);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    /*
        Admin → /admin (si existe la ruta); si no, puedes usar solo "/".
        Usuario normal → inicio.
    */
    navigate(res.user?.rol === "admin" ? "/admin" : "/");
  };

  /*
      UI centrada: tarjeta con correo, contraseña, términos y botón Entrar.
      Los inputs son controlados (value + onChange) con el estado de React.
  */
  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <div className="w-100" style={{ maxWidth: 420 }}>
        <div className="card shadow border-0 p-4">
          <h1 className="h4 fw-bold mb-3 text-center">Iniciar sesión</h1>

          {/* Mensaje de error solo si existe */}
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Correo
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="terminos">
                Acepto los Términos y Condiciones
              </label>
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-semibold">
              Entrar
            </button>
          </form>

          <p className="small text-center text-secondary mt-3 mb-0">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-danger">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}