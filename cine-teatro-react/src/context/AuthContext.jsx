/**
 * AuthContext.jsx — Proveedor de contexto para gestionar la autenticación de usuarios (inicio de sesión, registro, cierre de sesión y persistencia local).
 */
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "usuarios";
const SESSION_KEY = "usuarioActual";

export function AuthProvider({ children }) {
  // --- ESTADO DE USUARIO: Inicializa cargando la sesión actual desde el localStorage de forma segura ---
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  // --- FUNCIÓN DE INICIO DE SESIÓN: Valida credenciales de administrador predeterminado o usuarios registrados ---
  const login = (email, password) => {
    const e = email.trim().toLowerCase();
    
    // 1. Verificación de credenciales de administrador maestro
    if (e === "admin@duocuc.cl" && password === "admin123") {
      const admin = { id: 0, nombre: "Administrador", email: e, rol: "admin" };
      localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
      setUser(admin);
      return { ok: true, admin: true };
    }

    // 2. Búsqueda de usuario en la lista guardada en localStorage
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const found = users.find((u) => u.email === e && u.password === password);
    if (!found) return { ok: false, error: "Correo o contraseña incorrectos." };

    // 3. Creación y almacenamiento de la sesión de usuario
    const session = {
      id: found.id,
      nombre: found.nombre,
      email: found.email,
      rol: found.rol || "usuario",
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  // --- FUNCIÓN DE REGISTRO: Valida duplicados, crea un nuevo usuario y lo autentica automáticamente ---
  const register = ({ nombre, email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const e = email.trim().toLowerCase();
    
    if (users.some((u) => u.email === e)) {
      return { ok: false, error: "Este correo ya está registrado." };
    }

    const nuevo = { id: Date.now(), nombre, email: e, password, rol: "usuario" };
    users.push(nuevo);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const session = { id: nuevo.id, nombre, email: e, rol: "usuario" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  // --- FUNCIÓN DE CIERRE DE SESIÓN: Elimina la sesión actual y limpia el estado ---
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  // --- MEMORIZACIÓN DE VALORES: Optimiza el rendimiento evitando renders innecesarios del contexto ---
  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --- HOOK PERSONALIZADO: Facilita el uso del contexto de autenticación en los componentes ---
export const useAuth = () => useContext(AuthContext);