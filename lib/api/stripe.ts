import type { RecurringSubscription } from "@/lib/types/dashboard";
import { api } from "./client";

export interface StripeProduct {
  priceId: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  interval: string;
  intervalCount: number;
}

export async function getStripeProducts(): Promise<StripeProduct[]> {
  return api.get<StripeProduct[]>("/stripe/products");
}

export async function ensureStripeCustomer(customerId: string): Promise<{ stripeCustomerId: string }> {
  return api.post<{ stripeCustomerId: string }>("/stripe/ensure-customer", { customerId });
}

export async function getBillingPortalUrl(
  customerId: string,
  returnUrl?: string
): Promise<{ url: string }> {
  return api.post<{ url: string }>("/stripe/billing-portal", { customerId, returnUrl });
}
