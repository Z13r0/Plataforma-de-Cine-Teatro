
# Plataforma de Cine & Teatro

Prototipo académico de reserva de entradas para cine y teatro.  
Inspirado en la experiencia de sitios como Cinemark (cartelera, compra rápida, confitería, butacas y pago).

**Institución:** Duoc UC  
**Año:** 2026  
**Stack:** HTML5, CSS3, JavaScript (ES6), Bootstrap 5.3, localStorage, Jasmine, Karma

---

## Características

- Cartelera de películas y obras reales (posters, géneros, año, formatos 2D/IMAX/etc.)
- Tema claro / oscuro persistente
- Navbar sticky estilo Cinemark
- Compra rápida (panel lateral)
- Carrusel de destacados y sección de próximos estrenos
- Detalle con horarios y restricciones
- Selección de butacas y confitería (distinta para cine y teatro)
- Pago simulado con opción invitado, login o registro
- Validación de correo (dominios permitidos) y Términos y Condiciones obligatorios
- Historial de compras y entrada digital (QR demo)
- Comunidad (comentarios en localStorage)
- Tests unitarios con Jasmine y Karma

---

## Dominios de correo permitidos

Solo se aceptan correos con estos dominios:

- gmail.com
- duocuc.cl
- hotmail.com
- outlook.com
- yahoo.com

El registro y el inicio de sesión **requieren** aceptar los Términos y Condiciones.

### Cuenta administrador (demo)

| Campo        | Valor            |
|--------------|------------------|
| Correo       | admin@duocuc.cl  |
| Contraseña   | admin123         |

---

## Estructura del proyecto

```
/
├── index.html
├── peliculas.html
├── obras.html
├── detalle.html
├── butacas.html
├── confiteria.html
├── pago.html
├── entradas.html
├── historial.html
├── login.html
├── registro.html
├── comunidad.html
├── perfil.html
├── admin.html
├── css/
│   └── styles.css
├── js/
│   ├── theme.js
│   ├── app.js
│   ├── datos.js
│   ├── validaciones.js
│   ├── carrito.js
│   ├── compra-rapida.js
│   ├── peliculas.js
│   ├── obras.js
│   ├── detalle.js
│   ├── butacas.js
│   ├── confiteria.js
│   ├── pago.js
│   ├── entradas.js
│   ├── historial.js
│   ├── login.js
│   ├── registro.js
│   └── comunidad.js
├── tests/
│   ├── validaciones.spec.js
│   └── carrito.spec.js
├── karma.conf.js
├── package.json
└── README.md
```

---

## Flujo de compra

1. Cartelera, compra rápida o detalle de la película/obra  
2. Elección de horario  
3. Selección de butacas  
4. Confitería (opcional)  
5. Pago (invitado o con cuenta) y aceptación de términos  
6. Entrada digital  

El carrito se guarda en `localStorage` bajo la clave `carritoCineTeatro`.

---

## Cómo ejecutar el sitio

1. Clona o descarga el repositorio.  
2. Abre la carpeta del proyecto en Visual Studio Code.  
3. Usa la extensión **Live Server** y abre `index.html`.  

También puedes servir la carpeta con cualquier servidor estático.

---

## Tests (Jasmine + Karma)

Instalar dependencias y ejecutar pruebas:

```
npm install
npm test
```

### Qué prueba cada archivo

| Archivo | Funcionalidad que valida |
|---------|---------------------------|
| tests/validaciones.spec.js | Regex de email, dominios permitidos, contraseña, checkbox de términos |
| tests/carrito.spec.js | Guardar y leer carrito, cálculo de totales, limpiar carrito |

Los tests cubren la lógica de negocio en JavaScript. Las páginas HTML se verifican de forma manual o con pruebas E2E si se agregan más adelante.

---

## Tecnologías utilizadas

| Tecnología        | Uso                                      |
|-------------------|------------------------------------------|
| Bootstrap 5       | Layout y componentes                     |
| Bootstrap Icons   | Iconografía                              |
| CSS variables     | Temas claro y oscuro                     |
| localStorage      | Sesión, carrito e historial              |
| Jasmine           | Framework de assertions para tests       |
| Karma             | Runner de tests en el navegador          |

---

## Validaciones de seguridad (prototipo)

- Correo con formato válido y dominio en lista blanca  
- Contraseña mínima de 6 caracteres  
- Aceptación obligatoria de Términos y Condiciones en login y registro  
- No se permiten dominios de correo arbitrarios  

**Nota:** Este es un prototipo académico. Las contraseñas se almacenan en texto plano solo para demo; en un entorno real deben ir hasheadas y el backend debe validar en el servidor.

---

## Limitaciones del prototipo

- Sin backend: toda la lógica corre en el navegador  
- Contraseñas sin hash (solo demostración)  
- Pago simulado (Webpay/Khipu de demostración)  
- Código QR demostrativo (no generado criptográficamente)  

---

## Posibles mejoras futuras

- Backend (Node, Firebase o similar) con autenticación real  
- QR real para validar entradas  
- Mapas de butacas por capacidad de sala  
- Pruebas E2E con Cypress  
- PWA / modo offline  
- Mejoras de accesibilidad (WCAG)  

---

## Commit sugerido

```
feat: UI Cinemark, compra rápida, validaciones, carrusel y tests Jasmine/Karma
```

---

## Autor

Proyecto académico — Duoc UC — 2026
```
 💻 ┆ Sebastian Cerda
      &
 💻 ┆ Angelo Rivera
```