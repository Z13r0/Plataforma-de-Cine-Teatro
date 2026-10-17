import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Comunidad from "./pages/Comunidad";
import Detalle from "./pages/Detalle";
import Historial from "./pages/Historial";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Obras from "./pages/Obras";
import Peliculas from "./pages/Peliculas";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
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
            <Route path="/contenido/:tipo/:id" element={<Detalle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
