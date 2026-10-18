import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Card from "../components/Card";

const renderCard = (datos) =>
    render(
        <MemoryRouter>
            <Card {...datos}/>
        </MemoryRouter>
    );

describe("Card (cine)",() =>{
    it("muestra título, géneros, duración y valoración", () => {
        renderCard({id:1});
        expect(screen.getByText("Inception Matrix")).toBeTruthy();
        expect(screen.getByText("Acción, Ciencia Ficción")).toBeTruthy();
        expect(screen.getByText("2h 28m")).toBeTruthy();
        expect(screen.getByText(/4\.8/)).toBeTruthy();
    });
    it("no renderiza nada si el id no existe", () => {
        const { container } = renderCard({ id: 999 });
        expect(container.firstChild).toBeNull();
    });
    it("tipo de card desconocido entra en tipo cine", () => {
        renderCard({ id: 1, tipo: "serie"});
        expect(screen.getByText("Cine")).toBeTruthy();
    })
});