import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(correo, password);
      navigate(
  JSON.parse(localStorage.getItem('usuario') || '{}').rol === 'admin'
    ? '/gestionar-productos'
    : '/'
);
    } catch (err: any) {
      setError(
        err.response?.data?.mensaje ||
        'No se pudo iniciar sesión.'
      );
    }
  };

  return (
    <section className="login">
      <h1>Iniciar sesión</h1>
      <p>Ingresa tus datos para acceder a TodoTienda.</p>

      <form onSubmit={manejarLogin}>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/registro">Regístrate aquí</Link>
      </p>
    </section>
  );
}

export default Login;