import { useParams } from "react-router-dom";
import Contenido from "../components/Contenido";
import DetalleHorario from "../components/DetalleHorario";

export default function Detalle() {
  const { tipo, id } = useParams();

  return (
    <main className="container py-4">
      <div className="row g-1">
        <div className="col-lg-5">
          <Contenido id={id} tipo={tipo} />
        </div>
        <div className="col-lg-7">
          <DetalleHorario id={id} tipo={tipo} />
        </div>
      </div>
    </main>
  );
}
