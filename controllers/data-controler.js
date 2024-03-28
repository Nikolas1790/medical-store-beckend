import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import { HttpError } from "../helpers/index.js";
import moment from 'moment';
import Customer from "../models/Customers.js";
import Order from "../models/Order.js";
import IncomeExpense from "../models/IncomeExpense.js";

const getMunthDashboard = async (req, res) => {
  const suppliersCount = await Supplier.countDocuments();
  const productsCount = await Product.countDocuments();
  const customersCount = await Customer.countDocuments();
  
  const recentCustomers = await (await Customer.find()).splice((customersCount - 5), customersCount);
  
  const incomeExpenses = await IncomeExpense.find().limit(6);

  res.json({
    suppliersCount,
    productsCount,
    customersCount,
    recentCustomers,
    incomeExpenses,
  });
};
const getCustomerInf = async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(customer);
};

const getOrders = async (req, res) => {
  const { name, sortBy, order = 'asc', limit = '10', page = '1' } = req.query;

  if (!name && !sortBy) {
  const orders = await Order.find({}); 
  res.json(orders);
  }
  const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};

  let sortObject = {};
  if (sortBy) {
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
  }
  const products = await Order.find(queryObject).sort(sortObject);
  res.json(products);
};

const getProductsAndAvailableCategories = async (req, res) => {
  const { name, sortBy, order = 'asc', limit = '10', page = '1' } = req.query;

  // Якщо запит без query параметрів, повертаємо всі продукти
  if (!name && !sortBy) {
    const result = await Product.find({}, "-photo");
    return res.json(result);
  }

    // Якщо є параметр name для фільтрації за іменем
    const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};

    // Якщо є параметри для сортування
    let sortObject = {};
    if (sortBy) {
      sortObject[sortBy] = order === 'asc' ? 1 : -1;
    }
    const products = await Product.find(queryObject).sort(sortObject);
    res.json(products);
};
const postAddingProduct = async (req, res) => {
  const result = await Product.create(req.body);
  res.json(result);
};
const putEditingProductData = async (req, res) => {
  const {productId} = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body, {new: true});
  if(!result) {
   throw HttpError(404, 'Not found')
  }
  res.json(result)
};
const deleteProductItem = async (req, res) => {
  const {productId} = req.params
  const result = await Product.findByIdAndDelete(productId)
  if(!result) {
   throw HttpError(404, 'Not found')
  }
  res.json({
   message: "Product deleted"
  })
};

const getSuppliersList = async (req, res) => {
  const result = await Supplier.find();
  res.json(result);
};
const postAddingSupplier = async (req, res) => {
  const result = await Supplier.create(req.body);
  res.json(result);
};
const putEditingSupplierData = async (req, res) => {
  const {supplierId} = req.params;
  const result = await Supplier.findByIdAndUpdate(supplierId, req.body, {new: true,  timestamps: false})
  if(!result) {
   throw HttpError(404, 'Not found')
  }
  const resultObject = result.toObject();

  // Форматуємо дату в звичайному об'єкті JavaScript
  if (resultObject.date) {
    resultObject.date = moment(resultObject.date).format('MMMM D, YYYY');
  }
  res.json(resultObject);
};

const getCustomersList = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

export default {
  getMunthDashboard: ctrlWrapper(getMunthDashboard),
  getCustomerInf: ctrlWrapper(getCustomerInf),

  getOrders: ctrlWrapper(getOrders),

  getProductsAndAvailableCategories: ctrlWrapper(getProductsAndAvailableCategories),
  postAddingProduct: ctrlWrapper(postAddingProduct),
  putEditingProductData: ctrlWrapper(putEditingProductData),
  deleteProductItem: ctrlWrapper(deleteProductItem),

  getSuppliersList: ctrlWrapper(getSuppliersList),
  postAddingSupplier: ctrlWrapper(postAddingSupplier),
  putEditingSupplierData: ctrlWrapper(putEditingSupplierData),

  getCustomersList: ctrlWrapper(getCustomersList),
};
