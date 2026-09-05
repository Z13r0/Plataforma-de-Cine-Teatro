// Esperamos a que todo el HTML termine de cargarse
document.addEventListener("DOMContentLoaded", () => {

    // Cargamos todas las funciones al entrar a la página
    cargarFunciones();

    // Activamos los botones para cambiar de fecha
    configurarEventosFecha();
});


// ======================================================
// FUNCIÓN: cargarFunciones
// ======================================================
// Esta función obtiene las funciones desde DB.funciones
// y las muestra en la página.
// ======================================================

function cargarFunciones(fechaSeleccionada = "") {

    // Buscamos el contenedor donde mostraremos las funciones
    const contenedor = document.getElementById("contenedorFunciones");

    // Si no existe, detenemos la función
    if (!contenedor) {
        return;
    }

    // Limpiamos el contenido anterior
    contenedor.innerHTML = "";


    // ==================================================
    // FILTRAR FUNCIONES
    // ==================================================

    const funciones = DB.funciones.filter(funcion => {

        // Si no se seleccionó ninguna fecha,
        // mostramos todas las funciones
        if (fechaSeleccionada === "") {
            return true;
        }

        // Si hay una fecha seleccionada,
        // mostramos solo las funciones de ese día
        return funcion.fecha === fechaSeleccionada;
    });


    // ==================================================
    // SI NO HAY FUNCIONES
    // ==================================================

    if (funciones.length === 0) {

        contenedor.innerHTML = `
            <div class="alert alert-warning text-center">
                No hay funciones disponibles para esta fecha.
            </div>
        `;

        return;
    }


    // ==================================================
    // MOSTRAR LAS FUNCIONES
    // ==================================================

    funciones.forEach(funcion => {

        // Dependiendo del tipo de contenido,
        // buscamos en películas o en obras
        const lista = funcion.tipo === "teatro"
            ? DB.obras
            : DB.peliculas;


        // Buscamos la película u obra correspondiente
        const contenido = lista.find(
            item => item.id === funcion.contenidoId
        );


        // Buscamos la sala correspondiente
        const sala = DB.salas.find(
            item => item.id === funcion.salaId
        );


        // Si falta algún dato, no mostramos esta función
        if (!contenido || !sala) {
            return;
        }


        // ==================================================
        // CREAR TARJETA
        // ==================================================

        contenedor.innerHTML += `

            <div class="card bg-black text-light border-secondary shadow rounded-3 overflow-hidden mb-4">

                <div class="row g-0 align-items-center">

                    <!-- Imagen -->
                    <div class="col-12 col-md-3">

                        <img
                            src="${contenido.imagen}"
                            class="img-fluid w-100"
                            style="height:220px; object-fit:cover;"
                            alt="${contenido.titulo}"
                        >

                    </div>


                    <!-- Información -->
                    <div class="col-12 col-md-9">

                        <div class="card-body">

                            <span class="badge bg-danger mb-2">
                                ${contenido.genero}
                            </span>

                            <h3 class="fw-bold">
                                ${contenido.titulo}
                            </h3>

                            <p class="text-secondary mb-1">
                                <i class="bi bi-building"></i>
                                ${sala.nombre}
                            </p>

                            <p class="text-secondary mb-3">

                                <i class="bi bi-calendar"></i>

                                ${funcion.fecha}

                                <span class="mx-2">|</span>

                                <i class="bi bi-clock"></i>

                                ${funcion.hora}

                            </p>


                            <!-- Botón que lleva a las butacas -->
                            <a
                                href="butacas.html?id=${funcion.contenidoId}&tipo=${funcion.tipo}&funcionId=${funcion.id}"
                                class="btn btn-danger"
                            >

                                <i class="bi bi-ticket-perforated"></i>

                                Seleccionar función

                            </a>

                        </div>

                    </div>

                </div>

            </div>
        `;
    });
}


// ======================================================
// FUNCIÓN: configurarEventosFecha
// ======================================================
// Añade un evento CLICK a cada botón de fecha.
// ======================================================

function configurarEventosFecha() {

    // Obtenemos todos los botones que tengan
    // la clase .btn-fecha
    const botones = document.querySelectorAll(".btn-fecha");


    // Recorremos cada botón
    botones.forEach(btn => {

        // Cuando hacemos click...
        btn.addEventListener("click", () => {


            // Quitamos el color rojo de todos
            botones.forEach(boton => {

                boton.classList.remove("btn-danger");

                boton.classList.add("btn-outline-secondary");

            });


            // Ponemos en rojo el botón seleccionado
            btn.classList.remove("btn-outline-secondary");

            btn.classList.add("btn-danger");


            // Obtenemos la fecha almacenada
            // en data-fecha
            const fecha = btn.dataset.fecha;


            // Recargamos las funciones usando esa fecha
            cargarFunciones(fecha);

        });

    });
}