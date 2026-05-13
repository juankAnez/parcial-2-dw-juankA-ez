// database/db.js
// Punto central de conexiones: autentica MySQL y SQL Server,
// registra ambos modelos en AMBOS motores y sincroniza tablas físicas.

const mysqlDB = require('../config/mysql');
const mssqlDB  = require('../config/mssql');

// ─── Factory functions de modelos ────────────────────────────────────────────
const defineCarModel     = require('../models/Car');
const defineTuitionModel = require('../models/Tuition');

// ─── Registrar modelos en AMBOS motores ──────────────────────────────────────
// MySQL
const CarMySQL     = defineCarModel(mysqlDB);
const TuitionMySQL = defineTuitionModel(mysqlDB);

// SQL Server
const CarMSSQL     = defineCarModel(mssqlDB);
const TuitionMSSQL = defineTuitionModel(mssqlDB);

// ─── Definir relaciones en MySQL ──────────────────────────────────────────────
CarMySQL.hasMany(TuitionMySQL, {
  foreignKey: 'car_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
TuitionMySQL.belongsTo(CarMySQL, {
  foreignKey: 'car_id',
});

// ─── Definir relaciones en SQL Server ─────────────────────────────────────────
CarMSSQL.hasMany(TuitionMSSQL, {
  foreignKey: 'car_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
TuitionMSSQL.belongsTo(CarMSSQL, {
  foreignKey: 'car_id',
});

// ─── Motor primario para los controladores (MySQL) ───────────────────────────
// Cambiar a CarMSSQL / TuitionMSSQL si se prefiere SQL Server como motor activo
const Car     = CarMySQL;
const Tuition = TuitionMySQL;

/**
 * Autentica ambas conexiones de base de datos.
 */
const connectDatabases = async () => {
  try {
    await mysqlDB.authenticate();
    console.log('✅ MySQL conectado correctamente');

    await mssqlDB.authenticate();
    console.log('✅ SQL Server conectado correctamente');

  } catch (error) {
    console.error('❌ Error al conectar bases de datos:', error.message);
    process.exit(1);
  }
};

/**
 * Sincroniza los modelos en AMBOS motores.
 * Crea/actualiza tablas 'cars' y 'tuitions' en MySQL Y SQL Server.
 */
const syncDatabases = async () => {
  try {
    await mysqlDB.sync({ alter: true });
    console.log('🗄️  Tablas MySQL sincronizadas (cars, tuitions)');

    await mssqlDB.sync({ alter: true });
    console.log('🗄️  Tablas SQL Server sincronizadas (cars, tuitions)');

  } catch (error) {
    console.error('❌ Error al sincronizar tablas:', error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDatabases,
  syncDatabases,
  mysqlDB,
  mssqlDB,
  Car,      // Modelo activo para controladores
  Tuition,  // Modelo activo para controladores
};
