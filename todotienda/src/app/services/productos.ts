
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  // Obtener productos (público)
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener el token para las operaciones protegidas
  private obtenerHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`
      })
    };
  }

  // Registrar producto
  registrarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(
      this.apiUrl,
      producto,
      this.obtenerHeaders()
    );
  }

  // Actualizar producto
  actualizarProducto(
    id: string,
    producto: Producto
  ): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.apiUrl}/${id}`,
      producto,
      this.obtenerHeaders()
    );
  }

  // Eliminar producto
  eliminarProducto(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(
      `${this.apiUrl}/${id}`,
      this.obtenerHeaders()
    );
  }
}
