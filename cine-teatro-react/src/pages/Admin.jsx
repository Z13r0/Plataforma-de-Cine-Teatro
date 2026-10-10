/**
 * Admin.jsx — Panel de administración exclusivo para gestionar contenido (películas/obras), programación de funciones y visualización del historial de compras.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DB } from "../data/db";

const KEY_CONTENIDO = "contenidoAdmin";
const KEY_FUNCIONES = "funcionesAdmin";

// --- FUNCIÓN AUXILIAR: Lee y parsea los datos almacenados de forma segura ---
function leer(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

// --- OBJETO INICIAL: Estructura vacía para el formulario de alta/edición de contenido ---
const formVacio = () => ({
  tipo: "cine",
  titulo: "",
  genero: "",
  anio: "",
  duracion: "",
  clasificacion: "TE",
  formatos: "2D",
  director: "",
  reparto: "",
  imagen: "",
  sinopsis: "",
  estado: "cartelera",
  fechaEstreno: "",
});

export default function Admin() {
  // --- ESTADOS PRINCIPALES: Controlan pestañas, filtros, datos y formularios ---
  const [tab, setTab] = useState("contenido"); // Pestaña activa: contenido | funciones | compras
  const [filtro, setFiltro] = useState("todos"); // Filtro de visualización: todos | cine | teatro
  const [adminItems, setAdminItems] = useState(() => leer(KEY_CONTENIDO)); // Contenido creado por admin
  const [adminFuncs, setAdminFuncs] = useState(() => leer(KEY_FUNCIONES)); // Funciones creadas por admin
  const [editId, setEditId] = useState(null); // ID del contenido en edición (null si es nuevo)
  const [form, setForm] = useState(formVacio()); // Datos del formulario de contenido

  // --- ESTADOS PARA NUEVA FUNCIÓN ---
  const [funSel, setFunSel] = useState(""); // Contenido seleccionado ("id|tipo")
  const [funSala, setFunSala] = useState(DB.salas?.[0]?.id || ""); // Sala seleccionada
  const [funFecha, setFunFecha] = useState(""); // Fecha de la función
  const [funHora, setFunHora] = useState("");   // Hora de la función

  // --- CONSOLIDACIÓN DE CONTENIDO: Une el catálogo base (DB) con los ítems creados por el administrador ---
  const todoContenido = useMemo(() => {
    const baseCine = (DB.peliculas || []).map((p) => ({ ...p, tipo: "cine", _origen: "base" }));
    const baseTeatro = (DB.obras || []).map((o) => ({ ...o, tipo: "teatro", _origen: "base" }));
    const extra = adminItems.map((a) => ({ ...a, _origen: "admin" }));
    return [...baseCine, ...baseTeatro, ...extra];
  }, [adminItems]);

  // --- FILTRADO DE CONTENIDO: Filtra según la opción elegida (todos, cine o teatro) ---
  const listaFiltrada = todoContenido.filter((i) => {
    if (filtro === "cine") return i.tipo === "cine";
    if (filtro === "teatro") return i.tipo === "teatro";
    return true;
  });

  // --- CARGA DE HISTORIAL: Obtiene las compras registradas y las invierte (más recientes primero) ---
  const compras = useMemo(
    () => leer("historialCompras").slice().reverse(),
    [tab] 
  );

  // --- ACTUALIZADOR DE CAMPOS: Modifica un campo específico en el formulario de contenido ---
  const setField = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));

  // --- MANEJADOR DE GUARDADO DE CONTENIDO: Crea o actualiza un registro en el localStorage ---
  const guardarContenido = (e) => {
    e.preventDefault();
    const data = {
      id: editId || Date.now(),
      tipo: form.tipo,
      titulo: form.titulo.trim(),
      genero: form.genero.split(",").map((s) => s.trim()).filter(Boolean),
      anio: Number(form.anio) || null,
      duracion: form.duracion.trim(),
      clasificacion: form.clasificacion,
      formatos: form.formatos.split(",").map((s) => s.trim()).filter(Boolean),
      director: form.director.trim(),
      reparto: form.reparto.trim(),
      imagen: form.imagen.trim(),
      sinopsis: form.sinopsis.trim(),
      valoracion: 0,
      estado: form.estado,
      fechaEstreno: form.fechaEstreno.trim(),
      restricciones: { activa: false, texto: "", items: [] },
    };

    let next;
    if (editId) {
      next = adminItems.map((c) => (Number(c.id) === Number(editId) ? data : c));
    } else {
      next = [...adminItems, data];
    }
    localStorage.setItem(KEY_CONTENIDO, JSON.stringify(next));
    setAdminItems(next);
    setEditId(null);
    setForm(formVacio());
    alert("Contenido guardado.");
  };

  // --- ACTIVACIÓN DE MODO EDICIÓN: Carga los datos del ítem seleccionado en el formulario ---
  const editar = (item) => {
    if (item._origen !== "admin") return;
    setEditId(item.id);
    setForm({
      tipo: item.tipo,
      titulo: item.titulo || "",
      genero: Array.isArray(item.genero) ? item.genero.join(", ") : item.genero || "",
      anio: item.anio || "",
      duracion: item.duracion || "",
      clasificacion: item.clasificacion || "TE",
      formatos: (item.formatos || []).join(", "),
      director: item.director || "",
      reparto: item.reparto || "",
      imagen: item.imagen || "",
      sinopsis: item.sinopsis || "",
      estado: item.estado || "cartelera",
      fechaEstreno: item.fechaEstreno || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- ELIMINAR CONTENIDO: Borra un ítem personalizado del localStorage ---
  const eliminar = (id) => {
    if (!confirm("¿Eliminar este contenido?")) return;
    const next = adminItems.filter((c) => Number(c.id) !== Number(id));
    localStorage.setItem(KEY_CONTENIDO, JSON.stringify(next));
    setAdminItems(next);
  };

  // --- AGREGAR FUNCIÓN: Registra un nuevo horario/función en el localStorage ---
  const agregarFuncion = (e) => {
    e.preventDefault();
    const [contenidoId, tipo] = (funSel || "|").split("|");
    if (!contenidoId || !funFecha || !funHora) {
      alert("Completa contenido, fecha y hora.");
      return;
    }
    const nueva = {
      id: Date.now(),
      contenidoId: Number(contenidoId),
      tipo,
      salaId: funSala,
      fecha: funFecha,
      hora: funHora,
    };
    const next = [...adminFuncs, nueva];
    localStorage.setItem(KEY_FUNCIONES, JSON.stringify(next));
    setAdminFuncs(next);
    setFunFecha("");
    setFunHora("");
    alert("Función agregada.");
  };

  // --- ELIMINAR FUNCIÓN: Borra una función añadida por el admin ---
  const eliminarFuncion = (id) => {
    if (!confirm("¿Eliminar función?")) return;
    const next = adminFuncs.filter((f) => Number(f.id) !== Number(id));
    localStorage.setItem(KEY_FUNCIONES, JSON.stringify(next));
    setAdminFuncs(next);
  };

  // --- CONSOLIDACIÓN DE FUNCIONES: Une las funciones base con las añadidas por el admin ---
  const todasFunciones = [
    ...(DB.funciones || []).map((f) => ({ ...f, _origen: "base" })),
    ...adminFuncs.map((f) => ({ ...f, _origen: "admin" })),
  ].reverse();

  return (
    <>
      {/* --- CABECERA DEL PANEL --- */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="h2 fw-bold section-title mb-0">
          Panel de administración <span className="badge bg-danger">Admin</span>
        </h1>
        <Link to="/" className="btn btn-outline-light btn-sm">
          <i className="bi bi-house" /> Sitio
        </Link>
      </div>

      {/* --- PESTAÑAS DE NAVEGACIÓN DEL PANEL --- */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {[
          ["contenido", "Contenido"],
          ["funciones", "Funciones"],
          ["compras", "Compras"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`btn btn-sm ${tab === id ? "btn-danger" : "btn-outline-light"}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* —— PESTAÑA: CONTENIDO —— */}
      {tab === "contenido" && (
        <div className="row g-4">
          {/* --- FORMULARIO DE ALTA / EDICIÓN --- */}
          <div className="col-lg-5">
            <div className="card border-custom bg-card p-4">
              <h5 className="fw-bold mb-3">{editId ? "Editar contenido" : "Agregar película / obra"}</h5>
              <form onSubmit={guardarContenido}>
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select className="form-select" value={form.tipo} onChange={(e) => setField("tipo", e.target.value)}>
                    <option value="cine">Película</option>
                    <option value="teatro">Obra de teatro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input className="form-control" required value={form.titulo} onChange={(e) => setField("titulo", e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Género (coma)</label>
                  <input className="form-control" value={form.genero} onChange={(e) => setField("genero", e.target.value)} placeholder="Acción, Drama" />
                </div>
                <div className="row g-2">
                  <div className="col-6 mb-3">
                    <label className="form-label">Año</label>
                    <input type="number" className="form-control" value={form.anio} onChange={(e) => setField("anio", e.target.value)} />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Duración</label>
                    <input className="form-control" value={form.duracion} onChange={(e) => setField("duracion", e.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Clasificación</label>
                  <select className="form-select" value={form.clasificacion} onChange={(e) => setField("clasificacion", e.target.value)}>
                    <option value="TE">TE</option>
                    <option value="TE+7">TE+7</option>
                    <option value="+14">+14</option>
                    <option value="+18">+18</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Formatos (coma)</label>
                  <input className="form-control" value={form.formatos} onChange={(e) => setField("formatos", e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL imagen</label>
                  <input className="form-control" value={form.imagen} onChange={(e) => setField("imagen", e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sinopsis</label>
                  <textarea className="form-control" rows={3} value={form.sinopsis} onChange={(e) => setField("sinopsis", e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" value={form.estado} onChange={(e) => setField("estado", e.target.value)}>
                    <option value="cartelera">Cartelera</option>
                    <option value="proximo">Próximo estreno</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-danger">Guardar</button>
                  {editId && (
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => {
                        setEditId(null);
                        setForm(formVacio());
                      }}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* --- LISTADO Y FILTRADO DE CONTENIDO --- */}
          <div className="col-lg-7">
            <div className="d-flex gap-2 mb-3">
              {[
                ["todos", "Todos"],
                ["cine", "Cine"],
                ["teatro", "Teatro"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`btn btn-sm ${filtro === id ? "btn-outline-light active" : "btn-outline-light"}`}
                  onClick={() => setFiltro(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            {listaFiltrada.map((item) => (
              <div className="card border-custom bg-card mb-2" key={`${item.tipo}-${item.id}`}>
                <div className="card-body d-flex gap-3">
                  <img
                    src={item.imagen || ""}
                    alt=""
                    style={{ width: 56, height: 80, objectFit: "cover", borderRadius: 6 }}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/56x80";
                    }}
                  />
                  <div className="flex-grow-1">
                    <span className={`badge me-1 ${item.tipo === "teatro" ? "bg-primary" : "bg-danger"}`}>
                      {item.tipo}
                    </span>
                    <span className="badge bg-secondary me-1">{item.estado || "cartelera"}</span>
                    {item._origen === "admin" && (
                      <span className="badge bg-warning text-dark">Admin</span>
                    )}
                    <h6 className="fw-bold mb-0 mt-1">{item.titulo}</h6>
                    <p className="small text-secondary mb-2">
                      {Array.isArray(item.genero) ? item.genero.join(", ") : item.genero} · {item.clasificacion}
                    </p>
                    {item._origen === "admin" ? (
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-sm btn-outline-light" onClick={() => editar(item)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(item.id)}>
                          Eliminar
                        </button>
                      </div>
                    ) : (
                      <span className="small text-secondary">Catálogo base (solo lectura)</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* —— PESTAÑA: FUNCIONES —— */}
      {tab === "funciones" && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-custom bg-card p-4">
              <h5 className="fw-bold mb-3">Nueva función</h5>
              <form onSubmit={agregarFuncion}>
                <div className="mb-3">
                  <label className="form-label">Contenido</label>
                  <select className="form-select" value={funSel} onChange={(e) => setFunSel(e.target.value)} required>
                    <option value="">Selecciona</option>
                    {todoContenido
                      .filter((i) => !i.estado || i.estado === "cartelera")
                      .map((i) => (
                        <option key={`${i.tipo}-${i.id}`} value={`${i.id}|${i.tipo}`}>
                          {i.titulo} ({i.tipo})
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Sala</label>
                  <select className="form-select" value={funSala} onChange={(e) => setFunSala(e.target.value)}>
                    {(DB.salas || []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nombre} (${s.precioBase})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input type="date" className="form-control" value={funFecha} onChange={(e) => setFunFecha(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Hora</label>
                  <input type="time" className="form-control" value={funHora} onChange={(e) => setFunHora(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Agregar función
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-8">
            {todasFunciones.map((f) => {
              const item = todoContenido.find(
                (c) => Number(c.id) === Number(f.contenidoId) && c.tipo === f.tipo
              );
              const sala = (DB.salas || []).find((s) => s.id === f.salaId);
              return (
                <div className="card border-custom bg-card mb-2" key={`${f._origen}-${f.id}`}>
                  <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <strong>{item ? item.titulo : `ID ${f.contenidoId}`}</strong>
                      <span className="badge bg-secondary ms-1">{f.tipo}</span>
                      <p className="small text-secondary mb-0">
                        {f.fecha} · {f.hora} · {sala?.nombre || f.salaId}
                      </p>
                    </div>
                    {f._origen === "admin" ? (
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminarFuncion(f.id)}>
                        Eliminar
                      </button>
                    ) : (
                      <span className="small text-secondary">Base</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* —— PESTAÑA: COMPRAS —— */}
      {tab === "compras" && (
        <div>
          {compras.length === 0 ? (
            <p className="text-secondary">No hay compras registradas.</p>
          ) : (
            compras.map((t) => (
              <div className="card border-custom bg-card mb-2" key={t.idTicket}>
                <div className="card-body d-flex justify-content-between flex-wrap gap-2">
                  <div>
                    <span className="badge bg-danger">{t.tipo}</span>
                    <strong className="ms-1">{t.titulo}</strong>
                    <p className="small text-secondary mb-0">
                      {t.fecha} {t.hora} · {t.cliente} · {t.email}
                    </p>
                    <p className="small mb-0">
                      Butacas: {(t.asientos || []).join(", ")} · {t.idTicket}
                    </p>
                  </div>
                  <strong className="text-success">${Number(t.total || 0).toLocaleString("es-CL")}</strong>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}