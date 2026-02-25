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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    const body = await request.json();
    const { cancel, cancelImmediately, markAsPaid } = body as {
      cancel?: boolean;
      cancelImmediately?: boolean;
      markAsPaid?: boolean;
    };

    const sub = await RecurringSubscription.findById(id).lean();
    if (!sub) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }
    const doc = sub as { stripeSubscriptionId: string };

    let stripeSub = await stripe.subscriptions.retrieve(doc.stripeSubscriptionId);

    if (markAsPaid) {
      const invoiceId =
        typeof stripeSub.latest_invoice === "string"
          ? stripeSub.latest_invoice
          : stripeSub.latest_invoice?.id;
      if (!invoiceId) {
        return NextResponse.json(
          { error: "No invoice to mark as paid" },
          { status: 400 }
        );
      }
      const invoice = await stripe.invoices.retrieve(invoiceId);
      if (invoice.status === "paid") {
        return NextResponse.json(
          { error: "Invoice is already paid" },
          { status: 400 }
        );
      }
      if (invoice.status !== "open" && invoice.status !== "draft") {
        return NextResponse.json(
          { error: `Invoice cannot be marked paid (status: ${invoice.status})` },
          { status: 400 }
        );
      }
      if (invoice.status === "draft") {
        await stripe.invoices.finalizeInvoice(invoiceId);
      }
      await stripe.invoices.pay(invoiceId, { paid_out_of_band: true });
      stripeSub = await stripe.subscriptions.retrieve(doc.stripeSubscriptionId);
    }

    if (cancel || cancelImmediately) {
      if (stripeSub.status === "canceled") {
        const status = "canceled";
        const cancelAtPeriodEnd = false;
        await RecurringSubscription.findByIdAndUpdate(id, { status, cancelAtPeriodEnd });
        const updated = await RecurringSubscription.findById(id).lean();
        if (!updated) return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
        return NextResponse.json(toSubDoc(updated as unknown as Parameters<typeof toSubDoc>[0]));
      }
      if (cancelImmediately) {
        await stripe.subscriptions.cancel(doc.stripeSubscriptionId);
      } else if (!stripeSub.cancel_at_period_end) {
        await stripe.subscriptions.update(doc.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });
      }
      stripeSub = await stripe.subscriptions.retrieve(doc.stripeSubscriptionId);
    }
    const status =
      stripeSub.status === "canceled"
        ? "canceled"
        : stripeSub.status === "past_due"
          ? "past_due"
          : stripeSub.status === "incomplete" || stripeSub.status === "incomplete_expired"
            ? "incomplete"
            : "active";
    const cancelAtPeriodEnd = stripeSub.cancel_at_period_end ?? false;

    const updated = await RecurringSubscription.findByIdAndUpdate(
      id,
      { status, cancelAtPeriodEnd },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    return NextResponse.json(toSubDoc(updated as unknown as Parameters<typeof toSubDoc>[0]));
  } catch (error) {
    console.error("Subscription PATCH error:", error);
    const msg = error instanceof Error ? error.message : "Failed to update subscription";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
