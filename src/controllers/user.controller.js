import UserService from '../services/user.services.js';
import { createResponse } from '../utils/utils.js';
import BaseController from './baseController.js';

const userService = new UserService();

export default class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      createResponse(res, 201, data, `The resource has been successfully created.`);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req, res, next) => {
    try {
      const currentUser = await this.service.getCurrentUser(req.body);
      const userDTO = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
      };
      res.json(userDTO);
    } catch (error) {
      next(error);
    }
  };
}
