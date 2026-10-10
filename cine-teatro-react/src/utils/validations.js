export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@(gmail\.com|duocuc\.cl|hotmail\.com|outlook\.com|yahoo\.com)$/i;

export function emailValido(email) {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
}

export function mensajeEmailInvalido() {
  return "El correo debe ser @gmail.com, @duocuc.cl, @hotmail.com, @outlook.com o @yahoo.com";
}

export function passwordValida(pass) {
  return typeof pass === "string" && pass.length >= 6;
}

export function nombreValido(nombre) {
  return typeof nombre === "string" && nombre.trim().length >= 2;
}