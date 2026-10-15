import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Comunidad from "./pages/Comunidad";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import Obras from "./pages/Obras";
import Peliculas from "./pages/Peliculas";
import InicioCuenta from "./pages/InicioCuenta";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/login" element={<InicioCuenta />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
