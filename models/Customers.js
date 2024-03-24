import { Schema, model } from "mongoose";
// import Joi from "joi";
// import { handleSaveError } from "./hooks.js";

// описание что мы сохраняем в базе
const customerSchema = new Schema({
  photo: { type: String }, 
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  spent: { type: String, required: true }, 
  phone: { type: String, required: true }, 
  address: { type: String, required: true },
  register_date: { type: Date, required: true } 
}, { versionKey: false, timestamps: false }); 

const Customer = model("Customer", customerSchema);
export default Customer;

// приходит с фронтенда
// export const customerJoiSchema = Joi.object({
//   photo: Joi.string().uri(), 
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   spent: Joi.string().required(),
//   phone: Joi.string().required(), 
//   address: Joi.string().required(),
//   register_date: Joi.date().required() 
// });