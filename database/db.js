// database/db.js
// Punto central de conexiones: autentica ambas bases de datos
// y exporta las instancias para uso en modelos y seeders

const mysqlDB    = require('../config/mysql');
const postgresDB = require('../config/postgres');

/**
 * Autentica ambas conexiones de base de datos.
 * Se llama una sola vez al iniciar el servidor.
 */
const connectDatabases = async () => {
  try {
    // --- MySQL ---
    await mysqlDB.authenticate();
    console.log('✅ MySQL conectado correctamente');

    // --- PostgreSQL ---
    await postgresDB.authenticate();
    console.log('✅ PostgreSQL conectado correctamente');

  } catch (error) {
    console.error('❌ Error al conectar bases de datos:', error.message);
    process.exit(1); // Detener el servidor si no hay conexión
  }
};

module.exports = { connectDatabases, mysqlDB, postgresDB };
