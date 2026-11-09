import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import GestionarProductos from './pages/GestionarProductos';
import RutaProtegida from './components/RutaProtegida';
import { useAuth } from './context/AuthContext';

function App() {
  const { usuario, autenticado, logout } = useAuth();
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>

        {!autenticado && (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </>
        )}

        {usuario?.rol === 'admin' && (
          <Link to="/gestionar-productos">Gestionar productos</Link>
        )}

        {autenticado && (
          <button type="button" onClick={manejarCerrarSesion}>
            Cerrar sesión
          </button>
        )}
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="inicio">
                <header>
                  <h1>Bienvenido a TodoTienda</h1>
                  <p>Encuentra tus productos favoritos en un solo lugar.</p>
                </header>

                <section className="presentacion">
                  <h2>Tu tienda, más fácil</h2>
                  <p>
                    Explora nuestro catálogo y administra tus productos
                    de forma sencilla.
                  </p>
                </section>
              </section>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />

          <Route element={<RutaProtegida />}>
            <Route
              path="/gestionar-productos"
              element={<GestionarProductos />}
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;