/**
 * Pruebas unitarias de SelectorSilla (SeatSelector)
 * Verifica: renderizado de asientos, selección y límite
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SeatSelector from "../components/SelectorSilla"; // ajusta el nombre

describe("SelectorSilla", () => {
  it("renderiza el título de selección de butacas", () => {
    render(<SeatSelector salaId="S2" value={[]} onChange={() => {}} />);
    expect(screen.getByText(/Selecciona tus butacas/i)).toBeInTheDocument();
  });

  it("muestra asientos disponibles como botones", () => {
    render(<SeatSelector salaId="S2" value={[]} onChange={() => {}} />);
    // Debe haber varios botones de asientos (A1, A2, etc.)
    const botones = screen.getAllByRole("button");
    expect(botones.length).toBeGreaterThan(5);
  });

  it("llama a onChange al seleccionar un asiento", () => {
    const mockOnChange = vi.fn();
    render(<SeatSelector salaId="S2" value={[]} onChange={mockOnChange} />);

    // Clic en el primer asiento disponible (no disabled)
    const asientos = screen.getAllByRole("button").filter(
      (btn) => !btn.disabled && /^[A-H]\d+$/.test(btn.textContent)
    );
    fireEvent.click(asientos[0]);

    expect(mockOnChange).toHaveBeenCalled();
    const seleccion = mockOnChange.mock.calls[0][0];
    expect(Array.isArray(seleccion)).toBe(true);
    expect(seleccion.length).toBe(1);
  });

  it("muestra los asientos ya seleccionados (value)", () => {
    render(
      <SeatSelector
        salaId="S2"
        value={["A1", "A2"]}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/A1, A2/i)).toBeInTheDocument();
  });
});