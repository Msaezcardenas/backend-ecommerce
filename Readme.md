# Backend para Ecommerce

Este proyecto es el backend de una aplicación de ecommerce, desarrollado utilizando Node.js junto con una variedad de tecnologías y herramientas para garantizar una implementación robusta y escalable.

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías y dependencias:

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de aplicaciones web y APIs.
- **Mongoose**: ODM (Object Document Mapper) para MongoDB.
- **Passport**: Middleware para la autenticación.
  - **passport-local**: Estrategia para autenticación con credenciales locales.
  - **passport-jwt**: Estrategia para autenticación basada en JSON Web Tokens.
- **JSON Web Token (JWT)**: Herramienta para la autenticación basada en tokens.
- **bcryptjs**: Para el hash de contraseñas.
- **dotenv**: Manejo de variables de entorno.
- **cors**: Manejo de solicitudes de diferentes dominios.
- **connect-mongo**: Almacenamiento de sesiones en MongoDB.
- **express-session**: Gestión de sesiones.
- **joi**: Validación de datos.
- **multer**: Manejo de carga de archivos.
- **nodemailer**: Envío de correos electrónicos.
- **swagger-jsdoc** y **swagger-ui-express**: Documentación de APIs.
- **uuid**: Generación de identificadores únicos.
- **winston**: Registro de logs.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env`.

## Scripts

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.

## Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```
src/
|-- app.js                  # Archivo principal para inicializar la aplicación
|-- config/                 # Configuración del proyecto (conexión a BD, Passport, etc.)
|-- controllers/            # Controladores de las rutas
|   |-- baseController.js   # Controlador base con métodos comunes
|-- models/                 # Modelos de Mongoose
|-- repositories/           # Lógica para interactuar con la base de datos
|   |-- baseRepository.js   # Repositorio base con métodos CRUD
|-- routes/                 # Definición de rutas de la API
|-- services/               # Lógica de negocio y comunicación entre controladores y repositorios
|-- utils/                  # Funciones auxiliares
|-- validators/             # Validaciones con Joi
```

## Patrón de diseño utilizado

El proyecto implementa el patrón **Modelo-Repositorio-Servicio-Controlador (MRSC)**, que organiza el código en cuatro capas principales:

1. **Modelo (Model)**: Define los esquemas y la interacción con la base de datos MongoDB mediante Mongoose.
2. **Repositorio (Repository)**: Abstrae la lógica de acceso a la base de datos. Contiene métodos genéricos como `getAll`, `getById`, `create`, `update` y `delete`, implementados en `baseRepository.js` y extendidos según sea necesario.
3. **Servicio (Service)**: Contiene la lógica de negocio, siendo el intermediario entre los controladores y los repositorios.
4. **Controlador (Controller)**: Maneja las solicitudes HTTP y utiliza los servicios para procesar las respuestas.

### Ventajas del patrón MRSC:

- **Reutilización**: Los métodos CRUD básicos están centralizados en el repositorio base.
- **Separación de responsabilidades**: Cada capa tiene una función clara y definida.
- **Escalabilidad**: Es fácil agregar nuevas funcionalidades o modificar las existentes sin afectar otras capas.

### Ejemplo del Repositorio Base

El archivo `baseRepository.js` incluye métodos genéricos para interactuar con la base de datos:

```javascript
export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find({});
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getByEmail(email) {
    return await this.model.findOne({ email });
  }

  async create(obj) {
    return await this.model.create(obj);
  }

  async update(id, obj) {
    return await this.model.findByIdAndUpdate(id, obj, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
}
```

## Endpoints principales

El proyecto incluye endpoints básicos para operaciones CRUD. Algunos ejemplos:

- `GET /api/resources`: Obtiene todos los recursos.
- `GET /api/resources/:id`: Obtiene un recurso por su ID.
- `POST /api/resources`: Crea un nuevo recurso.
- `PUT /api/resources/:id`: Actualiza un recurso existente.
- `DELETE /api/resources/:id`: Elimina un recurso por su ID.

Además, se incluyen rutas para la autenticación (registro, inicio de sesión, etc.), manejo de archivos y validación.

## Documentación de la API

La documentación de la API está disponible en formato Swagger. Para acceder a la interfaz interactiva de Swagger:

1. Inicia el servidor.
2. Ve a `http://localhost:<puerto>/api-docs` en tu navegador.

## Autenticación y Seguridad

El proyecto utiliza **Passport** para la autenticación:

- **JWT**: Los usuarios autenticados reciben un token que deben incluir en el encabezado `Authorization` para acceder a rutas protegidas.
- **Hash de contraseñas**: Las contraseñas se almacenan de forma segura utilizando bcryptjs.

## Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y crea un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un pull request.
