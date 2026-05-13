// controllers/tuition.controller.js
// Controlador CRUD para la tabla 'tuitions' (MySQL)

const { validationResult } = require('express-validator');
const { Tuition, Car } = require('../database/db');

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
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return response(res, 400, 'error', 'El car_id referenciado no existe en la tabla cars');
  }
  console.error('Error inesperado:', error);
  return response(res, 500, 'error', 'Error interno del servidor');
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/tuitions — Obtener todas las matrículas
// ─────────────────────────────────────────────────────────────────────────────
const getAllTuitions = async (req, res) => {
  try {
    const tuitions = await Tuition.findAll({
      include: [{ model: Car, as: 'car', attributes: ['id', 'marca', 'clase', 'modelo'] }],
      order: [['id', 'ASC']],
    });
    return response(res, 200, 'success', `${tuitions.length} matrículas encontradas`, tuitions);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/tuitions/:id — Obtener una matrícula por ID
// ─────────────────────────────────────────────────────────────────────────────
const getTuitionById = async (req, res) => {
  try {
    const { id } = req.params;
    const tuition = await Tuition.findByPk(id, {
      include: [{ model: Car, as: 'car', attributes: ['id', 'marca', 'clase', 'modelo'] }],
    });

    if (!tuition) {
      return response(res, 404, 'error', `Matrícula con id ${id} no encontrada`);
    }

    return response(res, 200, 'success', 'Matrícula encontrada', tuition);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/tuitions — Crear una nueva matrícula
// ─────────────────────────────────────────────────────────────────────────────
const createTuition = async (req, res) => {
  // Verificar errores del middleware express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 400, 'error', 'Datos inválidos', errors.array());
  }

  try {
    const { date_matricula, ciudad, car_id } = req.body;

    // Validar que el car_id existe
    const carExists = await Car.findByPk(car_id);
    if (!carExists) {
      return response(res, 404, 'error', `El vehículo con ID ${car_id} no existe en la tabla cars`);
    }

    const newTuition = await Tuition.create({ date_matricula, ciudad, car_id });

    return response(res, 201, 'success', 'Matrícula creada exitosamente', newTuition);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/tuitions/:id — Actualizar una matrícula
// ─────────────────────────────────────────────────────────────────────────────
const updateTuition = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 400, 'error', 'Datos inválidos', errors.array());
  }

  try {
    const { id } = req.params;
    const tuition = await Tuition.findByPk(id);

    if (!tuition) {
      return response(res, 404, 'error', `Matrícula con id ${id} no encontrada`);
    }

    const { date_matricula, ciudad, car_id } = req.body;

    // Validar que el car_id existe (si se está actualizando)
    if (car_id && car_id !== tuition.car_id) {
      const carExists = await Car.findByPk(car_id);
      if (!carExists) {
        return response(res, 404, 'error', `El vehículo con ID ${car_id} no existe en la tabla cars`);
      }
    }

    await tuition.update({ date_matricula, ciudad, car_id });

    return response(res, 200, 'success', 'Matrícula actualizada exitosamente', tuition);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/tuitions/:id — Eliminar una matrícula
// ─────────────────────────────────────────────────────────────────────────────
const deleteTuition = async (req, res) => {
  try {
    const { id } = req.params;
    const tuition = await Tuition.findByPk(id);

    if (!tuition) {
      return response(res, 404, 'error', `Matrícula con id ${id} no encontrada`);
    }

    await tuition.destroy();
    return response(res, 200, 'success', `Matrícula con id ${id} eliminada correctamente`);
  } catch (error) {
    return handleSequelizeError(res, error);
  }
};

module.exports = { getAllTuitions, getTuitionById, createTuition, updateTuition, deleteTuition };
