document.addEventListener("DOMContentLoaded", () =>{
    cargarSelectContenidos();
    mostrarComentario();

    const form = document.getElementById("formComentario");
    if (form) {
        form.addEventListener("submit", guardarComentario);
    }
});

// Llena el select con peliculas y obras de la pagina
function cargarSelectContenidos() {
    const select = document.getElementById("contenidoSeleccionado");
    if (!select) return;

    // Agregamos las pelis al select
    DB.peliculas.forEach((peli) => {
        const option = document.createElement("option");
        option.value = `cine-${peli.id}`;
        option.textContent = `🎬 ${peli.titulo}`;
        select.appendChild(option);
    });


    // Agregamos las obras
    DB.obras.forEach((obra) => {
        const option = document.createElement("option");
        option.value = `teatro-${obra.id}`;
        option.textContent = `🎭 ${obra.titulo}`;
        select.appendChild(option);
    });    
}

// Funcion que guarda un nuevo comentario
function guardarComentario(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const contenido = document.getElementById("contenidoSeleccionado").value;
    const valoracion = document.getElementById("valoracion").value;
    const texto = document.getElementById("textoComentario").value.trim();

    if (!nombre || !contenido || !texto) {
        alert("Por favor completa todos los campos..")
        return;
    }

    // Creamos el objeto del comentario
    const comentario = {
        id: Date.now(),
        nombre: nombre,
        contenido: contenido,
        valoracion: Number(valoracion),
        texto: texto,
        fecha: new Date().toLocaleString("es-CL")
    };

        // Recuperamos comentarios anteriores
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    // Agregamos el nuevo al principio
    comentarios.unshift(comentario);

    // Guardamos de nuevo
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    // Limpiamos el formulario
    document.getElementById("formComentario").reset();

    // Actualizamos la lista
    mostrarComentarios();

    alert("¡Comentario publicado correctamente!");   
}

// Funcion que muestra los comentarios
function mostrarComentarios() {
  const contenedor = document.getElementById("listaComentarios");
  if (!contenedor) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  if (comentarios.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-secondary text-center">
        Todavía no hay comentarios. ¡Sé el primero en opinar!
      </div>`;
    return;
  }
  contenedor.innerHTML = "";

  comentarios.forEach((com) => {
    // Generamos las estrellas
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
      estrellas += i <= com.valoracion
        ? `<i class="bi bi-star-fill text-warning"></i>`
        : `<i class="bi bi-star text-secondary"></i>`;
    }

    // Nombre del contenido
    const [tipo, id] = com.contenido.split("-");
    let tituloContenido = "Contenido";
    if (tipo === "cine") {
      const peli = DB.peliculas.find(p => p.id === Number(id));
      tituloContenido = peli ? peli.titulo : "Película";
    } else {
      const obra = DB.obras.find(o => o.id === Number(id));
      tituloContenido = obra ? obra.titulo : "Obra";
    }

    const tarjeta = `
      <div class="card bg-black border-secondary">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 class="mb-0 text-danger">${com.nombre}</h6>
              <small class="text-secondary">${tituloContenido}</small>
            </div>
            <div class="text-end">
              <div>${estrellas}</div>
              <small class="text-secondary">${com.fecha}</small>
            </div>
          </div>
          <p class="mb-0">${com.texto}</p>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjeta;
  });
}