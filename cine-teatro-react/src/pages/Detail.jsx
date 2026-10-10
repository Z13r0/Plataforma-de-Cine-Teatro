/**
 * Detail.jsx
 * Muestra una película u obra según la URL: /detalle/:tipo/:id.
 * Al elegir una función, guarda los datos en el carrito y navega a /butacas.
 */

import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DB, getContentById, getFunciones } from "../data/db";
import { useCart } from "../context/CartContext";

export default function Detail() {
  // --- PARÁMETROS DE LA URL: Obtiene el tipo de contenido y su ID ---
  const { tipo, id } = useParams(); // Ejemplo: tipo="cine", id="1"

  // --- NAVEGACIÓN: Permite redirigir al usuario a otra página ---
  const navigate = useNavigate();

  // --- CARRITO: Obtiene la función para actualizar los datos de la compra ---
  const { setCart } = useCart();

  // --- CARGA DEL CONTENIDO: Busca la película u obra según su ID y tipo ---
  const item = useMemo(() => getContentById(id, tipo), [id, tipo]);

  // --- CARGA DE FUNCIONES: Recupera los horarios disponibles para el contenido ---
  const funciones = useMemo(() => getFunciones(id, tipo), [id, tipo]);

  // --- VALIDACIÓN: Muestra un mensaje si el contenido no existe ---
  if (!item) {
    return (
      <div className="text-center py-5">
        <p className="text-secondary">Contenido no encontrado.</p>
        <Link to="/" className="btn btn-danger">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // --- GÉNEROS: Convierte el arreglo de géneros en un texto separado por puntos ---
  const genero = Array.isArray(item.genero)
    ? item.genero.join(" · ")
    : item.genero || "";

  /**
   * --- SELECCIÓN DE FUNCIÓN: Guarda los datos de la función elegida
   * y dirige al usuario a la selección de butacas.
   */
  const elegirFuncion = (funcion) => {
    // Busca la sala correspondiente a la función seleccionada.
    const sala = (DB.salas || []).find((s) => s.id === funcion.salaId);

    // Evita continuar si la función no tiene una sala válida.
    if (!sala) return;

    // Actualiza el carrito conservando los datos anteriores que no se reemplazan.
    setCart((prev) => ({
      ...prev,

      // Identifica el contenido seleccionado.
      contenidoId: Number(id),
      tipo,
      titulo: item.titulo,
      imagen: item.imagen,

      // Guarda la fecha, hora y sala de la función.
      fecha: funcion.fecha,
      hora: funcion.hora,
      sala: funcion.salaId,
      salaNombre: sala.nombre,
      funcionId: funcion.id,

      // Utiliza el primer formato disponible o "2D" como valor predeterminado.
      formato: (item.formatos && item.formatos[0]) || "2D",

      // Inicializa la compra con una entrada general.
      entradas: [
        { nombre: "General", cantidad: 1, precio: sala.precioBase },
      ],

      // Guarda el cargo por servicio o utiliza $700 por defecto.
      cargoServicio: DB.cargoServicio || 700,

      // Reinicia las butacas y los productos de confitería seleccionados.
      butacas: [],
      confiteria: [],
    }));

    // Redirige al usuario a la página de selección de butacas.
    navigate("/butacas");
  };

  return (
    <>
      {/* Botón para volver a la cartelera correspondiente. */}
      <Link
        to={tipo === "teatro" ? "/teatro" : "/peliculas"}
        className="btn btn-outline-light btn-sm mb-4"
      >
        ← Volver
      </Link>

      <div className="row g-4">
        {/* --- PÓSTER: Muestra la imagen del contenido seleccionado --- */}
        <div className="col-md-4">
          <img
            src={item.imagen}
            alt={item.titulo}
            className="w-100 rounded border border-custom"
            style={{ objectFit: "cover" }}

            // Muestra una imagen alternativa si el póster no se puede cargar.
            onError={(e) => {
              e.target.src =
                "https://placehold.co/400x600/1a1a1a/666?text=Poster";
            }}
          />
        </div>

        {/* --- INFORMACIÓN: Presenta los datos principales del contenido --- */}
        <div className="col-md-8">
          {/* Identifica si el contenido pertenece al cine o al teatro. */}
          <span className="badge bg-danger me-2">
            {tipo === "teatro" ? "TEATRO" : "CINE"}
          </span>

          {/* Muestra la clasificación por edad del contenido. */}
          <span className="badge bg-secondary">{item.clasificacion}</span>

          {/* Título principal de la película u obra. */}
          <h1 className="fw-bold mt-2">{item.titulo}</h1>

          {/* Resume el género, la duración y el año de estreno. */}
          <p className="text-secondary">
            {genero} · {item.duracion} · {item.anio || ""}
          </p>

          {/* Sinopsis o descripción del contenido. */}
          <p>{item.sinopsis}</p>

          {/* Muestra el director solamente si existe ese dato. */}
          {item.director && (
            <p className="small text-secondary mb-1">
              <strong>Director:</strong> {item.director}
            </p>
          )}

          {/* Muestra el reparto solamente si está disponible. */}
          {item.reparto && (
            <p className="small text-secondary">
              <strong>Reparto:</strong> {item.reparto}
            </p>
          )}

          {/* --- RESTRICCIONES: Informa condiciones especiales del contenido --- */}
          {item.restricciones?.activa && (
            <div className="alert alert-warning mt-3">
              <strong>Restricciones:</strong> {item.restricciones.texto}
            </div>
          )}

          {/* --- HORARIOS: Presenta las funciones disponibles para comprar entradas --- */}
          <h5 className="fw-bold mt-4 mb-3">Horarios</h5>

          {/* Informa si el contenido todavía no tiene funciones registradas. */}
          {funciones.length === 0 ? (
            <p className="text-secondary">
              No hay funciones cargadas para este título.
            </p>
          ) : (
            // Genera un botón por cada función disponible.
            <div className="d-flex flex-wrap gap-2">
              {funciones.map((f) => {
                // Busca la sala asociada a cada función.
                const sala = (DB.salas || []).find(
                  (s) => s.id === f.salaId
                );

                return (
                  <button
                    key={f.id}
                    type="button"
                    className="btn btn-outline-light"

                    // Guarda la función seleccionada y continúa con la compra.
                    onClick={() => elegirFuncion(f)}
                  >
                    {/* Fecha y hora de la función. */}
                    {f.fecha} · {f.hora}

                    {/* Nombre de la sala o su ID si no se encuentra. */}
                    <span className="d-block small text-secondary">
                      {sala?.nombre || f.salaId}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}