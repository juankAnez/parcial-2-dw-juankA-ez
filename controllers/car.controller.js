// controllers/car.controller.js
// Controlador CRUD para la tabla 'cars' (MySQL)

const { validationResult } = require('express-validator');
const Car = require('../models/Car');

// ─── Respuesta estandarizada ──────────────────────────────────────────────────
const response = (res, statusCode, status, message, data = null) => {
  const payload = { status, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

// ─── Manejar errores de Sequelize ────────────────────────────────────────────
const handleSequelizeError = (res, error) => {
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map((e) => ({
      field:   e.path,
      message: e.message,
    }));
    return response(res, 400, 'error', 'Error de validación', errors);
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response(res, 409, 'error', 'El registro ya existe');
  }
  console.error('Error inesperado:', error);
  return response(res, 500, 'error', 'Error interno del servidor');
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cars — Obtener todos los vehículos
// ─────────────────────────────────────────────────────────────────────────────
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      order: [['id', 'ASC']],
    });
    return response(res, 200, 'success', `${cars.length} vehículos encontrados`, cars);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cars/:id — Obtener un vehículo por ID
// ─────────────────────────────────────────────────────────────────────────────
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);

    if (!car) {
      return response(res, 404, 'error', `Vehículo con id ${id} no encontrado`);
    }

    return response(res, 200, 'success', 'Vehículo encontrado', car);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cars — Crear un nuevo vehículo
// ─────────────────────────────────────────────────────────────────────────────
const createCar = async (req, res) => {
  // Verificar errores del middleware express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 400, 'error', 'Datos inválidos', errors.array());
  }

  try {
    const { marca, clase, modelo, cilindraje, capacidad, pago } = req.body;

    const newCar = await Car.create({ marca, clase, modelo, cilindraje, capacidad, pago });

    return response(res, 201, 'success', 'Vehículo creado exitosamente', newCar);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/cars/:id — Actualizar un vehículo
// ─────────────────────────────────────────────────────────────────────────────
const updateCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 400, 'error', 'Datos inválidos', errors.array());
  }

  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);

    if (!car) {
      return response(res, 404, 'error', `Vehículo con id ${id} no encontrado`);
    }

    const { marca, clase, modelo, cilindraje, capacidad, pago } = req.body;
    await car.update({ marca, clase, modelo, cilindraje, capacidad, pago });

    return response(res, 200, 'success', 'Vehículo actualizado exitosamente', car);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/cars/:id — Eliminar un vehículo
// ─────────────────────────────────────────────────────────────────────────────
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);

    if (!car) {
      return response(res, 404, 'error', `Vehículo con id ${id} no encontrado`);
    }

    await car.destroy();
    return response(res, 200, 'success', `Vehículo con id ${id} eliminado correctamente`);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };
