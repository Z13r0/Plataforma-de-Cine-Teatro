import { useParams } from "react-router-dom";
import Contenido from "../components/Contenido";

export default function Detalle() {
  const { tipo, id } = useParams();

  return (
    <main className="container py-4">
      <Contenido id={id} tipo={tipo} />
    </main>
  );
}
