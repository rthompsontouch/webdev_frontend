import { NextResponse } from "next/server";
import type { Customer } from "@/lib/types/dashboard";

const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Jane Smith",
    email: "jane@acme.com",
    company: "Acme Corp",
    phone: "(919) 555-0123",
    notes: "Long-term client, prefers email.",
    inviteStatus: "invited",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cust-2",
    name: "Bob Wilson",
    email: "bob@startup.io",
    company: "Startup.io",
    phone: "(919) 555-0456",
    notes: "Interested in SEO for Raleigh market.",
    inviteStatus: "not_invited",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cust-3",
    name: "Sarah Chen",
    email: "sarah@techflow.co",
    company: "TechFlow",
    phone: "(919) 555-0789",
    notes: "SaaS marketing site.",
    inviteStatus: "signed_up",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  let customers = mockCustomers;
  if (search) {
    const q = search.toLowerCase();
    customers = mockCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false) ||
        (c.company?.toLowerCase().includes(q) ?? false)
    );
  }

  return NextResponse.json(customers);
}
