import { NextResponse } from "next/server";
import type { Project, ProjectStatus } from "@/lib/types/dashboard";

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const body = await request.json();
  const { status } = body as { status?: ProjectStatus };

  if (status && ["discovery", "design", "development", "review", "launch", "complete"].includes(status)) {
    project.status = status;
  }
  project.updatedAt = new Date().toISOString();

  return NextResponse.json(project);
}
