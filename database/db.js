// database/db.js
// Punto central de conexiones: autentica MySQL y SQL Server,
// registra ambos modelos en AMBOS motores y sincroniza tablas físicas.

require('dotenv').config();

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

// ─── Configurar asociaciones en AMBOS motores ─────────────────────────────────
// MySQL: Car ↔ Tuition
CarMySQL.hasMany(TuitionMySQL, {
  foreignKey: 'car_id',
  as: 'tuitions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
TuitionMySQL.belongsTo(CarMySQL, {
  foreignKey: 'car_id',
  as: 'car',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// SQL Server: Car ↔ Tuition
CarMSSQL.hasMany(TuitionMSSQL, {
  foreignKey: 'car_id',
  as: 'tuitions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
TuitionMSSQL.belongsTo(CarMSSQL, {
  foreignKey: 'car_id',
  as: 'car',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// ─── Motor primario para los controladores (seleccionado desde .env) ─────────
const DB_ENGINE = process.env.DB_ENGINE || 'mysql';
const Car     = DB_ENGINE === 'mssql' ? CarMSSQL : CarMySQL;
const Tuition = DB_ENGINE === 'mssql' ? TuitionMSSQL : TuitionMySQL;

/**
 * Autentica la conexión a la base de datos según el motor seleccionado.
 */
const connectDatabases = async () => {
  try {
    if (DB_ENGINE === 'mssql') {
      await mssqlDB.authenticate();
      console.log('✅ SQL Server conectado correctamente');
    } else {
      await mysqlDB.authenticate();
      console.log('✅ MySQL conectado correctamente');
    }
  } catch (error) {
    console.error('❌ Error al conectar base de datos:', error.message);
    process.exit(1);
  }
};

/**
 * Sincroniza los modelos únicamente en el motor activo.
 * Crea/actualiza tablas 'cars' y 'tuitions' en la base de datos seleccionada.
 */
const syncDatabases = async () => {
  try {
    if (DB_ENGINE === 'mssql') {
      await mssqlDB.sync({ alter: true });
      console.log('🗄️  Tablas SQL Server sincronizadas (cars, tuitions)');
    } else {
      await mysqlDB.sync({ alter: true });
      console.log('🗄️  Tablas MySQL sincronizadas (cars, tuitions)');
    }
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
