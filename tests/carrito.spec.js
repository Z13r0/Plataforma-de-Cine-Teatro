describe("Carrito", function () {
  beforeEach(function () {
    localStorage.clear();
  });

  it("inicia vacío", function () {
    const c = Carrito.get();
    expect(c.butacas).toEqual([]);
    expect(c.confiteria).toEqual([]);
  });

  it("calcula total con entradas y cargo", function () {
    const c = Carrito.get();
    c.entradas = [{ nombre: "General", cantidad: 2, precio: 5000 }];
    c.cargoServicio = 1400;
    c.confiteria = [];
    Carrito.save(c);
    const t = Carrito.calcular();
    expect(t.subEntradas).toBe(10000);
    expect(t.total).toBe(11400);
  });

  it("limpia el carrito", function () {
    Carrito.save({ titulo: "Test" });
    Carrito.clear();
    expect(Carrito.get().titulo).toBe("");
  });
});