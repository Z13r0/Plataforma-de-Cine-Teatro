import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carousel from "../components/Carousel";

const renderCarousel = () =>
    render(
        <MemoryRouter>
            <Carousel/>
        </MemoryRouter>
    );

describe("Carousel", () => {
    it("Muestra el título 'Estrenos Destacados'",() => {
        renderCarousel();
        expect(screen.getByText('Estrenos Destacados')).toBeTruthy();
    })
    it("El boton 'Ver Funciones' apunta a /contenido/cine/i", () => {
        renderCarousel();
        const enlace = screen.getByRole("link", { name: /ver funciones/i});
        expect(enlace.getAttribute("href")).toBe("/contenido/cine/3");
    })
    it("El boton 'Reservar Butacas' apunta a /contenido/teatro/i", () => {
        renderCarousel();
        const enlace = screen.getByRole("link", { name: /reservar butacas/i});
        expect(enlace.getAttribute("href")).toBe("/contenido/teatro/103");
    })
});