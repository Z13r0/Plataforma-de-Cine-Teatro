import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Card from "../components/Card";

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
    sinopsis: "Un ladrón que roba secretos corporativos.",
    activo: true,
    destacado: false,
};

const renderCard = (contenido) =>
    render(
        <MemoryRouter>
            <Card contenido={contenido} />
        </MemoryRouter>
    );

describe("Card (cine)", () => {
    it("muestra título, géneros, duración y valoración", () => {
        renderCard(PELICULA);
        expect(screen.getByText("Inception Matrix")).toBeTruthy();
        expect(screen.getByText("Acción, Ciencia Ficción")).toBeTruthy();
        expect(screen.getByText("2h 28m")).toBeTruthy();
        expect(screen.getByText(/4\.8/)).toBeTruthy();
    });

    it("muestra '—' cuando el contenido no tiene valoración", () => {
        renderCard({ ...PELICULA, valoracion: null });
        expect(screen.getByText(/—/)).toBeTruthy();
    });

    it("no renderiza nada si el contenido es nulo", () => {
        const { container } = renderCard(null);
        expect(container.firstChild).toBeNull();
    });

    it("tipo de card desconocido entra en tipo cine", () => {
        renderCard({ ...PELICULA, tipo: "serie" });
        expect(screen.getByText("Cine")).toBeTruthy();
    });

    it("el enlace 'Ver Detalle' apunta al detalle con el tipo y el id", () => {
        renderCard(PELICULA);
        const enlace = screen.getByRole("link", { name: /ver detalle/i });
        expect(enlace.getAttribute("href")).toBe("/contenido/cine/777");
    });
});
