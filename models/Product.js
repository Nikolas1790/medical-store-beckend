import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";
const categories = [
  'Medicine', 'Head', 'Hand', 'Dental Care', 'Skin Care',
  'Eye Care', 'Vitamins & Supplements', 'Orthopedic Products', 'Baby Care'
];

const productSchema = new Schema({
  name: { type: String, required: true },
  suppliers: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: categories },
  // owner: { type: String, required: true },
}, { versionKey: false, timestamps: true });

productSchema.post("save", handleSaveError);
productSchema.pre("findOneAndUpdate", preUpdate);
productSchema.post("findOneAndUpdate", handleSaveError);

const Product = model("product", productSchema);
export default Product;


export const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  suppliers: Joi.string().required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
  category: Joi.string().valid(...categories).required()
});
