import express from "express";
import dataControler from "../controllers/data-controler.js";
import { isValidId } from "../decorators/index.js";
import {validateBody} from "../decorators/index.js";
import { productJoiSchema } from "../models/Product.js";
import { supplierJoiSchema } from "../models/Supplier.js";

const dataRouter = express.Router();

// dataRouter.use(authenticate);

dataRouter.get("/dashboard",  dataControler.getMunthDashboard);
dataRouter.get("/customers/:customerId", isValidId, dataControler.getCustomerInf);

dataRouter.get("/orders", dataControler.getOrders);
dataRouter.get("/orders?", dataControler.getOrderSort);

dataRouter.get("/products", dataControler.getProductsAndAvailableCategories);
dataRouter.get("/products?", dataControler.getSortingFiltrationProducts);
dataRouter.post("/products", validateBody(productJoiSchema), dataControler.postAddingProduct);
dataRouter.put("/products/:productId", isValidId, validateBody(productJoiSchema), dataControler.putEditingProductData);
// dataRouter.del("/products/:productId", dataControler.dailyWaterConsumption);


dataRouter.get("/suppliers", dataControler.getSuppliersList );
dataRouter.post("/suppliers", validateBody(supplierJoiSchema), dataControler.postAddingSupplier);
dataRouter.put("/suppliers/:supplierId", isValidId, validateBody(supplierJoiSchema), dataControler.putEditingSupplierData);

dataRouter.get("/customers", dataControler.getCustomersList);


export default dataRouter;