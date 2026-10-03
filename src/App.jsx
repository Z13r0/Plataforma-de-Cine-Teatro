import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Comunidad from "./pages/Comunidad";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import Obras from "./pages/Obras";
import Peliculas from "./pages/Peliculas";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </>
  );
}

export default App;
