import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida() {
  const { usuario, autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (usuario?.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;