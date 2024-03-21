import express from "express";
// import { authenticate } from "../middlewares/index.js";
import dataControler from "../controllers/data-controler.js";

const dataRouter = express.Router();

// dataRouter.use(authenticate);

dataRouter.post("/dashboard",  dataControler.addWaterVolume);
dataRouter.patch("/customers/:customerId", dataControler.updateWaterVolume);

dataRouter.delete("/orders", dataControler.deleteWaterVolume);
dataRouter.get("/orders?", dataControler.getWaterVolume);

dataRouter.get("/products", dataControler.dailyWaterConsumption);
dataRouter.get("/products?", dataControler.dailyWaterConsumption);
dataRouter.post("/products", dataControler.dailyWaterConsumption);
dataRouter.put("/products/:productId", dataControler.dailyWaterConsumption);

dataRouter.get("/suppliers", dataControler.dailyWaterConsumption);
dataRouter.post("/suppliers", dataControler.dailyWaterConsumption);
dataRouter.put("/suppliers/:supplierId", dataControler.dailyWaterConsumption);

dataRouter.get("/customers", dataControler.dailyWaterConsumption);


export default dataRouter;