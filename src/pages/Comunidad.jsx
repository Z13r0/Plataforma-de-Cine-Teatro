
import { useState } from "react";

const PUBLICACIONES_INICIALES = [
  {
    id: 1,
    usuario: "Gabriel",
    iniciales: "G",
    categoria: "Cine",
    fecha: "Hace 20 min",
    titulo: "¡Interstellar sigue siendo una obra maestra incomparable!",
    contenido:
      "Ayer la volví a ver en el reestreno y me dejó sin palabras otra vez. La banda sonora de Hans Zimmer te atrapa por completo. Sin duda una de las mejores películas de ciencia ficción de la historia.",
    likes: 42,
    republicaciones: 15,
    comentarios: [
      { id: 101, usuario: "Carlos", texto: "¡Totalmente de acuerdo! La escena del agua es increíble." },
      { id: 102, usuario: "Maria", texto: "La música en el cine se siente a otro nivel." },
      { id: 103, usuario: "Lucas", texto: "Mi película favorita de Nolan lejos." },
    ],
  },
  {
    id: 2,
    usuario: "Sebastián",
    iniciales: "S",
    categoria: "Cine",
    fecha: "Hace 1 hora",
    titulo: "Mala experiencia con el último estreno...",
    contenido:
      "Fui con muchas expectativas a ver la nueva secuela de terror y fue una decepción total. Guion flojo, actuaciones forzadas y jumpscares muy predecibles. No la recomiendo para nada.",
    likes: 18,
    republicaciones: 4,
    comentarios: [
      { id: 201, usuario: "Andrea", texto: "Gracias por el aviso, me ahorraste la entrada." },
      { id: 202, usuario: "Diego", texto: "A mí me pareció entretenida, pero sí es cliché." },
      { id: 203, usuario: "Valeria", texto: "La primera era mucho mejor." },
    ],
  },
  {
    id: 3,
    usuario: "Angelo",
    iniciales: "A",
    categoria: "Teatro",
    fecha: "Hace 3 horas",
    titulo: "Recomendación imperdible: 'Hamlet' en el Municipal",
    contenido:
      "Si tienen la oportunidad de ir al Teatro Municipal esta semana, no lo duden. La puesta en escena de Hamlet está excelente, los actores transmiten una emoción tremenda.",
    likes: 35,
    republicaciones: 11,
    comentarios: [
      { id: 301, usuario: "Fernanda", texto: "¿Hasta qué día va a estar en cartelera?" },
      { id: 302, usuario: "Gonzalo", texto: "Fui el viernes pasado y la escenografía me voló la cabeza." },
      { id: 303, usuario: "Camila", texto: "¡Ya compré mis entradas para el sábado!" },
    ],
  },
  {
    id: 4,
    usuario: "Naomi",
    iniciales: "N",
    categoria: "Teatro",
    fecha: "Hace 5 horas",
    titulo: "¿Alguien se suma para ir a ver obras los fines de semana?",
    contenido:
      "¡Hola a todos! Me encanta el teatro pero a veces a mis amigos no les motiva tanto ir. Estoy buscando armar un grupito para organizarnos e ir a ver funciones los sábados por la tarde. ¿A alguien le interesa?",
    likes: 29,
    republicaciones: 8,
    comentarios: [
      { id: 401, usuario: "Javier", texto: "¡Yo me sumo! Mándame un mensaje." },
      { id: 402, usuario: "Patricia", texto: "A mí me interesa mucho, les dejo mi contacto." },
      { id: 403, usuario: "Tomas", texto: "Armen un grupo de WhatsApp y me uno." },
    ],
  },
  {
    id: 5,
    usuario: "Jennifher",
    iniciales: "J",
    categoria: "Cine",
    fecha: "Hace 8 horas",
    titulo: "Debate abierto: ¿Prefieren el cine o la experiencia del teatro en vivo?",
    contenido:
      "Opino de todo un poco hoy: el cine tiene esos efectos y sonido envolvente imposibles de igualar, pero la energía del teatro en vivo con los actores a pocos metros tiene una magia única. Para ustedes, ¿cuál gana?",
    likes: 56,
    republicaciones: 22,
    comentarios: [
      { id: 501, usuario: "Felipe", texto: "El teatro transmite más emoción directa." },
      { id: 502, usuario: "Daniela", texto: "Cine siempre, me gustan las producciones grandes." },
      { id: 503, usuario: "Esteban", texto: "Imposible elegir, ambas cosas se disfrutan distinto." },
    ],
  },
];

