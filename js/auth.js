//Datos de prueba
const emailUserTest = "usuario@gmail.com"
const passUserTest = "1234"
const emailAdminTest = "admin@admin.cl"
const passAdminTest = "1234"

// Boton Ingresar
const botonIngresar = document.querySelector('#ingresar');
botonIngresar.addEventListener('click', (e) =>{
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#password').value;
    if (email == emailUserTest && pass == passUserTest){
        window.location = "index.html";
    } else if (email == emailAdminTest && pass == passAdminTest){
        window.location = "admin.html";
    } else {
        alert("Datos Incorrectos.");
    }
})