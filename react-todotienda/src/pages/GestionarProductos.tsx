import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';

import {
  obtenerProductos,
  registrarProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productos';

import type { Producto } from '../types/producto';

function GestionarProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [producto, setProducto] = useState<Producto>({
    nombre: '',
    precio: 0,
    categoria: '',
    imagen: ''
  });

  const [idEditar, setIdEditar] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch {
      setError('No se pudieron cargar los productos.');
    }
  };

  const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProducto({
      ...producto,
      [name]: name === 'precio' ? Number(value) : value
    });
  };

  const guardarProducto = async (e: FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      if (idEditar) {
        await actualizarProducto(idEditar, producto);
        setMensaje('Producto actualizado correctamente.');
      } else {
        await registrarProducto(producto);
        setMensaje('Producto registrado correctamente.');
      }

      setProducto({
        nombre: '',
        precio: 0,
        categoria: '',
        imagen: ''
      });

      setIdEditar(null);
      await cargarProductos();

    } catch (err: any) {
      setError(
        err.response?.data?.mensaje ||
        'No se pudo guardar el producto.'
      );
    }
  };

  const editarProducto = (item: Producto) => {
    setProducto({
      nombre: item.nombre,
      precio: item.precio,
      categoria: item.categoria,
      imagen: item.imagen
    });

    setIdEditar(item._id || null);
    setMensaje('');
    setError('');
  };

  const cancelarEdicion = () => {
    setIdEditar(null);

    setProducto({
      nombre: '',
      precio: 0,
      categoria: '',
      imagen: ''
    });
  };

  const borrarProducto = async (id?: string) => {
    if (!id) return;

    if (!window.confirm('¿Deseas eliminar este producto?')) {
      return;
    }

    try {
      await eliminarProducto(id);
      setMensaje('Producto eliminado correctamente.');
      await cargarProductos();
    } catch {
      setError('No se pudo eliminar el producto.');
    }
  };

  return (
    <section className="tienda">

      <header className="encabezado">
        <h1>TodoTienda</h1>
        <p>Encuentra y administra tus productos favoritos.</p>
      </header>

      <section className="formulario">
        <h2>{idEditar ? 'Actualizar producto' : 'Agregar producto'}</h2>

        <form onSubmit={guardarProducto}>

          <label>Nombre del producto</label>
          <input
            name="nombre"
            value={producto.nombre}
            onChange={manejarCambio}
            placeholder="Ej. Audífonos Bluetooth"
            required
          />

          <label>Precio (S/)</label>
          <input
            name="precio"
            type="number"
            value={producto.precio}
            onChange={manejarCambio}
            min="0"
            step="0.01"
            required
          />

          <label>Categoría</label>
          <input
            name="categoria"
            value={producto.categoria}
            onChange={manejarCambio}
            placeholder="Ej. Audio"
            required
          />

          <label>Enlace de la imagen (URL)</label>
          <input
            name="imagen"
            type="url"
            value={producto.imagen}
            onChange={manejarCambio}
            placeholder="https://ejemplo.com/producto.jpg"
          />

          {producto.imagen && (
            <div className="vista-previa">
              <p>Vista previa:</p>
              <img
                src={producto.imagen}
                alt={producto.nombre || 'Vista previa del producto'}
              />
            </div>
          )}

          <button type="submit">
            {idEditar ? 'Guardar cambios' : 'Registrar producto'}
          </button>

          {idEditar && (
            <button
              type="button"
              className="cancelar"
              onClick={cancelarEdicion}
            >
              Cancelar edición
            </button>
          )}

        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
        {error && <p className="error">{error}</p>}
      </section>

      <section className="catalogo">
        <h2>Nuestros productos</h2>

        <p>Productos cargados: {productos.length}</p>

        {productos.length === 0 && (
          <p>Todavía no hay productos registrados.</p>
        )}

        <div className="productos">
          {productos.map((item) => (
            <article className="producto-card" key={item._id}>

              {item.imagen ? (
                <img src={item.imagen} alt={item.nombre} />
              ) : (
                <div className="sin-imagen">Sin imagen</div>
              )}

              <h3>{item.nombre}</h3>
              <p>{item.categoria}</p>

              <p className="precio">
                S/ {item.precio.toFixed(2)}
              </p>

              <div className="acciones">
                <button
                  type="button"
                  onClick={() => editarProducto(item)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="eliminar"
                  onClick={() => borrarProducto(item._id)}
                >
                  Eliminar
                </button>
              </div>

            </article>
          ))}
        </div>
      </section>

    </section>
  );
}

export default GestionarProductos;