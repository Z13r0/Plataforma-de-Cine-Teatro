document.addEventListener("DOMContentLoaded", () =>{

    // Se llama al contenedor
    const contenedor =
        document.getElementById(
            "contenedorEntradas"
        );

    // Se recuperan las compras a tráves del LocalStorage
    // Buscamos el historial guardado
    // en LocalStorage.

    const historial =
        JSON.parse(
            localStorage.getItem(
                "historialCompras"
            )
        ) || [];

    // Ticket es leido por el url
    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("ticketId");

    // Si no existe
    if (historial.length === 0) {
        contenedor.innerHTML = `

            <div class="alert alert-info">

                No tienes entradas todavía.

            </div>

        `;

        return;
    }

    // Se filtran las entradas
    const entradas = ticketId
        ? historial.filter(ticket => ticket.idTicket === ticketId)
        : historial;

    
    // Permite ver las entradas
    entradas.forEach(ticket => {


        contenedor.innerHTML += `

            <div class="card bg-black text-light border-secondary mb-4">


                <div class="card-body">


                    <!-- Título -->

                    <div
                        class="d-flex justify-content-between"
                    >

                        <h3 class="text-danger">

                            ${ticket.titulo}

                        </h3>


                        <span class="badge bg-success">

                            CONFIRMADA

                        </span>

                    </div>


                    <hr>


                    <!-- ID -->

                    <p>

                        <strong>Ticket:</strong>

                        ${ticket.idTicket}

                    </p>


                    <!-- Fecha -->

                    <p>

                        <strong>Fecha:</strong>

                        ${ticket.fecha}

                    </p>


                    <!-- Hora -->

                    <p>

                        <strong>Hora:</strong>

                        ${ticket.hora}

                    </p>


                    <!-- Sala -->

                    <p>

                        <strong>Sala:</strong>

                        ${ticket.sala}

                    </p>


                    <!-- Butacas -->

                    <p>

                        <strong>Butacas:</strong>

                        ${ticket.asientos.join(", ")}

                    </p>


                    <!-- Cantidad -->

                    <p>

                        <strong>Cantidad:</strong>

                        ${ticket.cantidad}

                    </p>


                    <!-- Total -->

                    <p class="fs-4 text-success">

                        <strong>

                            $${ticket.total.toLocaleString("es-CL")}

                        </strong>

                    </p>


                    <!-- ==================================
                         QR DEMOSTRATIVO
                         ================================== -->

                    <div class="text-center mt-4">

                        <div
                            class="border border-secondary p-4 mx-auto"
                            style="max-width:220px;"
                        >

                            <i
                                class="bi bi-qr-code fs-1"
                            ></i>


                            <p
                                class="small text-secondary mt-2"
                            >

                                QR DEMOSTRATIVO

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

})