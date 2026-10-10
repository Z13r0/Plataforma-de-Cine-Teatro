/**
 * Community.jsx — Sección comunitaria donde los usuarios pueden publicar y visualizar opiniones sobre películas y obras, guardadas en localStorage.
 */
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const KEY = "comentariosComunidad";

// --- FUNCIÓN AUXILIAR: Lee y parsea los comentarios almacenados de manera segura ---
function leerComentarios() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export default function Community() {
  // --- CONTEXTOS Y ESTADOS ---
  const { user } = useAuth();                             // Obtiene el usuario autenticado para firmar el comentario
  const [lista, setLista] = useState(() => leerComentarios()); // Estado con la lista de comentarios cargados
  const [titulo, setTitulo] = useState("");               // Título de la película u obra comentada
  const [texto, setTexto] = useState("");                 // Contenido u opinión del comentario

  // --- MANEJADOR DE PUBLICACIÓN: Valida, crea el nuevo comentario y actualiza el almacenamiento ---
  const publicar = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;

    const nuevo = {
      titulo: titulo.trim(),
      texto: texto.trim(),
      autor: user?.nombre || "Anónimo", // Usa el nombre del usuario o "Anónimo" si no ha iniciado sesión
      fecha: new Date().toLocaleString("es-CL"),
    };

    const next = [...lista, nuevo];
    localStorage.setItem(KEY, JSON.stringify(next)); // Guarda en el localStorage
    setLista(next);     // Actualiza el estado local
    setTitulo("");      // Limpia el campo de título
    setTexto("");       // Limpia el área de texto
  };

  // --- ORDENAMIENTO: Invierte la lista para mostrar los comentarios más recientes primero ---
  const ordenados = [...lista].reverse();

  return (
    <>
      <h1 className="h2 fw-bold section-title mb-2">Comunidad</h1>
      <p className="text-secondary mb-4">Comparte opiniones sobre películas y obras.</p>

      {/* --- FORMULARIO PARA NUEVO COMENTARIO --- */}
      <div className="card border-custom bg-card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Nuevo comentario</h5>
          <form onSubmit={publicar}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Título (película u obra)"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Tu opinión..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Publicar
            </button>
          </form>
        </div>
      </div>

      {/* --- LISTADO DE COMENTARIOS: Muestra un mensaje si está vacío o mapea las opiniones publicadas --- */}
      {ordenados.length === 0 ? (
        <p className="text-secondary">Sé el primero en comentar.</p>
      ) : (
        ordenados.map((c, i) => (
          <div className="card border-custom bg-card mb-3" key={`${c.fecha}-${i}`}>
            <div className="card-body">
              <h6 className="fw-bold text-danger mb-1">{c.titulo}</h6>
              <p className="mb-2">{c.texto}</p>
              <p className="small text-secondary mb-0">
                {c.autor} · {c.fecha}
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
}