
// ======================================================
// AUTH.JS
// Maneja:
// - Registro
// - Inicio de sesión
// - Validación de administrador
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Se crea un administrador para testing
    crearAdminInical();

    // Buscamos el formulario de login y registro
    const formLogin = document.getElementById("formLogin");
    const formRegistro = document.getElementById("formRegistro");

    if (formLogin) {

        formLogin.addEventListener("submit", (e) => {

            // Evitamos que el formulario recargue la página
            e.preventDefault();

            // Obtenemos los datos
            const email =
                document.getElementById("email").value.trim().toLowerCase();

            const password =
                document.getElementById("password").value;

            // Recuperamos usuarios
            const usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscamos al usuario
            const usuario =
                usuarios.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );

            // Si no encontramos usuario
            if (!usuario) {

                alert("Correo o contraseña incorrectos.");

                return;
            }

            // Guardamos la sesión actual
            localStorage.setItem(
                "usuarioActual",
                JSON.stringify(usuario)
            );

            // Comprobamos si es admin
            if (
                usuario.rol === "admin" &&
                esCorreoAdministrador(usuario.email)
            ) {

                // Administrador
                window.location.href = "admin.html";

            } else {

                // Cliente normal
                window.location.href = "index.html";
            }

        });
    }

    // Formulario de Registro
    if (formRegistro) {

        formRegistro.addEventListener("submit", (e) => {

            e.preventDefault();

            // Obtenemos información
            const nombre =
                document.getElementById("nombre").value.trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            // Validamos contraseña
            if (password !== confirmPassword) {

                alert("Las contraseñas no coinciden.");

                return;
            }


            // Recuperamos usuarios
            const usuarios =
                JSON.parse(localStorage.getItem("usuarios")) || [];


            // Comprobamos si el correo ya existe
            const existe =
                usuarios.some(
                    usuario => usuario.email === email
                );


            if (existe) {

                alert("Este correo ya está registrado.");

                return;
            }


            // Se determina el rol

            // Si el correo es administrativo,
            // se registra como administrador.
            //
            // De lo contrario será cliente.

            const rol =
                esCorreoAdministrador(email)
                    ? "admin"
                    : "cliente";
            
            // Se creal el usuario
            const nuevoUsuario = {

                id: Date.now(),

                nombre: nombre,

                email: email,

                password: password,

                rol: rol
            };


            // Agregamos usuario
            usuarios.push(nuevoUsuario);


            // Guardamos usuarios
            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );


            alert("Cuenta creada correctamente.");


            // Volvemos al login
            window.location.href = "login.html";

        });
    }

});

// Permite saber si el correo es o no de un admin
function esCorreoAdministrador(email) {

    // Convertimos a minúsculas
    email = email.toLowerCase().trim();

    // Separamos correo y dominio
    const partes = email.split("@");

    // Deben existir exactamente dos partes
    if (partes.length !== 2) {
        return false;
    }

    const dominio = partes[1];

    // Ejemplos permitidos:
    //
    // usuario@admin.cl
    // usuario@admin.cine.cl
    // usuario@cine.admin.cl

    return (
        dominio === "admin.cl" ||
        dominio.endsWith(".admin.cl") ||
        dominio.startsWith("admin.")
    );
}

function crearAdminInicial() {

    // Recuperamos usuarios
    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    // Comprobamos si ya existe un admin
    const existeAdmin =
        usuarios.some(
            usuario => usuario.email === "admin@admin.cl"
        );


    // Si no existe, lo creamos
    if (!existeAdmin) {

        usuarios.push({

            id: 1,

            nombre: "Administrador",

            email: "admin@admin.cl",

            password: "admin123",

            rol: "admin"

        });


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }
}
