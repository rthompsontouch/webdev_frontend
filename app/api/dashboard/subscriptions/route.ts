import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, RecurringSubscription } from "@/lib/db";
import { stripe } from "@/lib/stripe";

function toSubDoc(doc: {
  _id: unknown;
  projectId: unknown;
  customerId: unknown;
  stripeSubscriptionId: string;
  items?: { stripePriceId: string; stripeProductId: string; productName: string; amount: number; interval: string }[];
  stripePriceId?: string;
  stripeProductId?: string;
  productName?: string;
  amount?: number;
  interval?: string;
  billingDay?: number;
  firstPaymentDate?: Date;
  cancelAtPeriodEnd?: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: String(doc._id),
    projectId: String(doc.projectId),
    customerId: String(doc.customerId),
    stripeSubscriptionId: doc.stripeSubscriptionId,
    items: doc.items,
    stripePriceId: doc.stripePriceId,
    stripeProductId: doc.stripeProductId,
    productName: doc.productName,
    amount: doc.amount,
    interval: doc.interval,
    billingDay: doc.billingDay,
    firstPaymentDate: doc.firstPaymentDate?.toISOString?.().slice(0, 10),
    cancelAtPeriodEnd: doc.cancelAtPeriodEnd,
    status: doc.status,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const customerId = searchParams.get("customerId");
    const includeCanceled = searchParams.get("includeCanceled") === "true";

    if (!projectId && !customerId) {
      return NextResponse.json({ error: "projectId or customerId required" }, { status: 400 });
    }

    const baseFilter: { projectId?: mongoose.Types.ObjectId; customerId?: mongoose.Types.ObjectId } = {};
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      baseFilter.projectId = new mongoose.Types.ObjectId(projectId);
    }
    if (customerId && mongoose.Types.ObjectId.isValid(customerId)) {
      baseFilter.customerId = new mongoose.Types.ObjectId(customerId);
    }

    const allSubs = await RecurringSubscription.find(baseFilter).sort({ createdAt: -1 }).lean();

    if (stripe) {
      for (const sub of allSubs) {
        const doc = sub as { _id: unknown; stripeSubscriptionId: string };
        try {
          const stripeSub = await stripe.subscriptions.retrieve(doc.stripeSubscriptionId);
          const stripeStatus = stripeSub.status;
          const cancelAtPeriodEnd = stripeSub.cancel_at_period_end ?? false;
          const endedStatuses = ["canceled", "incomplete_expired", "unpaid"];
          const mappedStatus = endedStatuses.includes(stripeStatus)
            ? "canceled"
            : stripeStatus === "past_due"
              ? "past_due"
              : stripeStatus === "trialing"
                ? "trialing"
                : stripeStatus === "incomplete"
                  ? "incomplete"
                  : "active";
          const ourStatus = (sub as { status: string }).status;
          const ourCancelAtPeriodEnd = (sub as { cancelAtPeriodEnd?: boolean }).cancelAtPeriodEnd;
          if (ourStatus !== mappedStatus || ourCancelAtPeriodEnd !== cancelAtPeriodEnd) {
            await RecurringSubscription.findByIdAndUpdate(doc._id, {
              status: mappedStatus,
              cancelAtPeriodEnd,
            });
          }
        } catch {
          await RecurringSubscription.findByIdAndUpdate(doc._id, { status: "canceled" });
        }
      }
    }

    const filter = includeCanceled ? baseFilter : { ...baseFilter, status: { $ne: "canceled" } };
    const updated = await RecurringSubscription.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(updated.map((s) => toSubDoc(s as unknown as Parameters<typeof toSubDoc>[0])));
  } catch (error) {
    console.error("Subscriptions GET error:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}
