import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

const mocks = vi.hoisted(() => ({
    user: null,
    theme: "dark",
    toggle: vi.fn(),
    logout: vi.fn(),
}));

vi.mock("../contexts/ThemeContext.jsx", () => ({
    useTheme: () => ({ theme: mocks.theme, toggle: mocks.toggle }),
}));

vi.mock("../contexts/AuthContext.jsx", () => ({
    useAuth: () => ({ user: mocks.user, logout: mocks.logout }),
}));

const renderNavbar = () =>
    render(
        <MemoryRouter initialEntries={["/"]}>
            <Navbar />
        </MemoryRouter>
    );

beforeEach(() => {
    vi.clearAllMocks();
    mocks.user = null;
    mocks.theme = "dark";
});

describe("Navbar", () => {
    it("muestra el logo enlazado al inicio", () => {
        renderNavbar();
        expect(screen.getByRole("link", { name: "Cine & Teatro" })).toHaveAttribute("href", "/");
    });

    it("muestra los 4 enlaces del menú con sus rutas", () => {
        renderNavbar();
        expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Películas" })).toHaveAttribute("href", "/peliculas");
        expect(screen.getByRole("link", { name: "Obras" })).toHaveAttribute("href", "/obras");
        expect(screen.getByRole("link", { name: "Comunidad" })).toHaveAttribute("href", "/comunidad");
    });

    it("sin sesión ofrece iniciar sesión y no muestra controles de usuario", () => {
        renderNavbar();
        expect(screen.getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute("href", "/login");
        expect(screen.queryByRole("button", { name: "Salir" })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Mis compras" })).not.toBeInTheDocument();
    });

    it("con sesión muestra perfil, compras y salida", () => {
        mocks.user = { nombre: "Angelo", rol: "usuario" };
        renderNavbar();
        expect(screen.getByRole("link", { name: "Angelo" })).toHaveAttribute("href", "/perfil");
        expect(screen.getByRole("link", { name: "Mis compras" })).toHaveAttribute("href", "/historial");
        expect(screen.getByRole("button", { name: "Salir" })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Iniciar sesión" })).not.toBeInTheDocument();
    });

    it("solo muestra Admin si el rol es admin", () => {
        mocks.user = { nombre: "Angelo", rol: "admin" };
        const { unmount } = renderNavbar();
        expect(screen.getByRole("link", { name: "Admin" })).toHaveAttribute("href", "/admin");
        unmount();

        mocks.user = { nombre: "Angelo", rol: "usuario" };
        renderNavbar();
        expect(screen.queryByRole("link", { name: "Admin" })).not.toBeInTheDocument();
    });

    it("Salir cierra la sesión", () => {
        mocks.user = { nombre: "Angelo", rol: "usuario" };
        renderNavbar();
        fireEvent.click(screen.getByRole("button", { name: "Salir" }));
        expect(mocks.logout).toHaveBeenCalledTimes(1);
    });

    it("el botón de tema alterna y muestra el icono según el tema", () => {
        mocks.theme = "dark";
        const { unmount } = renderNavbar();
        const botonTema = screen.getByTitle("Cambiar tema");
        expect(botonTema.querySelector("i")).toHaveClass("bi-sun-fill");
        fireEvent.click(botonTema);
        expect(mocks.toggle).toHaveBeenCalledTimes(1);
        unmount();

        mocks.theme = "light";
        renderNavbar();
        expect(screen.getByTitle("Cambiar tema").querySelector("i")).toHaveClass("bi-moon-fill");
    });
});
