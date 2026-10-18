import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Contenido from "../components/Contenido";

beforeEach(() => localStorage.clear());

describe("Contenido (cine)", () => {
    it("muestra el título como encabezado principal", () => {
        render(<Contenido id={1} />);
        expect(screen.getByRole("heading", { level: 1, name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("muestra la portada con el título como texto alternativo", () => {
        render(<Contenido id={1} />);
        expect(screen.getByRole("img", { name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("une los géneros con coma", () => {
        render(<Contenido id={1} />);
        expect(screen.getByText("Acción, Ciencia Ficción")).toBeInTheDocument();
    });

    it("muestra la sinopsis", () => {
        render(<Contenido id={1} />);
        expect(screen.getByText(/roba secretos corporativos/)).toBeInTheDocument();
    });

    it("muestra los datos con sus valores", () => {
        render(<Contenido id={1} />);
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
    it("muestra un mensaje si el id no existe", () => {
        render(<Contenido id={9999} />);
        expect(screen.getByText("No se encontró el contenido.")).toBeInTheDocument();
    });
});
