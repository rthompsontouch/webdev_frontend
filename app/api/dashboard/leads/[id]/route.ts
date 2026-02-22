import { NextResponse } from "next/server";
import type { Lead, LeadStatus } from "@/lib/types/dashboard";

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@acme.com",
    phone: "(919) 555-0123",
    company: "Acme Corp",
    interested: "Web Design",
    project: "Looking for a full website redesign with modern UI.",
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@startup.io",
    phone: "(919) 555-0456",
    company: "Startup.io",
    interested: "SEO Optimization",
    project: "Need help ranking for local search in Raleigh.",
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Sarah Chen",
    email: "sarah@techflow.co",
    phone: "(919) 555-0789",
    company: "TechFlow",
    interested: "New Website",
    project: "Startup needs a marketing site and landing pages for our SaaS product.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = mockLeads.find((l) => l.id === id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json(lead);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = mockLeads.find((l) => l.id === id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const body = await request.json();
  const { status, notes } = body as { status?: LeadStatus; notes?: string };

  if (status && ["new", "contacted", "converted", "not_interested"].includes(status)) {
    lead.status = status;
  }
  if (notes !== undefined) {
    lead.notes = notes;
  }

  return NextResponse.json(lead);
}
