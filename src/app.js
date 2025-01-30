import express from 'express';
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
      title: 'E-Commerce API',
      description:
        'Esta API es parte de un sistema de e-commerce diseñado para gestionar productos, usuarios, pedidos y más. Permite realizar operaciones CRUD, manejar la autenticación de usuarios mediante JWT, gestionar archivos (como imágenes de productos) y ofrecer una experiencia segura y escalable para los usuarios finales.',
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

console.log('Archivos detectados por Swagger:', (__dirname, 'docs/**/*.yaml'));

const specs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Servidor en 8080');
});
