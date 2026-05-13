// database/db.js
// Punto central de conexiones: autentica ambas bases de datos,
// importa modelos y sincroniza tablas físicas automáticamente.

const mysqlDB    = require('../config/mysql');
const postgresDB = require('../config/postgres');

// ─── Importar modelos (cada modelo se registra en su instancia Sequelize) ────
require('../models/Car');        // MySQL
// require('../models/Tuition'); // PostgreSQL — se agrega en el siguiente paso

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
    process.exit(1);
  }
};

/**
 * Sincroniza los modelos con sus bases de datos.
 * alter: true → actualiza columnas sin eliminar datos existentes.
 */
const syncDatabases = async () => {
  try {
    // Sincronizar modelos MySQL
    await mysqlDB.sync({ alter: true });
    console.log('🗄️  Tablas MySQL sincronizadas');

    // Sincronizar modelos PostgreSQL
    await postgresDB.sync({ alter: true });
    console.log('🗄️  Tablas PostgreSQL sincronizadas');

  } catch (error) {
    console.error('❌ Error al sincronizar tablas:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabases, syncDatabases, mysqlDB, postgresDB };

