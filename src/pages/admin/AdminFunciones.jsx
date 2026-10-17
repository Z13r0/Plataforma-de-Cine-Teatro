/**
 * AdminFunciones - Gestión de funciones (horarios y salas)
 * Permite ver, agregar, editar y eliminar funciones
 */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminFunciones() {
  const [funciones, setFunciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "cine",
    fecha: "",
    hora: "",
    sala: "",
    precio: "",
  });

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Agrega una nueva función
   */
  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevaFuncion = {
      id: Date.now(),
      ...formData,
      precio: Number(formData.precio),
    };

    // Guardar en localStorage
    const adminFunciones = JSON.parse(localStorage.getItem("funcionesAdmin") || "[]");
    adminFunciones.push(nuevaFuncion);
    localStorage.setItem("funcionesAdmin", JSON.stringify(adminFunciones));

    setFunciones([...funciones, nuevaFuncion]);
    setMostrarFormulario(false);
    setFormData({
      titulo: "",
      tipo: "cine",
      fecha: "",
      hora: "",
      sala: "",
      precio: "",
    });
  };

  /**
   * Elimina una función
   */
  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta función?")) {
      const actualizadas = funciones.filter((f) => f.id !== id);
      setFunciones(actualizadas);

      // Actualizar localStorage
      const adminFunciones = JSON.parse(localStorage.getItem("funcionesAdmin") || "[]");
      const filtrados = adminFunciones.filter((f) => f.id !== id);
      localStorage.setItem("funcionesAdmin", JSON.stringify(filtrados));
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold">Gestión de Funciones</h2>
        <button
          className="btn btn-danger"
          onClick={() => setMostrarFormulario(true)}
        >
          <i className="bi bi-plus-lg me-2" />
          Agregar Función
        </button>
      </div>

      {/* Formulario de agregar */}
      {mostrarFormulario && (
        <div className="card bg-card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Nueva Función</h5>
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
                  <label className="form-label">Título de la obra/película</label>
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
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-control"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="cine">Cine</option>
                    <option value="teatro">Teatro</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Hora</label>
                  <input
                    type="time"
                    className="form-control"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Sala</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sala"
                    value={formData.sala}
                    onChange={handleChange}
                    placeholder="Ej: Sala 1"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    min="0"
                    step="100"
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-lg me-2" />
                    Guardar Función
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de funciones */}
      <div className="row g-3">
        {funciones.length === 0 ? (
          <div className="col-12">
            <div className="card bg-card p-4 text-center">
              <p className="text-muted mb-0">No hay funciones registradas</p>
            </div>
          </div>
        ) : (
          funciones.map((f) => (
            <div className="col-md-6 col-lg-4" key={f.id}>
              <div className="card bg-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{f.titulo}</h5>
                  <p className="card-text small text-muted">
                    <i className="bi bi-calendar me-1" />
                    {f.fecha} a las {f.hora}
                  </p>
                  <p className="card-text small text-muted">
                    <i className="bi bi-door-open me-1" />
                    {f.sala}
                  </p>
                  <p className="card-text small text-muted">
                    <i className="bi bi-currency-dollar me-1" />
                    ${f.precio}
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-light flex-grow-1">
                      <i className="bi bi-pencil me-1" />
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(f.id)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
