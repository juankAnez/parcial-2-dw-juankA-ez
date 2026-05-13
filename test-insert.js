const { Car, Tuition } = require('./database/db');

async function testInsert() {
  try {
    console.log('🔍 Probando inserción en tuitions...');
    console.log(`   Motor activo: ${process.env.DB_ENGINE}`);

    // 1. Verificar que hay un carro existente con id >= 1
    const cars = await Car.findAll({ 
      where: { id: { [require('sequelize').Op.gt]: 0 } },
      limit: 1 
    });
    
    if (cars.length === 0) {
      console.log('❌ No hay carros con id > 0. Creando uno de prueba...');
      const newCar = await Car.create({
        marca: 'Toyota',
        clase: 'Sedan',
        modelo: 2024,
        cilindraje: 2.5,
        capacidad: 5,
        pago: 150000
      });
      console.log('✅ Carro creado con ID:', newCar.id);
      return testInsert();
    }

    const carId = cars[0].id;
    console.log(`✅ Usando car_id: ${carId}`);

    // 2. Intentar crear matrícula
    const newTuition = await Tuition.create({
      date_matricula: '2024-01-15',
      ciudad: 'Cali',
      car_id: carId
    });

    console.log('✅✅ Matrícula creada exitosamente:', newTuition.toJSON());
  } catch (error) {
    console.error('❌ Error al crear matrícula:');
    console.error('   Nombre:', error.name);
    console.error('   Mensaje:', error.message);
    if (error.errors) {
      console.error('   Detalles:', error.errors);
    }
  }
}

testInsert();
