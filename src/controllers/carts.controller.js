import CartService from '../services/cart.services.js';
import { createResponse } from '../utils/utils.js';
import BaseController from './baseController.js';

const cartService = new CartService();

export default class CartController extends BaseController {
  constructor() {
    super(cartService);
  }

  addProductToCart = async (req, res, next) => {
    try {
      const data = await this.service.addProductToCart(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  updateCart = async (req, res, next) => {
    try {
      const data = await this.service.updateCart(req.params);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  purchase = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const data = await this.service.purchase(cid);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };
}
