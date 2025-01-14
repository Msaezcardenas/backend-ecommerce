import { generadorToken, isValidPassword, createHash } from '../utils/utils.js';
import Services from './services.js';
import userSchema from '../validators/userValidator.js';
import UserRepository from '../repositories/user.repository.js';

const userRepository = new UserRepository();

// 3.- La capa de servicio contiene la lógica de negocio.
//     Aquí podemos agregar más validaciones, por ejemplo,
//     verificar si el usuario ya existe antes de crearlo.

export default class UserService extends Services {
  constructor() {
    super(userRepository);
  }

  async register(user) {
    try {
      const { email, password } = user;
      const { error } = userSchema.validate(user);
      if (error) throw new Error(error);
      const existUser = await this.repository.getByEmail(email); // utiliza una funcion que se conecta a la base de datos
      if (existUser) throw new Error('usuario ya existe');
      if (!existUser) {
        const newUser = await this.repository.create({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.repository.getByEmail(email);
      if (!userExist) return null;
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
