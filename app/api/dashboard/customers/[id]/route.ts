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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
  return NextResponse.json(customer);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const body = await request.json();
  const { name, email, company, phone, notes, inviteStatus } = body as Partial<
    Pick<Customer, "name" | "email" | "company" | "phone" | "notes" | "inviteStatus">
  >;

  if (name !== undefined) customer.name = name;
  if (email !== undefined) customer.email = email;
  if (company !== undefined) customer.company = company;
  if (phone !== undefined) customer.phone = phone;
  if (notes !== undefined) customer.notes = notes;
  if (inviteStatus !== undefined && ["not_invited", "invited", "signed_up"].includes(inviteStatus)) {
    customer.inviteStatus = inviteStatus;
  }
  customer.updatedAt = new Date().toISOString();

  return NextResponse.json(customer);
}
