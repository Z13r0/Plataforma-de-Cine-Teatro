import { describe, expect, it } from "vitest";
import {
    formatearDuracion,
    mapearContenido,
    mapearListaContenidos,
} from "../api/mappers/contenidoMapper";

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
    generos: [{ idGenero: 1, nombre: "Aventura" }, { idGenero: 2, nombre: "Sci-Fi" }],
    directores: [{ idDirector: 1, nombre: "Denis Villeneuve" }],
    formatos: [{ idFormato: 1, tipoFormato: "IMAX" }],
    repartos: [{ idActor: 1, nombreActor: "Timothée Chalamet" }, { idActor: 2, nombreActor: "Zendaya" }],
};

describe("formatearDuracion", () => {
    it("convierte minutos a texto legible", () => {
        expect(formatearDuracion(165)).toBe("2h 45m");
        expect(formatearDuracion(120)).toBe("2h");
        expect(formatearDuracion(50)).toBe("50m");
        expect(formatearDuracion(0)).toBe("0m");
    });

    it("devuelve vacío con valores inválidos", () => {
        expect(formatearDuracion(null)).toBe("");
        expect(formatearDuracion(undefined)).toBe("");
        expect(formatearDuracion("abc")).toBe("");
    });
});

describe("mapearContenido", () => {
    it("traduce el DTO del backend al modelo de vista", () => {
        const vista = mapearContenido(DTO);

        expect(vista).toMatchObject({
            id: 3,
            tipo: "cine",
            titulo: "Sci-Fi Odyssey 2026",
            genero: ["Aventura", "Sci-Fi"],
            duracion: "2h 45m",
            clasificacion: "TE+7",
            formatos: ["IMAX"],
            director: "Denis Villeneuve",
            reparto: "Timothée Chalamet, Zendaya",
            valoracion: 4.6,
            imagen: "https://example.com/poster.jpg",
            sinopsis: "Una aventura intergaláctica.",
            activo: true,
            destacado: true,
        });
    });

    it("mapea el tipo de obra de teatro", () => {
        const vista = mapearContenido({ ...DTO, tipoContenido: "obra_teatro" });
        expect(vista.tipo).toBe("teatro");
    });

    it("usa tipo cine para tipos desconocidos", () => {
        const vista = mapearContenido({ ...DTO, tipoContenido: "desconocido" });
        expect(vista.tipo).toBe("cine");
    });

    it("mapea las clasificaciones por edad a sus etiquetas", () => {
        expect(mapearContenido({ ...DTO, clasificacionEdad: 0 }).clasificacion).toBe("TE");
        expect(mapearContenido({ ...DTO, clasificacionEdad: 7 }).clasificacion).toBe("TE+7");
        expect(mapearContenido({ ...DTO, clasificacionEdad: 14 }).clasificacion).toBe("+14");
        expect(mapearContenido({ ...DTO, clasificacionEdad: 18 }).clasificacion).toBe("+18");
        expect(mapearContenido({ ...DTO, clasificacionEdad: 21 }).clasificacion).toBe("+21");
    });

    it("usa null cuando el contenido no tiene valoración", () => {
        expect(mapearContenido({ ...DTO, valoracion: null }).valoracion).toBeNull();
        expect(mapearContenido({ ...DTO, valoracion: undefined }).valoracion).toBeNull();
    });

    it("tolera DTOs sin colecciones", () => {
        const vista = mapearContenido({
            ...DTO,
            generos: null,
            directores: null,
            formatos: null,
            repartos: null,
        });
        expect(vista.genero).toEqual([]);
        expect(vista.director).toBe("");
        expect(vista.reparto).toBe("");
        expect(vista.formatos).toEqual([]);
    });
});

describe("mapearListaContenidos", () => {
    it("mapea cada contenido de la lista", () => {
        const lista = mapearListaContenidos([
            DTO,
            { ...DTO, idContenido: 4, tipoContenido: "obra_teatro", valoracion: null },
        ]);

        expect(lista).toHaveLength(2);
        expect(lista[0]).toMatchObject({ id: 3, tipo: "cine", valoracion: 4.6 });
        expect(lista[1]).toMatchObject({ id: 4, tipo: "teatro", valoracion: null });
    });

    it("devuelve vacío sin contenidos", () => {
        expect(mapearListaContenidos()).toEqual([]);
    });
});
