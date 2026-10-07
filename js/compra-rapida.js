// js/compra-rapida.js
document.addEventListener("DOMContentLoaded", () => {
  const selPelicula = document.getElementById("crPelicula");
  const selFecha = document.getElementById("crFecha");
  const selFormato = document.getElementById("crFormato");
  const selHora = document.getElementById("crHora");
  const btnComprar = document.getElementById("crBtnComprar");

  if (!selPelicula) return;

  // Llenar películas + obras en cartelera
  const items = [
    ...DB.peliculas.filter(p => p.estado === "cartelera").map(p => ({ ...p, tipo: "cine" })),
    ...DB.obras.filter(o => o.estado === "cartelera").map(o => ({ ...o, tipo: "teatro" }))
  ];

  selPelicula.innerHTML = `<option value="">Selecciona película u obra</option>` +
    items.map(i => `<option value="${i.id}|${i.tipo}">${i.titulo}</option>`).join("");

  function resetSelect(sel, placeholder) {
    sel.innerHTML = `<option value="">${placeholder}</option>`;
    sel.disabled = true;
  }

  resetSelect(selFecha, "Fecha");
  resetSelect(selFormato, "Formato");
  resetSelect(selHora, "Hora");
  if (btnComprar) btnComprar.disabled = true;

  selPelicula.addEventListener("change", () => {
    const [id, tipo] = (selPelicula.value || "").split("|");
    resetSelect(selFecha, "Fecha");
    resetSelect(selFormato, "Formato");
    resetSelect(selHora, "Hora");
    if (btnComprar) btnComprar.disabled = true;
    if (!id) return;

    const funciones = DB.funciones.filter(f => Number(f.contenidoId) === Number(id) && f.tipo === tipo);
    const fechas = [...new Set(funciones.map(f => f.fecha))];
    selFecha.innerHTML = `<option value="">Fecha</option>` + fechas.map(f => `<option value="${f}">${f}</option>`).join("");
    selFecha.disabled = fechas.length === 0;

    const item = items.find(i => Number(i.id) === Number(id));
    const formatos = item?.formatos || ["2D"];
    selFormato.innerHTML = `<option value="">Formato</option>` + formatos.map(f => `<option value="${f}">${f}</option>`).join("");
    selFormato.disabled = false;
  });

  selFecha.addEventListener("change", () => {
    const [id, tipo] = (selPelicula.value || "").split("|");
    resetSelect(selHora, "Hora");
    if (btnComprar) btnComprar.disabled = true;
    if (!id || !selFecha.value) return;

    const horas = DB.funciones
      .filter(f => Number(f.contenidoId) === Number(id) && f.tipo === tipo && f.fecha === selFecha.value)
      .map(f => ({ hora: f.hora, funcionId: f.id, salaId: f.salaId }));

    selHora.innerHTML = `<option value="">Hora</option>` +
      horas.map(h => `<option value="${h.funcionId}">${h.hora}</option>`).join("");
    selHora.disabled = horas.length === 0;
  });

  selHora.addEventListener("change", () => {
    if (btnComprar) btnComprar.disabled = !selHora.value || !selFormato.value;
  });
  selFormato.addEventListener("change", () => {
    if (btnComprar) btnComprar.disabled = !selHora.value || !selFormato.value;
  });

  btnComprar?.addEventListener("click", () => {
    const [id, tipo] = selPelicula.value.split("|");
    const funcionId = selHora.value;
    const item = items.find(i => Number(i.id) === Number(id));
    const funcion = DB.funciones.find(f => Number(f.id) === Number(funcionId));
    const sala = DB.salas.find(s => s.id === funcion?.salaId);

    if (!item || !funcion || !sala) return;

    const cart = typeof Carrito !== "undefined" ? Carrito.get() : {};
    Object.assign(cart, {
      contenidoId: item.id,
      tipo,
      titulo: item.titulo,
      imagen: item.imagen,
      fecha: funcion.fecha,
      hora: funcion.hora,
      sala: funcion.salaId,
      salaNombre: sala.nombre,
      funcionId: funcion.id,
      formato: selFormato.value,
      entradas: [{ nombre: "General", cantidad: 1, precio: sala.precioBase }],
      cargoServicio: DB.cargoServicio || 700,
      butacas: [],
      confiteria: []
    });
    if (typeof Carrito !== "undefined") Carrito.save(cart);

    window.location.href = `butacas.html?id=${id}&tipo=${tipo}&funcionId=${funcionId}`;
  });
});