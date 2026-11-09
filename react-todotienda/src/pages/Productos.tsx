import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productos';
import type { Producto } from '../types/producto';

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch {
        setError('No se pudieron cargar los productos.');
      }
    };

    cargarProductos();
  }, []);

  return (
    <section className="catalogo-publico">
      <header className="encabezado">
        <h1>Nuestros productos</h1>
        <p>Encuentra tus productos favoritos en TodoTienda.</p>
      </header>

      {error && <p className="error">{error}</p>}

      {!error && productos.length === 0 && (
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default Productos;