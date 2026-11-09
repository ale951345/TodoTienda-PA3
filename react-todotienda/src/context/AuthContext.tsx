import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

import {
  iniciarSesion,
  cerrarSesion,
  obtenerUsuario,
  type Usuario
} from '../services/auth';

interface AuthContextType {
  usuario: Usuario | null;
  autenticado: boolean;
  login: (correo: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => obtenerUsuario());

  const login = async (correo: string, password: string) => {
    const respuesta = await iniciarSesion({ correo, password });
    setUsuario(respuesta.usuario);
  };

  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado: !!usuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return contexto;
};