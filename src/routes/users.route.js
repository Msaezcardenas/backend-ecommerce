import UserController from '../controllers/user.controller.js';
import CustomRouter from './customRouter.js';
const userController = new UserController();

// 1.- definimos las rutas que el cliente (frontend o API client)
//     puede utilizar para interactuar con el backend.

export default class UserRouterCustom extends CustomRouter {
  init() {
    this.post('/login', ['PUBLIC'], userController.login);
    this.post('/register', ['PUBLIC'], userController.register);
    this.get('/:id', ['ADMIN'], userController.getById);
    this.get('/', ['PUBLIC'], userController.getAll);
    this.post('/current', ['ADMIN'], userController.getCurrentUser);
    this.post('/', ['PUBLIC'], userController.create);
    this.put('/:id', ['PUBLIC'], userController.update);
    this.delete('/:id', ['PUBLIC'], userController.delete);
  }
}
