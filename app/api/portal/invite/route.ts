import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json({ error: "Invalid invite link" }, { status: 400 });
    }

    const conn = await connectDB();
    const db = conn.connection.db!;
    const customers = db.collection("customers");

    const customer = await customers.findOne(
      {
        inviteToken: token,
        inviteTokenExpiry: { $gt: new Date() },
      },
      { projection: { name: 1, email: 1 } }
    ) as { name: string; email: string } | null;

    if (customer) {
      return NextResponse.json({
        name: customer.name,
        email: customer.email,
      });
    }

    const expired = await customers.findOne(
      { inviteToken: token },
      { projection: { _id: 1 } }
    );
    if (expired) {
      return NextResponse.json(
        { error: "This invite link has expired. Please request a new one." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Invite link not found. Please request a new invite from the dashboard." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Invite lookup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
