import { useState } from "react";
import { getFunciones } from "../data/db";

const DIAS_CORTOS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

function dosDigitos(numero) {
  return String(numero).padStart(2, "0");
}

function diaDeFecha(fecha) {
  return `${dosDigitos(fecha.getDate())}/${dosDigitos(fecha.getMonth() + 1)}`;
}

function claveDeFecha(fecha) {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}

export default function DetalleHorario({ id, tipo = "cine" }) {
  const funciones = getFunciones(id, tipo);

  const hoy = new Date();
  const dias = Array.from({ length: 5 }, (_, indice) => {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + indice);
    return { fecha, clave: claveDeFecha(fecha) };
  });

  const [diaElegido, setDiaElegido] = useState(0);
  const funcionesDelDia = funciones.filter((funcion) => funcion.fecha === dias[diaElegido].clave);

  return (
    <div>
      <h2 className="h2 fw-bold mb-3 mt-4">HORARIO</h2>

      <div className="row g-1 text-center mb-4 mt-1">
        {dias.map((dia, indice) => (
          <div className="col" key={dia.clave}>
            <button
              type="button"
              onClick={() => setDiaElegido(indice)}
              className={`btn w-100 py-2 px-3 ${indice === diaElegido ? "btn-danger" : "btn-outline-secondary text-light"}`}
            >
              <span className="d-block fw-semibold">
                {indice === 0 ? "HOY" : DIAS_CORTOS[dia.fecha.getDay()]}
              </span>
              <span className="d-block small">{diaDeFecha(dia.fecha)}</span>
            </button>
          </div>
        ))}
      </div>

      {funcionesDelDia.length > 0 ? (
        <div className="d-flex flex-wrap gap-2">
          {funcionesDelDia.map((funcion) => (
            <a key={funcion.id} href="#" className="btn btn-outline-secondary text-light">
              {funcion.hora} h
            </a>
          ))}
        </div>
      ) : (
        <p className="text-secondary mb-0">No hay funciones disponibles.</p>
      )}
    </div>
  );
}
