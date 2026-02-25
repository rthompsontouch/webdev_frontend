import mongoose, { Schema, model, models } from "mongoose";

const subscriptionItemSchema = new Schema(
  {
    stripePriceId: { type: String, required: true },
    stripeProductId: { type: String, required: true },
    productName: { type: String, required: true },
    amount: { type: Number, required: true },
    interval: { type: String, required: true },
  },
  { _id: false }
);

const recurringSubscriptionSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    stripeSubscriptionId: { type: String, required: true },
    items: [subscriptionItemSchema],
    stripePriceId: { type: String },
    stripeProductId: { type: String },
    productName: { type: String },
    amount: { type: Number },
    interval: { type: String },
    billingDay: { type: Number, min: 1, max: 28 },
    firstPaymentDate: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "trialing", "incomplete"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const RecurringSubscription =
  models.RecurringSubscription ?? model("RecurringSubscription", recurringSubscriptionSchema);
