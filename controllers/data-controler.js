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
  const { name, sortBy, order = 'asc', limit = '5', page = '1' } = req.query;
  let sortObject = {};

  const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};
  
  if (sortBy) {
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
  }

  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;

  const orders = await Order.find(queryObject)
    .sort(sortObject)
    .skip(skipNumber)
    .limit(limitNumber);

  const totalOrders = await Order.countDocuments(queryObject);

  res.json({
    orders,
    total: totalOrders,
    limit: limitNumber,
    page: pageNumber
  });
};

const getProductsAndAvailableCategories = async (req, res) => {
  const { name, sortBy, order = 'asc', limit = '5', page = '1' } = req.query;
  let sortObject = {};

  if (!sortBy) {
    sortObject['name'] = 'asc';
  } else {
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
  }

  const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};
  const limitNumber = parseInt(limit);
  const pageNumber = parseInt(page);
  const skipNumber = (pageNumber - 1) * limitNumber;
  
  const products = await Product.find(queryObject)
    .sort(sortObject)
    .skip(skipNumber)
    .limit(limitNumber);

  const totalProducts = await Product.countDocuments(queryObject);

  res.json({
    products,
    total: totalProducts,
    limit: limitNumber,
    page: pageNumber
  });
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
  const { name, sortBy, order = 'asc', limit = '5', page = '1' } = req.query;
  let sortObject = {};

  if (!sortBy) {
    sortObject['createdAt'] = 'desc';
  } else {
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
  }

  const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};
    const limitNumber = parseInt(limit);
    const pageNumber = parseInt(page);
    const skipNumber = (pageNumber - 1) * limitNumber;
    
    const suppliers = await Supplier.find(queryObject)
      .sort(sortObject)
      .skip(skipNumber)
      .limit(limitNumber);

    const totalSuppliers = await Supplier.countDocuments(queryObject);
  
    res.json({
      suppliers,
      total: totalSuppliers,
      limit: limitNumber,
      page: pageNumber
    });
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

  if (resultObject.date) {
    resultObject.date = moment(resultObject.date).format('MMMM D, YYYY');
  }
  res.json(resultObject);
};

const getCustomersList = async (req, res) => {
  const { name, sortBy, order = 'asc', limit = '5', page = '1' } = req.query;
  let sortObject = {};

  const queryObject = name ? { name: { $regex: name, $options: "i" } } : {};

  if (sortBy) {
    sortObject[sortBy] = order === 'asc' ? 1 : -1;
  }

    const limitNumber = parseInt(limit);
    const pageNumber = parseInt(page);
    const skipNumber = (pageNumber - 1) * limitNumber;
    
    const customers = await Customer.find(queryObject)
      .sort(sortObject)
      .skip(skipNumber)
      .limit(limitNumber);

    const totalCustomers = await Customer.countDocuments(queryObject);
  
    res.json({
      customers,
      total: totalCustomers,
      limit: limitNumber,
      page: pageNumber
    });
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
