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

async function checkTables() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a SQL Server');

    // Buscar tablas con su esquema
    const [tables] = await sequelize.query(`
      SELECT TABLE_SCHEMA, TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME IN ('cars', 'tuitions')
    `);
    console.log('\n📁 Tablas encontradas:');
    tables.forEach(t => console.log(`  ${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

    // Verificar si las tablas son identidades
    const [identity] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME, 
             COLUMNPROPERTY(object_id(TABLE_SCHEMA+'.'+TABLE_NAME), COLUMN_NAME, 'IsIdentity') as IsIdentity
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME IN ('cars', 'tuitions') AND COLUMN_NAME = 'id'
    `);
    console.log('\n🔢 Propiedad IDENTITY de columnas id:');
    identity.forEach(row => {
      console.log(`  ${row.TABLE_NAME}.id => IsIdentity: ${row.IsIdentity}`);
    });

    // Verificar estructura completa
    const [results] = await sequelize.query(`
      SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME IN ('cars', 'tuitions')
      ORDER BY TABLE_NAME, ORDINAL_POSITION
    `);

    console.log('\n📋 Estructura de tablas:');
    results.forEach(row => {
      console.log(`  ${row.TABLE_NAME}.${row.COLUMN_NAME} (${row.DATA_TYPE}) ${row.IS_NULLABLE === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });

    // Verificar datos
    const [cars] = await sequelize.query('SELECT TOP 5 * FROM cars');
    console.log('\n🚗 Primeros 5 registros de cars:');
    cars.forEach((car, i) => {
      console.log(`  [${i+1}] id=${car.id}, marca=${car.marca}`);
    });

    const [carsCount] = await sequelize.query('SELECT COUNT(*) as count FROM cars');
    const [tuitionsCount] = await sequelize.query('SELECT COUNT(*) as count FROM tuitions');
    console.log(`\n📊 Registros: cars=${carsCount[0].count}, tuitions=${tuitionsCount[0].count}`);

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkTables();
