import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
// import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

// const avatarsDir = path.resolve("public", "avatars");

const { JWT_SECRET, BASE_URL } = process.env;

// const signup = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email already exist");
//   }
//   const hashPassword = await bcrypt.hash(password, 10);
//   const verificationToken = nanoid();

//   const newUser = await User.create({
//     ...req.body,
//     password: hashPassword,
//     verificationToken,
//   });

//   res.status(201).json({
//     user: {
//       email: newUser.email,
//       userName: newUser.userName,
//       avatarURL: newUser.avatarURL,
//       gender: newUser.gender,
//       waterRate: newUser.waterRate,
//     },
//   });
// };


const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (user.avatarURL === "") {
    const userName = user.userName;
    const avatarLetter = userName.charAt(0).toUpperCase();

    const avatarURL = `${avatarLetter}`;

    await User.findByIdAndUpdate(user._id, { avatarURL });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      email: user.email,
      userName: user.userName,
      avatarURL: user.avatarURL,
      gender: user.gender,
      waterRate: user.waterRate,
    },
    token,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { userName, email, avatarURL, gender, waterRate } = req.user;
  res.json({
    email,
    userName,
    avatarURL,
    gender,
    waterRate,
  });
};


export default {
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
};
