// Archivo: js/peliculas.js
// Versión corregida - Formato cartelera

document.addEventListener("DOMContentLoaded", () => {
  // Mostramos todas las películas al cargar la página
  mostrarPeliculas();

  // Activamos los filtros
  const inputBuscador = document.getElementById("inputBuscador");
  const selectGenero = document.getElementById("selectGenero");
  const selectClasificacion = document.getElementById("selectClasificacion");

  if (inputBuscador) inputBuscador.addEventListener("input", aplicarFiltros);
  if (selectGenero) selectGenero.addEventListener("change", aplicarFiltros);
  if (selectClasificacion) selectClasificacion.addEventListener("change", aplicarFiltros);
});

// Devuelve el color del badge según la clasificación
function obtenerColorClasificacion(clasificacion) {
  switch (clasificacion) {
    case "TE":
      return "bg-success";
    case "TE+7":
      return "bg-info text-dark";
    case "+14":
      return "bg-warning text-dark";
    case "+18":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

// Dibuja las películas en formato cartelera
function mostrarPeliculas(listaPeliculas = DB.peliculas) {
  const contenedor = document.getElementById("contenedorPeliculas");

  // Si no existe el contenedor, salimos
  if (!contenedor) {
    console.error("No se encontró el contenedor #contenedorPeliculas");
    return;
  }

  // Limpiamos el contenedor
  contenedor.innerHTML = "";

  // Si no hay películas
  if (!listaPeliculas || listaPeliculas.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center text-white py-5">
        <p class="fs-5">No se encontraron películas que coincidan con la búsqueda.</p>
      </div>`;
    return;
  }

  // Recorremos cada película
  listaPeliculas.forEach((pelicula) => {
    // Buscamos las funciones de esta película
    const funcionesPelicula = DB.funciones.filter(
      (funcion) =>
        Number(funcion.contenidoId) === Number(pelicula.id) &&
        funcion.tipo === "cine"
    );

    // Creamos los botones de horario
    let botonesHorarios = "";
    if (funcionesPelicula.length > 0) {
      botonesHorarios = funcionesPelicula
        .map((funcion) => {
          return `
            <a href="funciones.html?id=${pelicula.id}&tipo=cine" 
               class="btn btn-outline-danger btn-sm">
              ${funcion.hora}
            </a>`;
        })
        .join("");
    } else {
      botonesHorarios = `<span class="text-secondary small">Sin funciones disponibles</span>`;
    }

    // Color del badge
    const colorBadge = obtenerColorClasificacion(pelicula.clasificacion);

    // Creamos la tarjeta en formato cartelera
    const tarjeta = `
      <div class="card bg-black border-secondary overflow-hidden">
        <div class="row g-0 align-items-center">
          
          <!-- Imagen -->
          <div class="col-12 col-md-4 col-lg-3">
            <img src="${pelicula.imagen}" 
                 alt="${pelicula.titulo}"
                 class="img-fluid w-100"
                 style="height: 230px; object-fit: cover;">
          </div>

          <!-- Información -->
          <div class="col-12 col-md-8 col-lg-9">
            <div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
              
              <div>
                <span class="badge ${colorBadge} mb-2">${pelicula.clasificacion}</span>
                <span class="badge bg-secondary mb-2 ms-1">${pelicula.genero}</span>
                
                <h3 class="card-title fw-bold mb-1">${pelicula.titulo}</h3>
                
                <p class="text-secondary small mb-2">
                  <i class="bi bi-clock me-1"></i>${pelicula.duracion}
                </p>
                
                <p class="card-text text-light opacity-75 small mb-0" style="max-width: 520px;">
                  ${pelicula.sinopsis}
                </p>
              </div>

              <!-- Horarios + Botón detalle -->
              <div class="text-lg-end">
                <span class="d-block text-secondary small mb-2 fw-semibold">Horarios disponibles:</span>
                <div class="d-flex flex-wrap gap-2 justify-content-lg-end mb-3">
                  ${botonesHorarios}
                </div>
                
                <a href="detalle.html?id=${pelicula.id}&tipo=cine" class="btn btn-danger btn-sm">
                  Ver detalle
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;

    // Agregamos la tarjeta al contenedor
    contenedor.innerHTML += tarjeta;
  });
}

// Función de filtros
function aplicarFiltros() {
  const texto = document.getElementById("inputBuscador")?.value.toLowerCase().trim() || "";
  const genero = document.getElementById("selectGenero")?.value || "";
  const clasificacion = document.getElementById("selectClasificacion")?.value || "";

  const resultados = DB.peliculas.filter((pelicula) => {
    const coincideTexto =
      pelicula.titulo.toLowerCase().includes(texto) ||
      pelicula.sinopsis.toLowerCase().includes(texto);

    const coincideGenero =
      genero === "" || pelicula.genero.toLowerCase().includes(genero.toLowerCase());

    const coincideClasificacion =
      clasificacion === "" || pelicula.clasificacion === clasificacion;

    return coincideTexto && coincideGenero && coincideClasificacion;
  });

  mostrarPeliculas(resultados);
}