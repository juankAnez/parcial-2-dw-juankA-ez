// routes/cars.routes.js
// Rutas REST para el recurso 'cars'

const { Router } = require('express');
const router = Router();

const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/car.controller');

const { carValidationRules } = require('../middlewares/car.validator');

// GET    /api/cars         → obtener todos los vehículos
router.get('/', getAllCars);

// GET    /api/cars/:id     → obtener un vehículo por ID
router.get('/:id', getCarById);

// POST   /api/cars         → crear un vehículo (con validaciones)
router.post('/', carValidationRules, createCar);

// PUT    /api/cars/:id     → actualizar un vehículo (con validaciones)
router.put('/:id', carValidationRules, updateCar);

// DELETE /api/cars/:id     → eliminar un vehículo
router.delete('/:id', deleteCar);

module.exports = router;
