import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getMunthDashboard = async (req, res) => {
};

const getCustomerInf = async (req, res) => {
};

const getOrders = async (req, res) => {
  console.log("sdfghjklkljhgfdghjk")
};

const getOrderSort = async (req, res) => {
};
const getProductsAndAvailableCategories = async (req, res) => {
};

const getSortingFiltrationProducts = async (req, res) => {
};
const postAddingProduct = async (req, res) => {
};

const putEditingProductData = async (req, res) => {
};
const getSuppliersList = async (req, res) => {
};

const postAddingSupplier = async (req, res) => {
};
const putEditingSupplierData = async (req, res) => {
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
