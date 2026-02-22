import { NextResponse } from "next/server";
import { connectDB, Customer } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json({ error: "Invalid invite link" }, { status: 400 });
    }

    const customer = await Customer.findOne({
      inviteToken: token,
      inviteTokenExpiry: { $gt: new Date() },
    })
      .select("name email")
      .lean();

    if (!customer) {
      const expired = await Customer.findOne({ inviteToken: token })
        .select("_id")
        .lean();
      if (expired) {
        return NextResponse.json(
          { error: "This invite link has expired. Please request a new one." },
          { status: 404 }
        );
      }
      const withToken = await Customer.countDocuments({
        inviteToken: { $exists: true, $ne: null },
      });
      console.log("[invite] Token not found. Token length:", token.length, "Customers with tokens:", withToken);
      return NextResponse.json(
        { error: "Invite link not found. Please request a new invite from the dashboard." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: customer.name,
      email: customer.email,
    });
  } catch (error) {
    console.error("Invite lookup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
