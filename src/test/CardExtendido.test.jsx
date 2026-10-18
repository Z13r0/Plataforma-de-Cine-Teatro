import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CardExtendido from "../components/CardExtendido";

const renderCard = (datos) =>
    render(
        <MemoryRouter>
            <CardExtendido {...datos} />
        </MemoryRouter>
    );

beforeEach(() => localStorage.clear());

describe("CardExtendido (cine)", () => {
    it("muestra título, géneros, clasificación, duración y sinopsis", () => {
        renderCard({ id: 1 });
        expect(screen.getByText("Inception Matrix")).toBeInTheDocument();
        expect(screen.getByText("Acción / Ciencia Ficción")).toBeInTheDocument();
        expect(screen.getByText("TE+7")).toBeInTheDocument();
        expect(screen.getByText("2h 28m")).toBeInTheDocument();
        expect(screen.getByText(/roba secretos corporativos/)).toBeInTheDocument();
    });

    it("muestra la imagen con el título como texto alternativo", () => {
        renderCard({ id: 1 });
        expect(screen.getByRole("img", { name: "Inception Matrix" })).toBeInTheDocument();
    });

    it("el enlace 'Ver detalle' apunta a /contenido/cine/1", () => {
        renderCard({ id: 1 });
        const enlace = screen.getByRole("link", { name: "Ver detalle" });
        expect(enlace).toHaveAttribute("href", "/contenido/cine/1");
    });
});

describe("CardExtendido sin funciones", () => {
    it("muestra 'Sin funciones disponibles' cuando no hay horarios", () => {
        renderCard({ id: 7 });
        expect(screen.getByText("Velocidad Extrema")).toBeInTheDocument();
        expect(screen.getByText("Sin funciones disponibles")).toBeInTheDocument();
        expect(screen.queryAllByRole("link", { name: /^\d{2}:\d{2}$/ })).toHaveLength(0);
    });
});

describe("CardExtendido (teatro)", () => {
    it("muestra la obra, sus 2 horarios y el enlace correcto", () => {
        renderCard({ id: 101, tipo: "teatro" });
        expect(screen.getByText("Hamlet Clásico")).toBeInTheDocument();
        expect(screen.getAllByRole("link", { name: /^\d{2}:\d{2}$/ })).toHaveLength(2);
        const enlace = screen.getByRole("link", { name: "Ver detalle" });
        expect(enlace).toHaveAttribute("href", "/contenido/teatro/101");
    });
});

describe("CardExtendido (casos borde)", () => {
    it("no renderiza nada si el id no existe", () => {
        const { container } = renderCard({ id: 9999 });
        expect(container.firstChild).toBeNull();
    });
});
