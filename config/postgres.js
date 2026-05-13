// config/postgres.js
// Configuración de la conexión a PostgreSQL usando Sequelize

const { Sequelize } = require('sequelize');
require('dotenv').config();

const postgresDB = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // Cambiar a console.log para ver queries SQL
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,       // createdAt / updatedAt automáticos
      underscored: false,     // nombres de columnas en camelCase
      freezeTableName: true,  // evitar pluralización automática
    },
  }
);

module.exports = postgresDB;
