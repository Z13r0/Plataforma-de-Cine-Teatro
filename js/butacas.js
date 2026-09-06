document.addEventListener("DOMContentLoaded", () => {
  // Obtener Datos de la URL
  const params = new URLSearchParams(window.location.search);

  // ID de la película u obra
  const id = parseInt(params.get("id"));

  // Tipo: cine o teatro
  const tipo = params.get("tipo");

  // ID de la función
  const funcionId = parseInt(params.get("funcionId"));

  // Se busca el contenido
  const lista = tipo === "teatro" ? DB.obras : DB.peliculas;
  const contenido = lista.find((item) => item.id === id);

  // Busca la función por ID
  const funcion = DB.funciones.find((item) => item.id === funcionId);

  // Busca la sala
  let sala = null;
  if (funcion) {
    sala = DB.salas.find((item) => item.id === funcion.salaId);
  }

  // Validaciones
  if (!contenido || !funcion || !sala) {
    alert("No se encontró la función.");
    return;
  }

  // Mostrar información básica
  document.getElementById("tituloSeleccion").textContent = contenido.titulo;
  document.getElementById("detallesFuncion").textContent = `${funcion.fecha} | ${funcion.hora} | ${sala.nombre}`;

  // Contenedor de Butacas
  const contenedor = document.getElementById("contenedorButacas");

  // Array para almacenar los asientos seleccionados
  const asientosSeleccionados = [];

  // Crear las butacas según la capacidad de la sala
  const capacidad = sala.capacidad;

  for (let i = 1; i <= capacidad; i++) {
    // Crear el botón HTML
    const boton = document.createElement("button");
    boton.className = "btn btn-outline-light";
    boton.textContent = i;
    boton.style.width = "50px";

    // Evento Click para seleccionar/deseleccionar
    boton.addEventListener("click", () => {
      const indice = asientosSeleccionados.indexOf(i);

      if (indice === -1) {
        // Seleccionar
        asientosSeleccionados.push(i);
        boton.classList.remove("btn-outline-light");
        boton.classList.add("btn-danger");
      } else {
        // Deseleccionar
        asientosSeleccionados.splice(indice, 1);
        boton.classList.remove("btn-danger");
        boton.classList.add("btn-outline-light");
      }

      // Actualizar información en pantalla
      actualizarResumen();
    });

    // Agregar el botón al contenedor (Dentro del bucle)
    contenedor.appendChild(boton);
  }

  // Función para actualizar la cantidad y el total
  function actualizarResumen() {
    const cantidadEl = document.getElementById("cantidadSeleccionadas");
    const totalEl = document.getElementById("total");

    if (cantidadEl) {
      cantidadEl.textContent = asientosSeleccionados.length;
    }

    const total = asientosSeleccionados.length * sala.precioBase;

    if (totalEl) {
      totalEl.textContent = total.toLocaleString("es-CL");
    }
  }

  // Evento para el botón Continuar
  const btnContinuar = document.getElementById("btnContinuar");
  if (btnContinuar) {
    btnContinuar.addEventListener("click", () => {
      if (asientosSeleccionados.length === 0) {
        alert("Debes seleccionar al menos una butaca.");
        return;
      }

      const total = asientosSeleccionados.length * sala.precioBase;

      // Generar URL hacia la página de compra
      const url =
        `compra.html?id=${id}` +
        `&tipo=${tipo}` +
        `&funcionId=${funcionId}` +
        `&hora=${encodeURIComponent(funcion.hora)}` +
        `&asientos=${asientosSeleccionados.join(",")}` +
        `&total=${total}`;

      window.location.href = url;
    });
  }
});