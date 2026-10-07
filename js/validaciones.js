// js/validaciones.js
// Validaciones de formularios (email, términos, contraseña)

const Validaciones = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@(gmail\.com|duocuc\.cl|hotmail\.com|outlook\.com|yahoo\.com)$/i,

  DOMINIOS_PERMITIDOS: ["gmail.com", "duocuc.cl", "hotmail.com", "outlook.com", "yahoo.com"],

  emailValido(email) {
    if (!email || typeof email !== "string") return false;
    return this.EMAIL_REGEX.test(email.trim());
  },

  mensajeEmailInvalido() {
    return "El correo debe ser @gmail.com, @duocuc.cl, @hotmail.com, @outlook.com o @yahoo.com";
  },

  passwordValida(pass) {
    return typeof pass === "string" && pass.length >= 6;
  },

  terminosAceptados(checkbox) {
    return checkbox && checkbox.checked === true;
  },

  nombreValido(nombre) {
    return typeof nombre === "string" && nombre.trim().length >= 2;
  }
};

// Export para Node/Jasmine si existe module
if (typeof module !== "undefined" && module.exports) {
  module.exports = Validaciones;
}