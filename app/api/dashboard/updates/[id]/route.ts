import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, ProjectUpdate } from "@/lib/db";

function toUpdateDoc(doc: { _id: unknown; projectId: unknown; title: string; description: string; images?: string[]; createdAt: Date }) {
  return {
    id: String(doc._id),
    projectId: typeof doc.projectId === "object" && doc.projectId !== null && "toString" in doc.projectId
      ? (doc.projectId as { toString: () => string }).toString()
      : String(doc.projectId),
    title: doc.title,
    description: doc.description ?? "",
    images: doc.images ?? [],
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
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
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }
    const update = await ProjectUpdate.findById(id).lean();
    if (!update) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }
    return NextResponse.json(toUpdateDoc(update as unknown as Parameters<typeof toUpdateDoc>[0]));
  } catch (error) {
    console.error("Update GET error:", error);
    return NextResponse.json({ error: "Failed to fetch update" }, { status: 500 });
  }
}
