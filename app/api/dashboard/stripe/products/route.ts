import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });
    const recurringPrices = prices.data.filter((p) => p.type === "recurring");
    const result = recurringPrices.map((price) => {
      const product = products.data.find((p) => p.id === price.product);
      return {
        priceId: price.id,
        productId: price.product as string,
        productName: product?.name ?? "Unknown",
        amount: price.unit_amount ? price.unit_amount / 100 : 0,
        currency: price.currency,
        interval: price.recurring?.interval ?? "month",
        intervalCount: price.recurring?.interval_count ?? 1,
      };
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Stripe products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
