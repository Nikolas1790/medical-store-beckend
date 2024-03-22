import express from "express";
// import { authenticate } from "../middlewares/index.js";
import dataControler from "../controllers/data-controler.js";

const dataRouter = express.Router();

// dataRouter.use(authenticate);

dataRouter.get("/dashboard",  dataControler.getMunthDashboard);
dataRouter.get("/customers/:customerId", dataControler.getCustomerInf);

dataRouter.get("/orders", dataControler.getOrders);
dataRouter.get("/orders?", dataControler.getOrderSort);

dataRouter.get("/products", dataControler.getProductsAndAvailableCategories);
dataRouter.get("/products?", dataControler.getSortingFiltrationProducts);
dataRouter.post("/products", dataControler.postAddingProduct);
dataRouter.put("/products/:productId", dataControler.putEditingProductData);
// dataRouter.del("/products/:productId", dataControler.dailyWaterConsumption);


dataRouter.get("/suppliers", dataControler.getSuppliersList );
dataRouter.post("/suppliers", dataControler.postAddingSupplier);
dataRouter.put("/suppliers/:supplierId", dataControler.putEditingSupplierData);

dataRouter.get("/customers", dataControler.getCustomersList);


export default dataRouter;