document.addEventListener("DOMContentLoaded", () => {
  const KEY = "comentariosComunidad";
  const lista = document.getElementById("listaComentarios");
  const form = document.getElementById("formComentario");

  function render() {
    const items = JSON.parse(localStorage.getItem(KEY) || "[]").slice().reverse();
    if (!lista) return;
    if (!items.length) {
      lista.innerHTML = `<p class="text-secondary">Sé el primero en comentar.</p>`;
      return;
    }
    lista.innerHTML = items.map(c => `
      <div class="card border-custom bg-card mb-3">
        <div class="card-body">
          <h6 class="fw-bold text-danger mb-1">${c.titulo}</h6>
          <p class="mb-2">${c.texto}</p>
          <p class="small text-secondary mb-0">${c.autor || "Anónimo"} · ${c.fecha}</p>
        </div>
      </div>
    `).join("");
  }

  form?.addEventListener("submit", e => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null");
    const items = JSON.parse(localStorage.getItem(KEY) || "[]");
    items.push({
      titulo: document.getElementById("tituloComentario").value.trim(),
      texto: document.getElementById("textoComentario").value.trim(),
      autor: usuario?.nombre || "Anónimo",
      fecha: new Date().toLocaleString("es-CL")
    });
    localStorage.setItem(KEY, JSON.stringify(items));
    form.reset();
    render();
  });

  render();
});