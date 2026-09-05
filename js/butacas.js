document.addEventListener("DOMContentLoaded", () => {

    // Obtener Datos url
    const params =
        new URLSearchParams(window.location.search);


    // ID de la película u obra
    const id =
        parseInt(params.get("id"));


    // Tipo: cine o teatro
    const tipo =
        params.get("tipo");


    // ID de la función
    const funcionId =
        parseInt(params.get("funcionId"));

    
    // Se busca el contenido
    const lista =
        tipo === "teatro"
            ? DB.obras
            : DB.peliculas;


    const contenido =
        lista.find(item => item.id === id);

    // Busca la funcion del ID
    const funcion = DB.funciones.find(item => item.id === funcionId);

    // Busca la sala
    let sala = null;

    if (funcion) {
        sala = DB.salas.find(item => item.id === funcion.salaId);
    }


    // Se validan los datos
    if (!contenido || !funcion || !sala) {
        alert("No se encontro la función.")
        return;
    }

    // Permite ver la información
    document.getElementById("tituloSeleccion").textContent = contenido.titulo;

    document.getElementById("detallesFuncion").textContent = `${funcion.fecha} | ${funcion.hora} | ${sala.nombre}`;

    // Contenedor Butacas
    const contenedor =document.getElementById("contenedorButacas");

    // Array para butacas ocupadas
    const asientosSeleccionados = [];

    // Permite crear las butacas
    const capacidad =
        sala.capacidad;


    // Recorremos desde 1 hasta la capacidad.

    for (let i = 1; i <= capacidad; i++) {


        // Creamos un botón HTML
        const boton =
            document.createElement("button");


        // Le asignamos clases Bootstrap
        boton.className =
            "btn btn-outline-light";


        // El número será el texto del botón
        boton.textContent =
            i;


        // Tamaño del botón
        boton.style.width =
            "50px";

        // Click

        boton.addEventListener("click", () => {

            // Verificacion si existe
            const indice = asientosSeleccionados.indexOf(i);

            // Seleccion de butaca
            if (indice === -1) {


                // Agregamos el número al array
                asientosSeleccionados.push(i);


                // Cambiamos el color
                boton.classList.remove(
                    "btn-outline-light"
                );


                boton.classList.add(
                    "btn-danger"
                );


            } else {

                // Deseleccionar la butaca
                // Eliminamos el asiento
                asientosSeleccionados.splice(
                    indice,
                    1
                );


                // Restauramos el estilo
                boton.classList.remove(
                    "btn-danger"
                );


                boton.classList.add(
                    "btn-outline-light"
                );

            }
            // Actualizamos cantidad y precio
            actualizarResumen();

        });
    }
    contenedor.appendChild(boton);

})


// Funcion para actualizar el resumen
function actualizarResumen() {


        // Mostramos cantidad
        document
            .getElementById("cantidadSeleccionadas")
            .textContent =
            asientosSeleccionados.length;


        // Calculamos el total
        const total =
            asientosSeleccionados.length *
            sala.precioBase;


        // Mostramos el total
        document
            .getElementById("total")
            .textContent =
            total.toLocaleString("es-CL");

}

// Continuar
document
        .getElementById("btnContinuar")
        .addEventListener("click", () => {


            // No permitimos continuar
            // sin seleccionar butacas.

            if (
                asientosSeleccionados.length === 0
            ) {

                alert(
                    "Debes seleccionar al menos una butaca."
                );

                return;

            }


            // Calculamos total
            const total =
                asientosSeleccionados.length *
                sala.precioBase;

            // URL Compra
            const url =
                `compra.html?id=${id}` +
                `&tipo=${tipo}` +
                `&funcionId=${funcionId}` +
                `&hora=${encodeURIComponent(funcion.hora)}` +
                `&asientos=${asientosSeleccionados.join(",")}` +
                `&total=${total}`;


            // Redirigimos a compra.html
            window.location.href =
                url;

        });
