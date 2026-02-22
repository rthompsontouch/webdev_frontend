import type { Customer } from "@/lib/types/dashboard";
import { api } from "./client";

export async function getCustomers(search?: string): Promise<Customer[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return api.get<Customer[]>(`/customers${query}`);
}

export async function getCustomer(id: string): Promise<Customer | null> {
  return api.get<Customer | null>(`/customers/${id}`);
}

export async function updateCustomer(
  id: string,
  data: Partial<Pick<Customer, "name" | "email" | "company" | "phone" | "notes" | "inviteStatus">>
): Promise<Customer> {
  return api.patch<Customer>(`/customers/${id}`, data);
}

export async function sendCustomerInvite(customerId: string): Promise<void> {
  await api.post(`/customers/${customerId}/invite`);
}

export async function portalLogin(email: string, password: string): Promise<{ customerId: string }> {
  const res = await fetch("/api/portal/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}
