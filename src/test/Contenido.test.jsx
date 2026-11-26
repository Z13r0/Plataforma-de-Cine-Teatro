import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contenido from "../components/Contenido";

const PELICULA = {
    id: 777,
    tipo: "cine",
    titulo: "Inception Matrix",
    genero: ["Acción", "Ciencia Ficción"],
    duracion: "2h 28m",
    clasificacion: "TE+7",
    formatos: ["2D", "IMAX"],
    director: "Christopher Nolan",
    reparto: "Leonardo DiCaprio, Joseph Gordon-Levitt",
    valoracion: 4.8,
    imagen: "https://example.com/poster.jpg",
    sinopsis: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños recibe la tarea inversa de plantar una idea.",
    activo: true,
    destacado: false,
};

describe("Contenido (cine)", () => {
    it("muestra el título como encabezado principal", () => {
        render(<Contenido contenido={PELICULA} />);
        expect(screen.getByRole("heading", { level: 1, name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("muestra la portada con el título como texto alternativo", () => {
        render(<Contenido contenido={PELICULA} />);
        expect(screen.getByRole("img", { name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("une los géneros con coma", () => {
        render(<Contenido contenido={PELICULA} />);
        expect(screen.getByText("Acción, Ciencia Ficción")).toBeInTheDocument();
    });

    it("muestra la sinopsis", () => {
        render(<Contenido contenido={PELICULA} />);
        expect(screen.getByText(/roba secretos corporativos/)).toBeInTheDocument();
    });

    it("muestra los datos con sus valores", () => {
        render(<Contenido contenido={PELICULA} />);
        expect(screen.getByText("Duración")).toBeInTheDocument();
        expect(screen.getByText("2h 28m")).toBeInTheDocument();
        expect(screen.getByText("Clasificación")).toBeInTheDocument();
        expect(screen.getByText("TE+7")).toBeInTheDocument();
        expect(screen.getByText("Director")).toBeInTheDocument();
        expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
        expect(screen.getByText("Reparto")).toBeInTheDocument();
        expect(screen.getByText("Leonardo DiCaprio, Joseph Gordon-Levitt")).toBeInTheDocument();
    });
});

describe("Contenido (casos borde)", () => {
    it("muestra un mensaje si el contenido es nulo", () => {
        render(<Contenido contenido={null} />);
        expect(screen.getByText("No se encontró el contenido.")).toBeInTheDocument();
    });
});
