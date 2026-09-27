/*Para el boton de usuario se usa #userPanel como identificador */
const NAV_ITEMS = [
  { label: "Inicio", href: "/", active: true },
  { label: "Películas", href: "/" },
  { label: "Teatro", href: "/" },
  { label: "Comunidad", href: "/" },
  { label: "Historial", href: "/" },
];

export default function Navbar() {
  return (
    <nav aria-label="Principal" className="navbar navbar-expand-lg bg-black sticky-top border-bottom border-secondary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a
          className="navbar-brand mx-auto fw-bold text-danger d-flex align-items-center gap-1"
          href="/"
        >
          <i className="bi bi-film fs-2" />
          <span>Cine & Teatro</span>
        </a>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="navbarNav"
          aria-labelledby="navbarNavLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="navbarNavLabel">
              Menú
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Cerrar"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.label}>
                  <a
                    className={item.active ? "nav-link active" : "nav-link"}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-light d-flex align-items-center"
            aria-label="Abrir menú de usuario"
            data-bs-toggle="offcanvas"
            data-bs-target="#userPanel"
            aria-controls="userPanel"
          >
            <i className="bi bi-person-circle" />
          </button>
        </div>
      </div>
    </nav>
  );
}
