# 🎬 Plataforma de Cine & Teatro

Proyecto académico desarrollado como parte de la carrera de **Ingeniería en Informática en Duoc UC**.

La idea del proyecto es crear un prototipo web de una plataforma donde los usuarios puedan consultar películas y obras de teatro, revisar funciones, seleccionar butacas y realizar una compra simulada.

---

## 🛠️ Tecnologías utilizadas

![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-%231572B6.svg?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-%237952B3.svg?logo=bootstrap&logoColor=white)
![Bootstrap Icons](https://img.shields.io/badge/Bootstrap%20Icons-%237952B3.svg?logo=bootstrap&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-HTML5-orange)

---

## 📌 Descripción

**Cine & Teatro** es un prototipo frontend interactivo que busca simular el funcionamiento básico de una plataforma de cine y teatro.

El proyecto permite navegar por las diferentes secciones y realizar un flujo de compra de entradas de manera simulada.

---

## 🚀 Cómo usar el proyecto

### 1. Abrir el proyecto
Simplemente abre el archivo `index.html` en tu navegador (puedes usar Live Server en Visual Studio Code).

### 2. Crear un usuario (Registro)
1. Ve a **Registrarse** (o entra a `registro.html`).
2. Completa:
   - Nombre completo
   - Correo electrónico
   - Contraseña
3. Haz clic en **Registrarme**.
4. Serás redirigido al Login.

### 3. Iniciar sesión
1. Ve a **Iniciar Sesión**.
2. Ingresa el correo y la contraseña con los que te registraste.
3. Al iniciar sesión correctamente verás tu nombre en la barra de navegación.

### 4. Cuenta de Administrador (ya incluida)
Puedes entrar con esta cuenta de prueba:

| Campo       | Valor              |
|-------------|--------------------|
| Correo      | `admin@admin.cl`   |
| Contraseña  | `admin123`         |

Con esta cuenta podrás acceder al **Panel de Administración**.

---

## 🎯 Objetivo del proyecto

El objetivo es aplicar los conocimientos aprendidos durante la carrera en el desarrollo de una página web utilizando HTML, CSS y JavaScript.

También se busca practicar conceptos como:

- Manipulación del DOM
- Eventos
- Arrays y objetos
- Funciones
- Parámetros URL
- LocalStorage
- Diseño responsive
- Uso de Bootstrap

---

## ⚙️ Funcionalidades

- 🎬 Consulta de películas
- 🎭 Consulta de obras de teatro
- 🔎 Búsqueda y filtros
- 📄 Vista de detalle
- 🗓️ Consulta de funciones
- 💺 Selección de butacas
- 🎟️ Compra simulada
- 📱 Entrada digital
- 🔲 QR demostrativo
- 📋 Historial de compras
- 👤 Registro e inicio de sesión simulado
- ⭐ Valoraciones y comentarios
- 💬 Comunidad
- 🛠️ Panel de administración

---

## 📁 Estructura del proyecto

```text
Plataforma-de-Cine-Teatro/
│
├── css/
│   └── styles.css
│
├── js/
│   ├── admin.js
│   ├── auth.js
│   ├── butacas.js
│   ├── comunidad.js
│   ├── compra.js
│   ├── datos.js
│   ├── detalle.js
│   ├── entradas.js
│   ├── funciones.js
│   ├── historial.js
│   ├── peliculas.js
│   └── perfil.js
│
├── index.html
├── peliculas.html
├── obras.html
├── detalle.html
├── funciones.html
├── butacas.html
├── compra.html
├── entradas.html
├── historial.html
├── comunidad.html
├── login.html
├── registro.html
├── perfil.html
└── admin.html