import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cartelera from "../components/Cartelera";
import { listarContenidos } from "../api/contenido";

// Se simula el servicio de contenido: la cartelera debe renderizar lo que devuelva
vi.mock("../api/contenido", () => ({
    listarContenidos: vi.fn(),
}));

const CATALOGO = [
    {
        id: 3,
        tipo: "cine",
        titulo: "Sci-Fi Odyssey 2026",
        genero: ["Aventura"],
        duracion: "2h 45m",
        clasificacion: "TE",
        formatos: ["2D"],
        director: "Denis Villeneuve",
        reparto: "Timothée Chalamet",
        valoracion: 4.9,
        imagen: "https://example.com/1.jpg",
        sinopsis: "Una sinopsis.",
        activo: true,
        destacado: false,
    },
    {
        id: 4,
        tipo: "cine",
        titulo: "Cyberpunk Protocol",
        genero: ["Acción"],
        duracion: "2h 5m",
        clasificacion: "+18",
        formatos: ["2D"],
        director: "Lana Wachowski",
        reparto: "Keanu Reeves",
        valoracion: 4.3,
        imagen: "https://example.com/2.jpg",
        sinopsis: "Otra sinopsis.",
        activo: true,
        destacado: false,
    },
    {
        id: 103,
        tipo: "teatro",
        titulo: "El Fantasma de la Ópera",
        genero: ["Musical"],
        duracion: "2h 20m",
        clasificacion: "TE",
        formatos: ["Sala Principal"],
        director: "Andrew Lloyd Webber",
        reparto: "Orquesta y Coro",
        valoracion: 5.0,
        imagen: "https://example.com/3.jpg",
        sinopsis: "La obra clásica.",
        activo: true,
        destacado: true,
    },
];

const renderCartelera = () =>
    render(
        <MemoryRouter>
            <Cartelera />
        </MemoryRouter>
    );

beforeEach(() => {
    localStorage.clear();
    listarContenidos.mockReset();
});

describe("Cartelera", () => {
    it("muestra los encabezados Peliculas y Obras", () => {
        listarContenidos.mockResolvedValue(CATALOGO);
        renderCartelera();
        expect(screen.getByRole("heading", { level: 2, name: "Peliculas" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 2, name: "Obras" })).toBeInTheDocument();
    });

    it("muestra el estado de carga mientras el catálogo resuelve", () => {
        listarContenidos.mockReturnValue(new Promise(() => {}));
        renderCartelera();
        expect(screen.getByText(/cargando cartelera/i)).toBeInTheDocument();
    });

    it("renderiza una tarjeta por contenido del catálogo", async () => {
        listarContenidos.mockResolvedValue(CATALOGO);
        renderCartelera();
        const enlaces = await screen.findAllByRole("link", { name: "Ver Detalle" });
        expect(enlaces).toHaveLength(3);
    });

    it("cada tarjeta enlaza a su detalle con el tipo correcto", async () => {
        listarContenidos.mockResolvedValue(CATALOGO);
        renderCartelera();
        const enlaces = await screen.findAllByRole("link", { name: "Ver Detalle" });
        expect(enlaces[0]).toHaveAttribute("href", "/contenido/cine/3");
        expect(enlaces[1]).toHaveAttribute("href", "/contenido/cine/4");
        expect(enlaces[2]).toHaveAttribute("href", "/contenido/teatro/103");
    });

    it("muestra un mensaje de error si el servicio falla", async () => {
        listarContenidos.mockRejectedValue(new Error("falló el servicio"));
        renderCartelera();
        expect(await screen.findByText(/no se pudo cargar la cartelera/i)).toBeInTheDocument();
    });
});
