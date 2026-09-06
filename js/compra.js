document.addEventListener("DOMContentLoaded", () => {

    // obtener datos
    const params = new URLSearchParams(window.location.search);

    const id =
        parseInt(params.get("id"));


    const tipo =
        params.get("tipo");


    const funcionId =
        parseInt(params.get("funcionId"));


    const hora =
        params.get("hora");


    // Convertimos "1,2,3" en:
    //
    // ["1", "2", "3"]

    const asientos =
        params.get("asientos")
            ? params.get("asientos").split(",")
            : [];


    // Convertimos el total a número
    const total =
        parseInt(params.get("total")) || 0;

    // Buscar contenido
    const lista =
        tipo === "teatro"
            ? DB.obras
            : DB.peliculas;


    const item =
        lista.find(e => e.id === id);

    // Buscar por id
    const funcion =
        DB.funciones.find(
            e => e.id === funcionId
        );

    // Mostrar el resumen 
    const titulo =
        document.getElementById(
            "resumenTitulo"
        );


    if (titulo) {

        titulo.textContent =
            item
                ? item.titulo
                : "Reserva";

    }


    const resumenHora =
        document.getElementById(
            "resumenHora"
        );


    if (resumenHora) {

        resumenHora.textContent =
            hora || "-";

    }


    const resumenAsientos =
        document.getElementById(
            "resumenAsientos"
        );


    if (resumenAsientos) {

        resumenAsientos.textContent =
            asientos.join(", ");

    }


    const resumenTotal =
        document.getElementById(
            "resumenTotal"
        );


    if (resumenTotal) {

        resumenTotal.textContent =
            total.toLocaleString("es-CL");

    }

    // Formulario de la compra
    const form =
        document.getElementById(
            "formCompra"
        );


    // Si el formulario existe...
    if (form) {


        // Esperamos que el usuario
        // presione "Comprar"

        form.addEventListener(
            "submit",
            (e) => {


                // Evitamos que el formulario
                // recargue la página

                e.preventDefault();


                // Creacion de la entrada a la pelicula u obra
                const ticket = {

                    // ID único basado en la hora actual
                    idTicket:
                        "TICK-" + Date.now(),


                    // Nombre de película u obra
                    titulo:
                        item
                            ? item.titulo
                            : "Sin título",


                    // Tipo
                    tipo:
                        tipo,


                    // Función
                    funcionId:
                        funcionId,


                    // Fecha
                    fecha:
                        funcion
                            ? funcion.fecha
                            : "",


                    // Hora
                    hora:
                        hora,


                    // Sala
                    sala:
                        funcion
                            ? funcion.salaId
                            : "",


                    // Butacas
                    asientos:
                        asientos,


                    // Cantidad
                    cantidad:
                        asientos.length,


                    // Precio total
                    total:
                        total,


                    // Nombre del cliente
                    cliente:
                        document.getElementById(
                            "nombreCliente"
                        ).value,


                    // Email
                    email:
                        document.getElementById(
                            "emailCliente"
                        ).value,


                    // Fecha de compra
                    fechaCompra:
                        new Date()
                            .toLocaleDateString(
                                "es-CL"
                            )
                };

                // Se obtiene el historial de compras
                const historial =
                    JSON.parse(
                        localStorage.getItem(
                            "historialCompras"
                        )
                    ) || [];


                // Agregamos la nueva entrada
                historial.push(ticket);

                // Se guarda en un LocalStorage
                localStorage.setItem(
                    "historialCompras",
                    JSON.stringify(historial)
                );


                // Guardamos también
                // la última entrada creada

                localStorage.setItem(
                    "ultimaEntrada",
                    JSON.stringify(ticket)
                );

                window.location.href =
                    `entradas.html?ticketId=${ticket.idTicket}`;

            }
        );

    }

})