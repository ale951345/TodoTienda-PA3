import api from './api';
import type { Producto } from '../types/producto';

// Obtener productos
export const obtenerProductos = async () => {
  const respuesta = await api.get<Producto[]>('/productos');
  return respuesta.data;
};

// Registrar producto
export const registrarProducto = async (producto: Producto) => {
  const respuesta = await api.post('/productos', producto);
  return respuesta.data;
};

// Actualizar producto
export const actualizarProducto = async (
  id: string,
  producto: Producto
) => {
  const respuesta = await api.put(`/productos/${id}`, producto);
  return respuesta.data;
};

// Eliminar producto
export const eliminarProducto = async (id: string) => {
  const respuesta = await api.delete(`/productos/${id}`);
  return respuesta.data;
};