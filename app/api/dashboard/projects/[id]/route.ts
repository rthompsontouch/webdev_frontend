import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Project } from "@/lib/db";
import type { ProjectStatus } from "@/lib/types/dashboard";

function toProjectDoc(doc: { _id: unknown; customerId: unknown; type: string; name: string; status: string; createdAt: Date; updatedAt: Date }) {
  return {
    id: String(doc._id),
    customerId: typeof doc.customerId === "object" && doc.customerId !== null && "toString" in doc.customerId
      ? (doc.customerId as { toString: () => string }).toString()
      : String(doc.customerId),
    type: doc.type,
    name: doc.name,
    status: doc.status,
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(toProjectDoc(project as unknown as Parameters<typeof toProjectDoc>[0]));
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const body = await request.json();
    const { status } = body as { status?: ProjectStatus };

    const update: Record<string, unknown> = {};
    if (status && ["discovery", "design", "development", "review", "launch", "complete"].includes(status)) {
      update.status = status;
    }

    const project = await Project.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(toProjectDoc(project as unknown as Parameters<typeof toProjectDoc>[0]));
  } catch (error) {
    console.error("Project PATCH error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
