// app.js
// Configuración central de Express: middlewares globales y rutas

const express = require('express');
require('dotenv').config();

const app = express();

// ─── Middlewares globales ────────────────────────────────────────────────────
app.use(express.json());                          // Parsear body JSON
app.use(express.urlencoded({ extended: true }));  // Parsear body URL-encoded

// ─── Rutas ──────────────────────────────────────────────────────────────────
// Las rutas se agregarán aquí conforme avancemos
// app.use('/api/cars',    require('./routes/cars.routes'));
// app.use('/api/tuitions', require('./routes/tuitions.routes'));

// ─── Ruta raíz de prueba ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status:  'ok',
    message: 'API Parcial 2 - DW | Corriendo correctamente 🚀',
    version: '1.0.0',
    engines: ['MySQL', 'PostgreSQL'],
  });
});

// ─── Ruta no encontrada (404) ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    message: `Ruta [${req.method}] ${req.originalUrl} no encontrada`,
  });
});

module.exports = app;
