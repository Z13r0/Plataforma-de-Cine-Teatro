
const DB = {
    // 1. PELÍCULAS (Mínimo 8)
    peliculas: [
        {
            id: 1,
            titulo: "Inception Matrix",
            tipo: "cine",
            genero: "Acción / Ciencia Ficción",
            duracion: "2 horas y 28 mins",
            clasificacion: "TE+7",
            director: "Christopher Nolan",
            reparto: "Leonardo DiCaprio, Joseph Gordon-Levitt",
            valoracion: 4.8,
            imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&fit=crop",
            sinopsis: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños recibe la tarea inversa de plantar una idea."
        },
        {
            id: 2,
            titulo: "Misterio en la Noche",
            tipo: "cine",
            genero: "Suspenso / Thriller",
            duracion: "1 hora y 50 mins",
            clasificacion: "+14",
            director: "David Fincher",
            reparto: "Jake Gyllenhaal, Mark Ruffalo",
            valoracion: 4.5,
            imagen: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&fit=crop",
            sinopsis: "Un detective rastrea una serie de eventos inexplicables en un pueblo costero envuelto en niebla durante los años 80."
        },
        {
            id: 3,
            titulo: "Sci-Fi Odyssey 2026",
            tipo: "cine",
            genero: "Aventura / Sci-Fi",
            duracion: "2 horas y 45 mins",
            clasificacion: "TE",
            director: "Denis Villeneuve",
            reparto: "Timothée Chalamet, Zendaya",
            valoracion: 4.9,
            imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&fit=crop",
            sinopsis: "El viaje definitivo hacia el origen de la señal espacial detectada en las lunas de Júpiter."
        },
        {
            id: 4,
            titulo: "Cyberpunk Protocol",
            tipo: "cine",
            genero: "Acción / Neon",
            duracion: "2 horas y 5 mins",
            clasificacion: "+18",
            director: "Lana Wachowski",
            reparto: "Keanu Reeves, Carrie-Anne Moss",
            valoracion: 4.3,
            imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&fit=crop",
            sinopsis: "En una metrópolis dominada por la IA, un mercenario busca la clave para desconectar la red central."
        },
        {
            id: 5,
            titulo: "El Último Reino",
            tipo: "cine",
            genero: "Fantasía / Épico",
            duracion: "2 horas y 30 mins",
            clasificacion: "TE+7",
            director: "Peter Jackson",
            reparto: "Viggo Mortensen, Ian McKellen",
            valoracion: 4.7,
            imagen: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=400&fit=crop",
            sinopsis: "Una alianza épica entre reinos para proteger la última fortaleza mágica de las fuerzas del este."
        },
        {
            id: 6,
            titulo: "Horizonte Carmesí",
            tipo: "cine",
            genero: "Romance / Drama",
            duracion: "1 hora y 45 mins",
            clasificacion: "TE",
            director: "Greta Gerwig",
            reparto: "Saoirse Ronan, Timothée Chalamet",
            valoracion: 4.4,
            imagen: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=400&fit=crop",
            sinopsis: "Dos artistas se cruzan en el París de los años 20 y descubren que su amor cambiará su arte para siempre."
        },
        {
            id: 7,
            titulo: "Velocidad Extrema",
            tipo: "cine",
            genero: "Acción / Autos",
            duracion: "1 hora y 55 mins",
            clasificacion: "TE+7",
            director: "Justin Lin",
            reparto: "Vin Diesel, Michelle Rodriguez",
            valoracion: 4.1,
            imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&fit=crop",
            sinopsis: "Carreras clandestinas en pistas de prueba futuristas donde la velocidad lo es todo."
        },
        {
            id: 8,
            titulo: "Eco de Sombras",
            tipo: "cine",
            genero: "Terror / Sobrenatural",
            duracion: "1 hora y 38 mins",
            clasificacion: "+18",
            director: "James Wan",
            reparto: "Vera Farmiga, Patrick Wilson",
            valoracion: 4.6,
            imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&fit=crop",
            sinopsis: "Una familia se traslada a una casona antigua sin saber que las paredes registran los ecos de sucesos perturbadores."
        }
    ],

    // 2. OBRAS DE TEATRO (Mínimo 5)
    obras: [
        {
            id: 101,
            titulo: "Hamlet Clásico",
            tipo: "teatro",
            genero: "Drama Teatral",
            duracion: "2 horas",
            clasificacion: "TE+7",
            director: "Laurence Olivier",
            reparto: "Elenco Nacional de Teatro",
            valoracion: 4.9,
            imagen: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=400&fit=crop",
            sinopsis: "La tragedia inmortal del príncipe de Dinamarca presentada con puesta en escena contemporánea."
        },
        {
            id: 102,
            titulo: "Noche de Comedia",
            tipo: "teatro",
            genero: "Comedia / Improv",
            duracion: "1 hora y 30 mins",
            clasificacion: "TE",
            director: "Roberto Gómez",
            reparto: "Club de la Comedia Live",
            valoracion: 4.6,
            imagen: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=400&fit=crop",
            sinopsis: "Una función desopilante llena de improvisación e interacción directa con el público."
        },
        {
            id: 103,
            titulo: "El Fantasma de la Ópera",
            tipo: "teatro",
            genero: "Musical",
            duracion: "2 horas y 20 mins",
            clasificacion: "TE",
            director: "Andrew Lloyd Webber",
            reparto: "Orquesta y Coro Filarmónico",
            valoracion: 5.0,
            imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=400&fit=crop",
            sinopsis: "El deslumbrante musical que relata el romance entre una joven soprano y un genio musical desfigurado."
        },
        {
            id: 104,
            titulo: "Bodas de Sangre",
            tipo: "teatro",
            genero: "Tragedia Española",
            duracion: "1 hora y 40 mins",
            clasificacion: "+14",
            director: "Federico García Lorca",
            reparto: "Compañía Teatral Andaluza",
            valoracion: 4.7,
            imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&fit=crop",
            sinopsis: "Una pasión incontenible desafía las convenciones sociales desatando un trágico destino."
        },
        {
            id: 105,
            titulo: "Circo de Ilusiones",
            tipo: "teatro",
            genero: "Varieté / Magia",
            duracion: "1 hora y 25 mins",
            clasificacion: "TE",
            director: "Jean-Pierre Jeunet",
            reparto: "Acróbatas y Magos Internacionales",
            valoracion: 4.8,
            imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&fit=crop",
            sinopsis: "Espectáculo visual con acrobacias aéreas, ilusiones ópticas y música en vivo para toda la familia."
        }
    ],

    // 3. SALAS (Mínimo 4)
    salas: [
        { id: "S1", nombre: "Sala 1 - IMAX 3D", capacidad: 40, precioBase: 6500 },
        { id: "S2", nombre: "Sala 2 - Premium Dolby", capacidad: 30, precioBase: 5500 },
        { id: "S3", nombre: "Sala 3 - Tradicional HD", capacidad: 50, precioBase: 4500 },
        { id: "ST", nombre: "Sala Principal Teatro", capacidad: 60, precioBase: 8000 }
    ],

    // 4. Funcionciones (Sirve para conectar los contenidos, salas, fecha y hora)
    funciones: [
        // ===== FUNCIONES DE CINE =====
        { id: 1, contenidoId: 1, tipo: "cine", salaId: "S1", fecha: "2026-09-10", hora: "16:30" },
        { id: 2, contenidoId: 1, tipo: "cine", salaId: "S1", fecha: "2026-09-10", hora: "19:00" },
        { id: 3, contenidoId: 1, tipo: "cine", salaId: "S2", fecha: "2026-09-10", hora: "21:45" },

        { id: 4, contenidoId: 2, tipo: "cine", salaId: "S2", fecha: "2026-09-11", hora: "17:00" },
        { id: 5, contenidoId: 2, tipo: "cine", salaId: "S3", fecha: "2026-09-11", hora: "20:15" },

        { id: 6, contenidoId: 3, tipo: "cine", salaId: "S1", fecha: "2026-09-12", hora: "18:00" },
        { id: 7, contenidoId: 3, tipo: "cine", salaId: "S1", fecha: "2026-09-12", hora: "21:00" },

        { id: 8, contenidoId: 4, tipo: "cine", salaId: "S3", fecha: "2026-09-10", hora: "19:30" },
        { id: 9, contenidoId: 5, tipo: "cine", salaId: "S2", fecha: "2026-09-11", hora: "16:00" },
        { id: 10, contenidoId: 6, tipo: "cine", salaId: "S1", fecha: "2026-09-12", hora: "20:00" },

        // ===== FUNCIONES DE TEATRO =====
        // Hamlet Clásico (id: 101)
        { id: 11, contenidoId: 101, tipo: "teatro", salaId: "ST", fecha: "2026-09-10", hora: "19:00" },
        { id: 12, contenidoId: 101, tipo: "teatro", salaId: "ST", fecha: "2026-09-10", hora: "21:30" },

        // Noche de Comedia (id: 102)
        { id: 13, contenidoId: 102, tipo: "teatro", salaId: "ST", fecha: "2026-09-11", hora: "18:30" },
        { id: 14, contenidoId: 102, tipo: "teatro", salaId: "ST", fecha: "2026-09-11", hora: "21:00" },

        // El Fantasma de la Ópera (id: 103)
        { id: 15, contenidoId: 103, tipo: "teatro", salaId: "ST", fecha: "2026-09-12", hora: "17:00" },
        { id: 16, contenidoId: 103, tipo: "teatro", salaId: "ST", fecha: "2026-09-12", hora: "20:15" },
        { id: 17, contenidoId: 103, tipo: "teatro", salaId: "ST", fecha: "2026-09-13", hora: "19:30" }
        ]
};

// Comprobación a través de la consola

console.log("Base de datos ha sido cargada correctamente");
console.log("Total de peliculas:", DB.peliculas.length)
console.log("Total de obras:", DB.obras.length);
