import mongoose, { Schema, model, models } from "mongoose";

const projectUpdateSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ProjectUpdate = models.ProjectUpdate ?? model("ProjectUpdate", projectUpdateSchema);
