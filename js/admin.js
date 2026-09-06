// ======================================================
// js/admin.js
// Panel de Administración
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  // Verificar que el usuario sea administrador
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  
  if (!usuarioActual || usuarioActual.rol !== "admin") {
    alert("Acceso denegado. Solo administradores.");
    window.location.href = "index.html";
    return;
  }

  // Inicializar
  cargarSelects();
  actualizarContadores();
  mostrarContenidoAdmin();
  mostrarFuncionesAdmin();
  mostrarCompras();

  // Eventos de los formularios
  document.getElementById("formContenido")?.addEventListener("submit", agregarContenido);
  document.getElementById("formFuncion")?.addEventListener("submit", agregarFuncion);
});

// ======================================================
// Cargar los selects de Contenido y Sala
// ======================================================
function cargarSelects() {
  const selectContenido = document.getElementById("contenidoFuncion");
  const selectSala = document.getElementById("salaFuncion");

  if (!selectContenido || !selectSala) return;

  // Limpiar
  selectContenido.innerHTML = '<option value="">Selecciona un contenido</option>';
  selectSala.innerHTML = '<option value="">Selecciona una sala</option>';

  // Cargar películas + obras
  const todos = [...(DB.peliculas || []), ...(DB.obras || [])];

  // También cargar contenido que el admin haya agregado anteriormente
  const contenidoExtra = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
  const todoContenido = [...todos, ...contenidoExtra];

  todoContenido.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.titulo} (${item.tipo === "cine" ? "Película" : "Teatro"})`;
    option.dataset.tipo = item.tipo;
    selectContenido.appendChild(option);
  });

  // Cargar salas
  (DB.salas || []).forEach(sala => {
    const option = document.createElement("option");
    option.value = sala.id;
    option.textContent = `${sala.nombre} (${sala.capacidad} butacas)`;
    selectSala.appendChild(option);
  });
}

// ======================================================
// Agregar nuevo contenido (película u obra)
// ======================================================
function agregarContenido(e) {
  e.preventDefault();

  const tipo = document.getElementById("tipoContenido").value;
  const titulo = document.getElementById("tituloContenido").value.trim();
  const genero = document.getElementById("generoContenido").value;
  const duracion = document.getElementById("duracionContenido").value.trim();
  const clasificacion = document.getElementById("clasificacionContenido").value;
  const director = document.getElementById("directorContenido").value.trim();
  const reparto = document.getElementById("repartoContenido").value.trim();
  const valoracion = parseFloat(document.getElementById("valoracionContenido").value) || 0;
  const imagen = document.getElementById("imagenContenido").value.trim();
  const sinopsis = document.getElementById("sinopsisContenido").value.trim();

  if (!titulo || !genero || !duracion || !director || !reparto || !imagen || !sinopsis) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Crear nuevo contenido
  const nuevo = {
    id: Date.now(), // ID único
    titulo,
    tipo,
    genero,
    duracion,
    clasificacion,
    director,
    reparto,
    valoracion,
    imagen,
    sinopsis
  };

  // Guardar en localStorage
  const contenidoAdmin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
  contenidoAdmin.push(nuevo);
  localStorage.setItem("contenidoAdmin", JSON.stringify(contenidoAdmin));

  // También lo agregamos temporalmente a DB para que se vea de inmediato
  if (tipo === "cine") {
    DB.peliculas.push(nuevo);
  } else {
    DB.obras.push(nuevo);
  }

  alert("Contenido agregado correctamente.");
  e.target.reset();
  document.getElementById("valoracionContenido").value = 0;

  // Actualizar todo
  cargarSelects();
  actualizarContadores();
  mostrarContenidoAdmin();
}

// ======================================================
// Agregar nueva función
// ======================================================
function agregarFuncion(e) {
  e.preventDefault();

  const contenidoId = parseInt(document.getElementById("contenidoFuncion").value);
  const tipo = document.getElementById("tipoFuncion").value;
  const fecha = document.getElementById("fechaFuncion").value;
  const hora = document.getElementById("horaFuncion").value;
  const salaId = document.getElementById("salaFuncion").value;

  if (!contenidoId || !fecha || !hora || !salaId) {
    alert("Por favor completa todos los campos de la función.");
    return;
  }

  const nuevaFuncion = {
    id: Date.now(),
    contenidoId,
    tipo,
    salaId,
    fecha,
    hora
  };

  // Guardar en localStorage
  const funcionesAdmin = JSON.parse(localStorage.getItem("funcionesAdmin") || "[]");
  funcionesAdmin.push(nuevaFuncion);
  localStorage.setItem("funcionesAdmin", JSON.stringify(funcionesAdmin));

  // Agregar también a DB
  DB.funciones.push(nuevaFuncion);

  alert("Función agregada correctamente.");
  e.target.reset();

  actualizarContadores();
  mostrarFuncionesAdmin();
}

// ======================================================
// Actualizar contadores
// ======================================================
function actualizarContadores() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");
  const comentarios = JSON.parse(localStorage.getItem("comentarios") || "[]");
  const contenidoAdmin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");

  document.getElementById("totalUsuarios").textContent = usuarios.length;
  document.getElementById("totalEntradas").textContent = entradas.length;
  document.getElementById("totalComentarios").textContent = comentarios.length;
  document.getElementById("totalContenidoAdmin").textContent = contenidoAdmin.length;
}

// ======================================================
// Mostrar contenido agregado por el admin
// ======================================================
function mostrarContenidoAdmin() {
  const contenedor = document.getElementById("listaContenidoAdmin");
  if (!contenedor) return;

  const contenidoAdmin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");

  if (contenidoAdmin.length === 0) {
    contenedor.innerHTML = `<p class="text-secondary">Aún no has agregado contenido.</p>`;
    return;
  }

  contenedor.innerHTML = contenidoAdmin.map(item => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card bg-black border-secondary h-100">
        <img src="${item.imagen}" class="card-img-top" style="height: 180px; object-fit: cover;" alt="${item.titulo}">
        <div class="card-body">
          <span class="badge ${item.tipo === 'cine' ? 'bg-danger' : 'bg-primary'} mb-2">
            ${item.tipo === 'cine' ? 'Película' : 'Teatro'}
          </span>
          <h5 class="card-title">${item.titulo}</h5>
          <p class="small text-secondary mb-1">${item.genero} • ${item.duracion}</p>
          <p class="small text-secondary">${item.clasificacion} • ⭐ ${item.valoracion}</p>
        </div>
      </div>
    </div>
  `).join("");
}

