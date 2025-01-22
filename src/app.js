import express from 'express';
// import { __dirname } from './utils/utils.js';
import { AppInit } from './init/initialConfig.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

AppInit(app);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adopme api',
      description:
        'API para gestionar la adopción de mascotas, permitiendo a los usuarios explorar animales disponibles, registrarse, y gestionar solicitudes de adopción. Incluye endpoints para animales, usuarios y procesos de adopción.',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Servidor en 8080');
});
