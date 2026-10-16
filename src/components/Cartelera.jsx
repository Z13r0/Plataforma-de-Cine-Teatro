import Card from "./Card";
import { DB } from "../data/db";

export default function Cartelera() {
  return (
    <section>
      <h2 className="h3 fw-bold mb-4 border-start border-4 border-danger ps-2">
        Peliculas
      </h2>
      <div className="row g-4">
        {DB.peliculas.map((pelicula) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pelicula.id}>
            <Card id={pelicula.id} tipo={pelicula.tipo} />
          </div>
        ))}
      </div>
      <h2 className="h3 fw-bold mb-4 mt-4 border-start border-4 border-primary ps-2">
        Obras
      </h2>
      <div className="row g-4">
        {DB.obras.map((obra) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={obra.id}>
            <Card id={obra.id} tipo={obra.tipo} />
          </div>
        ))}
      </div>
    </section>
  );
}
