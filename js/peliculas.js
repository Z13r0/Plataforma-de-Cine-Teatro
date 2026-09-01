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

        // Estructura de la Card con clases de Bootstrap Grid para responsive design
        const cardHTML = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 bg-secondary text-white border-0 shadow-sm">
                    <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}" style="height: 300px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-danger mb-2 w-auto align-self-start">${pelicula.genero}</span>
                        <h5 class="card-title h6 fw-bold">${pelicula.titulo}</h5>
                        
                        <!-- Puntuación y Botón/Badge de Edad -->
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <span class="small">⭐ ${pelicula.valoracion}</span>
                            <span class="badge ${colorBadge}">${pelicula.clasificacion}</span>
                        </div>

                        <p class="card-text text-light small flex-grow-1">${pelicula.sinopsis.substring(0, 70)}...</p>
                        <a href="detalle.html?id=${pelicula.id}&tipo=cine" class="btn btn-outline-light btn-sm mt-auto w-100">Ver Funciones</a>
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