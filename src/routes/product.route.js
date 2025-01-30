import ProductController from '../controllers/product.controller.js';
import { addLogger } from '../logger.js';
import uploader from '../utils/uploader.js';
import CustomRouter from './customRouter.js';

export default class ProductRouterCustom extends CustomRouter {
  init() {
    const productController = new ProductController();
    this.get('/', ['PUBLIC'], addLogger, productController.getAll);
    this.get('/:id', ['PUBLIC'], productController.getById);
    this.post('/', ['ADMIN'], productController.create);
    this.put('/:id', ['PUBLIC'], productController.update);
    this.delete('/:id', ['PUBLIC'], productController.delete);
    this.delete('/', ['PUBLIC'], productController.deleteAll);
    this.post('/withimage', ['ADMIN'], uploader.single('image'), productController.createProductWithImage);
  }
}
