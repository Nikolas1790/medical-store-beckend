import { Schema, model } from "mongoose";
 
const customerSchema = new Schema({
  photo: { type: String }, 
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  spent: { type: String, required: true }, 
  phone: { type: String, required: true }, 
  address: { type: String, required: true },
  register_date: { type: Date, required: true },
}, { versionKey: false, timestamps: false }); 

const Customer = model("Customer", customerSchema);
export default Customer;
