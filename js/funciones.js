document.addEventListener("DOMContentLoaded", () => {
    cargarFunciones();
    configurarEventosFecha();
});

// Funcion que sirve para cargar el contenido de las funciones

function cargarFunciones() {
    const contenedor = document.getElementById("contenedorFunciones");
    if (!contenedor) return;
        
    contenedor.innerHTML = "";

    // Combinar peliculas y obras para listar todas las funciones activas 
    const todoElContenido = [
        DB.peliculas.map(item => ({ item, tipo: "cine" })),
        DB.obras.map(item => ({ item, tipo: "teatro"}))
    ];

    todoElContenido.forEach(item => {
        const horarios = item.horarios || ["18:00 hrs", "20:30 hrs", "22:15 hrs"];
        const botonesHorarios = horarios.map(hora = >
            `<a href="butacas.html?id=${item.id}&tipo=${item.tipo}&hora=${encodeURIComponent(hora)}" class="btn btn-outline-danger btn-sm">${hora}</a>`
        ).join(" ");

        contenedor.innerHTML += `
            <div class="card bg-black text-light border-secondary shadow rounded-3 overflow-hidden">
                <div class="row g-0 align-items-center">
                    <div class="col-12 col-md-3">
                        <img src="${item.imagen}" class="img-fluid w-100 h-100 object-fit-cover" style="max-height: 220px;" alt="${item.titulo}">
                    </div>
                    <div class="col-12 col-md-9">
                        <div class="card-body d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                            <div>
                                <span class="badge bg-danger mb-2">${item.genero}</span>
                                <h3 class="fw-bold mb-1">${item.titulo}</h3>
                                <p class="text-secondary small mb-1"><i class="bi bi-clock me-1"></i>${item.duracion || '120 min'}</p>
                                <p class="small opacity-75 mb-0">${item.sinopsis.substring(0, 100)}...</p>
                            </div>
                            <div class="text-lg-end">
                                <span class="d-block text-secondary small mb-2 fw-semibold">Horarios Disponibles:</span>
                                <div class="d-flex flex-wrap gap-2 justify-content-lg-end">${botonesHorarios}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Funcion que sirve para configurar las fechas
function configurarEventosFecha() {
    const botones = document.querySelectorAll(".btn-fecha");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.classList.replace("btn-outline-secondary", "btn-danger");
            cargarFunciones();
        })
    })
}