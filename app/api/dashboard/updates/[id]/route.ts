import { NextResponse } from "next/server";
import { mockUpdates } from "@/lib/mock/updates";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const update = mockUpdates.find((u) => u.id === id);
  if (!update) {
    return NextResponse.json({ error: "Update not found" }, { status: 404 });
  }
  return NextResponse.json(update);
}
