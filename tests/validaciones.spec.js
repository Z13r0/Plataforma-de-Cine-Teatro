describe("Validaciones", function () {
  it("acepta correos @gmail.com y @duocuc.cl", function () {
    expect(Validaciones.emailValido("alumno@duocuc.cl")).toBe(true);
    expect(Validaciones.emailValido("user@gmail.com")).toBe(true);
  });

  it("rechaza dominios no permitidos", function () {
    expect(Validaciones.emailValido("user@empresa.com")).toBe(false);
    expect(Validaciones.emailValido("sin-arroba")).toBe(false);
  });

  it("valida contraseña mínimo 6 caracteres", function () {
    expect(Validaciones.passwordValida("123456")).toBe(true);
    expect(Validaciones.passwordValida("123")).toBe(false);
  });

  it("exige términos aceptados", function () {
    expect(Validaciones.terminosAceptados({ checked: true })).toBe(true);
    expect(Validaciones.terminosAceptados({ checked: false })).toBe(false);
  });
});