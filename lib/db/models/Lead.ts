import mongoose, { Schema, model, models } from "mongoose";
import type { LeadStatus } from "@/lib/types/dashboard";

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: { type: String, required: true },
    interested: { type: String, required: true },
    project: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "not_interested"],
      default: "new",
    },
    notes: String,
  },
  { timestamps: true }
);

export const Lead = models.Lead ?? model("Lead", leadSchema);
