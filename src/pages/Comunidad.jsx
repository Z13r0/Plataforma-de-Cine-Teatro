
import { useState } from "react";

const PUBLICACIONES_INICIALES = [
  {
    id: 1,
    usuario: "Gabriel",
    iniciales: "G",
    categoria: "Cine",
    fecha: "Hace 20 min",
    titulo: "¡Interstellar sigue siendo una obra maestra!",
    contenido:
      "La banda sonora de Hans Zimmer y la historia hacen que sea una de las mejores películas de ciencia ficción.",
    likes: 42,
    republicaciones: 15,
    comentarios: [
      { id: 101, usuario: "Carlos", texto: "Totalmente de acuerdo." },
    ],
  },
  {
    id: 2,
    usuario: "Sebastián",
    iniciales: "S",
    categoria: "Cine",
    fecha: "Hace 1 hora",
    titulo: "Una decepción con el último estreno",
    contenido:
      "Tenía muchas expectativas, pero el guion y las actuaciones no me convencieron.",
    likes: 18,
    republicaciones: 4,
    comentarios: [],
  },
  {
    id: 3,
    usuario: "Angelo",
    iniciales: "A",
    categoria: "Teatro",
    fecha: "Hace 3 horas",
    titulo: "Recomendación: Hamlet en el Municipal",
    contenido:
      "La puesta en escena y las actuaciones hacen que valga la pena verla.",
    likes: 35,
    republicaciones: 11,
    comentarios: [],
  },
  {
    id: 4,
    usuario: "Naomi",
    iniciales: "N",
    categoria: "Teatro",
    fecha: "Hace 5 horas",
    titulo: "¿Alguien se suma a ir al teatro?",
    contenido:
      "Busco personas para organizar salidas al teatro los fines de semana.",
    likes: 29,
    republicaciones: 8,
    comentarios: [],
  },
  {
    id: 5,
    usuario: "Jennifher",
    iniciales: "J",
    categoria: "Cine",
    fecha: "Hace 8 horas",
    titulo: "¿Cine o teatro?",
    contenido:
      "El cine tiene grandes efectos, pero el teatro en vivo tiene una magia especial. ¿Cuál prefieren?",
    likes: 56,
    republicaciones: 22,
    comentarios: [],
  },
];

