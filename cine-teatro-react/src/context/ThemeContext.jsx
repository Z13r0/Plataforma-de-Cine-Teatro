/**
 * ThemeContext.jsx — Contexto de React para gestionar y alternar el tema visual de la aplicación (oscuro/claro) con persistencia en localStorage.
 */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // --- ESTADO DEL TEMA: Inicializa obteniendo el valor guardado en localStorage o por defecto "dark" ---
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // --- EFECTO DE SINCRONIZACIÓN: Actualiza el atributo en el DOM y guarda en localStorage cada vez que cambia el tema ---
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- FUNCIÓN PARA ALTERNAR TEMA: Cambia de oscuro a claro o viceversa ---
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// --- HOOK PERSONALIZADO: Facilita el consumo del contexto del tema en cualquier componente ---
export const useTheme = () => useContext(ThemeContext);