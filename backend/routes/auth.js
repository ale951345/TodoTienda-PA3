const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// REGISTRO DE USUARIO
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        mensaje: 'La contraseña debe tener al menos 6 caracteres.'
      });
    }

    const usuarioExistente = await Usuario.findOne({
      correo: correo.toLowerCase().trim()
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'El correo ya está registrado.'
      });
    }

    const passwordCifrada = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      nombre,
      correo,
      password: passwordCifrada,
      rol: 'usuario'
    });

    await usuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente.'
    });

  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).json({
      mensaje: 'Error al registrar el usuario.'
    });
  }
});

// INICIO DE SESIÓN
router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: 'Ingresa tu correo y contraseña.'
      });
    }

    const usuario = await Usuario.findOne({
      correo: correo.toLowerCase().trim()
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas.'
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas.'
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión correcto.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en el login:', error.message);
    res.status(500).json({
      mensaje: 'Error al iniciar sesión.'
    });
  }
});

module.exports = router;