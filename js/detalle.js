document.addEventListener("DOMContentLoaded", () =>{

    // Obten los datos del url
    // URLSearchParams permite leer parámetros de la URL.

    // Ejemplo:
    // detalle.html?id=1&tipo=cine
    const params = new URLSearchParams(window.location.search);

    // Se obtiene el ID
    const id = parseInt(params.get(id));

    // Se obtiene el tipo
    const tipo = params.get("tipo");

    // Buscar el contenido según la BD
    const lista = tipo === "teatro" 
        ? DB.obras 
        : DB.peliculas;

    // Busca un elemento a tráves del ID
    const contenido = lista.find(item => item.id === id);

    // Se obtiene el contenedor HTML
    const contenedor = document.getElementById("contenedorDetalle");

    // En caso de no encontrarlo
    if (!contenido) {
        contenedor.innerHTML = `

            <div class="alert alert-danger">

                No se encontró la película u obra.

            </div>

        `;
        return;
    } 

    // Muestra la información
    contenedor.innerHTML = `

        <div class="row g-4">


            <!-- ==========================================
                 IMAGEN
                 ========================================== -->

            <div class="col-12 col-md-5">

                <img
                    src="${contenido.imagen}"
                    class="img-fluid rounded shadow"
                    alt="${contenido.titulo}"
                >

            </div>


            <!-- ==========================================
                 INFORMACIÓN
                 ========================================== -->

            <div class="col-12 col-md-7">


                <!-- Tipo -->
                <span class="badge bg-danger mb-3">

                    ${tipo === "teatro"
                        ? "TEATRO"
                        : "CINE"}

                </span>


                <!-- Título -->
                <h1 class="fw-bold">

                    ${contenido.titulo}

                </h1>


                <!-- Valoración -->
                <p class="text-warning fs-5">

                    ★ ${contenido.valoracion}

                </p>


                <!-- Género -->
                <p class="text-secondary">

                    ${contenido.genero}

                </p>


                <!-- Sinopsis -->
                <p>

                    ${contenido.sinopsis}

                </p>


                <hr>


                <!-- Duración -->
                <p>

                    <strong>Duración:</strong>

                    ${contenido.duracion}

                </p>


                <!-- Clasificación -->
                <p>

                    <strong>Clasificación:</strong>

                    ${contenido.clasificacion}

                </p>


                <!-- Director -->
                <p>

                    <strong>Director:</strong>

                    ${contenido.director}

                </p>


                <!-- Reparto -->
                <p>

                    <strong>Reparto:</strong>

                    ${contenido.reparto}

                </p>


                <!-- Ir a funciones -->
                <a
                    href="funciones.html"
                    class="btn btn-danger btn-lg mt-3"
                >

                    <i class="bi bi-calendar-event"></i>

                    Ver funciones

                </a>

            </div>

        </div>
    `;


})