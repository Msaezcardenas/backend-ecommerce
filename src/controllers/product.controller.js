import { ProductModel } from '../models/product.model.js';
import ProductService from '../services/product.services.js';
import BaseController from './baseController.js';

const productService = new ProductService();

export default class ProductController extends BaseController {
  constructor() {
    super(productService);
  }

  createProductWithImage = async (req, res) => {
    try {
      const file = req.file; // Archivo subido
      const { title, price, description, code, status, category, stock, unitType } = req.body; // Datos del formulario

      // Validación de datos
      if (!title || !price || !description || !file || !code || !status || !category || !stock || !unitType) {
        return res.status(400).send({ status: 'error', error: 'Faltan campos obligatorios' });
      }

      // Construir la URL de la imagen
      const imageUrl = `/public/img/${file.filename}`;

      // Crear el producto
      const product = new ProductModel({
        title,
        price,
        description,
        image: imageUrl,
        code,
        status,
        category,
        stock,
        unitType,
      });

      const result = await product.save();

      // Responder con el producto creado
      res.status(201).send({ status: 'success', payload: result });
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message });
    }
  };
}
