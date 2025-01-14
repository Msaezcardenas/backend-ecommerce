import express from 'express';
import { __dirname } from './utils/utils.js';
import { AppInit } from './init/initialConfig.js';
const app = express();

AppInit(app);

app.listen(process.env.PORT, () => {
  console.log('Servidor en 8080');
});
