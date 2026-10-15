/*
    SESSION_KEY es lo que nos permite mantener la sesión del usuario en el navegador,
    es decir, que el usuario no tenga que iniciar sesión cada vez que recarga la página.
*/
const SESSION_KEY = "usuarioActual";

/*
    USERS_KEY es la clave que utilizamos para almacenar los usuarios registrados
    en el localStorage.
*/
const USERS_KEY = "usuarios";

/*
    getUser() obtiene el usuario que tiene la sesión iniciada.
    Si hay datos válidos en localStorage, los devuelve; si no, devuelve null.
*/
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch (error) {
    return null;
  }
}

/*
    logout() cierra la sesión del usuario eliminando la clave SESSION_KEY
    del localStorage.
*/
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/*
    login(email, password) valida las credenciales.
    - Si es el administrador, guarda su sesión y retorna ok: true.
    - Si es un usuario registrado, busca coincidencia en USERS_KEY.
    - Si no hay coincidencia, retorna ok: false y un mensaje de error.
*/
export function login(email, password) {
  const e = String(email || "").trim().toLowerCase();
  const pass = String(password || "");

  /*
      Cuenta administrador de demostración.
      Importante: el correo debe ser el mismo que se escribe en el formulario
      (admin@duocuc.cl) y estar permitido por validations.js (@duocuc.cl).
  */
  if (e === "admin@duocuc.cl" && pass === "admin123") {
    const admin = {
      id: 0,
      nombre: "Administrador",
      email: e,
      rol: "admin",
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    return { ok: true, user: admin };
  }

  /*
      Si no es el administrador, se busca en la lista de usuarios registrados.
  */
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const found = users.find(
    (user) => user.email === e && user.password === pass
  );

  if (!found) {
    return { ok: false, error: "Correo o contraseña incorrectos." };
  }

  /*
      Se guarda una copia de la sesión sin necesidad de exponer más datos
      de los necesarios en la UI.
  */
  const user = {
    id: found.id,
    nombre: found.nombre,
    email: found.email,
    rol: found.rol || "usuario",
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

/*
    register({ nombre, email, password }) crea un nuevo usuario en localStorage.
    Valida que el correo no esté registrado y que no use el email del admin.
    Luego guarda el usuario en la lista e inicia sesión automáticamente.
*/
export function register({ nombre, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const e = String(email || "").trim().toLowerCase();

  if (e === "admin@duocuc.cl") {
    return { ok: false, error: "Este correo no está disponible." };
  }

  if (users.some((user) => user.email === e)) {
    return { ok: false, error: "El correo ya está registrado." };
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre: String(nombre || "").trim(),
    email: e,
    password: String(password || ""),
    rol: "usuario",
  };

  users.push(nuevoUsuario);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  /*
      Inicio de sesión automático tras el registro.
  */
  const session = {
    id: nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    email: nuevoUsuario.email,
    rol: "usuario",
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { ok: true, user: session };
}