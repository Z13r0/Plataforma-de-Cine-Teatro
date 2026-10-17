/**
 * AuthContext.jsx
 * Guarda la sesión del usuario (login, registro y admin) en React + localStorage.
 */
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "usuarios";
const SESSION_KEY = "usuarioActual";

/* Se crea para dar una cuenta de administrador por defecto */
const ADMIN = {
  id: 0,
  nombre: "Administrador",
  email: "admin@duocuc.cl",
  rol: "admin",
};

// Lee la sesión actual del localStorage, devolviendo null si no hay sesión o si ocurre un error al parsear.

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

// Lee los usuarios registrados desde el localStorage, devolviendo un array vacío si no hay usuarios o si ocurre un error al parsear.

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

// Contexto de autenticación que proporciona funciones para iniciar sesión, registrar usuarios y cerrar sesión, así como información sobre el usuario actual y su rol.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => leerSesion());

  /* Iniciar sesión (usuario normal o admin) */
  const login = (email, password) => {
    const e = String(email).trim().toLowerCase();

    // Credenciales de admin hardcodeadas para demostración
    if (e === ADMIN.email && password === "admin123") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(ADMIN));
      setUser(ADMIN);
      return { ok: true, user: ADMIN };
    }

    // Lee los usuarios del localStorage y busca uno que coincida con el correo y la contraseña
    const users = leerUsuarios();
    const found = users.find((u) => u.email === e && u.password === password);
    if (!found) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }

    // Guardar sesión en localStorage y actualizar el estado del usuario

    const session = {
      id: found.id,
      nombre: found.nombre,
      email: found.email,
      rol: found.rol || "usuario",
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, user: session };
  };

  /** Crear cuenta nueva e iniciar sesión al instante */
  const register = ({ nombre, email, password }) => {
    const users = leerUsuarios();
    const e = String(email).trim().toLowerCase();

    if (users.some((u) => u.email === e)) {
      return { ok: false, error: "Este correo ya está registrado." };
    }
    if (e === ADMIN.email) {
      return { ok: false, error: "Este correo no está disponible." };
    }

    // Crear nuevo usuario y lo guardar en el localStorage

    const nuevo = {
      id: Date.now(),
      nombre: String(nombre).trim(),
      email: e,
      password,
      rol: "usuario",
    };
    users.push(nuevo);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Inicia sesión automáticamente después de registrarse 

    const session = {
      id: nuevo.id,
      nombre: nuevo.nombre,
      email: nuevo.email,
      rol: "usuario",
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, user: session };
  };

  /* Cierra la sesión y elimina la información de la sesión del localStorage */
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,           // null | { id, nombre, email, rol }
      isAdmin: user?.rol === "admin",
      isLoggedIn: !!user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook para consumir el contexto. 
 * Simplifica el acceso a la información de autenticación y las funciones de login, registro y logout.
*/
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}