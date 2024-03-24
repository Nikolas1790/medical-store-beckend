import express from "express";
import { validateBody } from "../decorators/index.js";
import authControler from "../controllers/auth-controler.js";
import { loginSchema, registerSchema } from "../models/User.js";
import {authenticate} from "../helpers/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), authControler.signup);
authRouter.post("/login", validateBody(loginSchema), authControler.signin);
authRouter.get("/logout", authenticate, authControler.signout);
authRouter.get("/user-info", authControler.getCurrent);

export default authRouter;