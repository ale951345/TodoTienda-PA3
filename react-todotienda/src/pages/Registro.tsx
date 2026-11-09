import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/auth';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const manejarRegistro = async (e: FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const respuesta = await registrarUsuario({
        nombre,
        correo,
        password
      });

      setMensaje(respuesta.mensaje);

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err: any) {
      setError(
        err.response?.data?.mensaje ||
        'No se pudo registrar el usuario.'
      );
    }
  };

  return (
    <section className="registro">
      <h1>Crear cuenta</h1>
      <p>Regístrate para utilizar TodoTienda.</p>

      <form onSubmit={manejarRegistro}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
        />

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
          placeholder="Mínimo 6 caracteres"
          minLength={6}
          required
        />

        <button type="submit">Registrarme</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <p>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  );
}

export default Registro;