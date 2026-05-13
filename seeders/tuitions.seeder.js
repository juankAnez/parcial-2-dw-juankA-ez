// seeders/tuitions.seeder.js
// Inserta 20 registros fake en la tabla 'tuitions' de MySQL y SQL Server

require('dotenv').config();
const { faker } = require('@faker-js/faker');
const { connectDatabases, syncDatabases, Tuition, Car } = require('../database/db');

// Ciudades colombianas
const ciudades = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Bucaramanga', 'Cúcuta', 'Pereira', 'Santa Marta', 'Manizales',
  'Ibagué', 'Armenia', 'Valledupar', 'Villavicencio', 'Montería',
  'Popayán', 'Tunja', 'Huila', 'Neira', 'Filandia',
];

/**
 * Genera un objeto con datos fake para una matrícula
 * @param {number} carId - ID del vehículo a asociar
 */
const generateFakeTuition = (carId) => ({
  date_matricula: faker.date.between({ from: '2020-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
  ciudad: faker.helpers.arrayElement(ciudades),
  car_id: carId,
});

const seedTuitions = async () => {
  try {
    console.log('\n🌱 Iniciando seeder de tuitions...');
    await connectDatabases();
    await syncDatabases();

    // Obtener los IDs de los vehículos existentes (máximo 20 para asociar con las 20 matrículas)
    const cars = await Car.findAll({
      attributes: ['id'],
      limit: 20,
      order: [['id', 'ASC']],
    });

    if (cars.length === 0) {
      console.error('❌ No hay vehículos en la tabla cars. Ejecuta primero: npm run seed cars');
      process.exit(1);
    }

    // Generar 20 registros fake asociados a los cars existentes
    const fakeTuitions = Array.from({ length: 20 }, (_, index) => {
      const carIndex = index % cars.length; // Circular para asociar cars
      return generateFakeTuition(cars[carIndex].id);
    });

    // Insertar en el motor activo (MySQL por defecto)
    const inserted = await Tuition.bulkCreate(fakeTuitions, { validate: true });

    console.log(`✅ ${inserted.length} matrículas insertadas correctamente en la BD activa (MySQL)`);
    console.log('📋 Registros insertados:');
    inserted.forEach((tuition, i) => {
      console.log(`   ${i + 1}. [ID:${tuition.id}] ${tuition.date_matricula} | ${tuition.ciudad} | Car ID: ${tuition.car_id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeder de tuitions:', error.message);
    process.exit(1);
  }
};

seedTuitions();
