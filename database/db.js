// database/db.js
// Punto central de conexiones: autentica MySQL y SQL Server,
// importa modelos y sincroniza tablas físicas automáticamente.

const mysqlDB = require('../config/mysql');
const mssqlDB = require('../config/mssql');

// ─── Importar modelos (cada modelo se registra en su instancia Sequelize) ────
require('../models/Car');        // MySQL
// require('../models/Tuition'); // SQL Server — se agrega en el siguiente paso

/**
 * Autentica ambas conexiones de base de datos.
 * Se llama una sola vez al iniciar el servidor.
 */
const connectDatabases = async () => {
  try {
    // --- MySQL ---
    await mysqlDB.authenticate();
    console.log('✅ MySQL conectado correctamente');

    // --- SQL Server ---
    await mssqlDB.authenticate();
    console.log('✅ SQL Server conectado correctamente');

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

    // Sincronizar modelos SQL Server
    await mssqlDB.sync({ alter: true });
    console.log('🗄️  Tablas SQL Server sincronizadas');

  } catch (error) {
    console.error('❌ Error al sincronizar tablas:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabases, syncDatabases, mysqlDB, mssqlDB };
