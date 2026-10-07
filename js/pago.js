document.addEventListener("DOMContentLoaded", () => {
  const cart = Carrito.get();
  if (!cart.titulo || !cart.butacas.length) {
    alert("No hay una compra en curso.");
    window.location.href = "index.html";
    return;
  }

  Carrito.renderSidebar();

  // Si ya hay sesión, ocultar box auth
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");
  if (usuario) {
    cart.modo = "logueado";
    cart.cliente = { nombre: usuario.nombre, email: usuario.email };
    Carrito.save(cart);
    document.getElementById("boxAuth").classList.add("d-none");
  }

  document.getElementById("btnInvitado").addEventListener("click", () => {
    document.getElementById("formInvitado").classList.remove("d-none");
    cart.modo = "invitado";
    Carrito.save(cart);
  });

  document.getElementById("btnPagar").addEventListener("click", () => {
    if (!document.getElementById("terminos").checked) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    let nombre = cart.cliente.nombre;
    let email = cart.cliente.email;

    if (cart.modo === "invitado" || !nombre) {
      nombre = document.getElementById("nombreInv")?.value?.trim();
      email = document.getElementById("emailInv")?.value?.trim();
      if (!nombre || !email) {
        alert("Completa nombre y correo para continuar como invitado.");
        document.getElementById("formInvitado").classList.remove("d-none");
        return;
      }
      cart.cliente = { nombre, email };
      Carrito.save(cart);
    }

    const t = Carrito.calcular(cart);
    const metodo = document.querySelector('input[name="pago"]:checked')?.value || "simulado";

    const ticket = {
      idTicket: "TICK-" + Date.now(),
      titulo: cart.titulo,
      tipo: cart.tipo,
      funcionId: cart.funcionId,
      fecha: cart.fecha,
      hora: cart.hora,
      sala: cart.salaNombre || cart.sala,
      asientos: cart.butacas,
      cantidad: cart.butacas.length,
      confiteria: cart.confiteria || [],
      cargoServicio: cart.cargoServicio,
      total: t.total,
      cliente: nombre,
      email: email,
      metodoPago: metodo,
      modo: cart.modo,
      fechaCompra: new Date().toLocaleString("es-CL")
    };

    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]");
    historial.push(ticket);
    localStorage.setItem("historialCompras", JSON.stringify(historial));
    localStorage.setItem("ultimaEntrada", JSON.stringify(ticket));
    Carrito.clear();

    window.location.href = `entradas.html?ticketId=${ticket.idTicket}`;
  });
});