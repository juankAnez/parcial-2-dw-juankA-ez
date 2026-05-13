// models/Car.js
// Factory function: define el modelo 'cars' en cualquier instancia Sequelize
// Se registra en AMBOS motores (MySQL y SQL Server) desde database/db.js

const { DataTypes } = require('sequelize');

const defineCarModel = (sequelize) => {
  return sequelize.define(
    'cars',
    {
      id: {
        type:          DataTypes.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
      },
      marca: {
        type:      DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull:  { msg: 'La marca es obligatoria' },
          notEmpty: { msg: 'La marca no puede estar vacía' },
          len: { args: [2, 100], msg: 'La marca debe tener entre 2 y 100 caracteres' },
        },
      },
      clase: {
        type:      DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notNull:  { msg: 'La clase es obligatoria' },
          notEmpty: { msg: 'La clase no puede estar vacía' },
          len: { args: [2, 80], msg: 'La clase debe tener entre 2 y 80 caracteres' },
        },
      },
      modelo: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'El modelo (año) es obligatorio' },
          isInt:   { msg: 'El modelo debe ser un número entero' },
          min: { args: [1900], msg: 'El modelo debe ser un año válido (mín. 1900)' },
          max: { args: [new Date().getFullYear() + 1], msg: 'El modelo no puede ser futuro' },
        },
      },
      cilindraje: {
        type:      DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'El cilindraje es obligatorio' },
          isFloat: { msg: 'El cilindraje debe ser un número' },
          min: { args: [0.1], msg: 'El cilindraje debe ser mayor a 0' },
        },
      },
      capacidad: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'La capacidad es obligatoria' },
          isInt:   { msg: 'La capacidad debe ser un entero' },
          min: { args: [1],  msg: 'La capacidad mínima es 1' },
          max: { args: [50], msg: 'La capacidad máxima es 50' },
        },
      },
      pago: {
        type:      DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          notNull:   { msg: 'El pago es obligatorio' },
          isDecimal: { msg: 'El pago debe ser un valor numérico' },
          min: { args: [0], msg: 'El pago no puede ser negativo' },
        },
      },
    },
    {
      tableName:      'cars',
      timestamps:     true,
      freezeTableName: true,
    }
  );
};

module.exports = defineCarModel;
