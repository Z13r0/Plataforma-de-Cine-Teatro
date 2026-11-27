import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carousel from "../components/Carousel";
import { obtenerDestacados } from "../api/contenido";

// Se simula el servicio de contenido: el carrusel debe renderizar los destacados que devuelva
vi.mock("../api/contenido", () => ({
    obtenerDestacados: vi.fn(),
}));

const renderCarousel = () =>
    render(
        <MemoryRouter>
            <Carousel />
        </MemoryRouter>
    );

describe("Carousel", () => {
    beforeEach(() => {
        obtenerDestacados.mockReset();
    });

    it("Muestra el título 'Estrenos Destacados'", () => {
        obtenerDestacados.mockReturnValue(new Promise(() => {}));
        renderCarousel();
        expect(screen.getByText('Estrenos Destacados')).toBeTruthy();
    });

    it("Muestra el estado de carga mientras los destacados resuelven", () => {
        obtenerDestacados.mockReturnValue(new Promise(() => {}));
        renderCarousel();
        expect(screen.getByText(/cargando destacados/i)).toBeTruthy();
    });

    it("Muestra un estado vacío cuando no hay destacados", async () => {
        obtenerDestacados.mockResolvedValue([]);
        renderCarousel();
        expect(await screen.findByText(/aún no hay contenido destacado/i)).toBeTruthy();
        expect(screen.queryByRole("link")).toBeNull();
    });

    it("Muestra un mensaje de error si el servicio falla", async () => {
        obtenerDestacados.mockRejectedValue(new Error("falló el servicio"));
        renderCarousel();
        expect(await screen.findByText(/no se pudieron cargar los destacados/i)).toBeTruthy();
    });

    it("Renderiza los slides con sus enlaces y textos", async () => {
        obtenerDestacados.mockResolvedValue([
            {
                id: 3,
                tipo: "cine",
                titulo: "Sci-Fi Odyssey 2026",
                imagen: "https://example.com/cine.jpg",
                descripcion: "Una aventura intergaláctica sin precedentes en formato IMAX.",
                enlace: "/contenido/cine/3",
                etiqueta: "Estreno de Cine",
                insignia: "bg-warning text-dark",
                boton: "btn-danger",
                textoBoton: "Ver Funciones",
            },
            {
                id: 103,
                tipo: "teatro",
                titulo: "El Fantasma de la Ópera",
                imagen: "https://example.com/teatro.jpg",
                descripcion: "La obra clásica vuelve al escenario principal en vivo.",
                enlace: "/contenido/teatro/103",
                etiqueta: "Gran Obra de Teatro",
                insignia: "bg-primary",
                boton: "btn-primary",
                textoBoton: "Reservar Butacas",
            },
        ]);
        renderCarousel();

        expect(await screen.findByText("Sci-Fi Odyssey 2026")).toBeTruthy();
        expect(screen.getByText("El Fantasma de la Ópera")).toBeTruthy();

        const enlaceCine = screen.getByRole("link", { name: /ver funciones/i });
        expect(enlaceCine.getAttribute("href")).toBe("/contenido/cine/3");

        const enlaceTeatro = screen.getByRole("link", { name: /reservar butacas/i });
        expect(enlaceTeatro.getAttribute("href")).toBe("/contenido/teatro/103");
    });

    it("Genera un indicador por cada destacado (N dinámico)", async () => {
        obtenerDestacados.mockResolvedValue([
            { id: 1, tipo: "cine", titulo: "Inception Matrix", imagen: "img1", descripcion: "Uno", enlace: "/contenido/cine/1", etiqueta: "Estreno de Cine", insignia: "bg-warning text-dark", boton: "btn-danger", textoBoton: "Ver Funciones" },
            { id: 2, tipo: "cine", titulo: "Misterio en la Noche", imagen: "img2", descripcion: "Dos", enlace: "/contenido/cine/2", etiqueta: "Estreno de Cine", insignia: "bg-warning text-dark", boton: "btn-danger", textoBoton: "Ver Funciones" },
            { id: 103, tipo: "teatro", titulo: "El Fantasma de la Ópera", imagen: "img3", descripcion: "Tres", enlace: "/contenido/teatro/103", etiqueta: "Gran Obra de Teatro", insignia: "bg-primary", boton: "btn-primary", textoBoton: "Reservar Butacas" },
        ]);
        const { container } = renderCarousel();

        await screen.findByText("El Fantasma de la Ópera");

        const indicadores = container.querySelectorAll(".carousel-indicators button");
        const slides = container.querySelectorAll(".carousel-item");

        expect(indicadores.length).toBe(3);
        expect(slides.length).toBe(3);
        // Solo el primer slide queda activo
        expect(container.querySelectorAll(".carousel-item.active").length).toBe(1);
    });
});
