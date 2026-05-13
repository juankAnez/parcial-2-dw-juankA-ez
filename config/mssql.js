// config/mssql.js
// Configuración de la conexión a SQL Server usando Sequelize + tedious

const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  SQLSERVER_HOST,
  SQLSERVER_PORT,
  SQLSERVER_USER,
  SQLSERVER_PASSWORD,
  SQLSERVER_DB,
} = process.env;

if (!SQLSERVER_HOST || !SQLSERVER_USER || !SQLSERVER_DB) {
  console.error('❌ Faltan variables de entorno para SQL Server (SQLSERVER_HOST, SQLSERVER_USER, SQLSERVER_DB)');
  process.exit(1);
}

const mssqlDB = new Sequelize(SQLSERVER_DB, SQLSERVER_USER, SQLSERVER_PASSWORD || '', {
  host:    SQLSERVER_HOST,
  port:    parseInt(SQLSERVER_PORT) || 1433,
  dialect: 'mssql',
  logging: false,
  dialectOptions: {
    options: {
      server:                 SQLSERVER_HOST,
      port:                   parseInt(SQLSERVER_PORT) || 1433,
      database:               SQLSERVER_DB,
      encrypt:                false,
      trustServerCertificate: false,
      enableArithAbort:       true,
      connectTimeout:         30000,
    },
  },
  pool: {
    max:     10,
    min:     0,
    acquire: 30000,
    idle:    10000,
  },
  define: {
    timestamps:      true,
    underscored:     false,
    freezeTableName: true,
  },
});

module.exports = mssqlDB;
