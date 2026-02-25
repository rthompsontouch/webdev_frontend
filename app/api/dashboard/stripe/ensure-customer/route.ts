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
    const { customerId } = await request.json();
    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ error: "Valid customerId required" }, { status: 400 });
    }
    const customer = await Customer.findById(customerId).select("name email stripeCustomerId").lean();
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    const doc = customer as unknown as { stripeCustomerId?: string; name: string; email: string };
    if (doc.stripeCustomerId) {
      return NextResponse.json({ stripeCustomerId: doc.stripeCustomerId });
    }
    const stripeCustomer = await stripe.customers.create({
      email: doc.email,
      name: doc.name,
      metadata: { internalCustomerId: customerId },
    });
    await Customer.findByIdAndUpdate(customerId, {
      stripeCustomerId: stripeCustomer.id,
    });
    return NextResponse.json({ stripeCustomerId: stripeCustomer.id });
  } catch (error) {
    console.error("Stripe ensure-customer error:", error);
    return NextResponse.json({ error: "Failed to create Stripe customer" }, { status: 500 });
  }
}
