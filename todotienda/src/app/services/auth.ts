
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RespuestaAuth {
  mensaje: string;
  token: string;
  usuario: {
    id: string;
    nombre: string;
    correo: string;
    rol: 'admin' | 'usuario';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  registrar(datos: {
    nombre: string;
    correo: string;
    password: string;
  }): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(
      `${this.apiUrl}/registro`,
      datos
    );
  }

  login(datos: {
    correo: string;
    password: string;
  }): Observable<RespuestaAuth> {
    return this.http.post<RespuestaAuth>(
      `${this.apiUrl}/login`,
      datos
    );
  }

  guardarSesion(respuesta: RespuestaAuth): void {
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerUsuario(): RespuestaAuth['usuario'] | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  esAdmin(): boolean {
    return this.obtenerUsuario()?.rol === 'admin';
  }
}
