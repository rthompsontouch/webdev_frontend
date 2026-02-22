import type { Lead, LeadStatus } from "@/lib/types/dashboard";
import { api } from "./client";

export async function getLeads(status?: LeadStatus): Promise<Lead[]> {
  const query = status ? `?status=${status}` : "";
  return api.get<Lead[]>(`/leads${query}`);
}

export async function getLead(id: string): Promise<Lead | null> {
  return api.get<Lead | null>(`/leads/${id}`);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  notes?: string
): Promise<Lead> {
  return api.patch<Lead>(`/leads/${id}`, { status, notes });
}

export async function convertLeadToCustomer(leadId: string): Promise<{ customerId: string }> {
  return api.post<{ customerId: string }>(`/leads/${leadId}/convert`);
}