export default function Comunidad() {
  const [publicaciones, setPublicaciones] = useState(PUBLICACIONES_INICIALES);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Cine");
  const [filtro, setFiltro] = useState("Todos");

  const [likesUsuario, setLikesUsuario] = useState([]);
  const [republicadosUsuario, setRepublicadosUsuario] = useState([]);
  const [comentarioAbierto, setComentarioAbierto] = useState({});
  const [nuevoComentarioTexto, setNuevoComentarioTexto] = useState({});

  function publicar(e) {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;

    const nuevaPublicacion = {
      id: Date.now(),
      usuario: "TuUsuario",
      iniciales: "TU",
      categoria,
      fecha: "Ahora",
      titulo: titulo.trim(),
      contenido: texto.trim(),
      likes: 0,
      republicaciones: 0,
      comentarios: [],
    };

    setPublicaciones((prev) => [nuevaPublicacion, ...prev]);
    setTitulo("");
    setTexto("");
  }

  function toggleLike(id) {
    const yaTieneLike = likesUsuario.includes(id);

    setLikesUsuario((prev) =>
      yaTieneLike ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setPublicaciones((prev) =>
      prev.map((pub) =>
        pub.id === id
          ? { ...pub, likes: pub.likes + (yaTieneLike ? -1 : 1) }
          : pub
      )
    );
  }

  function toggleRepublicar(id) {
    const yaRepublico = republicadosUsuario.includes(id);

    setRepublicadosUsuario((prev) =>
      yaRepublico ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setPublicaciones((prev) =>
      prev.map((pub) =>
        pub.id === id
          ? {
              ...pub,
              republicaciones: pub.republicaciones + (yaRepublico ? -1 : 1),
            }
          : pub
      )
    );
  }

  function toggleSeccionComentarios(id) {
    setComentarioAbierto((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function agregarComentario(e, pubId) {
    e.preventDefault();
    const textoComentario = nuevoComentarioTexto[pubId];
    if (!textoComentario || !textoComentario.trim()) return;

    const nuevoComentario = {
      id: Date.now(),
      usuario: "TuUsuario",
      texto: textoComentario.trim(),
    };

    setPublicaciones((prev) =>
      prev.map((pub) =>
        pub.id === pubId
          ? { ...pub, comentarios: [...pub.comentarios, nuevoComentario] }
          : pub
      )
    );

    setNuevoComentarioTexto((prev) => ({ ...prev, [pubId]: "" }));
  }

  const publicacionesFiltradas =
    filtro === "Todos"
      ? publicaciones
      : publicaciones.filter((pub) => pub.categoria === filtro);

  return (
    <main className="container py-4 text-light flex-grow-1">
      <section className="mb-4">
        <span className="badge bg-danger mb-2">
          <i className="bi bi-people-fill me-1" /> Comunidad
        </span>
        <h1 className="display-5 fw-bold">Tu pasión, nuestra comunidad</h1>
        <p className="text-secondary">
          Comparte opiniones, descubre recomendaciones y conversa con otros amantes del cine y el teatro.
        </p>
      </section>

      <div className="row g-4">
        <section className="col-lg-8">
          <div className="card bg-dark border-secondary text-light mb-4">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">
                <i className="bi bi-pencil-square text-danger me-2" />
                Crear publicación
              </h2>

              <form onSubmit={publicar}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="¿De qué quieres opinar hoy?"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contenido" className="form-label">
                    Tu opinión o reseña
                  </label>
                  <textarea
                    id="contenido"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Escribe aquí tus comentarios, críticas o recomendaciones..."
                    rows="3"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    required
                    maxLength={1000}
                  />
                </div>

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <label htmlFor="categoria" className="form-label mb-0">
                      Categoría:
                    </label>
                    <select
                      id="categoria"
                      className="form-select form-select-sm bg-dark text-light border-secondary"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="Cine">Cine</option>
                      <option value="Teatro">Teatro</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-danger">
                    <i className="bi bi-send me-2" />
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h2 className="h4 fw-bold mb-0">Conversaciones</h2>
            <div className="btn-group" role="group" aria-label="Filtrar publicaciones">
              {["Todos", "Cine", "Teatro"].map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  className={`btn btn-sm ${
                    filtro === opcion ? "btn-danger" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFiltro(opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>
          </div>

          {publicacionesFiltradas.length === 0 ? (
            <div className="alert alert-dark border-secondary">
              No hay publicaciones en esta categoría todavía.
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {publicacionesFiltradas.map((pub) => {
                const dioLike = likesUsuario.includes(pub.id);
                const republico = republicadosUsuario.includes(pub.id);
                const estanAbiertosComentarios = comentarioAbierto[pub.id];

                return (
                  <article key={pub.id} className="card bg-dark border-secondary text-light">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          className="rounded-circle bg-danger d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                          style={{ width: 44, height: 44 }}
                        >
                          {pub.iniciales}
                        </div>
                        <div className="flex-grow-1">
                          <h3 className="h6 fw-bold mb-0">{pub.usuario}</h3>
                          <small className="text-secondary">{pub.fecha}</small>
                        </div>
                        <span className={`badge ${pub.categoria === "Cine" ? "bg-danger" : "bg-primary"}`}>
                          {pub.categoria}
                        </span>
                      </div>

                      <h4 className="h5 fw-bold">{pub.titulo}</h4>
                      <p className="text-secondary mb-3">{pub.contenido}</p>

                      <div className="d-flex flex-wrap gap-2 border-top border-secondary pt-3">
                        <button
                          type="button"
                          className={`btn btn-sm ${dioLike ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() => toggleLike(pub.id)}
                        >
                          <i className={`bi ${dioLike ? "bi-heart-fill" : "bi-heart"} me-1`} />
                          {pub.likes}
                        </button>

                        <button
                          type="button"
                          className={`btn btn-sm ${republico ? "btn-success" : "btn-outline-success"}`}
                          onClick={() => toggleRepublicar(pub.id)}
                        >
                          <i className="bi bi-arrow-repeat me-1" />
                          {pub.republicaciones}
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary text-light"
                          onClick={() => toggleSeccionComentarios(pub.id)}
                        >
                          <i className="bi bi-chat-left-text me-1" />
                          {pub.comentarios.length} comentarios
                        </button>
                      </div>

                      {estanAbiertosComentarios && (
                        <div className="mt-3 pt-3 border-top border-secondary">
                          <h5 className="h6 fw-bold mb-2">Comentarios</h5>

                          <div className="d-flex flex-column gap-2 mb-3">
                            {pub.comentarios.map((c) => (
                              <div key={c.id} className="p-2 rounded bg-secondary bg-opacity-10 border border-secondary">
                                <strong className="d-block small text-danger">{c.usuario}</strong>
                                <span className="small text-light">{c.texto}</span>
                              </div>
                            ))}
                          </div>

                          <form
                            onSubmit={(e) => agregarComentario(e, pub.id)}
                            className="d-flex gap-2"
                          >
                            <input
                              type="text"
                              className="form-control form-control-sm bg-dark text-light border-secondary"
                              placeholder="Escribe un comentario..."
                              value={nuevoComentarioTexto[pub.id] || ""}
                              onChange={(e) =>
                                setNuevoComentarioTexto({
                                  ...nuevoComentarioTexto,
                                  [pub.id]: e.target.value,
                                })
                              }
                            />
                            <button type="submit" className="btn btn-sm btn-danger">
                              Responder
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <aside className="col-lg-4">
          <div className="card bg-dark border-secondary text-light mb-4">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">
                <i className="bi bi-stars text-danger me-2" />
                Tu espacio cultural
              </h2>
              <p className="text-secondary small">
                Un lugar para compartir lo que te apasiona, descubrir nuevas historias y conocer otras perspectivas.
              </p>

              <hr className="border-secondary" />

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Publicaciones totales</span>
                <strong>{publicaciones.length}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Cine</span>
                <strong>{publicaciones.filter((p) => p.categoria === "Cine").length}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Teatro</span>
                <strong>{publicaciones.filter((p) => p.categoria === "Teatro").length}</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}