/**
 * ThemeContext — tema claro/oscuro persistente en localStorage.
 * Aplica data-theme en <html> para que el CSS reaccione.
 */
import { createContext, useContext, useEffect, useState } from "react";


// Crea un contexto para el tema, inicialmente nulo.

const ThemeContext = createContext(null);


// Esta función es un componente que envuelve a otros componentes y les proporciona el contexto del tema.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // useEffect se ejecuta cada vez que el tema cambia. Actualiza el atributo data-theme en <html> para que el CSS reaccione y guarda el tema en localStorage.

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // La función toggle cambia el tema entre "dark" y "light".

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // El componente devuelve un proveedor de contexto que pasa el tema y la función toggle a sus hijos.

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Esta función es un hook personalizado que permite a los componentes acceder al contexto del tema. 
// Lanza un error si se usa fuera del ThemeProvider.

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return ctx;
}