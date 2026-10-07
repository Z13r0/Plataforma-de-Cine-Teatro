document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const tipo = params.get("tipo");
  const funcionId = parseInt(params.get("funcionId"));

  const lista = tipo === "teatro" ? DB.obras : DB.peliculas;
  const contenido = lista.find(i => i.id === id);
  const funcion = DB.funciones.find(i => i.id === funcionId);
  const sala = funcion ? DB.salas.find(s => s.id === funcion.salaId) : null;

  if (!contenido || !funcion || !sala) {
    alert("No se encontró la función.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("tituloSeleccion").textContent = contenido.titulo;
  document.getElementById("detallesFuncion").textContent =
    `${funcion.fecha} · ${funcion.hora} · ${sala.nombre}`;

  const precio = sala.precioBase;
  const asientosSeleccionados = [];
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columnas = 10;
  const ocupadas = [3, 7, 12, 18, 25, 33, 41, 48];

  const contenedor = document.getElementById("contenedorButacas");
  contenedor.innerHTML = "";

  for (let f = 0; f < letras.length; f++) {
    const filaDiv = document.createElement("div");
    filaDiv.className = "d-flex align-items-center gap-1 mb-1 justify-content-center";

    const letra = document.createElement("span");
    letra.className = "text-secondary fw-bold me-2";
    letra.style.width = "18px";
    letra.textContent = letras[f];
    filaDiv.appendChild(letra);

    for (let c = 1; c <= columnas; c++) {
      const codigo = letras[f] + c;
      const num = f * columnas + c;
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "btn btn-sm butaca";
      boton.style.width = "36px";
      boton.style.height = "36px";
      boton.style.fontSize = "11px";
      boton.textContent = c;
      boton.dataset.codigo = codigo;

      if (ocupadas.includes(num)) {
        boton.classList.add("btn-secondary");
        boton.disabled = true;
      } else {
        boton.classList.add("btn-outline-light");
        boton.addEventListener("click", () => {
          const idx = asientosSeleccionados.indexOf(codigo);
          if (idx === -1) {
            asientosSeleccionados.push(codigo);
            boton.classList.remove("btn-outline-light");
            boton.classList.add("btn-danger");
          } else {
            asientosSeleccionados.splice(idx, 1);
            boton.classList.remove("btn-danger");
            boton.classList.add("btn-outline-light");
          }
          actualizar();
        });
      }
      filaDiv.appendChild(boton);
    }
    contenedor.appendChild(filaDiv);
  }

  function actualizar() {
    document.getElementById("cantidadSeleccionadas").textContent = asientosSeleccionados.length;
    const totalEntradas = asientosSeleccionados.length * precio;
    const cargo = (DB.cargoServicio || 700) * asientosSeleccionados.length;
    document.getElementById("total").textContent = (totalEntradas + cargo).toLocaleString("es-CL");

    // Actualizar carrito en vivo
    const cart = Carrito.get();
    cart.butacas = [...asientosSeleccionados];
    cart.entradas = [{
      nombre: "General",
      cantidad: asientosSeleccionados.length,
      precio: precio
    }];
    cart.cargoServicio = cargo;
    Carrito.save(cart);
    if (typeof Carrito.renderSidebar === "function") Carrito.renderSidebar();
  }

  document.getElementById("btnContinuar").addEventListener("click", () => {
    if (asientosSeleccionados.length === 0) {
      alert("Selecciona al menos una butaca.");
      return;
    }
    // Ir a confitería
    window.location.href = "confiteria.html";
  });

  // Sidebar si existe
  if (document.getElementById("resumenSidebar")) Carrito.renderSidebar();
});