import mongoose, { Schema } from 'mongoose';

// 5.- Este modelo define la estructura del usuario en la base de datos.

const userCollection = 'users';

const userSchema = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: false,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const UserModel = mongoose.model(userCollection, userSchema);
