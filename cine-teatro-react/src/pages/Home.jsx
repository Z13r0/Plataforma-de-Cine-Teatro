import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="p-4 p-md-5 hero-banner text-center text-md-start shadow">
      <span className="badge bg-danger mb-3">Temporada 2026</span>
      <h1 className="display-4 fw-bold mb-3">Bienvenido a Cine & Teatro</h1>
      <p className="fs-5 mb-4">Versión React — ya no es la plantilla de Vite.</p>
      <Link to="/" className="btn btn-danger btn-lg">
        Inicio
      </Link>
    </section>
  );
}