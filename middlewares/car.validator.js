// middlewares/car.validator.js
// Validaciones con express-validator para los endpoints de cars

const { body } = require('express-validator');

const currentYear = new Date().getFullYear();

// Validaciones compartidas entre POST y PUT
const carValidationRules = [
  body('marca')
    .notEmpty().withMessage('La marca es obligatoria')
    .isString().withMessage('La marca debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('La marca debe tener entre 2 y 100 caracteres')
    .trim(),

  body('clase')
    .notEmpty().withMessage('La clase es obligatoria')
    .isString().withMessage('La clase debe ser texto')
    .isLength({ min: 2, max: 80 }).withMessage('La clase debe tener entre 2 y 80 caracteres')
    .trim(),

  body('modelo')
    .notEmpty().withMessage('El modelo (año) es obligatorio')
    .isInt({ min: 1900, max: currentYear + 1 })
    .withMessage(`El modelo debe ser un año entre 1900 y ${currentYear + 1}`)
    .toInt(),

  body('cilindraje')
    .notEmpty().withMessage('El cilindraje es obligatorio')
    .isFloat({ min: 0.1 }).withMessage('El cilindraje debe ser un número mayor a 0')
    .toFloat(),

  body('capacidad')
    .notEmpty().withMessage('La capacidad es obligatoria')
    .isInt({ min: 1, max: 50 }).withMessage('La capacidad debe ser un entero entre 1 y 50')
    .toInt(),

  body('pago')
    .notEmpty().withMessage('El pago es obligatorio')
    .isDecimal({ decimal_digits: '0,2' }).withMessage('El pago debe ser un número válido (máx. 2 decimales)')
    .toFloat()
    .custom((value) => {
      if (value < 0) throw new Error('El pago no puede ser negativo');
      return true;
    }),
];

module.exports = { carValidationRules };
