import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Customer } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  try {
    await connectDB();
    const { customerId, returnUrl } = await request.json();
    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ error: "Valid customerId required" }, { status: 400 });
    }
    const customer = await Customer.findById(customerId).select("stripeCustomerId").lean();
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    const doc = customer as { stripeCustomerId?: string };
    if (!doc.stripeCustomerId) {
      return NextResponse.json({ error: "Customer has no Stripe account yet" }, { status: 400 });
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: doc.stripeCustomerId,
      return_url: returnUrl ?? undefined,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
  }
}
