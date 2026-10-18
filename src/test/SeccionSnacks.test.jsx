/**
 * Pruebas unitarias de SeccionSnacks (SnacksSection)
 * Verifica: renderizado, selección de cantidades y callback onChange
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SnacksSection from "../components/SeccionSnacks"; // ajusta el nombre si es SnacksSection

describe("SeccionSnacks", () => {
  it("muestra el título de confitería de cine por defecto", () => {
    render(<SnacksSection tipo="cine" onChange={() => {}} />);
    expect(screen.getByText(/Confitería de Cine/i)).toBeInTheDocument();
  });

  it("muestra confitería de teatro cuando tipo es teatro", () => {
    render(<SnacksSection tipo="teatro" onChange={() => {}} />);
    expect(screen.getByText(/Confitería de Teatro/i)).toBeInTheDocument();
  });

  it("llama a onChange al aumentar la cantidad de un snack", () => {
    const mockOnChange = vi.fn();
    render(<SnacksSection tipo="cine" onChange={mockOnChange} />);

    // Busca el primer botón "+"
    const botonesMas = screen.getAllByRole("button", { name: "+" });
    fireEvent.click(botonesMas[0]);

    // Debe haberse llamado onChange con un array
    expect(mockOnChange).toHaveBeenCalled();
    const argument = mockOnChange.mock.calls[0][0];
    expect(Array.isArray(argument)).toBe(true);
    expect(argument.length).toBeGreaterThan(0);
    expect(argument[0]).toHaveProperty("cantidad", 1);
  });

  it("muestra el total cuando hay snacks seleccionados", () => {
    render(<SnacksSection tipo="cine" onChange={() => {}} />);

    const botonesMas = screen.getAllByRole("button", { name: "+" });
    fireEvent.click(botonesMas[0]);

    expect(screen.getByText(/Total confitería/i)).toBeInTheDocument();
  });
});