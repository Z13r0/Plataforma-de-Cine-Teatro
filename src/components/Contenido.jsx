import "./Contenido.css";
import { getContentById } from "../data/db";

export default function Contenido({ id, tipo = "cine" }) {
  const contenido = getContentById(id, tipo);

  if (!contenido) {
    return <p className="text-secondary">No se encontró el contenido.</p>;
  }

  const { titulo, genero, sinopsis, imagen, duracion, clasificacion, director, reparto } = contenido;
  const generoTexto = Array.isArray(genero) ? genero.join(", ") : genero;

  const datos = [
    { etiqueta: "Duración", valor: duracion },
    { etiqueta: "Clasificación", valor: clasificacion },
    { etiqueta: "Director", valor: director },
    { etiqueta: "Reparto", valor: reparto },
  ];

  return (
    <div className="datos">
      <h1 className="h2 text-uppercase fw-bold mb-4 mt-4">{titulo}</h1>

      <img src={imagen} alt={titulo} className="contenido__portada mb-3" />

      <p className="mb-2">{generoTexto}</p>

      <p className="text-light opacity-75">{sinopsis}</p>

      <div className="mt-4">
        {datos.map(({ etiqueta, valor }) => (
          <div
            key={etiqueta}
            className="d-flex justify-content-between py-2 border-bottom border-secondary"
          >
            <span className="fw-semibold">{etiqueta}</span>
            <span className="text-light opacity-75 text-end">{valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
