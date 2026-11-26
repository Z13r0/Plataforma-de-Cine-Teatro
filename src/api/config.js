/**
 * config.js — Configuración global del frontend.
 * La URL base del gateway se define en los archivos .env (VITE_API_URL).
 * El valor por defecto evita romper la app si la variable no está definida.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
