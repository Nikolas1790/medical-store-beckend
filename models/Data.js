import { Schema, model } from "mongoose";
import Joi from "";
import { handleSaveError, preUpdate } from "./hooks.js";

// const monthRegEx = /^\d{4}-\d{2}(?:-\d{2}(?:T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2})?)?$/;

const dataSchema = new Schema(
  {
    // waterVolume: {
    //   type: Number,
    //   required: [true, "Add value water volume"],
    // },
    // date: {
    //   type: Date,
    //   required: [true, "Must be data and time"],
    //   // default: Date.now,
    // },
    // owner: {
    //   type: String,
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

dataSchema.post("save", handleSaveError);
dataSchema.pre("findOneAndUpdate", preUpdate);
dataSchema.post("findOneAndUpdate", handleSaveError);

const Data = model("data", dataSchema);
export default Data;

// JOI SCHEMA

export const addWaterVolumeSchema = Joi.object({
  waterVolume: Joi.number().integer().max(5000).required(),
  date: Joi.date().iso().required().required(),
});

export const updateWaterVolumeSchema = Joi.object({
  waterVolume: Joi.number().integer().max(5000),
  date: Joi.date().iso(),
});

export const getWaterVolumeMonthSchema = Joi.object({
  date: Joi.string().required()
});
