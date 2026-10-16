import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Comunidad from "./pages/Comunidad";
import DetalleObra from "./pages/DetalleObra";
import DetallePelicula from "./pages/DetallePelicula";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import InicioCuenta from "./pages/InicioCuenta";
import Obras from "./pages/Obras";
import Peliculas from "./pages/Peliculas";
import Registro from "./pages/Registro";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/peliculas/:id" element={<DetallePelicula />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/obras/:id" element={<DetalleObra />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/login" element={<InicioCuenta />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
