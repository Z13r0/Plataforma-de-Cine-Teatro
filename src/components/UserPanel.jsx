export default function UserPanel() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="userPanel"
      aria-labelledby="userPanelLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title" id="userPanelLabel">
          Mi cuenta
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        />
      </div>
      <div className="offcanvas-body" />
    </div>
  );
}
