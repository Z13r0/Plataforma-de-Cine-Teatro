

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Buscador from "../components/Buscador";

afterEach(cleanup);

describe("Buscador", () => {

  it("muestra el buscador", () => {
    render(<Buscador filtros={{}} generos={[]} onCambiar={() => {}} />);

    expect(screen.getByPlaceholderText("Buscar por título...")).toBeTruthy();
  });

  it("permite escribir una película", () => {
    const cambiar = vi.fn();

    render(
      <Buscador
        filtros={{ texto: "", genero: "", clasificacion: "" }}
        generos={[]}
        onCambiar={cambiar}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Buscar por título..."), {
      target: { value: "Batman" }
    });

    expect(cambiar).toHaveBeenCalled();
  });

});
