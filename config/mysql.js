// config/mysql.js
// Configuración de la conexión a MySQL usando Sequelize

const { Sequelize } = require('sequelize');
require('dotenv').config();

const mysqlDB = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
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

module.exports = mysqlDB;
