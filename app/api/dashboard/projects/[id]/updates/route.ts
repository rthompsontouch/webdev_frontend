import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, ProjectUpdate } from "@/lib/db";
import { uploadImages } from "@/lib/cloudinary";

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
      return NextResponse.json([]);
    }
    const updates = await ProjectUpdate.find({
      projectId: new mongoose.Types.ObjectId(id),
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      updates.map((u) => toUpdateDoc(u as Parameters<typeof toUpdateDoc>[0]))
    );
  } catch (error) {
    console.error("Updates GET error:", error);
    return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project" }, { status: 400 });
    }
    const body = await request.json();
    const { title, description, images } = body as {
      title: string;
      description?: string;
      images?: string[];
    };
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let imageUrls = images ?? [];
    const base64Images = imageUrls.filter((url) => typeof url === "string" && url.startsWith("data:image"));
    if (base64Images.length > 0) {
      try {
        const uploaded = await uploadImages(base64Images, { folder: "project-updates" });
        imageUrls = [...imageUrls.filter((url) => !(typeof url === "string" && url.startsWith("data:image"))), ...uploaded];
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
      }
    }

    const update = await ProjectUpdate.create({
      projectId: new mongoose.Types.ObjectId(id),
      title: title.trim(),
      description: description?.trim() ?? "",
      images: imageUrls,
    });

    return NextResponse.json(toUpdateDoc(update.toObject() as Parameters<typeof toUpdateDoc>[0]));
  } catch (error) {
    console.error("Updates POST error:", error);
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
  }
}
