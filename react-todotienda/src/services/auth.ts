import api from './api';

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'usuario';
}

interface RespuestaAuth {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

// Registrar usuario
export const registrarUsuario = async (datos: {
  nombre: string;
  correo: string;
  password: string;
}) => {
  const respuesta = await api.post('/auth/registro', datos);
  return respuesta.data;
};

// Iniciar sesión
export const iniciarSesion = async (datos: {
  correo: string;
  password: string;
}): Promise<RespuestaAuth> => {
  const respuesta = await api.post('/auth/login', datos);

  localStorage.setItem('token', respuesta.data.token);
  localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));

  return respuesta.data;
};

// Cerrar sesión
export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

// Obtener usuario
export const obtenerUsuario = (): Usuario | null => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};