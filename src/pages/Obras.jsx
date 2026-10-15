import CardExtendido from "../components/CardExtendido";
import { DB } from "../data/db";

export default function Obras() {
  return (
    <main className="container py-4">
      <h1 className="h3 fw-bold mb-4">Obras</h1>
      <div className="row g-4">
        {DB.obras.map((obra) => (
          <div className="col-12" key={obra.id}>
            <CardExtendido id={obra.id} tipo={obra.tipo} />
          </div>
        ))}
      </div>
    </main>
  );
}
