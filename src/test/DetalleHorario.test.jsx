import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DetalleHorario from "../components/DetalleHorario";

const HOY = new Date(2026, 9, 17);

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(HOY);
    localStorage.clear();
});

afterEach(() => {
    vi.useRealTimers();
});

describe("DetalleHorario", () => {
    it("muestra el título HORARIO", () => {
        render(<DetalleHorario id={1} />);
        expect(screen.getByRole("heading", { level: 2, name: "HORARIO" })).toBeInTheDocument();
    });

    it("muestra 5 días y el primero como HOY", () => {
        render(<DetalleHorario id={1} />);
        expect(screen.getAllByRole("button")).toHaveLength(5);
        expect(screen.getByRole("button", { name: /HOY\s*17\/10/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /DOM\s*18\/10/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /LUN\s*19\/10/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /MAR\s*20\/10/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /MIÉ\s*21\/10/ })).toBeInTheDocument();
    });

    it("lista los horarios de hoy", () => {
        render(<DetalleHorario id={1} />);
        const horarios = screen.getAllByRole("link", { name: /^\d{2}:\d{2} h$/ });
        expect(horarios).toHaveLength(2);
        expect(screen.getByRole("link", { name: "16:45 h" })).toHaveAttribute("href", "#");
        expect(screen.getByRole("link", { name: "21:45 h" })).toBeInTheDocument();
    });

    it("cambia los horarios al elegir otro día", () => {
        render(<DetalleHorario id={1} />);
        fireEvent.click(screen.getByRole("button", { name: /LUN\s*19\/10/ }));
        expect(screen.getByRole("link", { name: "21:45 h" })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "16:45 h" })).not.toBeInTheDocument();
    });

    it("muestra 'No hay funciones disponibles.' en un día sin funciones", () => {
        render(<DetalleHorario id={1} />);
        fireEvent.click(screen.getByRole("button", { name: /MAR\s*20\/10/ }));
        expect(screen.getByText("No hay funciones disponibles.")).toBeInTheDocument();
        expect(screen.queryAllByRole("link", { name: /^\d{2}:\d{2} h$/ })).toHaveLength(0);
    });

    it("muestra el mensaje si el contenido no tiene funciones", () => {
        render(<DetalleHorario id={7} />);
        expect(screen.getByText("No hay funciones disponibles.")).toBeInTheDocument();
    });
});
