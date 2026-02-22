import { NextResponse } from "next/server";
import { connectDB, Customer } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const customer = await Customer.findOne({
      email: { $regex: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    })
      .select("_id passwordHash inviteStatus")
      .lean();

    if (!customer) {
      return NextResponse.json(
        { error: "No account found with that email." },
        { status: 401 }
      );
    }

    if (!customer.passwordHash) {
      return NextResponse.json(
        { error: "Please use the invite link from your email to set your password first." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      customerId: String(customer._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
