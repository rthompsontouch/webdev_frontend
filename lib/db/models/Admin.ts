import mongoose, { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export const Admin = models.Admin ?? model("Admin", adminSchema);
