// models/Tuition.js
// Factory function: define el modelo 'tuitions' en cualquier instancia Sequelize
// Se registra en AMBOS motores (MySQL y SQL Server) desde database/db.js

const { DataTypes } = require('sequelize');

const defineTuitionModel = (sequelize) => {
  return sequelize.define(
    'tuitions',
    {
      id: {
        type:          DataTypes.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
      },
      date_matricula: {
        type:      DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull:  { msg: 'La fecha de matrícula es obligatoria' },
          notEmpty: { msg: 'La fecha de matrícula no puede estar vacía' },
          isDate:   { msg: 'Debe ser una fecha válida (YYYY-MM-DD)' },
        },
      },
      ciudad: {
        type:      DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull:  { msg: 'La ciudad es obligatoria' },
          notEmpty: { msg: 'La ciudad no puede estar vacía' },
          len: { args: [2, 100], msg: 'La ciudad debe tener entre 2 y 100 caracteres' },
        },
      },
      car_id: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cars',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          notNull: { msg: 'El car_id es obligatorio' },
          isInt:   { msg: 'El car_id debe ser un número entero' },
          min: { args: [1], msg: 'El car_id debe ser un número positivo' },
        },
      },
    },
    {
      tableName:      'tuitions',
      timestamps:     true,
      freezeTableName: true,
    }
  );
};

module.exports = defineTuitionModel;
