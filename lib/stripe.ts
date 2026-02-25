import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  console.warn("STRIPE_SECRET_KEY not set – Stripe features disabled");
}

export const stripe = secret ? new Stripe(secret) : null;
