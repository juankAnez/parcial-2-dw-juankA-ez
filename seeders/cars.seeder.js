// seeders/cars.seeder.js
// Inserta 20 registros fake en la tabla 'cars' de AMBOS motores (MySQL y SQL Server)

require('dotenv').config();
const { faker } = require('@faker-js/faker');
const { connectDatabases, syncDatabases, Car } = require('../database/db');

// Marcas de vehículos reales
const marcas = ['Toyota', 'Chevrolet', 'Mazda', 'Renault', 'Ford',
                 'Honda', 'Kia', 'Nissan', 'Hyundai', 'Volkswagen'];

// Clases de vehículos
const clases = ['Sedán', 'SUV', 'Camioneta', 'Hatchback', 'Coupé',
                 'Convertible', 'Minivan', 'Pickup', 'Crossover', 'Van'];

/**
 * Genera un objeto con datos fake para un vehículo
 */
const generateFakeCar = () => ({
  marca:      faker.helpers.arrayElement(marcas),
  clase:      faker.helpers.arrayElement(clases),
  modelo:     faker.number.int({ min: 2000, max: 2024 }),
  cilindraje: parseFloat(faker.number.float({ min: 1.0, max: 5.0, fractionDigits: 1 })),
  capacidad:  faker.number.int({ min: 2, max: 8 }),
  pago:       parseFloat(faker.number.float({ min: 500000, max: 150000000, fractionDigits: 2 })),
});

const seedCars = async () => {
  try {
    console.log('\n🌱 Iniciando seeder de cars...');
    await connectDatabases();
    await syncDatabases();

    // Generar 20 registros fake
    const fakeCars = Array.from({ length: 20 }, generateFakeCar);

    // Insertar en el motor activo (MySQL por defecto vía Car exportado desde db.js)
    const inserted = await Car.bulkCreate(fakeCars, { validate: true });

    console.log(`✅ ${inserted.length} vehículos insertados correctamente en la BD activa (MySQL)`);
    console.log('📋 Registros insertados:');
    inserted.forEach((car, i) => {
      console.log(`   ${i + 1}. [ID:${car.id}] ${car.marca} ${car.clase} ${car.modelo} - $${car.pago}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeder de cars:', error.message);
    process.exit(1);
  }
};

seedCars();
