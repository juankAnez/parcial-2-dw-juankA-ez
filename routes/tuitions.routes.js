// routes/tuitions.routes.js
// Rutas REST para el recurso 'tuitions'

const { Router } = require('express');
const router = Router();

const {
  getAllTuitions,
  getTuitionById,
  createTuition,
  updateTuition,
  deleteTuition,
} = require('../controllers/tuition.controller');

const { tuitionValidationRules } = require('../middlewares/tuition.validator');

// GET    /api/tuitions         → obtener todas las matrículas
router.get('/', getAllTuitions);

// GET    /api/tuitions/:id     → obtener una matrícula por ID
router.get('/:id', getTuitionById);

// POST   /api/tuitions         → crear una matrícula (con validaciones)
router.post('/', tuitionValidationRules, createTuition);

// PUT    /api/tuitions/:id     → actualizar una matrícula (con validaciones)
router.put('/:id', tuitionValidationRules, updateTuition);

// DELETE /api/tuitions/:id     → eliminar una matrícula
router.delete('/:id', deleteTuition);

module.exports = router;
