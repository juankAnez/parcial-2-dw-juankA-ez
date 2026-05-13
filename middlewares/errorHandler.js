// middlewares/errorHandler.js
// Middleware global de manejo de errores — última línea de defensa

/**
 * Captura todos los errores no manejados en la aplicación.
 * Se registra DESPUÉS de todas las rutas en app.js (4 parámetros obligatorios).
 */
const errorHandler = (err, req, res, next) => {
  console.error(`\n❌ [${new Date().toISOString()}] Error no controlado:`);
  console.error(`   Ruta:    ${req.method} ${req.originalUrl}`);
  console.error(`   Mensaje: ${err.message}`);
  if (err.stack) console.error(`   Stack:   ${err.stack}`);

  // Errores de Sequelize — Validación
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status:  'error',
      message: 'Error de validación en los datos',
      errors:  err.errors.map((e) => ({ field: e.path, message: e.message })),
    });
  }

  // Errores de Sequelize — Restricción única
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status:  'error',
      message: 'Ya existe un registro con ese valor único',
    });
  }

  // Errores de Sequelize — Clave foránea
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status:  'error',
      message: 'El ID referenciado no existe en la tabla relacionada',
    });
  }

  // Error de sintaxis en JSON del body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status:  'error',
      message: 'El body de la solicitud no es un JSON válido',
    });
  }

  // Error genérico 500
  return res.status(err.status || 500).json({
    status:  'error',
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;
