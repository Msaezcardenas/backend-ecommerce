import { generadorToken, isValidPassword, createHash } from '../utils/utils.js';
import Services from './services.js';
import userSchema from '../validators/userValidator.js';
import UserRepository from '../repositories/user.repository.js';
import { BadRequestError } from '../errors/customErrors.js';

const userRepository = new UserRepository();

export default class UserService extends Services {
  constructor() {
    super(userRepository);
  }

  async register(user) {
    const { email, password } = user;
    const { error } = userSchema.validate(user);
    if (error) throw new Error(error);
    const existUser = await this.repository.getByEmail(email);
    if (existUser) throw new BadRequestError('A user with this email already exists.');
    if (!existUser) {
      const newUser = await this.repository.create({
        ...user,
        password: createHash(password),
      });
      return newUser;
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.repository.getByEmail(email);
      if (!userExist) throw new Error('Usuario no existe');

      const passValid = isValidPassword(userExist, password);
      if (!passValid) throw new Error('constraseña incorrecta');
      if (userExist && passValid) return generadorToken(userExist.toObject());
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCurrentUser(params) {
    try {
      const { id_user } = params;
      const user = await this.repository.getById(id_user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
