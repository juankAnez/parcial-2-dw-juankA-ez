# API REST - Parcial 2 Desarrollo Web

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2+-blue)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-v6.37+-orange)](https://sequelize.org/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

API REST profesional desarrollada como proyecto académico de parcial universitario. Implementa CRUD completo para dos tablas relacionadas (`cars` y `tuitions`) con validaciones, manejo de errores y respuestas JSON estandarizadas.

## 📋 Características

- ✅ **CRUD Completo** para 2 tablas relacionadas
- ✅ **Base de datos dual**: MySQL y SQL Server
- ✅ **Validaciones profesionales** en dos niveles (middleware + modelo)
- ✅ **Relaciones foráneas** con integridad referencial (CASCADE)
- ✅ **Manejo centralizado de errores**
- ✅ **Respuestas JSON consistentes**
- ✅ **20 registros fake por tabla** generados con Faker.js
- ✅ **Documentación HTTP** para pruebas en VS Code
- ✅ **Seeders para carga de datos**
- ✅ **Buenas prácticas REST**

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Node.js** | v16+ | Runtime JavaScript |
| **Express.js** | v5.2.1 | Framework web |
| **Sequelize** | v6.37.8 | ORM para bases de datos |
| **MySQL** | - | Base de datos relacional 1 |
| **SQL Server** | - | Base de datos relacional 2 |
| **Faker.js** | v10.4.0 | Generación de datos fake |
| **express-validator** | v7.3.2 | Validación de requests |
| **dotenv** | v17.4.2 | Variables de entorno |
| **nodemon** | v3.1.14 | Hot reload desarrollo |

## 📁 Estructura del Proyecto

```
parcial-2-dw-juankA-ez/
├── config/                    # Configuración de bases de datos
│   ├── mysql.js              # Configuración MySQL
│   └── mssql.js              # Configuración SQL Server
├── controllers/              # Lógica de negocio
│   ├── car.controller.js      # CRUD de vehículos
│   └── tuition.controller.js  # CRUD de matrículas
├── models/                   # Definición de modelos Sequelize
│   ├── Car.js                # Modelo cars
│   └── Tuition.js            # Modelo tuitions
├── routes/                   # Rutas REST
│   ├── index.js              # Index de rutas
│   ├── cars.routes.js        # Rutas /api/cars
│   └── tuitions.routes.js    # Rutas /api/tuitions
├── middlewares/              # Middlewares
│   ├── car.validator.js      # Validaciones cars
│   ├── tuition.validator.js  # Validaciones tuitions
│   └── errorHandler.js       # Manejo centralizado de errores
├── seeders/                  # Generación de datos
│   ├── cars.seeder.js        # Seeder para cars
│   └── tuitions.seeder.js    # Seeder para tuitions
├── database/
│   └── db.js                 # Conexión y sincronización de DBs
├── fotos/                    # Carpeta para imágenes
├── app.js                    # Configuración de Express
├── server.js                 # Punto de entrada
├── package.json              # Dependencias
├── .env.example              # Variables de entorno ejemplo
└── http.http                 # Ejemplos de requests HTTP
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/juankAnez/parcial-2-dw-juankA-ez.git
cd parcial-2-dw-juankA-ez
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
# Variables requeridas:
# - PORT (puerto del servidor, ej: 3000)
# - NODE_ENV (development/production)
# - MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
# - SQLSERVER_HOST, SQLSERVER_PORT, SQLSERVER_USER, SQLSERVER_PASSWORD, SQLSERVER_DB
```

### 4. Asegurar que MySQL y SQL Server están corriendo
```bash
# MySQL en puerto 3306
# SQL Server en puerto 1433
```

### 5. Ejecutar el servidor
```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm start
```

El servidor se levantará en `http://localhost:3000` (o el puerto configurado)

## 📊 Tablas de Base de Datos

### Tabla: cars
Almacena información de vehículos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| **id** | INTEGER | PK, AUTO_INCREMENT | Identificador único |
| **marca** | VARCHAR(100) | NOT NULL | Marca del vehículo (Toyota, Honda, etc.) |
| **clase** | VARCHAR(80) | NOT NULL | Tipo de vehículo (Sedán, SUV, etc.) |
| **modelo** | INTEGER | NOT NULL | Año del vehículo (1900-2025) |
| **cilindraje** | FLOAT | NOT NULL | Cilindrada en litros (>0.1) |
| **capacidad** | INTEGER | NOT NULL | Número de pasajeros (1-50) |
| **pago** | DECIMAL(12,2) | NOT NULL | Precio del vehículo (≥0) |
| **createdAt** | TIMESTAMP | AUTO | Fecha de creación |
| **updatedAt** | TIMESTAMP | AUTO | Fecha de actualización |

**Validaciones**:
- Marca: 2-100 caracteres, no vacía
- Clase: 2-80 caracteres, no vacía
- Modelo: Número entre 1900 y año actual + 1
- Cilindraje: Número decimal > 0.1
- Capacidad: Entero entre 1 y 50
- Pago: Decimal ≥ 0, máximo 2 decimales

### Tabla: tuitions
Almacena información de matrículas de vehículos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| **id** | INTEGER | PK, AUTO_INCREMENT | Identificador único |
| **date_matricula** | DATE | NOT NULL | Fecha de matrícula (YYYY-MM-DD) |
| **ciudad** | VARCHAR(100) | NOT NULL | Ciudad de registro |
| **car_id** | INTEGER | NOT NULL, FK | Referencia a cars(id) |
| **createdAt** | TIMESTAMP | AUTO | Fecha de creación |
| **updatedAt** | TIMESTAMP | AUTO | Fecha de actualización |

**Validaciones**:
- date_matricula: Fecha válida formato YYYY-MM-DD
- ciudad: 2-100 caracteres, no vacía
- car_id: Número entero positivo, debe existir en tabla cars

**Relación**: Cada matrícula está asociada a un vehículo. Si se elimina un vehículo, se eliminan sus matrículas (ON DELETE CASCADE).

## 📡 Endpoints API

### GET - Obtener recursos

```http
GET http://localhost:3000/api/cars
GET http://localhost:3000/api/cars/:id
GET http://localhost:3000/api/tuitions
GET http://localhost:3000/api/tuitions/:id
```

**Respuesta exitosa (200)**:
```json
{
  "status": "success",
  "message": "20 vehículos encontrados",
  "data": [
    {
      "id": 1,
      "marca": "Toyota",
      "clase": "SUV",
      "modelo": 2022,
      "cilindraje": 2.5,
      "capacidad": 5,
      "pago": "85000000.00",
      "createdAt": "2024-03-15T10:30:00.000Z",
      "updatedAt": "2024-03-15T10:30:00.000Z"
    }
  ]
}
```

### POST - Crear recurso

```http
POST http://localhost:3000/api/cars
Content-Type: application/json

{
  "marca": "Toyota",
  "clase": "SUV",
  "modelo": 2022,
  "cilindraje": 2.5,
  "capacidad": 5,
  "pago": 85000000
}
```

**Respuesta exitosa (201)**:
```json
{
  "status": "success",
  "message": "Vehículo creado exitosamente",
  "data": {
    "id": 21,
    "marca": "Toyota",
    "clase": "SUV",
    ...
  }
}
```

### PUT - Actualizar recurso

```http
PUT http://localhost:3000/api/cars/1
Content-Type: application/json

{
  "marca": "Mazda",
  "clase": "Sedán",
  "modelo": 2023,
  "cilindraje": 2.0,
  "capacidad": 5,
  "pago": 95000000
}
```

**Respuesta exitosa (200)**:
```json
{
  "status": "success",
  "message": "Vehículo actualizado exitosamente",
  "data": { ... }
}
```

### DELETE - Eliminar recurso

```http
DELETE http://localhost:3000/api/cars/1
```

**Respuesta exitosa (200)**:
```json
{
  "status": "success",
  "message": "Vehículo con id 1 eliminado correctamente"
}
```

## 🔴 Códigos de Error

| Código | Descripción | Ejemplo |
|--------|------------|---------|
| **400** | Bad Request - Validación fallida | Campo vacío, tipo incorrecto |
| **404** | Not Found - Recurso no encontrado | ID no existe |
| **409** | Conflict - Violación de restricción única | Registro duplicado |
| **500** | Server Error - Error interno | Error de base de datos |

**Respuesta de error (400)**:
```json
{
  "status": "error",
  "message": "Datos inválidos",
  "data": [
    {
      "field": "marca",
      "message": "La marca es obligatoria"
    }
  ]
}
```

## 🌱 Seeders - Insertar Datos

### Insertar datos fake en ambas tablas
```bash
npm run seed
```

Ejecuta secuencialmente:
1. Seeder de cars (20 registros)
2. Seeder de tuitions (20 registros)

### Insertar solo cars
```bash
npm run seed:cars
```

### Insertar solo tuitions
```bash
npm run seed:tuitions
```

### Ejemplo de salida
```
🌱 Iniciando seeder de cars...
✅ MySQL conectado correctamente
✅ SQL Server conectado correctamente
🗄️  Tablas MySQL sincronizadas (cars, tuitions)
🗄️  Tablas SQL Server sincronizadas (cars, tuitions)
✅ 20 vehículos insertados correctamente en la BD activa (MySQL)
📋 Registros insertados:
   1. [ID:1] Toyota SUV 2022 - $95000000.00
   2. [ID:2] Chevrolet Camioneta 2020 - $75000000.00
   ...
```

## 🧪 Pruebas

### Usar extensión REST Client (VS Code)

La extensión **REST Client** permite ejecutar requests HTTP directamente desde VS Code.

1. Instalar extensión: `REST Client` (Huachao Mao)
2. Abrir archivo `http.http`
3. Hacer click en "Send Request" encima de cada request

**Archivo de pruebas**: `http.http`

Contiene 22 requests agrupados por:
- 10 requests CRUD cars
- 12 requests CRUD tuitions + validaciones

### Usar Postman

1. Importar requests desde `http.http`
2. Configurar variable `{{baseURL}}` = `http://localhost:3000`
3. Ejecutar requests

### Pruebas de validación
Todos los ejemplos de validación fallida están comentados en `http.http`:
- Campos vacíos
- Tipos de datos inválidos
- Rangos fuera de límites
- Relaciones foráneas inexistentes
- Campos faltantes

## 📝 Validaciones Implementadas

### Cars
- ✅ Marca: texto, 2-100 caracteres
- ✅ Clase: texto, 2-80 caracteres
- ✅ Modelo: año entre 1900 y actual+1
- ✅ Cilindraje: decimal > 0.1
- ✅ Capacidad: entero 1-50
- ✅ Pago: decimal ≥ 0, máx 2 decimales

### Tuitions
- ✅ date_matricula: fecha válida YYYY-MM-DD
- ✅ ciudad: texto, 2-100 caracteres
- ✅ car_id: entero positivo, debe existir en cars
- ✅ Validación de integridad referencial

## 🔐 Seguridad y Buenas Prácticas

- ✅ **Variables de entorno**: Credenciales en `.env` (no en código)
- ✅ **Validación de entrada**: Dos niveles (middleware + modelo)
- ✅ **Respuestas consistentes**: Formato JSON estándar
- ✅ **Manejo de errores**: Centralizado con middleware
- ✅ **Logging**: Errores registrados en consola
- ✅ **Async/await**: No callbacks anidados
- ✅ **Separación de responsabilidades**: Controllers, models, routes, middlewares
- ✅ **Código limpio**: Formato, comentarios, sin código muerto
- ✅ **Integridad referencial**: FK constraints con CASCADE

## 📊 Datos Fake Generados

### Cars (20 registros)
- Marcas: Toyota, Chevrolet, Mazda, Renault, Ford, Honda, Kia, Nissan, Hyundai, Volkswagen
- Clases: Sedán, SUV, Camioneta, Hatchback, Coupé, Convertible, Minivan, Pickup, Crossover, Van
- Años: 2000-2024
- Cilindradas: 1.0-5.0 L
- Capacidades: 2-8 pasajeros
- Precios: $500,000 - $150,000,000 COP

### Tuitions (20 registros)
- Ciudades: Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, etc.
- Fechas: Entre 2020 y 2024
- Asociadas a 20 vehículos diferentes (circular)

## 📚 Documentación del Código

Cada archivo contiene comentarios explicativos:

```javascript
// ─── Separadores visuales para bloques de código
/**
 * Comentarios de funciones importantes
 */
const handleError = () => { ... };
```

## 🐛 Debugging

### Habilitar SQL logging
En `config/mysql.js` o `config/mssql.js`, cambiar:
```javascript
logging: false,  // ← cambiar a:
logging: console.log,
```

### Ver errores en detalle
Todos los errores se registran en consola:
```
❌ [2024-03-15T10:30:00Z] Error no controlado:
   Ruta:    POST /api/cars
   Mensaje: La marca es obligatoria
   Stack:   ...
```

## 🤝 Contribuciones

Este es un proyecto académico. Para cambios, crear un branch:
```bash
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: descripción del cambio"
git push origin feature/nueva-funcionalidad
```

## 📄 Licencia

ISC License - Proyecto académico

## 👨‍💻 Autor

**Juan Ánez**
- GitHub: [@juankAnez](https://github.com/juankAnez)
- Proyecto: Parcial 2 - Desarrollo Web

## 📅 Historial de Commits

El proyecto incluye commits detallados por cada etapa:

1. ✅ `feat: agregar relaciones foráneas entre cars y tuitions`
2. ✅ `feat: crear controlador CRUD para tuitions`
3. ✅ `feat: crear rutas REST para tuitions`
4. ✅ `feat: habilitar endpoints de tuitions en API`
5. ✅ `feat: crear seeder para tuitions con 20 registros fake`
6. ✅ `config: agregar scripts npm para seeders individuales`
7. ✅ `docs: completar ejemplos HTTP para tuitions`

## 🆘 Troubleshooting

### Error: "Cannot find module 'sequelize'"
```bash
npm install
```

### Error: "Connection refused" en MySQL/SQL Server
Verificar que las bases de datos están corriendo en los puertos correctos:
- MySQL: localhost:3306
- SQL Server: localhost:1433

### Error: "Table 'cars' doesn't exist"
Las tablas se crean automáticamente al ejecutar:
```bash
npm run dev
```

### Error: "car_id is not valid"
Insertar primero los cars antes que las tuitions:
```bash
npm run seed:cars
npm run seed:tuitions
```

## 📞 Soporte

Para problemas, contactar a través de:
- Issues en GitHub
- Email del proyecto

---

**Estado**: ✅ Proyecto completo y funcional
**Última actualización**: 13 de Mayo, 2026
