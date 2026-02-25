import type { RecurringSubscription } from "@/lib/types/dashboard";
import { api } from "./client";

export type { RecurringSubscription };

export async function getSubscriptions(
  options: { projectId?: string; customerId?: string }
): Promise<RecurringSubscription[]> {
  const params = new URLSearchParams();
  if (options.projectId) params.set("projectId", options.projectId);
  if (options.customerId) params.set("customerId", options.customerId);
  return api.get<RecurringSubscription[]>(`/subscriptions?${params}`);
}

export async function createSubscription(data: {
  projectId: string;
  priceIds: string[];
  billingDay?: number;
  firstPaymentDate?: string;
}): Promise<RecurringSubscription> {
  return api.post<RecurringSubscription>("/subscriptions/create", data);
}

export async function cancelSubscription(
  id: string,
  options?: { immediately?: boolean }
): Promise<RecurringSubscription> {
  return api.patch<RecurringSubscription>(`/subscriptions/${id}`, {
    cancel: true,
    cancelImmediately: options?.immediately,
  });
}

export async function markSubscriptionPaid(id: string): Promise<RecurringSubscription> {
  return api.patch<RecurringSubscription>(`/subscriptions/${id}`, { markAsPaid: true });
}
