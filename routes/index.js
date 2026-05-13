// routes/index.js
// Index central de rutas — registra todos los routers de la API

const { Router } = require('express');
const router = Router();

// ─── Importar routers ────────────────────────────────────────────────────────
router.use('/cars',     require('./cars.routes'));
router.use('/tuitions', require('./tuitions.routes'));

module.exports = router;
