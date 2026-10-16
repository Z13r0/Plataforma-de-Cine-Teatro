/**
 * AdminPeliculas - Gestión de películas en el panel de administración
 * Permite ver, agregar, editar y eliminar películas
 */
import { useState } from "react";
import { DB } from "../../data/db";

export default function AdminPeliculas() {
  const [peliculas, setPeliculas] = useState(DB.peliculas || []);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    genero: [],
    duracion: "",
    clasificacion: "",
    formatos: [],
    director: "",
    reparto: "",
    valoracion: 0,
    imagen: "",
    sinopsis: "",
  });

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Agrega una nueva película
   */
  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevaPelicula = {
      id: Date.now(),
      ...formData,
      genero: formData.genero.split(",").map((g) => g.trim()),
      formatos: formData.formatos.split(",").map((f) => f.trim()),
      valoracion: Number(formData.valoracion),
      tipo: "cine",
      restricciones: { activa: false, texto: "", items: [] },
    };

    // Guardar en localStorage
    const adminContent = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
    adminContent.push(nuevaPelicula);
    localStorage.setItem("contenidoAdmin", JSON.stringify(adminContent));

    setPeliculas([...peliculas, nuevaPelicula]);
    setMostrarFormulario(false);
    setFormData({
      titulo: "",
      genero: [],
      duracion: "",
      clasificacion: "",
      formatos: [],
      director: "",
      reparto: "",
      valoracion: 0,
      imagen: "",
      sinopsis: "",
    });
  };

  /**
   * Elimina una película
   */
  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta película?")) {
      const actualizadas = peliculas.filter((p) => p.id !== id);
      setPeliculas(actualizadas);

      // Actualizar localStorage
      const adminContent = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
      const filtrados = adminContent.filter((p) => p.id !== id);
      localStorage.setItem("contenidoAdmin", JSON.stringify(filtrados));
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold">Gestión de Películas</h2>
        <button
          className="btn btn-danger"
          onClick={() => setMostrarFormulario(true)}
        >
          <i className="bi bi-plus-lg me-2" />
          Agregar Película
        </button>
      </div>

      {/* Formulario de agregar/editar */}
      {mostrarFormulario && (
        <div className="card bg-card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Nueva Película</h5>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setMostrarFormulario(false)}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleAgregar}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Duración</label>
                  <input
                    type="text"
                    className="form-control"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                    placeholder="Ej: 2h 30m"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Clasificación</label>
                  <input
                    type="text"
                    className="form-control"
                    name="clasificacion"
                    value={formData.clasificacion}
                    onChange={handleChange}
                    placeholder="Ej: TE+7"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Director</label>
                  <input
                    type="text"
                    className="form-control"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Géneros (separados por coma)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    placeholder="Ej: Acción, Ciencia Ficción"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Formatos (separados por coma)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="formatos"
                    value={formData.formatos}
                    onChange={handleChange}
                    placeholder="Ej: 2D, IMAX, 3D"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Valoración (0-5)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="valoracion"
                    value={formData.valoracion}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">URL de Imagen</label>
                  <input
                    type="url"
                    className="form-control"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Reparto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reparto"
                    value={formData.reparto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Sinopsis</label>
                  <textarea
                    className="form-control"
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-lg me-2" />
                    Guardar Película
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de películas */}
      <div className="row g-3">
        {peliculas.map((p) => (
          <div className="col-md-6 col-lg-4" key={p.id}>
            <div className="card bg-card h-100">
              <img
                src={p.imagen}
                alt={p.titulo}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.titulo}</h5>
                <p className="card-text small text-muted">
                  {p.genero.join(", ")}
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-light flex-grow-1">
                    <i className="bi bi-pencil me-1" />
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminar(p.id)}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
