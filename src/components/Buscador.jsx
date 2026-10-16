const CLASIFICACIONES = ["TE", "TE+7", "+14", "+18"];

export default function Buscador({ filtros, onCambiar, generos = [] }) {
  const cambiar = (campo) => (evento) =>
    onCambiar({ ...filtros, [campo]: evento.target.value });

  return (
    <div className="row g-3 mb-4 p-3 bg-secondary bg-opacity-25 rounded">
      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Buscar por título..."
          value={filtros.texto}
          onChange={cambiar("texto")}
        />
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <select
          className="form-select bg-dark text-white border-secondary"
          value={filtros.genero}
          onChange={cambiar("genero")}
        >
          <option value="">Todos los géneros</option>
          {generos.map((genero) => (
            <option key={genero} value={genero}>
              {genero}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <select
          className="form-select bg-dark text-white border-secondary"
          value={filtros.clasificacion}
          onChange={cambiar("clasificacion")}
        >
          <option value="">Todas las clasificaciones</option>
          {CLASIFICACIONES.map((clasificacion) => (
            <option key={clasificacion} value={clasificacion}>
              {clasificacion}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
