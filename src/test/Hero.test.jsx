import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Hero from "../components/Hero";

describe ("Hero", () => {
    it("El boton 'Ver Películas' redirige a /peliculas", () => {
        render(
            <MemoryRouter>
                <Hero/>
            </MemoryRouter>
        );
        const enlace = screen.getByRole("link", {name: /Ver Películas/});
        expect(enlace.getAttribute("href")).toBe("/peliculas")
    });
    it("El boton 'Ver Obras' redirige a /obras", () => {
        render(
            <MemoryRouter>
                <Hero/>
            </MemoryRouter>
        );
        const enlace = screen.getByRole("link", {name: /Ver Obras/});
        expect(enlace.getAttribute("href")).toBe("/obras")
    });
});