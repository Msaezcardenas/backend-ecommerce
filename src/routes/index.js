import { Router } from 'express';
import { ROUTE_PATH } from '../constants/routesPath.js';
import ViewsRouter from './views.route.js';
import CartRouterCustom from './carts.route.js';
import UserRouterCustom from './users.route.js';
import ProductRouterCustom from './product.route.js';
import { addLogger } from '../logger.js';

const app = Router();
const UserRouter = new UserRouterCustom();
const ProductRouter = new ProductRouterCustom();
const CartRouter = new CartRouterCustom();

//app.use(addLogger);

app.get('/operacionsencilla', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  res.send({ sum });
});

app.get('/operacioncompleja', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 5e8; i++) {
    sum += i;
  }
  res.send({ sum });
});

app.use(ROUTE_PATH.view, ViewsRouter);
app.use(ROUTE_PATH.api_users, UserRouter.getRouter());
app.use(ROUTE_PATH.api_products, ProductRouter.getRouter());
app.use(ROUTE_PATH.api_carts, CartRouter.getRouter());

export default app;
