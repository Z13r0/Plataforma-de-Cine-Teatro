document.addEventListener("DOMContentLoaded", () => {
  mostrarPeliculas();
  document.getElementById("inputBuscador")?.addEventListener("input", aplicarFiltros);
  document.getElementById("selectGenero")?.addEventListener("change", aplicarFiltros);
  document.getElementById("selectClasificacion")?.addEventListener("change", aplicarFiltros);
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

function textoGenero(genero) {
  return Array.isArray(genero) ? genero.join(" / ") : (genero || "");
}

function mostrarPeliculas(lista = DB.peliculas) {
  const contenedor = document.getElementById("contenedorPeliculas");
  if (!contenedor) return;

  // Incluir contenido admin
  const admin = (JSON.parse(localStorage.getItem("contenidoAdmin")) || []).filter(i => i.tipo === "cine");
  const base = lista === DB.peliculas ? [...DB.peliculas, ...admin] : lista;

  contenedor.innerHTML = "";

  if (!base.length) {
    contenedor.innerHTML = `<div class="text-center py-5"><p class="fs-5">No se encontraron películas.</p></div>`;
    return;
  }

  base.forEach((pelicula) => {
    const colorBadge = obtenerColorClasificacion(pelicula.clasificacion);
    const generoTxt = textoGenero(pelicula.genero);

    contenedor.innerHTML += `
      <div class="card border-custom bg-card overflow-hidden card-hover">
        <div class="row g-0 align-items-center">
          <div class="col-12 col-md-4 col-lg-3">
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}"
                 class="img-fluid w-100" style="height:230px;object-fit:cover;">
          </div>
          <div class="col-12 col-md-8 col-lg-9">
            <div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
              <div>
                <span class="badge ${colorBadge} mb-2">${pelicula.clasificacion}</span>
                <span class="badge bg-secondary mb-2 ms-1">${generoTxt}</span>
                <h3 class="card-title fw-bold mb-1">${pelicula.titulo}</h3>
                <p class="text-secondary small mb-2">
                  <i class="bi bi-clock me-1"></i>${pelicula.duracion}
                </p>
                <p class="small opacity-75 mb-0" style="max-width:520px;">${pelicula.sinopsis}</p>
              </div>
              <div class="text-lg-end">
                <a href="detalle.html?id=${pelicula.id}&tipo=cine" class="btn btn-danger">
                  Ver detalle y horarios
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function aplicarFiltros() {
  const texto = document.getElementById("inputBuscador")?.value.toLowerCase().trim() || "";
  const genero = document.getElementById("selectGenero")?.value || "";
  const clasificacion = document.getElementById("selectClasificacion")?.value || "";

  const resultados = DB.peliculas.filter((p) => {
    const generoTxt = textoGenero(p.genero).toLowerCase();
    const coincideTexto =
      p.titulo.toLowerCase().includes(texto) ||
      (p.sinopsis || "").toLowerCase().includes(texto);
    const coincideGenero = genero === "" || generoTxt.includes(genero.toLowerCase());
    const coincideClasificacion = clasificacion === "" || p.clasificacion === clasificacion;
    return coincideTexto && coincideGenero && coincideClasificacion;
  });

  mostrarPeliculas(resultados);
}