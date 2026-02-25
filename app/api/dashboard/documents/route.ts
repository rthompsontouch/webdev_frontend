import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, Document } from "@/lib/db";
import { uploadDocument } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const projectId = searchParams.get("projectId");

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ error: "Valid customerId required" }, { status: 400 });
    }

    const filter: { customerId: mongoose.Types.ObjectId; projectId?: mongoose.Types.ObjectId } = {
      customerId: new mongoose.Types.ObjectId(customerId),
    };
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      filter.projectId = new mongoose.Types.ObjectId(projectId);
    }

    const docs = await Document.find(filter).sort({ createdAt: -1 }).lean();
    const list = docs.map((d) => ({
      id: String(d._id),
      customerId: String(d.customerId),
      projectId: d.projectId ? String(d.projectId) : undefined,
      name: d.name,
      url: d.url,
      type: d.type,
      createdAt: d.createdAt?.toISOString?.() ?? new Date().toISOString(),
    }));

    return NextResponse.json(list);
  } catch (error) {
    console.error("Documents GET error:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const customerId = formData.get("customerId") as string | null;
    const projectId = formData.get("projectId") as string | null;
    const name = formData.get("name") as string | null;
    const type = formData.get("type") as string | null;

    if (!file || !customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json(
        { error: "File and valid customerId required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await uploadDocument(buffer, {
      folder: "documents",
      originalName: file.name,
    });

    const doc = await Document.create({
      customerId: new mongoose.Types.ObjectId(customerId),
      projectId: projectId && mongoose.Types.ObjectId.isValid(projectId)
        ? new mongoose.Types.ObjectId(projectId)
        : undefined,
      name: name?.trim() || file.name,
      url,
      type: type?.trim() || "other",
    });

    return NextResponse.json({
      id: String(doc._id),
      customerId: String(doc.customerId),
      projectId: doc.projectId ? String(doc.projectId) : undefined,
      name: doc.name,
      url: doc.url,
      type: doc.type,
      createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}
