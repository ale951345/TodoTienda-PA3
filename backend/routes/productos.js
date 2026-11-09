
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Producto = require('../models/Producto');

const {
  verificarToken,
  verificarRol
} = require('../middleware/auth');

// Validar los datos del producto
function validarProducto(datos) {
  const errores = [];

  if (
    typeof datos.nombre !== 'string' ||
    !datos.nombre.trim()
  ) {
    errores.push('El nombre es obligatorio.');
  }

  if (
    datos.precio === undefined ||
    datos.precio === null ||
    datos.precio === '' ||
    !Number.isFinite(Number(datos.precio)) ||
    Number(datos.precio) < 0
  ) {
    errores.push('El precio debe ser un número mayor o igual a cero.');
  }

  if (
    typeof datos.categoria !== 'string' ||
    !datos.categoria.trim()
  ) {
    errores.push('La categoría es obligatoria.');
  }

  if (
    datos.imagen !== undefined &&
    datos.imagen !== '' &&
    typeof datos.imagen !== 'string'
  ) {
    errores.push('La imagen debe ser una URL en texto.');
  }

  return errores;
}

// Validar ID de MongoDB
function validarId(id) {
  return mongoose.isValidObjectId(id);
}

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al obtener los productos.'
    });
  }
});

// Registrar un producto (solo administrador)
router.post('/', verificarToken, verificarRol('admin'), async (req, res) => {
  const errores = validarProducto(req.body);

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Datos del producto inválidos.',
      errores
    });
  }

  try {
    const producto = new Producto({
      nombre: req.body.nombre.trim(),
      precio: Number(req.body.precio),
      categoria: req.body.categoria.trim(),
      imagen: req.body.imagen?.trim() || ''
    });

    const guardado = await producto.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('Error al registrar producto:', error.message);
    res.status(400).json({
      mensaje: 'No se pudo registrar el producto.',
      error: error.message
    });
  }
});

// Actualizar un producto (solo administrador)
router.put('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
  if (!validarId(req.params.id)) {
    return res.status(400).json({
      mensaje: 'El ID del producto no es válido.'
    });
  }

  const errores = validarProducto(req.body);

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Datos del producto inválidos.',
      errores
    });
  }

  try {
    const datosActualizados = {
      nombre: req.body.nombre.trim(),
      precio: Number(req.body.precio),
      categoria: req.body.categoria.trim(),
      imagen: req.body.imagen?.trim() || ''
    };

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      {
        new: true,
        runValidators: true
      }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado.'
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    res.status(400).json({
      mensaje: 'No se pudo actualizar el producto.',
      error: error.message
    });
  }
});

// Eliminar un producto (solo administrador)
router.delete('/:id', verificarToken, verificarRol('admin'), async (req, res) => {
  if (!validarId(req.params.id)) {
    return res.status(400).json({
      mensaje: 'El ID del producto no es válido.'
    });
  }

  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado.'
      });
    }

    res.status(200).json({
      mensaje: 'Producto eliminado correctamente.'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(500).json({
      mensaje: 'Error interno al eliminar el producto.'
    });
  }
});

module.exports = router;
