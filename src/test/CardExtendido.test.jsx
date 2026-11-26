import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CardExtendido from "../components/CardExtendido";

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

const OBRA = {
    id: 888,
    tipo: "teatro",
    titulo: "Hamlet Clásico",
    genero: ["Drama"],
    duracion: "2h",
    clasificacion: "TE+7",
    formatos: ["Sala Principal"],
    director: "Laurence Olivier",
    reparto: "Elenco Nacional de Teatro",
    valoracion: 4.9,
    imagen: "https://example.com/obra.jpg",
    sinopsis: "La tragedia inmortal del príncipe de Dinamarca.",
    activo: true,
    destacado: true,
};

const renderCard = (contenido) =>
    render(
        <MemoryRouter>
            <CardExtendido contenido={contenido} />
        </MemoryRouter>
    );

describe("CardExtendido (cine)", () => {
    it("muestra título, géneros, clasificación, duración y sinopsis", () => {
        renderCard(PELICULA);
        expect(screen.getByText("Inception Matrix")).toBeInTheDocument();
        expect(screen.getByText("Acción / Ciencia Ficción")).toBeInTheDocument();
        expect(screen.getByText("TE+7")).toBeInTheDocument();
        expect(screen.getByText("2h 28m")).toBeInTheDocument();
        expect(screen.getByText(/roba secretos corporativos/)).toBeInTheDocument();
    });

    it("muestra la imagen con el título como texto alternativo", () => {
        renderCard(PELICULA);
        expect(screen.getByRole("img", { name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("el enlace 'Ver detalle' apunta a /contenido/cine/777", () => {
        renderCard(PELICULA);
        const enlace = screen.getByRole("link", { name: "Ver detalle" });
        expect(enlace).toHaveAttribute("href", "/contenido/cine/777");
    });
});

describe("CardExtendido sin funciones", () => {
    it("muestra 'Próximamente funciones' hasta que exista el ms de funciones", () => {
        renderCard(PELICULA);
        expect(screen.getByText("Próximamente funciones")).toBeInTheDocument();
        expect(screen.queryAllByRole("link", { name: /^\d{2}:\d{2}$/ })).toHaveLength(0);
    });
});

describe("CardExtendido (teatro)", () => {
    it("muestra la obra y el enlace con el tipo teatro", () => {
        renderCard(OBRA);
        expect(screen.getByText("Hamlet Clásico")).toBeInTheDocument();
        const enlace = screen.getByRole("link", { name: "Ver detalle" });
        expect(enlace).toHaveAttribute("href", "/contenido/teatro/888");
    });
});

describe("CardExtendido (casos borde)", () => {
    it("no renderiza nada si el contenido es nulo", () => {
        const { container } = renderCard(null);
        expect(container.firstChild).toBeNull();
    });
});
