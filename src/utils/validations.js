/* 
    Este patron de expresion regular valida que el correo sea de los dominios: gmail.com, duocuc.cl, hotmail.com, outlook.com o yahoo.com
    y que cumpla con el formato general de un correo electrónico. 
*/

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duocuc\.cl|hotmail\.com|outlook\.com|yahoo\.com)$/i;

// Esta función valida si un correo electrónico es válido según el patrón definido anteriormente.

export function emailValido(email) {
    return EMAIL_REGEX.test(String(email || "").trim());
}

// Esta función valida si una contraseña es válida, asegurándose de que sea una cadena de texto y tenga al menos 6 caracteres.

export function passwordValida(password) {
  return typeof password === "string" && password.length >= 6;
}

// Esta función valida si un nombre es válido, asegurándose de que sea una cadena de texto y tenga al menos 2 caracteres.

export function nombreValido(nombre) {
  return typeof nombre === "string" && nombre.trim().length >= 2;
}