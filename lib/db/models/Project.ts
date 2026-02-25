import mongoose, { Schema, model, models } from "mongoose";
import type { ProjectType, ProjectStatus } from "@/lib/types/dashboard";

const manualPaymentSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    method: { type: String, default: "other" },
    notes: String,
  },
  { _id: true }
);

const projectSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    type: {
      type: String,
      enum: ["website_redesign", "new_website", "seo", "marketing", "other"],
      required: true,
    },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["discovery", "design", "development", "review", "launch", "complete"],
      default: "discovery",
    },
    oneTimeCost: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partially_paid", "paid"],
      default: "unpaid",
    },
    manualPayments: [manualPaymentSchema],
  },
  { timestamps: true }
);

export const Project = models.Project ?? model("Project", projectSchema);
