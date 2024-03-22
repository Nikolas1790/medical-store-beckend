import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);

const User = model("user", userSchema);

export default User;

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(8).max(48).required(),
});