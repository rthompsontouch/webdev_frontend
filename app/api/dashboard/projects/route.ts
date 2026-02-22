import { NextResponse } from "next/server";
import type { Project } from "@/lib/types/dashboard";

const mockProjects: Project[] = [
  {
    id: "proj-1",
    customerId: "cust-1",
    type: "website_redesign",
    name: "Acme Website Redesign",
    status: "design",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-2",
    customerId: "cust-1",
    type: "seo",
    name: "Acme SEO Touch-up",
    status: "complete",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-3",
    customerId: "cust-2",
    type: "seo",
    name: "Raleigh Local SEO",
    status: "discovery",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");

  let projects = mockProjects;
  if (customerId) {
    projects = mockProjects.filter((p) => p.customerId === customerId);
  }

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customerId, type, name } = body as { customerId: string; type: Project["type"]; name: string };
  if (!customerId || !type || !name) {
    return NextResponse.json({ error: "customerId, type, and name are required" }, { status: 400 });
  }
  const project: Project = {
    id: `proj-${Date.now()}`,
    customerId,
    type,
    name,
    status: "discovery",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(project);
  return NextResponse.json(project);
}
