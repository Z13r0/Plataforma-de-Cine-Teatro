document.addEventListener("DOMContentLoaded", () => {
  mostrarObras();
  ["inputBuscador", "selectGenero", "selectClasificacion", "selectAnio"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", aplicarFiltros);
    document.getElementById(id)?.addEventListener("change", aplicarFiltros);
  });
});

function textoGenero(g) {
  return Array.isArray(g) ? g.join(" · ") : (g || "");
}

function mostrarObras(lista) {
  const contenedor = document.getElementById("contenedorObras");
  if (!contenedor) return;

  const admin = (JSON.parse(localStorage.getItem("contenidoAdmin")) || []).filter(i => i.tipo === "teatro");
  let base = lista || [...DB.obras.filter(o => o.estado === "cartelera" || !o.estado), ...admin];

  contenedor.innerHTML = "";
  if (!base.length) {
    contenedor.innerHTML = `<div class="col-12 text-center py-5 text-secondary">No se encontraron obras.</div>`;
    return;
  }

  base.forEach(o => {
    const formatos = (o.formatos || []).map(f => `<span class="badge bg-secondary badge-formato me-1">${f}</span>`).join("");
    contenedor.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3">
        <a href="detalle.html?id=${o.id}&tipo=teatro" class="text-decoration-none text-reset">
          <div class="poster-card">
            <img src="${o.imagen}" alt="${o.titulo}" loading="lazy"
                 onerror="this.src='https://placehold.co/300x450/1a1a1a/666?text=Obra'">
            <div class="poster-meta">
              <div class="d-flex justify-content-between align-items-start gap-1 mb-1">
                <h6 class="mb-0 fw-bold text-truncate" title="${o.titulo}">${o.titulo}</h6>
                <span class="badge bg-danger flex-shrink-0">${o.clasificacion}</span>
              </div>
              <p class="small text-secondary mb-1">${o.duracion} · ${o.anio || ""}</p>
              <div class="mb-1">${formatos}</div>
              <p class="small text-secondary mb-0 text-truncate">${textoGenero(o.genero)}</p>
            </div>
          </div>
        </a>
      </div>`;
  });
}

function aplicarFiltros() {
  const texto = document.getElementById("inputBuscador")?.value.toLowerCase().trim() || "";
  const genero = document.getElementById("selectGenero")?.value || "";
  const clasificacion = document.getElementById("selectClasificacion")?.value || "";
  const anio = document.getElementById("selectAnio")?.value || "";

  const resultados = DB.obras.filter(o => {
    if (o.estado === "proximo") return false;
    const g = textoGenero(o.genero).toLowerCase();
    return (
      (o.titulo.toLowerCase().includes(texto) || (o.sinopsis || "").toLowerCase().includes(texto)) &&
      (!genero || g.includes(genero.toLowerCase())) &&
      (!clasificacion || o.clasificacion === clasificacion) &&
      (!anio || String(o.anio) === anio)
    );
  });
  mostrarObras(resultados);
}