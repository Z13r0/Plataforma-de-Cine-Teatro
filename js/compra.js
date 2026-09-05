document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const tipo = params.get("tipo");
    const hora = params.get("hora") || "18:00 hrs";
    const asientos = params.get("asientos") ? params.get("asientos").split(",") : [];
    const total = params.get("total") || "0";

    const lista = (tipo === "teatro") ? DB.obras : DB.peliculas;
    const item = lista.find(e => e.id === id) || { titulo: "Reserva de Entrada" };

    // Renderiza los datos a la vista
    document.getElementById("resumenTitulo").textContent = item.titulo;
    document.getElementById("resumenHora").textContent = hora;
    document.getElementById("resumenAsientos").textContent = asientos.join(", ") || "N/A";
    document.getElementById("resumenTotal").textContent = parseInt(total).toLocaleString();

    // Manejo de confirmación del formulario
    const form = document.getElementById("formCompra");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevaTicket = {
                idTicket: "TICK-" + Math.floor(100000 + Math.random() * 900000),
                titulo: item.titulo,
                tipo: tipo,
                hora: hora,
                asientos: asientos,
                total: parseInt(total),
                cliente: document.getElementById("nombreCliente").value,
                email: document.getElementById("emailCliente").value,
                fechaCompra: new Date().toLocaleDateString("es-CL")
            };

            // Guardar en el Historial de LocalStorage
            const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
            historial.push(nuevaTicket);
            localStorage.setItem("historialCompras", JSON.stringify(historial));

            // Redirigir al comprobante de entradas
            window.location.href = `entradas.html?ticketId=${nuevaTicket.idTicket}`;
        });
    }
});