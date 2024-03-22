import express from "express";
import * as userSchemas from "../models/User.js";
import { validateBody } from "../decorators/index.js";
import authControler from "../controllers/auth-controler.js";

const authRouter = express.Router();
const loginSchema = validateBody(userSchemas.registerAndLoginSchema);

authRouter.post("/login", authControler.signin);
authRouter.get("/logout", authControler.signout);
authRouter.get("/user-info", authControler.getCurrent);

export default authRouter;