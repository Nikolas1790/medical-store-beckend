import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { productId, supplierId} = req.params;
  console.log("gggggggggggggg", req.params)
  if (!isValidObjectId(productId || supplierId)) {
    return next(HttpError(404, `${productId || supplierId} is not valid id`));
  }
  next();
};

export default isValidId;
