// Esta funcion espera a que el codigo html de la pagina este completamente cargado y listo antes de encenderse.
document.addEventListener("DOMContentLoaded", () => {
    mostrarPeliculas();

    // Permite capturar elementos de la interfaz
    const inputBuscador = document.getElementById("inputBuscador");
    const selectGenero = document.getElementById("selectGenero");
    const selectClasificacion = document.getElementById("selectClasificacion");

    // Asigna a los 'escuchadores de eventos' para actualizar el catalago en tiempo real
    if (inputBuscador) inputBuscador.addEventListener("input", aplicarFiltros);
    if (selectGenero) selectGenero.addEventListener("change", aplicarFiltros);
    if (selectClasificacion) selectClasificacion.addEventListener("change", aplicarFiltros);

});

// Funcion que permite asignar un color al badge/boton segun la clasificación
function obtenerColorClasificacion(clasificacion) {
    switch (clasificacion) {
        case "TE":
            return "bg-success";    // Color Verde
        case "TE+7":
            return "bg-info text-dark";     // Color Celeste (Categoria +7 años)
        case "+14":
            return "bg-warning text-dark";      // Amarillo (Categoria +14 años)
        case "+18":
            return "bg-danger";     // Rojo (Categoria +18 años)
        default:
            return "bg-secondary";
    }
}

// Funcion encargada de renderizar el catalago dinamico
function mostrarPeliculas(listaPeliculas = DB.peliculas) {
    
    // Nos permite obtener la referencia del contenedor html por su id
    const contenedor = document.getElementById("contenedorPeliculas");

    // Verifica si el contenedor existe dentro de la pagina actual
    if (!contenedor) return;

    // Nos limpia el contenido del contenedor por seguridad
    contenedor.innerHTML = "";

    // Envia un Mensaje en caso de que ningun elemento coincida
    if (listaPeliculas.length === 0) {
        contenedor.innerHTML = `
        <div class="col-12 text-center text-white py-5">
            <p class="fs-5">No se encontraron películas que coincidan con la búsqueda.</p>
        </div>`;
        return;
    }

    // Recorre DB.peliculas
    listaPeliculas.forEach(pelicula => {

        // Se obtiene la clase de colores segun la edad de la pelicula
        const colorBadge = obtenerColorClasificacion(pelicula.clasificacion);

        // Permite renderizar los horarios de las peliculas
        const horarios = pelicula.horarios || ["18:00 hrs", "20:30 hrs", "22:15 hrs"];

        // Renderiza los botones con los horarios de las peliculas
        const botonesHorarios = horarios.map(hora =>
            '<a href="butacas.html?peliculaId=${pelicula.id}$hora=${encodeURIComponent(hora)}" class="btn btn-outline-danger btn-sm">${hora}</a>'
        ).join("");

        // Estructura de la Card con clases de Bootstrap Grid para responsive design
        const cardHTML = `
            <div class="card bg-black text-light border-secondary shadow rounded-3 overflow-hidden mb-4">
                <div class="row g-0 align-items-center">

                <!-- Imagen / Poster de la pelicula -->
                <div class="col12 col-md-4 col-lg-3">
                    <img src= "${pelicula.imagen}" class="img-fluid w-100 h-100 object-fit-cover" alt="${pelicula.titulo}" style="min-height: 220px; max-height: 250px;">
                </div>

                <!-- Información y Horarios de Peliculas -->
                <div class="col-12 col-md-8 col-lg-9">
                    <div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">

                <!-- Detalles Pelicula -->
                <div>
                    <div class="d-flex align-item-center gap-2 mb-2 flex-warp">
                        <span class="badge bg-danger">${pelicula.genero}</span>
                        <span class="badge ${colorBadge}">${pelicula.clasificacion}</span>
                        <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>${pelicula.valoracion}</span>
                    </div>
                    <h3 class="card-title fw-bold mb-1">${pelicula.titulo}</h3>
                    <p class="text-secondary small mb-2">
                        <i class="bi bi-clock me-1""></i>Duración: ${pelicula.duracion || '120 min'} | Sala IMAX
                    </p>
                    <p class="card-text text-light opacity-75 small b-0" style="max-width: 500px;">${pelicula.sinopsis}</p>
                </div>

                <!-- Botones de Horarios Disponibles -->
                <div class="text-lg-end">
                    <span class="d-block text-secondary small mb-2 fw-semibol">Horarios Disponibles:</span>
                        <div class="d-flex flex-warp gap-2 justify-content-lg-end">${botonesHorarios}</div>
                        </div>
                </div> 
            </div>
        </div>
        `;
    
        // Nos agrega la tarjeta al contenedor HTML
        contenedor.innerHTML += cardHTML;
    });
}


// Esta funcion lee los valores ingresados y los filtra en la Base de datos de peliculas (DB.peliculas)

function aplicarFiltros() {
    const texto = document.getElementById("inputBuscador")?.value.toLowerCase().trim() || "";
    const genero = document.getElementById("selectGenero")?.value || "";
    const clasificacion = document.getElementById("selectClasificacion")?.value || "";

    const resultados = DB.peliculas.filter(pelicula => {
        // Filtro x texto en Titulo o Sinopsis
        const coincideTexto = pelicula.titulo.toLowerCase().includes(texto) || pelicula.sinopsis.toLowerCase().includes(texto);

        // Filtro x Genero
        const coincideGenero = genero === "" || pelicula.genero.toLowerCase().includes(genero.toLowerCase());

        // Filtro x Coincidencia
        const coincideClasificacion = clasificacion === "" || pelicula.clasificacion === clasificacion;

        return coincideTexto && coincideGenero && coincideClasificacion;
    })

    // Se vuelve a renderizar la "Grilla" con los resultados filtrados
    mostrarPeliculas(resultados);
}