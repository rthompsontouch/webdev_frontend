import { NextResponse } from "next/server";
import { connectDB, Admin } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";

const ADMIN_EMAIL = "hello@thewebprism.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    await connectDB();

    const admin = await Admin.findOne({ email: ADMIN_EMAIL })
      .select("+passwordHash")
      .lean() as { _id: unknown; email: string; name: string; passwordHash?: string } | null;

    if (!admin?.passwordHash) {
      console.error("No admin found. Run: npm run hash-dashboard-password \"your-password\"");
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: String(admin._id),
        email: admin.email,
        name: admin.name,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Dashboard login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
