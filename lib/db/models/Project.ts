import mongoose, { Schema, model, models } from "mongoose";
import type { ProjectType, ProjectStatus } from "@/lib/types/dashboard";

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
  },
  { timestamps: true }
);

export const Project = models.Project ?? model("Project", projectSchema);
