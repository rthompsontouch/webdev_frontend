import { api } from "./client";

export interface PaymentStatsItem {
  id: string;
  customerId: string;
  customerName: string;
  projectId?: string;
  projectName: string;
  productName?: string;
  amount?: number;
  interval?: string;
  status?: string;
  oneTimeCost?: number;
  paymentStatus?: string;
}

export interface PaymentStats {
  lateSubscriptions: PaymentStatsItem[];
  pendingSubscriptions: PaymentStatsItem[];
  unpaidProjects: PaymentStatsItem[];
}

export async function getPaymentStats(): Promise<PaymentStats> {
  return api.get<PaymentStats>("/payment-stats");
}
