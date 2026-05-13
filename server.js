// server.js
// Punto de entrada del servidor: conecta DBs y levanta Express

require('dotenv').config();
const app                = require('./app');
const { connectDatabases } = require('./database/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. Conectar ambas bases de datos antes de aceptar peticiones
  await connectDatabases();

  // 2. Levantar el servidor HTTP
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📦 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log('─────────────────────────────────────────');
  });
};

startServer();
