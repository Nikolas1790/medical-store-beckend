import { Schema, model } from "mongoose";
import Joi from "joi";

// Описуємо схему замовлень в базі даних
const orderSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }, 
  products: { type: Number, required: true },
  price: { type: Number, required: true }, 
  status: { type: String, required: true },
  order_date: { type: Date, required: true } 
}, { versionKey: false, timestamps: true });

const Order = model("Order", orderSchema);
export default Order;

// // Валідатор Joi для перевірки даних, які приходять з фронтенду
// export const orderJoiSchema = Joi.object({
//   name: Joi.string().required(),
//   address: Joi.string().required(),
//   products: Joi.number().integer().min(1).required(), // переконайтесь, що це число і більше або дорівнює 1
//   price: Joi.number().precision(2).required(), // використовуємо precision для вказівки, що можуть бути дробові числа
//   status: Joi.string().valid('Confirmed', 'Pending', 'Cancelled').required(),
//   order_date: Joi.date().required()
// });
