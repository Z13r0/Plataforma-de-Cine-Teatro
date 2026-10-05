import Card from "./Card";

/* Placeholders con la forma que devolverá la API; se reemplazan al conectarla. */
const EN_CARTELERA = [
  { id: 1, tipo: "cine" },
  { id: 2, tipo: "cine" },
  { id: 3, tipo: "teatro" },
  { id: 4, tipo: "teatro" },
];

export default function Cartelera() {
  return (
    <section>
      <h2 className="h3 fw-bold mb-4 border-start border-4 border-danger ps-2">
        En Cartelera
      </h2>
      <div className="row g-4">
        {EN_CARTELERA.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
            <Card {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}