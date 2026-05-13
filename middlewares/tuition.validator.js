// middlewares/tuition.validator.js
// Validaciones con express-validator para los endpoints de tuitions

const { body } = require('express-validator');

const tuitionValidationRules = [
  body('date_matricula')
    .notEmpty().withMessage('La fecha de matrícula es obligatoria')
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('La fecha debe tener formato válido YYYY-MM-DD')
    .trim(),

  body('ciudad')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .isString().withMessage('La ciudad debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('La ciudad debe tener entre 2 y 100 caracteres')
    .trim(),

  body('car_id')
    .notEmpty().withMessage('El car_id es obligatorio')
    .isInt({ min: 1 }).withMessage('El car_id debe ser un número entero positivo')
    .toInt(),
];

module.exports = { tuitionValidationRules };
