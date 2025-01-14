import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

export const createHash = (pass) => bcryptjs.hashSync(pass, bcryptjs.genSaltSync(10)); // $salt.hash

export const isValidPassword = (user, pass) => bcryptjs.compareSync(pass, user.password); // user.password -> es la contraseña de la bbdd

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);
export default __dirname;

export const getJWTCookie = (req) => {
  let token = null;
  if (req.signedCookies) {
    token = req.signedCookies['currentUser'];
  }
  return token;
};

export const generadorToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
  return token;
};

export const decodeToken = (req, res, next) => {
  const token = req.header.authorization;

  if (!token) res.status(400).json({ message: 'Error token' });

  jwt.verify(token, process.env.SECRET, (error, userDecoded) => {
    if (error) res.status(400).json({ message: 'Error token' });
    req.user = userDecoded.user;
    next();
  });
};

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

export const generateUniqueCode = () => {
  return v4();
};
