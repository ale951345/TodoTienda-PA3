const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado correctamente'))
  .catch(error => console.error('Error MongoDB:', error.message));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de TodoTienda funcionando correctamente');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor TodoTienda ejecutándose en el puerto ${PORT}`);
});