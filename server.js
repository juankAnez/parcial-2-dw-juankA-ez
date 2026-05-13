// server.js
// Punto de entrada del servidor: conecta DBs, sincroniza tablas y levanta Express

require('dotenv').config();
const app = require('./app');
const { connectDatabases, syncDatabases } = require('./database/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. Autenticar ambas bases de datos
  await connectDatabases();

  // 2. Crear / actualizar tablas físicas desde los modelos
  await syncDatabases();

  // 3. Levantar el servidor HTTP
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📦 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log('─────────────────────────────────────────');
  });
};

startServer();
