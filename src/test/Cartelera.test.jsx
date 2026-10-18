import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cartelera from "../components/Cartelera";

const renderCartelera = () =>
    render(
        <MemoryRouter>
            <Cartelera />
        </MemoryRouter>
    );

beforeEach(() => localStorage.clear());

describe("Cartelera", () => {
    it("muestra los encabezados Peliculas y Obras", () => {
        renderCartelera();
        expect(screen.getByRole("heading", { level: 2, name: "Peliculas" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 2, name: "Obras" })).toBeInTheDocument();
    });

    it("renderiza las 13 tarjetas", () => {
        renderCartelera();
        expect(screen.getAllByRole("link", { name: "Ver Detalle" })).toHaveLength(13);
    });

    it("cada tarjeta enlaza a su detalle con el tipo correcto", () => {
        renderCartelera();
        const enlaces = screen.getAllByRole("link", { name: "Ver Detalle" });
        expect(enlaces[0]).toHaveAttribute("href", "/contenido/cine/1");
        expect(enlaces[7]).toHaveAttribute("href", "/contenido/cine/8");
        expect(enlaces[8]).toHaveAttribute("href", "/contenido/teatro/101");
        expect(enlaces[12]).toHaveAttribute("href", "/contenido/teatro/105");
    });
});
