import type { Metadata } from "next";
import { DashboardProvider } from "@/lib/context";
import DashboardLayoutClient from "@/app/dashboard/components/DashboardLayoutClient";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard | TheWebPrism",
  description: "TheWebPrism client portal and admin dashboard",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </DashboardProvider>
  );
}
