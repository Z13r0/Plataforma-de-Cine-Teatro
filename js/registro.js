document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const password = document.getElementById("password")?.value || "";
    const terminos = document.getElementById("terminosRegistro");

    if (!Validaciones.nombreValido(nombre)) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    if (!Validaciones.emailValido(email)) {
      alert(Validaciones.mensajeEmailInvalido());
      return;
    }
    if (!Validaciones.passwordValida(password)) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!Validaciones.terminosAceptados(terminos)) {
      alert("Debes aceptar los Términos y Condiciones para registrarte.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert("Este correo ya está registrado.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      email: email.toLowerCase(),
      password, // prototipo académico; en producción usar hash
      rol: "usuario"
    };
    usuarios.push(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActual", JSON.stringify({
      id: nuevo.id,
      nombre: nuevo.nombre,
      email: nuevo.email,
      rol: nuevo.rol
    }));

    alert("Cuenta creada correctamente.");
    window.location.href = "index.html";
  });
});