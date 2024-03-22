import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import { HttpError } from "../helpers/index.js";


const getMunthDashboard = async (req, res) => {
};
const getCustomerInf = async (req, res) => {

};


const getOrders = async (req, res) => {
};
const getOrderSort = async (req, res) => {
};


const getProductsAndAvailableCategories = async (req, res) => {
  console.log("+++++++++++++++++++++++++")
  const result = await Product.find({}, "-photo");
  res.json(result);
};
const getSortingFiltrationProducts = async (req, res) => {
};
const postAddingProduct = async (req, res) => {
  console.log("+++++++++++++++++++++++++")
  const result = await Product.create(req.body);
  res.json(result);
};
const putEditingProductData = async (req, res) => {
  const {productId} = req.params
  console.log("+++++++++++++++++++++++++", productId)
  const result = await Product.findByIdAndUpdate(productId, req.body, {new: true})
  if(!result) {
   throw HttpError(404, 'Not found')
  }
  res.json(result)
};


const getSuppliersList = async (req, res) => {
  console.log("+++++++++++++++++++++++++")
  const result = await Supplier.find();
  res.json(result);
};
const postAddingSupplier = async (req, res) => {
  console.log("+++++++++++++++++++++++++")
  const result = await Supplier.create(req.body);
  res.json(result);
};
const putEditingSupplierData = async (req, res) => {
  const {supplierId} = req.params
  console.log("+++++++++++++++++++++++++", req)
  const result = await Supplier.findByIdAndUpdate(supplierId, req.body, {new: true,  timestamps: false})
  if(!result) {
   throw HttpError(404, 'Not found')
  }
  res.json(result)
};


const getCustomersList = async (req, res) => {
};


export default {
  getMunthDashboard: ctrlWrapper(getMunthDashboard),
  getCustomerInf: ctrlWrapper(getCustomerInf),

  getOrders: ctrlWrapper(getOrders),
  getOrderSort: ctrlWrapper(getOrderSort),

  getProductsAndAvailableCategories: ctrlWrapper(getProductsAndAvailableCategories),
  getSortingFiltrationProducts: ctrlWrapper(getSortingFiltrationProducts),
  postAddingProduct: ctrlWrapper(postAddingProduct),
  putEditingProductData: ctrlWrapper(putEditingProductData),

  getSuppliersList: ctrlWrapper(getSuppliersList),
  postAddingSupplier: ctrlWrapper(postAddingSupplier),
  putEditingSupplierData: ctrlWrapper(putEditingSupplierData),

  getCustomersList: ctrlWrapper(getCustomersList),
};