// ======================================================
// Mostrar funciones agregadas
// ======================================================
function mostrarFuncionesAdmin() {
  const contenedor = document.getElementById("listaFuncionesAdmin");
  if (!contenedor) return;

  const funcionesAdmin = JSON.parse(localStorage.getItem("funcionesAdmin") || "[]");

  if (funcionesAdmin.length === 0) {
    contenedor.innerHTML = `<p class="text-secondary">Aún no has agregado funciones.</p>`;
    return;
  }

  // Combinar con las funciones originales para mostrar títulos
  const todoContenido = [
    ...(DB.peliculas || []),
    ...(DB.obras || []),
    ...JSON.parse(localStorage.getItem("contenidoAdmin") || "[]")
  ];

  contenedor.innerHTML = `
    <div class="table-responsive">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Contenido</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          ${funcionesAdmin.map(f => {
            const contenido = todoContenido.find(c => c.id === f.contenidoId);
            const sala = (DB.salas || []).find(s => s.id === f.salaId);
            return `
              <tr>
                <td>${contenido ? contenido.titulo : "Desconocido"}</td>
                <td>${f.tipo === "cine" ? "Película" : "Teatro"}</td>
                <td>${f.fecha}</td>
                <td>${f.hora}</td>
                <td>${sala ? sala.nombre : f.salaId}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ======================================================
// Mostrar compras recientes
// ======================================================
function mostrarCompras() {
  const contenedor = document.getElementById("listaCompras");
  if (!contenedor) return;

  const entradas = JSON.parse(localStorage.getItem("entradas") || "[]");

  if (entradas.length === 0) {
    contenedor.innerHTML = `<p class="text-secondary">No hay compras registradas todavía.</p>`;
    return;
  }

  // Mostrar las últimas 10
  const ultimas = entradas.slice(-10).reverse();

  contenedor.innerHTML = `
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Butacas</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${ultimas.map(e => `
            <tr>
              <td>${e.usuario || "Anónimo"}</td>
              <td>${e.titulo || "-"}</td>
              <td>${e.fechaCompra || e.fecha || "-"}</td>
              <td>${e.butacas ? e.butacas.join(", ") : "-"}</td>
              <td>$${e.total || 0}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}