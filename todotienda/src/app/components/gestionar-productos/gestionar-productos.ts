import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-gestionar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestionar-productos.html',
  styleUrl: './gestionar-productos.css'
})
export class GestionarProductosComponent implements OnInit {

  productos: Producto[] = [];

  producto: Producto = this.nuevoProducto();

  editando = false;
  idEditar = '';

  mensaje = '';
  error = '';

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  nuevoProducto(): Producto {
    return {
      nombre: '',
      precio: 0,
      categoria: '',
      imagen: ''
    };
  }

  listarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (datos) => {
        console.log('Productos recibidos de la API:', datos);

        this.productos = [...datos];

        this.cdr.detectChanges();

        console.log(
          'Productos cargados en la página:',
          this.productos
        );
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cdr.detectChanges();
      }
    });
  }

  guardarProducto(): void {
    this.mensaje = '';
    this.error = '';

    if (
      !this.producto.nombre.trim() ||
      !this.producto.categoria.trim() ||
      this.producto.precio === null ||
      this.producto.precio === undefined ||
      !Number.isFinite(Number(this.producto.precio)) ||
      Number(this.producto.precio) < 0
    ) {
      this.error = 'Completa correctamente los datos del producto.';
      return;
    }

    const estabaEditando = this.editando;

    const operacion = estabaEditando
      ? this.productosService.actualizarProducto(
          this.idEditar,
          this.producto
        )
      : this.productosService.registrarProducto(this.producto);

    operacion.subscribe({
      next: () => {
        this.cancelarEdicion();

        this.mensaje = estabaEditando
          ? '¡Producto actualizado correctamente!'
          : '¡Producto registrado correctamente!';

        this.error = '';
        this.listarProductos();
      },
      error: (err) => {
        console.error('Error al guardar el producto:', err);
        this.error =
          'No se pudo guardar el producto. Revisa la conexión con el servidor.';
        this.cdr.detectChanges();
      }
    });
  }

  editarProducto(producto: Producto): void {
    if (!producto._id) {
      return;
    }

    this.producto = { ...producto };
    this.idEditar = producto._id;
    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  eliminarProducto(producto: Producto): void {
    if (!producto._id) {
      return;
    }

    if (!confirm(`¿Deseas eliminar "${producto.nombre}"?`)) {
      return;
    }

    this.productosService.eliminarProducto(producto._id).subscribe({
      next: () => {
        this.mensaje = 'Producto eliminado correctamente.';
        this.error = '';
        this.listarProductos();
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        this.error = 'No se pudo eliminar el producto.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEdicion(): void {
    this.producto = this.nuevoProducto();
    this.editando = false;
    this.idEditar = '';
  }
}