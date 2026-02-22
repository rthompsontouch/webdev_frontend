import { NextResponse } from "next/server";
import type { ProjectUpdate } from "@/lib/types/dashboard";
import { mockUpdates } from "@/lib/mock/updates";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = id;
  const updates = mockUpdates.filter((u) => u.projectId === projectId);
  return NextResponse.json(updates);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = id;
  const body = await request.json();
  const { title, description, images } = body as {
    title: string;
    description?: string;
    images?: string[];
  };
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const update: ProjectUpdate = {
    id: `upd-${Date.now()}`,
    projectId,
    title: title.trim(),
    description: description?.trim() ?? "",
    images: images ?? [],
    createdAt: new Date().toISOString(),
  };
  mockUpdates.push(update);
  return NextResponse.json(update);
}
