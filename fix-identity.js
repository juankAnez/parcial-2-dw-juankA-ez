const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.SQLSERVER_DB,
  process.env.SQLSERVER_USER,
  process.env.SQLSERVER_PASSWORD || '',
  {
    host: process.env.SQLSERVER_HOST,
    port: parseInt(process.env.SQLSERVER_PORT) || 1433,
    dialect: 'mssql',
    logging: console.log,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  }
);

async function fixIdentity() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a SQL Server');

    // Verificar el valor actual del identity
    const [currentSeed] = await sequelize.query(`
      SELECT IDENT_CURRENT('cars') as currentIdentity,
             IDENT_SEED('cars') as currentSeed,
             IDENT_INCR('cars') as increment
    `);
    console.log('📊 Identity actual de cars:', currentSeed[0]);

    // Reiniciar el identity para que empiece en 1
    console.log('\n🔧 Reiniciando identity de cars...');
    await sequelize.query('DBCC CHECKIDENT (cars, RESEED, 0)');
    console.log('✅ Identity reiniciado. Próximo ID será 1');

    // Verificar nuevamente
    const [newSeed] = await sequelize.query(`
      SELECT IDENT_CURRENT('cars') as currentIdentity
    `);
    console.log('📊 Nuevo identity:', newSeed[0]);

    // Hacer lo mismo para tuitions
    console.log('\n🔧 Reiniciando identity de tuitions...');
    await sequelize.query('DBCC CHECKIDENT (tuitions, RESEED, 0)');
    const [tSeed] = await sequelize.query(`SELECT IDENT_CURRENT('tuitions') as currentIdentity`);
    console.log('📊 Nuevo identity tuitions:', tSeed[0]);

    await sequelize.close();
    console.log('\n✅ Listo. Ahora los IDs comenzarán en 1');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixIdentity();
