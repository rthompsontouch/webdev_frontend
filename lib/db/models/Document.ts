import mongoose, { Schema, model, models } from "mongoose";

const documentSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, default: "other" },
  },
  { timestamps: true }
);

export const Document = models.Document ?? model("Document", documentSchema);
