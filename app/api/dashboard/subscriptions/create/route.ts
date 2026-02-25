import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Customer, Project, RecurringSubscription } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const { projectId, priceIds, priceId, billingDay, firstPaymentDate } = body as {
      projectId: string;
      priceIds?: string[];
      priceId?: string;
      billingDay?: number;
      firstPaymentDate?: string;
    };

    const ids = priceIds ?? (priceId ? [priceId] : []);
    if (!projectId || ids.length === 0 || !mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: "projectId and priceIds (or priceId) required" }, { status: 400 });
    }

    const project = await Project.findById(projectId).lean();
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const proj = project as unknown as { customerId: unknown };
    const customerId = String(proj.customerId);

    const customer = await Customer.findById(customerId).lean();
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    const cust = customer as unknown as { stripeCustomerId?: string; email: string; name: string };
    let stripeCustomerId = cust.stripeCustomerId;

    if (stripeCustomerId) {
      try {
        const existing = await stripe.customers.retrieve(stripeCustomerId);
        if ((existing as unknown as { deleted?: boolean }).deleted) {
          stripeCustomerId = undefined;
        }
      } catch {
        stripeCustomerId = undefined;
      }
    }

    if (!stripeCustomerId) {
      const sc = await stripe.customers.create({
        email: cust.email,
        name: cust.name,
        metadata: { internalCustomerId: customerId },
      });
      stripeCustomerId = sc.id;
      await Customer.findByIdAndUpdate(customerId, { stripeCustomerId });
    }

    const items: { stripePriceId: string; stripeProductId: string; productName: string; amount: number; interval: string }[] = [];
    for (const priceId of ids) {
      const price = await stripe.prices.retrieve(priceId);
      if (!price.recurring) {
        return NextResponse.json({ error: `Price ${priceId} must be recurring` }, { status: 400 });
      }
      const product = await stripe.products.retrieve(price.product as string);
      items.push({
        stripePriceId: priceId,
        stripeProductId: product.id,
        productName: product.name ?? "Subscription",
        amount: price.unit_amount ? price.unit_amount / 100 : 0,
        interval: price.recurring.interval ?? "month",
      });
    }

    const day = typeof billingDay === "number" && billingDay >= 1 && billingDay <= 28 ? billingDay : 1;

    const subParams: {
      customer: string;
      items: { price: string }[];
      billing_cycle_anchor?: number;
      payment_behavior: string;
      proration_behavior?: string;
    } = {
      customer: stripeCustomerId,
      items: ids.map((p) => ({ price: p })),
      payment_behavior: "default_incomplete",
    };

    const now = new Date();
    let firstPaymentDateStored: Date | undefined;

    if (firstPaymentDate && typeof firstPaymentDate === "string") {
      const anchorDate = new Date(firstPaymentDate);
      if (!isNaN(anchorDate.getTime()) && anchorDate > now) {
        subParams.billing_cycle_anchor = Math.floor(anchorDate.getTime() / 1000);
        subParams.proration_behavior = "none";
        firstPaymentDateStored = anchorDate;
      }
    }

    let subscription;
    try {
      subscription = await stripe.subscriptions.create(subParams);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("No such customer") && stripeCustomerId) {
        await Customer.findByIdAndUpdate(customerId, { $unset: { stripeCustomerId: "" } });
        const sc = await stripe.customers.create({
          email: cust.email,
          name: cust.name,
          metadata: { internalCustomerId: customerId },
        });
        subParams.customer = sc.id;
        await Customer.findByIdAndUpdate(customerId, { stripeCustomerId: sc.id });
        subscription = await stripe.subscriptions.create(subParams);
      } else {
        throw err;
      }
    }

    const totalAmount = items.reduce((sum, i) => sum + i.amount, 0);
    const firstInterval = items[0]?.interval ?? "month";

    const sub = await RecurringSubscription.create({
      projectId: new mongoose.Types.ObjectId(projectId),
      customerId: new mongoose.Types.ObjectId(customerId),
      stripeSubscriptionId: subscription.id,
      items,
      stripePriceId: items[0]?.stripePriceId,
      stripeProductId: items[0]?.stripeProductId,
      productName: items.length === 1 ? items[0]?.productName : `Bundle (${items.length} items)`,
      amount: totalAmount,
      interval: firstInterval,
      billingDay: day,
      firstPaymentDate: firstPaymentDateStored,
      status:
        subscription.status === "active"
          ? "active"
          : subscription.status === "trialing"
            ? "trialing"
            : subscription.status === "past_due"
              ? "past_due"
              : subscription.status === "incomplete" || subscription.status === "incomplete_expired"
                ? "incomplete"
                : "active",
    });

    return NextResponse.json({
      id: String(sub._id),
      projectId: String(sub.projectId),
      customerId: String(sub.customerId),
      stripeSubscriptionId: sub.stripeSubscriptionId,
      items: sub.items,
      stripePriceId: sub.stripePriceId,
      stripeProductId: sub.stripeProductId,
      productName: sub.productName,
      amount: sub.amount,
      interval: sub.interval,
      billingDay: sub.billingDay,
      firstPaymentDate: sub.firstPaymentDate?.toISOString?.().slice(0, 10),
      status: sub.status,
      createdAt: sub.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: sub.updatedAt?.toISOString?.() ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("Subscription create error:", error);
    const msg = error instanceof Error ? error.message : "Failed to create subscription";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
