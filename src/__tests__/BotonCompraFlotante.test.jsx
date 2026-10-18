/**
 * Pruebas unitarias de BotonCompraFlotante
 * Verifica: que solo se muestra en Inicio y que abre el modal
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import BotonCompraFlotante from "../components/BotonCompraFlotante";

function renderEnRuta(ruta = "/") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <BotonCompraFlotante />
    </MemoryRouter>
  );
}

describe("BotonCompraFlotante", () => {
  it("se muestra en la página de Inicio", () => {
    renderEnRuta("/");
    expect(screen.getByText(/Compra Rápida/i)).toBeInTheDocument();
  });

  it("NO se muestra en /peliculas", () => {
    renderEnRuta("/peliculas");
    expect(screen.queryByText(/Compra Rápida/i)).not.toBeInTheDocument();
  });

  it("abre el modal al hacer clic", () => {
    renderEnRuta("/");
    fireEvent.click(screen.getByText(/Compra Rápida/i));
    // El modal debe mostrar el título o el selector de tipo
    expect(screen.getByText(/Películas/i)).toBeInTheDocument();
    expect(screen.getByText(/Obras/i)).toBeInTheDocument();
  });
});