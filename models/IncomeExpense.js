import { Schema, model } from "mongoose";

const incomeExpenseSchema = new Schema({
  name: String,
  amount: String,
  type: String, 
}, { versionKey: false, timestamps: true });

const IncomeExpense = model('Income-Expenses', incomeExpenseSchema, 'Income-Expenses');

export default IncomeExpense;