
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Footer from "../components/Footer";

afterEach(cleanup);

describe("Footer", () => {

  it("muestra el Footer", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });

  it("muestra el nombre del proyecto", () => {
    render(<Footer />);

    expect(screen.getByText(/Cine & Teatro/i)).toBeTruthy();
  });

});
