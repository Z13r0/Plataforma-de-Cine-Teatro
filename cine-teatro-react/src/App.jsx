/**
 * App.jsx — Estructura global: Navbar, rutas y Footer.
 */
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Theater from "./pages/Theater.jsx";
import Detail from "./pages/Detail.jsx";
import Seats from "./pages/Seats.jsx";
import Snacks from "./pages/Snacks.jsx";
import Checkout from "./pages/Checkout.jsx";
import Ticket from "./pages/Ticket.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Community from "./pages/Community.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import { useAuth } from "./context/AuthContext.jsx";

/** Solo deja pasar a usuarios con rol admin */
function PrivateAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.rol !== "admin") return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peliculas" element={<Movies />} />
          <Route path="/teatro" element={<Theater />} />
          <Route path="/detalle/:tipo/:id" element={<Detail />} />
          <Route path="/butacas" element={<Seats />} />
          <Route path="/confiteria" element={<Snacks />} />
          <Route path="/pago" element={<Checkout />} />
          <Route path="/entrada/:ticketId" element={<Ticket />} />
          <Route path="/historial" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/comunidad" element={<Community />} />
          <Route path="/perfil" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <PrivateAdmin>
                <Admin />
              </PrivateAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}