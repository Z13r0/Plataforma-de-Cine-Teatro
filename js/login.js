document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim() || "";
    const password = document.getElementById("password")?.value || "";
    const terminos = document.getElementById("terminosLogin");

    if (!Validaciones.emailValido(email)) {
      alert(Validaciones.mensajeEmailInvalido());
      return;
    }
    if (!password) {
      alert("Ingresa tu contraseña.");
      return;
    }
    if (!Validaciones.terminosAceptados(terminos)) {
      alert("Debes aceptar los Términos y Condiciones para iniciar sesión.");
      return;
    }

    // Admin demo
    if (email.toLowerCase() === "admin@duocuc.cl" && password === "admin123") {
      localStorage.setItem("usuarioActual", JSON.stringify({
        id: 0, nombre: "Administrador", email: "admin@duocuc.cl", rol: "admin"
      }));
      window.location.href = "admin.html";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol || "usuario"
    }));
    window.location.href = "index.html";
  });
});