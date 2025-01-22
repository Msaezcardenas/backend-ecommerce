import { Router } from 'express';
import { invokePassport } from '../middlewares/handleErrors.js';

const app = Router();

app.get('/', (req, res) => {
  res.render('home', {});
});

app.get('/register', (req, res) => {
  res.render('register', {});
});

app.get('/login', (req, res) => {
  res.render('login', {});
});

app.get('/perfil', invokePassport('jwt'), (req, res) => {
  const nombre = req.user.nombre;
  res.render('perfil', { nombre });
});

export default app;
