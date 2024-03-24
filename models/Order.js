import { Schema, model } from "mongoose";

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