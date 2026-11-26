import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { listarContenidos, listarDestacados, obtenerContenido } from "../api/contenido";

const DTO = {
    idContenido: 3,
    titulo: "Sci-Fi Odyssey 2026",
    tipoContenido: "pelicula",
    duracionMinutos: 165,
    clasificacionEdad: 7,
    sinopsis: "Una aventura intergaláctica.",
    posterUrl: "https://example.com/poster.jpg",
    activo: true,
    destacado: true,
    valoracion: 4.6,
    generos: [{ idGenero: 1, nombre: "Aventura" }],
    directores: [{ idDirector: 1, nombre: "Denis Villeneuve" }],
    formatos: [{ idFormato: 1, tipoFormato: "IMAX" }],
    repartos: [{ idActor: 1, nombreActor: "Timothée Chalamet" }],
};

function respuestaOk(datos) {
    return { ok: true, status: 200, json: async () => datos };
}

function respuestaError(status) {
    return { ok: false, status, json: async () => ({}) };
}

/** Simula fetch devolviendo la respuesta indicada. */
function simularFetch(respuesta) {
    global.fetch = vi.fn().mockResolvedValue(respuesta);
}

beforeEach(() => {
    global.fetch = vi.fn();
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe("listarContenidos", () => {
    it("mapea el catálogo y excluye el contenido inactivo", async () => {
        simularFetch(respuestaOk([DTO, { ...DTO, idContenido: 4, activo: false }]));

        const lista = await listarContenidos();

        expect(lista).toHaveLength(1);
        expect(lista[0]).toMatchObject({
            id: 3,
            tipo: "cine",
            titulo: "Sci-Fi Odyssey 2026",
            valoracion: 4.6,
        });
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/api/v1/contenidos"));
    });

    it("propaga el error si el catálogo no responde", async () => {
        simularFetch(respuestaError(500));

        await expect(listarContenidos()).rejects.toThrow(/Error 500/);
    });
});

describe("obtenerContenido", () => {
    it("devuelve el contenido mapeado", async () => {
        simularFetch(respuestaOk(DTO));

        const contenido = await obtenerContenido(3);

        expect(contenido).toMatchObject({ id: 3, tipo: "cine", titulo: "Sci-Fi Odyssey 2026" });
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/api/v1/contenidos/3"));
    });

    it("devuelve null si el contenido no existe (404)", async () => {
        simularFetch(respuestaError(404));

        expect(await obtenerContenido(999)).toBeNull();
    });

    it("devuelve null si el contenido no está activo", async () => {
        simularFetch(respuestaOk({ ...DTO, activo: false }));

        expect(await obtenerContenido(3)).toBeNull();
    });

    it("propaga errores del servidor distintos de 404", async () => {
        simularFetch(respuestaError(500));

        await expect(obtenerContenido(3)).rejects.toThrow(/Error 500/);
    });
});

describe("listarDestacados", () => {
    it("mapea el contenido destacado", async () => {
        simularFetch(respuestaOk([DTO]));

        const destacados = await listarDestacados();

        expect(destacados).toHaveLength(1);
        expect(destacados[0]).toMatchObject({ id: 3, destacado: true });
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/api/v1/contenidos/destacados"));
    });
});
