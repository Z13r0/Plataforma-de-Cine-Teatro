import CardExtendido from "../components/CardExtendido";
import { DB } from "../data/db";

export default function Peliculas() {
  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-4">Películas</h1>
      <div className="row g-4">
        {DB.peliculas.map((pelicula) => (
          <div className="col-12" key={pelicula.id}>
            <CardExtendido id={pelicula.id} tipo={pelicula.tipo} />
          </div>
        ))}
      </div>
    </main>
  );
}
