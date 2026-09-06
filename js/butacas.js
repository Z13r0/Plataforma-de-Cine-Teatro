// Archivo: js/butacas.js
// Lógica de selección de butacas mejorada

document.addEventListener("DOMContentLoaded", () => {

  // 1. Obtenemos los datos que vienen por la URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const tipo = params.get("tipo");                 // "cine" o "teatro"
  const funcionId = parseInt(params.get("funcionId"));

  // 2. Buscamos la película u obra
  const lista = tipo === "teatro" ? DB.obras : DB.peliculas;
  const contenido = lista.find(item => item.id === id);

  // 3. Buscamos la función y la sala
  const funcion = DB.funciones.find(item => item.id === funcionId);
  let sala = null;
  if (funcion) {
    sala = DB.salas.find(item => item.id === funcion.salaId);
  }

  // 4. Validación: si falta algún dato, mostramos error
  if (!contenido || !funcion || !sala) {
    alert("No se encontró la función seleccionada.");
    window.location.href = "index.html";
    return;
  }

  // 5. Mostramos el título y detalles en la página
  document.getElementById("tituloSeleccion").textContent = contenido.titulo;
  document.getElementById("detallesFuncion").textContent =
    `Fecha: ${funcion.fecha} | Hora: ${funcion.hora} | Sala: ${sala.nombre}`;

  // 6. Configuración del mapa de butacas
  const filas = 6;                // Cantidad de filas (A, B, C...)
  const columnas = 8;             // Butacas por fila
  const precio = sala.precioBase; // Precio por butaca

  // Array donde guardaremos los números de las butacas seleccionadas
  const asientosSeleccionados = [];

  // 7. Generamos el mapa de butacas
  const contenedor = document.getElementById("contenedorButacas");
  contenedor.innerHTML = ""; // Limpiamos por si acaso

  // Letras de las filas
  const letras = ["A", "B", "C", "D", "E", "F"];

  // Creamos cada fila
  for (let f = 0; f < filas; f++) {
    // Contenedor de la fila
    const filaDiv = document.createElement("div");
    filaDiv.className = "d-flex align-items-center gap-2";

    // Letra de la fila (A, B, C...)
    const letra = document.createElement("span");
    letra.className = "text-secondary fw-bold me-2";
    letra.style.width = "20px";
    letra.textContent = letras[f];
    filaDiv.appendChild(letra);

    // Creamos las butacas de esta fila
    for (let c = 1; c <= columnas; c++) {
      const numeroButaca = f * columnas + c; // Número único de la butaca

      const boton = document.createElement("button");
      boton.className = "btn btn-outline-light btn-sm butaca";
      boton.style.width = "42px";
      boton.style.height = "42px";
      boton.textContent = c; // Mostramos solo el número dentro de la fila
      boton.dataset.numero = numeroButaca; // Guardamos el número real

      // Simulamos algunas butacas ocupadas (para que se vea real)
      const ocupadas = [3, 7, 12, 18, 25, 33]; // Puedes cambiar estos números
      if (ocupadas.includes(numeroButaca)) {
        boton.classList.remove("btn-outline-light");
        boton.classList.add("btn-secondary");
        boton.disabled = true; // No se puede hacer clic
      } else {
        // Evento para seleccionar / deseleccionar
        boton.addEventListener("click", () => {
          const numero = parseInt(boton.dataset.numero);
          const indice = asientosSeleccionados.indexOf(numero);

          if (indice === -1) {
            // Seleccionar
            asientosSeleccionados.push(numero);
            boton.classList.remove("btn-outline-light");
            boton.classList.add("btn-danger");
          } else {
            // Deseleccionar
            asientosSeleccionados.splice(indice, 1);
            boton.classList.remove("btn-danger");
            boton.classList.add("btn-outline-light");
          }

          // Actualizamos el resumen (cantidad y total)
          actualizarResumen();
        });
      }

      filaDiv.appendChild(boton);
    }

    contenedor.appendChild(filaDiv);
  }

  // 8. Función que actualiza la cantidad y el precio total
  function actualizarResumen() {
    document.getElementById("cantidadSeleccionadas").textContent = asientosSeleccionados.length;
    const total = asientosSeleccionados.length * precio;
    document.getElementById("total").textContent = total.toLocaleString("es-CL");
  }

  // 9. Botón Continuar → envía los datos a compra.html
  document.getElementById("btnContinuar").addEventListener("click", () => {
    if (asientosSeleccionados.length === 0) {
      alert("Debes seleccionar al menos una butaca.");
      return;
    }

    const total = asientosSeleccionados.length * precio;

    // Creamos la URL con todos los datos necesarios
    const url = `compra.html?id=${id}&tipo=${tipo}&funcionId=${funcionId}` +
                `&hora=${encodeURIComponent(funcion.hora)}` +
                `&asientos=${asientosSeleccionados.join(",")}` +
                `&total=${total}`;

    window.location.href = url;
  });

});