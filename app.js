// app.js
// Configuración central de Express: middlewares globales y rutas

const express     = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// ─── Middlewares globales ────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rutas de la API (/api) ──────────────────────────────────────────────────
app.use('/api', require('./routes/index'));

// ─── Ruta raíz de prueba ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status:  'ok',
    message: 'API Parcial 2 - DW | Corriendo correctamente 🚀',
    version: '1.0.0',
    engines: ['MySQL', 'SQL Server'],
    endpoints: {
      cars:     '/api/cars',
      tuitions: '/api/tuitions',
    },
  });
});

// ─── Ruta no encontrada (404) ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    message: `Ruta [${req.method}] ${req.originalUrl} no encontrada`,
  });
});

// ─── Middleware global de errores (debe ir al final) ─────────────────────────
app.use(errorHandler);

module.exports = app;
