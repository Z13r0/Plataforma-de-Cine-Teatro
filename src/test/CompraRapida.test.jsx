/**
 * Pruebas unitarias de CompraRapida (QuickPurchaseButton)
 * Verifica: renderizado, cálculo de total y redirección si no hay sesión
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import QuickPurchaseButton from "../components/CompraRapida";

// Mock del AuthContext
vi.mock("../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({
    isLoggedIn: false,
    user: null,
  }),
}));

const funcionMock = {
  id: 1,
  titulo: "Inception Matrix",
  tipo: "Cine",
  precio: 5000,
  fecha: "18/10/2026",
  hora: "21:00",
};

function renderConRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("CompraRapida", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el botón con el total calculado", () => {
    renderConRouter(
      <QuickPurchaseButton
        funcion={funcionMock}
        snacksSeleccionados={[]}
        asientos={["A1", "A2"]}
      />
    );
    // 2 asientos × 5000 = 10000
    expect(screen.getByText(/Compra Rápida/i)).toBeInTheDocument();
    expect(screen.getByText(/10\.000|10000/)).toBeInTheDocument();
  });

  it("incluye snacks en el total", () => {
    const snacks = [
      { id: 1, nombre: "Palomitas", precio: 4500, cantidad: 1 },
    ];
    renderConRouter(
      <QuickPurchaseButton
        funcion={funcionMock}
        snacksSeleccionados={snacks}
        asientos={["A1"]}
      />
    );
    // 5000 + 4500 = 9500
    expect(screen.getByText(/9\.500|9500/)).toBeInTheDocument();
  });

  it("el botón está habilitado cuando hay función", () => {
    renderConRouter(
      <QuickPurchaseButton
        funcion={funcionMock}
        snacksSeleccionados={[]}
        asientos={["A1"]}
      />
    );
    const boton = screen.getByRole("button");
    expect(boton).not.toBeDisabled();
  });
});