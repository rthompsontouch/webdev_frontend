import mongoose, { Schema, model, models } from "mongoose";

const projectUpdateFeedbackSchema = new Schema(
  {
    updateId: { type: Schema.Types.ObjectId, ref: "ProjectUpdate", required: true },
    customerId: { type: String, default: "" },
    liked: { type: Boolean, default: null },
    comment: String,
    reply: String,
    viewedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ProjectUpdateFeedback =
  models.ProjectUpdateFeedback ?? model("ProjectUpdateFeedback", projectUpdateFeedbackSchema);
