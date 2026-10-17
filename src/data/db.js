export const DB = {
  peliculas: [
    {
      id: 1,
      titulo: "Inception Matrix",
      tipo: "cine",
      genero: ["Acción", "Ciencia Ficción"],
      duracion: "2h 28m",
      clasificacion: "TE+7",
      formatos: ["2D", "IMAX", "DBOX"],
      director: "Christopher Nolan",
      reparto: "Leonardo DiCaprio, Joseph Gordon-Levitt",
      valoracion: 4.8,
      imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&fit=crop",
      sinopsis: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños recibe la tarea inversa de plantar una idea.",
      restricciones: {
        activa: false,
        texto: "",
        items: []
      }
    },
    {
      id: 2,
      titulo: "Misterio en la Noche",
      tipo: "cine",
      genero: ["Suspenso", "Thriller"],
      duracion: "1h 50m",
      clasificacion: "+14",
      formatos: ["2D", "Premier"],
      director: "David Fincher",
      reparto: "Jake Gyllenhaal, Mark Ruffalo",
      valoracion: 4.5,
      imagen: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&fit=crop",
      sinopsis: "Un detective rastrea una serie de eventos inexplicables en un pueblo costero envuelto en niebla durante los años 80.",
      restricciones: {
        activa: true,
        texto: "Esta película tiene restricción de promociones entre el 01 y el 07 de octubre de 2026.",
        items: [
          "No aplica pases gratuitos ni Cyber Day",
          "No aplica Cinemark Club en esta función",
          "No acumulable con otras promociones"
        ]
      }
    },
    {
      id: 3,
      titulo: "Sci-Fi Odyssey 2026",
      tipo: "cine",
      genero: ["Aventura", "Sci-Fi"],
      duracion: "2h 45m",
      clasificacion: "TE",
      formatos: ["2D", "IMAX", "3D"],
      director: "Denis Villeneuve",
      reparto: "Timothée Chalamet, Zendaya",
      valoracion: 4.9,
      imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&fit=crop",
      sinopsis: "El viaje definitivo hacia el origen de la señal espacial detectada en las lunas de Júpiter.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 4,
      titulo: "Cyberpunk Protocol",
      tipo: "cine",
      genero: ["Acción"],
      duracion: "2h 5m",
      clasificacion: "+18",
      formatos: ["2D", "DBOX"],
      director: "Lana Wachowski",
      reparto: "Keanu Reeves, Carrie-Anne Moss",
      valoracion: 4.3,
      imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&fit=crop",
      sinopsis: "En una metrópolis dominada por la IA, un mercenario busca la clave para desconectar la red central.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 5,
      titulo: "El Último Reino",
      tipo: "cine",
      genero: ["Fantasía", "Épico"],
      duracion: "2h 30m",
      clasificacion: "TE+7",
      formatos: ["2D", "IMAX"],
      director: "Peter Jackson",
      reparto: "Viggo Mortensen, Ian McKellen",
      valoracion: 4.7,
      imagen: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=400&fit=crop",
      sinopsis: "Una alianza épica entre reinos para proteger la última fortaleza mágica.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 6,
      titulo: "Horizonte Carmesí",
      tipo: "cine",
      genero: ["Romance", "Drama"],
      duracion: "1h 45m",
      clasificacion: "TE",
      formatos: ["2D"],
      director: "Greta Gerwig",
      reparto: "Saoirse Ronan, Timothée Chalamet",
      valoracion: 4.4,
      imagen: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=400&fit=crop",
      sinopsis: "Dos artistas se cruzan en el París de los años 20.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 7,
      titulo: "Velocidad Extrema",
      tipo: "cine",
      genero: ["Acción"],
      duracion: "1h 55m",
      clasificacion: "TE+7",
      formatos: ["2D", "3D"],
      director: "Justin Lin",
      reparto: "Vin Diesel, Michelle Rodriguez",
      valoracion: 4.1,
      imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&fit=crop",
      sinopsis: "Carreras clandestinas en pistas futuristas.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 8,
      titulo: "Eco de Sombras",
      tipo: "cine",
      genero: ["Terror"],
      duracion: "1h 38m",
      clasificacion: "+18",
      formatos: ["2D"],
      director: "James Wan",
      reparto: "Vera Farmiga, Patrick Wilson",
      valoracion: 4.6,
      imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&fit=crop",
      sinopsis: "Una familia se traslada a una casona antigua con ecos perturbadores.",
      restricciones: { activa: true, texto: "Clasificación +18. No se admite menores.", items: ["Prohibido menores de 18 años"] }
    }
  ],

  obras: [
    {
      id: 101,
      titulo: "Hamlet Clásico",
      tipo: "teatro",
      genero: ["Drama"],
      duracion: "2h",
      clasificacion: "TE+7",
      formatos: ["Sala Principal"],
      director: "Laurence Olivier",
      reparto: "Elenco Nacional de Teatro",
      valoracion: 4.9,
      imagen: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=400&fit=crop",
      sinopsis: "La tragedia inmortal del príncipe de Dinamarca.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 102,
      titulo: "Noche de Comedia",
      tipo: "teatro",
      genero: ["Comedia"],
      duracion: "1h 30m",
      clasificacion: "TE",
      formatos: ["Sala Principal"],
      director: "Roberto Gómez",
      reparto: "Club de la Comedia Live",
      valoracion: 4.6,
      imagen: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=400&fit=crop",
      sinopsis: "Improvisación e interacción con el público.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 103,
      titulo: "El Fantasma de la Ópera",
      tipo: "teatro",
      genero: ["Musical"],
      duracion: "2h 20m",
      clasificacion: "TE",
      formatos: ["Sala Principal"],
      director: "Andrew Lloyd Webber",
      reparto: "Orquesta y Coro Filarmónico",
      valoracion: 5.0,
      imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=400&fit=crop",
      sinopsis: "El deslumbrante musical del romance entre una soprano y un genio desfigurado.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 104,
      titulo: "Bodas de Sangre",
      tipo: "teatro",
      genero: ["Tragedia"],
      duracion: "1h 40m",
      clasificacion: "+14",
      formatos: ["Sala Principal"],
      director: "Federico García Lorca",
      reparto: "Compañía Teatral Andaluza",
      valoracion: 4.7,
      imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&fit=crop",
      sinopsis: "Una pasión incontenible desafía las convenciones sociales.",
      restricciones: { activa: false, texto: "", items: [] }
    },
    {
      id: 105,
      titulo: "Circo de Ilusiones",
      tipo: "teatro",
      genero: ["Varieté"],
      duracion: "1h 25m",
      clasificacion: "TE",
      formatos: ["Sala Principal"],
      director: "Jean-Pierre Jeunet",
      reparto: "Acróbatas y Magos Internacionales",
      valoracion: 4.8,
      imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&fit=crop",
      sinopsis: "Acrobacias, ilusiones y música en vivo.",
      restricciones: { activa: false, texto: "", items: [] }
    }
  ],

  salas: [
    { id: "S1", nombre: "Sala 1 - IMAX", capacidad: 40, precioBase: 6500 },
    { id: "S2", nombre: "Sala 2 - Premium", capacidad: 30, precioBase: 5500 },
    { id: "S3", nombre: "Sala 3 - Tradicional", capacidad: 50, precioBase: 4500 },
    { id: "ST", nombre: "Sala Principal Teatro", capacidad: 60, precioBase: 8000 }
  ],

  funciones: [
    { id: 1, contenidoId: 1, tipo: "cine", salaId: "S1", fecha: "2026-10-06", hora: "16:30" },
    { id: 2, contenidoId: 1, tipo: "cine", salaId: "S1", fecha: "2026-10-06", hora: "19:00" },
    { id: 3, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-10-06", hora: "21:45" },
    { id: 18, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-10-17", hora: "16:45" },
    { id: 17, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-10-17", hora: "21:45" },
    { id: 19, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-10-18", hora: "16:45" },
    { id: 20, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-10-19", hora: "21:45" },
    { id: 4, contenidoId: 2, tipo: "cine", salaId: "S2", fecha: "2026-10-06", hora: "17:00" },
    { id: 5, contenidoId: 2, tipo: "cine", salaId: "S3", fecha: "2026-10-06", hora: "20:15" },
    { id: 6, contenidoId: 3, tipo: "cine", salaId: "S1", fecha: "2026-10-07", hora: "18:00" },
    { id: 7, contenidoId: 3, tipo: "cine", salaId: "S1", fecha: "2026-10-07", hora: "21:00" },
    { id: 8, contenidoId: 4, tipo: "cine", salaId: "S3", fecha: "2026-10-06", hora: "19:30" },
    { id: 9, contenidoId: 5, tipo: "cine", salaId: "S2", fecha: "2026-10-07", hora: "16:00" },
    { id: 10, contenidoId: 6, tipo: "cine", salaId: "S1", fecha: "2026-10-07", hora: "20:00" },
    { id: 11, contenidoId: 101, tipo: "teatro", salaId: "ST", fecha: "2026-10-06", hora: "19:00" },
    { id: 12, contenidoId: 101, tipo: "teatro", salaId: "ST", fecha: "2026-10-06", hora: "21:30" },
    { id: 13, contenidoId: 102, tipo: "teatro", salaId: "ST", fecha: "2026-10-07", hora: "18:30" },
    { id: 14, contenidoId: 102, tipo: "teatro", salaId: "ST", fecha: "2026-10-07", hora: "21:00" },
    { id: 15, contenidoId: 103, tipo: "teatro", salaId: "ST", fecha: "2026-10-08", hora: "17:00" },
    { id: 16, contenidoId: 103, tipo: "teatro", salaId: "ST", fecha: "2026-10-08", hora: "20:15" }
  ],

  // Confitería diferente para cine y teatro
  confiteria: {
    cine: [
      { id: 1, nombre: "Combo Doble", descripcion: "1 Pop Mega + 2 Bebidas Grandes", precio: 22500, categoria: "combos", imagen: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300" },
      { id: 2, nombre: "Combo Individual", descripcion: "1 Pop Mediano + 1 Bebida Grande", precio: 16000, categoria: "combos", imagen: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=300" },
      { id: 3, nombre: "Combo Doble Nachos", descripcion: "1 Pop Mega + 2 Bebidas + Nachos", precio: 26000, categoria: "combos", imagen: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300" },
      { id: 4, nombre: "Popcorn Grande", descripcion: "Popcorn salado grande", precio: 5500, categoria: "popcorn", imagen: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300" },
      { id: 5, nombre: "Bebida Grande", descripcion: "Bebida 950cc", precio: 3500, categoria: "bebidas", imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300" },
      { id: 6, nombre: "Nachos con queso", descripcion: "Nachos + salsa queso", precio: 6000, categoria: "snacks", imagen: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300" }
    ],
    teatro: [
      { id: 10, nombre: "Bebida Mediana", descripcion: "Bebida 500cc", precio: 3000, categoria: "bebidas", imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300" },
      { id: 11, nombre: "Agua mineral", descripcion: "Botella 500cc", precio: 2000, categoria: "bebidas", imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300" },
      { id: 12, nombre: "Snack ligero", descripcion: "Mix de frutos secos", precio: 3500, categoria: "snacks", imagen: "https://images.unsplash.com/photo-1599599810694-b5b37363cddb?w=300" },
      { id: 13, nombre: "Chocolate", descripcion: "Barra de chocolate", precio: 2500, categoria: "dulces", imagen: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300" }
    ]
  },

  cargoServicio: 700, // por entrada
  promociones: [
    { id: 1, titulo: "2x1 los martes", descripcion: "En funciones seleccionadas", imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600" },
    { id: 2, titulo: "Club Fan 15% dcto", descripcion: "En combos seleccionados", imagen: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600" },
    { id: 3, titulo: "Vaso reutilizable", descripcion: "Llévatelo y recárgalo", imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600" }
  ]
};

console.log("DB cargada:", DB.peliculas.length, "películas,", DB.obras.length, "obras");

/**
 * Busca película u obra por id.
 * Consulta primero el catálogo estático (DB) según el tipo, y de no encontrarse,
 * busca en el contenido añadido por el administrador en el localStorage.
 */
export function getContentById(id, tipo) {
  // --- SELECCIÓN DE LISTA BASE: Define si busca en películas o teatro según el parámetro ---
  const list = tipo === "teatro" ? DB.obras || [] : DB.peliculas || [];
  // --- CARGA DE DATOS DEL ADMIN: Recupera el contenido personalizado desde el almacenamiento local ---
  const admin = JSON.parse(localStorage.getItem("contenidoAdmin") || "[]");
  
  // --- BÚSQUEDA Y RETORNO: Compara IDs convirtiéndolos a número para asegurar la coincidencia ---
  return (
    list.find((x) => Number(x.id) === Number(id)) ||
    admin.find((x) => Number(x.id) === Number(id) && x.tipo === tipo) ||
    null
  );
}

/**
 * Funciones (horarios) del contenido: base + las del admin.
 * Combina las funciones predefinidas del sistema con las creadas por el administrador para un ítem específico.
 */
export function getFunciones(id, tipo) {
  // --- FILTRADO DE FUNCIONES BASE: Obtiene las funciones de la DB que coinciden con el ID y tipo ---
  const base = (DB.funciones || []).filter(
    (f) => Number(f.contenidoId) === Number(id) && f.tipo === tipo
  );
  // --- FILTRADO DE FUNCIONES ADMIN: Obtiene las funciones añadidas por el admin desde el localStorage ---
  const admin = JSON.parse(localStorage.getItem("funcionesAdmin") || "[]").filter(
    (f) => Number(f.contenidoId) === Number(id) && f.tipo === tipo
  );
  
  // --- CONSOLIDACIÓN: Retorna la unión de ambos arreglos de horarios ---
  return [...base, ...admin];
}

/**
 * Géneros únicos presentes en una lista, ordenados alfabéticamente.
 */
export function obtenerGeneros(lista) {
  const generos = lista.flatMap((item) =>
    Array.isArray(item.genero) ? item.genero : [item.genero || ""]
  );

  return [...new Set(generos.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

/**
 * Filtra una lista por texto (título o sinopsis), género y clasificación.
 * Mismo criterio que el buscador del sitio legacy.
 */
export function filtrarContenido(lista, { texto = "", genero = "", clasificacion = "" } = {}) {
  const busqueda = texto.toLowerCase().trim();

  return lista.filter((item) => {
    const generos = Array.isArray(item.genero) ? item.genero : [item.genero || ""];
    const coincideTexto =
      item.titulo.toLowerCase().includes(busqueda) ||
      (item.sinopsis || "").toLowerCase().includes(busqueda);
    const coincideGenero =
      genero === "" || generos.join(" ").toLowerCase().includes(genero.toLowerCase());
    const coincideClasificacion =
      clasificacion === "" || item.clasificacion === clasificacion;

    return coincideTexto && coincideGenero && coincideClasificacion;
  });
}

/**
 * Apariencia de cada tipo de contenido (cine / teatro).
 * Compartida por las tarjetas: una sola fuente para etiqueta y colores.
 */
export const ESTILOS_POR_TIPO = {
  cine: {
    etiqueta: "Cine",
    insignia: "bg-danger",
    reloj: "text-danger",
    boton: "btn-outline-danger",
  },
  teatro: {
    etiqueta: "Teatro",
    insignia: "bg-primary",
    reloj: "text-primary",
    boton: "btn-outline-primary",
  },
};