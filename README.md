# API de Gestión de Productos y Precios Especiales

<p>Una API moderna para gestionar productos y precios especiales en tu tienda</p>

[![Node.js](https://img.shields.io/badge/Node.js-14.x+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![npm](https://img.shields.io/badge/npm-8.x-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/)

## 📋 Tabla de Contenidos

- [📃 Introducción](#-introducción)
- [✨ Características](#-características)
- [⚙️ Instalación](#️-instalación)
- [🛠️ Tecnologías](#️-tecnologías)
- [🏅 Justificación de elecciones técnicas](#-justificación-de-elecciones-técnicas)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔌 API Endpoints](#-api-endpoints)
- [👨‍💻 Desarrollador](#-desarrollador)

## 📃 Introducción

Esta API RESTful está diseñada para gestionar productos y precios especiales. La aplicación permite a los usuarios consultar productos, así como definir y gestionar precios especiales para diferentes situaciones (ofertas, descuentos por volumen, etc.). Desarrollada con TypeScript y Node.js, esta API sigue principios de arquitectura limpia y patrones de diseño modernos para garantizar mantenibilidad, escalabilidad y rendimiento.

## ✨ Características

- **Gestión de productos**: Consultar productos individuales o listar todos los disponibles.
- **Sistema de precios especiales**: Configuración y gestión de precios personalizados con múltiples opciones.
- **API RESTful**: Endpoints bien definidos siguiendo las mejores prácticas REST.
- **Arquitectura por capas**: Separación clara de responsabilidades.
- **Sistema de logging**: Registro detallado de operaciones para depuración y auditoría.
- **Manejo de errores**: Sistema centralizado de gestión de excepciones.
- **Documentación integrada**: Comentarios JSDoc en las rutas para facilitar la comprensión y uso.

## ⚙️ Instalación

### Prerrequisitos

- Node.js (v20 o superior)
- npm
- Base de datos (según configuración en `config/db.ts`)

### Pasos de instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd nombre-del-repo
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env
   # Editar .env con los valores apropiados
   ```

4. Inicia la aplicación:

   ```bash
   # Modo desarrollo
   npm run dev

   # Modo producción
   npm run build
   npm start
   ```

## 🛠️ Tecnologías

Esta API está construida con tecnologías modernas:

- **Entorno de ejecución**: [Node.js](https://nodejs.org/)
- **Gestor de paquetes**: [npm](https://www.npmjs.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Framework web**: [Express.js](https://expressjs.com/)
- **Logging**: [Winston](https://github.com/winstonjs/winston)
- **ORM/ODM**: Depende de la base de datos configurada en `config/db.ts`
- **Validación de datos**: Implementada en los controladores y servicios

## 🏅 Justificación de elecciones técnicas

### TypeScript

El lenguaje principal elegido fue TypeScript por varias razones fundamentales:

- **Tipado estático**: Aporta detección de errores en tiempo de desarrollo, lo que disminuye la cantidad de bugs en producción.
- **Mejor documentación**: Los tipos actúan como documentación en vivo, lo que ayuda a entender partes desconocidas del código.
- **Escalabilidad**: Facilita estructurar proyectos a largo plazo, permitiendo hacer sistemas más grandes sin perder comprensión del código existente.

### Arquitectura por Capas

La implementación de una arquitectura por capas ofrece ventajas significativas:

- **Separación de responsabilidades**: Cada componente tiene un propósito claro y definido.
- **Testabilidad**: Facilita la creación de pruebas unitarias y de integración.
- **Mantenibilidad**: Permite realizar cambios en una capa sin afectar a las demás.
- **Organización clara**: La estructura de carpetas refleja la arquitectura, facilitando la navegación por el código.

### Patrón Repositorio

El uso del patrón repositorio proporciona beneficios importantes:

- **Abstracción de la persistencia**: Aísla la lógica de acceso a datos.
- **Intercambiabilidad**: Permite cambiar fácilmente la implementación de almacenamiento sin afectar la lógica de negocio.
- **Testing simplificado**: Facilita la creación de mocks para pruebas unitarias.

### Express.js

Express fue elegido como framework web por:

- **Minimalista y flexible**: Proporciona lo necesario sin imponer estructuras rígidas.
- **Amplia adopción**: Gran comunidad y abundancia de recursos disponibles.
- **Middleware**: Sistema de middleware potente y extensible.
- **Rendimiento**: Eficiente para APIs con alto tráfico.

## 📂 Estructura del Proyecto

```
📦src
 ┣ 📂config         # Configuración de la aplicación
 ┃ ┣ 📜db.ts        # Configuración de la base de datos
 ┃ ┗ 📜logger.ts    # Configuración del sistema de logging
 ┣ 📂controllers    # Controladores de la API
 ┃ ┣ 📜productController.ts
 ┃ ┗ 📜specialPriceController.ts
 ┣ 📂middlewares    # Middleware de Express
 ┃ ┗ 📜errorHandler.ts
 ┣ 📂models         # Definición de entidades
 ┃ ┣ 📜Product.ts
 ┃ ┗ 📜SpecialPrice.ts
 ┣ 📂repositories   # Capa de acceso a datos
 ┃ ┣ 📜productRepository.ts
 ┃ ┗ 📜specialPriceRepository.ts
 ┣ 📂routes         # Definición de rutas
 ┃ ┣ 📜productRoutes.ts
 ┃ ┗ 📜specialPriceRoutes.ts
 ┣ 📂services       # Lógica de negocio
 ┃ ┣ 📜productService.ts
 ┃ ┗ 📜specialPriceService.ts
 ┣ 📂utils          # Utilidades compartidas
 ┃ ┗ 📜response.ts
 ┣ 📜app.ts         # Configuración de Express
 ┗ 📜server.ts      # Punto de entrada de la aplicación
```

### Explicación de la Arquitectura

El proyecto sigue una arquitectura por capas con las siguientes responsabilidades:

1. **Capa de Presentación** (controllers, routes):

   - Maneja las solicitudes HTTP y respuestas
   - Valida los datos de entrada
   - Devuelve respuestas formateadas adecuadamente

2. **Capa de Lógica de Negocio** (services):

   - Implementa las reglas de negocio
   - Coordina entre múltiples repositorios cuando es necesario
   - No tiene conocimiento directo de la fuente de datos

3. **Capa de Acceso a Datos** (repositories, models):
   - Gestiona la persistencia de datos
   - Abstrae las operaciones de base de datos
   - Proporciona métodos CRUD básicos y consultas especializadas

Esta separación facilita el mantenimiento, las pruebas y la evolución del sistema a lo largo del tiempo.

## 🔌 API Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos

  - Descripción: Devuelve una lista de todos los productos disponibles

- `GET /api/products/:id` - Obtener un producto por ID
  - Descripción: Devuelve los detalles de un producto específico
  - Parámetros: `id` - Identificador único del producto

### Precios Especiales

- `GET /api/special-prices` - Obtener todos los precios especiales

  - Descripción: Devuelve una lista de todos los precios especiales

- `GET /api/special-prices/:id` - Obtener precios especiales por ID

  - Descripción: Devuelve todos los precios especiales para un ID específico
  - Parámetros: `id` - Identificador único

- `POST /api/special-prices` - Crear un nuevo precio especial

  - Descripción: Registra un nuevo precio especial en el sistema

- `PUT /api/special-prices/add-special-price` - Añadir un precio especial

  - Descripción: Añade un nuevo precio especial a un registro existente

- `PUT /api/special-prices/:id` - Actualizar un precio especial

  - Descripción: Actualiza la información de un precio especial existente
  - Parámetros: `id` - Identificador único del precio especial

- `DELETE /api/special-prices/:id` - Eliminar un precio especial

  - Descripción: Elimina un precio especial del sistema
  - Parámetros: `id` - Identificador único del precio especial

- `DELETE /api/special-prices/delete-product-special-price/:id` - Eliminar precio especial de un producto
  - Descripción: Elimina un precio especial asociado a un producto específico
  - Parámetros: `id` - Identificador único del producto

## 👨‍💻 Desarrollador

<div align="center">
  <img src="https://avatars.githubusercontent.com/sebas19957" width="100px" style="border-radius: 50%;" alt="Sebastian Mosquera Valencia"/>
  <h3>Sebastian Mosquera Valencia</h3>
  <p>Desarrollador Full Stack</p>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/semosva/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sebas19957)
</div>

---

<div align="center">
  <p>Hecho con ❤️ por Sebastian Mosquera Valencia</p>
</div>
