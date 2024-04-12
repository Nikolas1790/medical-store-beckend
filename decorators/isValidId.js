import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { productId, supplierId, customerId} = req.params;
  if (!isValidObjectId(productId || supplierId || customerId)) {
    return next(HttpError(404, `${productId || supplierId || customerId} is not valid id`));
  }
  next();
};

export default isValidId;
