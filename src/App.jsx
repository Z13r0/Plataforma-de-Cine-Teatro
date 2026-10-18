import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import AdminFunciones from "./pages/admin/AdminFunciones";
import AdminObras from "./pages/admin/AdminObras";
import AdminPeliculas from "./pages/admin/AdminPeliculas";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminVentas from "./pages/admin/AdminVentas";
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

import BotonCompraFlotante from "./components/BotonCompraFlotante";

import Entrada from "./pages/Entrada";

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
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/peliculas" element={<AdminPeliculas />} />
            <Route path="/admin/obras" element={<AdminObras />} />
            <Route path="/admin/funciones" element={<AdminFunciones />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/ventas" element={<AdminVentas />} />
            <Route path="/entrada/:idTicket" element={<Entrada/>}/>
          </Routes>
          <Footer />

          <BotonCompraFlotante />

        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
