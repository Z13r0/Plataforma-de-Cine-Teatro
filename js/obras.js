// Archivo: js/obras.js
// Cartelera de Teatro

document.addEventListener("DOMContentLoaded", () => {
  mostrarObras();

  const inputBuscador = document.getElementById("inputBuscador");
  const selectGenero = document.getElementById("selectGenero");
  const selectClasificacion = document.getElementById("selectClasificacion");

  if (inputBuscador) inputBuscador.addEventListener("input", aplicarFiltros);
  if (selectGenero) selectGenero.addEventListener("change", aplicarFiltros);
  if (selectClasificacion) selectClasificacion.addEventListener("change", aplicarFiltros);
});

function obtenerColorClasificacion(clasificacion) {
  switch (clasificacion) {
    case "TE": return "bg-success";
    case "TE+7": return "bg-info text-dark";
    case "+14": return "bg-warning text-dark";
    case "+18": return "bg-danger";
    default: return "bg-secondary";
  }
}

function mostrarObras(listaObras = DB.obras) {
  const contenedor = document.getElementById("contenedorObras");

  if (!contenedor) {
    console.error("No se encontró #contenedorObras");
    return;
  }

  contenedor.innerHTML = "";

  if (!listaObras || listaObras.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center text-white py-5">
        <p class="fs-5">No se encontraron obras.</p>
      </div>`;
    return;
  }

  listaObras.forEach((obra) => {
    const funcionesObra = DB.funciones.filter(
      (f) => Number(f.contenidoId) === Number(obra.id) && f.tipo === "teatro"
    );

    let botonesHorarios = "";
    if (funcionesObra.length > 0) {
      botonesHorarios = funcionesObra.map((f) => {
        return `<a href="funciones.html?id=${obra.id}&tipo=teatro" class="btn btn-outline-danger btn-sm">${f.hora}</a>`;
      }).join("");
    } else {
      botonesHorarios = `<span class="text-secondary small">Sin funciones disponibles</span>`;
    }

    const colorBadge = obtenerColorClasificacion(obra.clasificacion);

    const tarjeta = `
      <div class="card bg-black border-secondary overflow-hidden">
        <div class="row g-0 align-items-center">
          <div class="col-12 col-md-4 col-lg-3">
            <img src="${obra.imagen}" alt="${obra.titulo}" class="img-fluid w-100" style="height: 230px; object-fit: cover;">
          </div>
          <div class="col-12 col-md-8 col-lg-9">
            <div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
              <div>
                <span class="badge ${colorBadge} mb-2">${obra.clasificacion}</span>
                <span class="badge bg-secondary mb-2 ms-1">${obra.genero}</span>
                <h3 class="card-title fw-bold mb-1">${obra.titulo}</h3>
                <p class="text-secondary small mb-2">
                  <i class="bi bi-clock me-1"></i>${obra.duracion}
                </p>
                <p class="card-text text-light opacity-75 small mb-0" style="max-width: 520px;">
                  ${obra.sinopsis}
                </p>
              </div>
              <div class="text-lg-end">
                <span class="d-block text-secondary small mb-2 fw-semibold">Horarios disponibles:</span>
                <div class="d-flex flex-wrap gap-2 justify-content-lg-end mb-3">
                  ${botonesHorarios}
                </div>
                <a href="detalle.html?id=${obra.id}&tipo=teatro" class="btn btn-danger btn-sm">Ver detalle</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjeta;
  });
}

function aplicarFiltros() {
  const texto = document.getElementById("inputBuscador")?.value.toLowerCase().trim() || "";
  const genero = document.getElementById("selectGenero")?.value || "";
  const clasificacion = document.getElementById("selectClasificacion")?.value || "";

  const resultados = DB.obras.filter((obra) => {
    const coincideTexto = obra.titulo.toLowerCase().includes(texto) || obra.sinopsis.toLowerCase().includes(texto);
    const coincideGenero = genero === "" || obra.genero.toLowerCase().includes(genero.toLowerCase());
    const coincideClasificacion = clasificacion === "" || obra.clasificacion === clasificacion;
    return coincideTexto && coincideGenero && coincideClasificacion;
  });

  mostrarObras(resultados);
}