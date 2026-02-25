import mongoose, { Schema, model, models } from "mongoose";
import type { InviteStatus } from "@/lib/types/dashboard";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    phone: String,
    notes: String,
    inviteStatus: {
      type: String,
      enum: ["not_invited", "invited", "signed_up"],
      default: "not_invited",
    },
    stripeCustomerId: String,
    passwordHash: { type: String, select: false },
    inviteToken: { type: String, select: false },
    inviteTokenExpiry: { type: Date, select: false },
  },
  { timestamps: true }
);

export const Customer = models.Customer ?? model("Customer", customerSchema);
