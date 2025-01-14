import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: String,
  stock: Number,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  category: String,
  unitType: String,
  image: String,
});

export const ProductModel = model('products', productSchema);