export default function Comunidad() {
  const [publicaciones, setPublicaciones] = useState(PUBLICACIONES_INICIALES);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("Cine");
  const [filtro, setFiltro] = useState("Todos");
  const [likes, setLikes] = useState([]);
  const [republicados, setRepublicados] = useState([]);
  const [comentariosAbiertos, setComentariosAbiertos] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  function actualizarPublicacion(id, cambios) {
    setPublicaciones((actuales) =>
      actuales.map((pub) =>
        pub.id === id ? { ...pub, ...cambios(pub) } : pub
      )
    );
  }

  function publicar(e) {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return;

    setPublicaciones((actuales) => [
      {
        id: Date.now(),
        usuario: "TuUsuario",
        iniciales: "TU",
        categoria,
        fecha: "Ahora",
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        likes: 0,
        republicaciones: 0,
        comentarios: [],
      },
      ...actuales,
    ]);

    setTitulo("");
    setContenido("");
  }

  function alternarContador(id, campo, seleccionados, setSeleccionados) {
    const activo = seleccionados.includes(id);

    setSeleccionados((actuales) =>
      activo ? actuales.filter((item) => item !== id) : [...actuales, id]
    );

    actualizarPublicacion(id, (pub) => ({
      [campo]: pub[campo] + (activo ? -1 : 1),
    }));
  }

  function comentar(e, id) {
    e.preventDefault();
    const texto = (respuestas[id] || "").trim();
    if (!texto) return;

    actualizarPublicacion(id, (pub) => ({
      comentarios: [
        ...pub.comentarios,
        { id: Date.now(), usuario: "TuUsuario", texto },
      ],
    }));

    setRespuestas((actuales) => ({ ...actuales, [id]: "" }));
  }

  const filtradas = publicaciones.filter(
    (pub) => filtro === "Todos" || pub.categoria === filtro
  );

  return (
    <main className="container py-4 text-light flex-grow-1">
      <section className="mb-4">
        <span className="badge bg-danger mb-2">
          <i className="bi bi-people-fill me-1" />
          Comunidad
        </span>
        <h1 className="display-5 fw-bold">Tu pasión, nuestra comunidad</h1>
        <p className="text-secondary">
          Comparte opiniones y conversa sobre cine y teatro.
        </p>
      </section>

      <div className="row g-4">
        <section className="col-lg-8">
          <div className="card bg-dark border-secondary text-light mb-4">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Crear publicación</h2>

              <form onSubmit={publicar}>
                <input
                  className="form-control bg-dark text-light border-secondary mb-3"
                  placeholder="Título de tu publicación"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength={100}
                  required
                />

                <textarea
                  className="form-control bg-dark text-light border-secondary mb-3"
                  placeholder="Comparte tu opinión..."
                  rows="3"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  maxLength={1000}
                  required
                />

                <div className="d-flex justify-content-between align-items-center gap-3">
                  <select
                    className="form-select form-select-sm bg-dark text-light border-secondary w-auto"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="Cine">Cine</option>
                    <option value="Teatro">Teatro</option>
                  </select>

                  <button className="btn btn-danger" type="submit">
                    <i className="bi bi-send me-2" />
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h2 className="h4 fw-bold mb-0">Conversaciones</h2>

            <div className="btn-group">
              {["Todos", "Cine", "Teatro"].map((opcion) => (
                <button
                  key={opcion}
                  className={`btn btn-sm ${
                    filtro === opcion ? "btn-danger" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFiltro(opcion)}
                  type="button"
                >
                  {opcion}
                </button>
              ))}
            </div>
          </div>

          {filtradas.length === 0 ? (
            <div className="alert alert-dark border-secondary">
              No hay publicaciones en esta categoría.
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filtradas.map((pub) => (
                <article
                  key={pub.id}
                  className="card bg-dark border-secondary text-light"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div
                        className="rounded-circle bg-danger d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: 44, height: 44 }}
                      >
                        {pub.iniciales}
                      </div>

                      <div className="flex-grow-1">
                        <h3 className="h6 fw-bold mb-0">{pub.usuario}</h3>
                        <small className="text-secondary">{pub.fecha}</small>
                      </div>

                      <span
                        className={`badge ${
                          pub.categoria === "Cine" ? "bg-danger" : "bg-primary"
                        }`}
                      >
                        {pub.categoria}
                      </span>
                    </div>

                    <h4 className="h5 fw-bold">{pub.titulo}</h4>
                    <p className="text-secondary">{pub.contenido}</p>

                    <div className="d-flex flex-wrap gap-2 border-top border-secondary pt-3">
                      <button
                        className={`btn btn-sm ${
                          likes.includes(pub.id)
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                        onClick={() =>
                          alternarContador(
                            pub.id, "likes", likes, setLikes
                          )
                        }
                        type="button"
                      >
                        <i className="bi bi-heart me-1" />
                        {pub.likes}
                      </button>

                      <button
                        className={`btn btn-sm ${
                          republicados.includes(pub.id)
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() =>
                          alternarContador(
                            pub.id,
                            "republicaciones",
                            republicados,
                            setRepublicados
                          )
                        }
                        type="button"
                      >
                        <i className="bi bi-arrow-repeat me-1" />
                        {pub.republicaciones}
                      </button>

                      <button
                        className="btn btn-sm btn-outline-secondary text-light"
                        onClick={() =>
                          setComentariosAbiertos((actuales) =>
                            actuales.includes(pub.id)
                              ? actuales.filter((id) => id !== pub.id)
                              : [...actuales, pub.id]
                          )
                        }
                        type="button"
                      >
                        <i className="bi bi-chat-left-text me-1" />
                        {pub.comentarios.length} comentarios
                      </button>
                    </div>

                    {comentariosAbiertos.includes(pub.id) && (
                      <div className="mt-3 pt-3 border-top border-secondary">
                        {pub.comentarios.map((comentario) => (
                          <div
                            key={comentario.id}
                            className="p-2 mb-2 rounded bg-secondary bg-opacity-10 border border-secondary"
                          >
                            <strong className="d-block small text-danger">
                              {comentario.usuario}
                            </strong>
                            <span className="small">{comentario.texto}</span>
                          </div>
                        ))}

                        <form
                          className="d-flex gap-2 mt-3"
                          onSubmit={(e) => comentar(e, pub.id)}
                        >
                          <input
                            className="form-control form-control-sm bg-dark text-light border-secondary"
                            placeholder="Escribe un comentario..."
                            value={respuestas[pub.id] || ""}
                            onChange={(e) =>
                              setRespuestas((actuales) => ({
                                ...actuales,
                                [pub.id]: e.target.value,
                              }))
                            }
                          />

                          <button className="btn btn-sm btn-danger" type="submit">
                            Responder
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="col-lg-4">
          <div className="card bg-dark border-secondary text-light">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">
                <i className="bi bi-stars text-danger me-2" />
                Tu espacio cultural
              </h2>

              <p className="text-secondary small">
                Comparte opiniones, descubre historias y conoce otras
                perspectivas.
              </p>

              <hr className="border-secondary" />

              {[
                ["Publicaciones totales", publicaciones.length],
                ["Cine", publicaciones.filter((p) => p.categoria === "Cine").length],
                ["Teatro", publicaciones.filter((p) => p.categoria === "Teatro").length],
              ].map(([nombre, total]) => (
                <div className="d-flex justify-content-between mb-2" key={nombre}>
                  <span className="text-secondary">{nombre}</span>
                  <strong>{total}</strong>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
