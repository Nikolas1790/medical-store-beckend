import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

// описание что мы сохраняем в базе
const supplierSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  suppliers: { type: String, required: true }, 
  date: { type: Date, required: true },
  amount: { type: String, required: true }, 
  status: { type: String, required: true, enum: ['Active', 'Deactive'] }
}, { versionKey: false, timestamps: true });

supplierSchema.post("save", handleSaveError);
supplierSchema.pre("findOneAndUpdate", preUpdate);
supplierSchema.post("findOneAndUpdate", handleSaveError);

const Supplier = model("supplier", supplierSchema);
export default Supplier;

// приходит с фронтенда
export const supplierJoiSchemaa = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  suppliers: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.string().required(),
  status: Joi.string().valid('Active', 'Deactive').required() 
});


