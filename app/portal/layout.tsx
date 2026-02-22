import type { Metadata } from "next";
import { PortalProvider } from "@/lib/context/PortalProvider";
import PortalLayoutClient from "@/app/portal/components/PortalLayoutClient";
import "../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Client Portal | TheWebPrism",
  description: "TheWebPrism client portal - view projects and provide feedback",
  robots: "noindex, nofollow",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      <PortalLayoutClient>{children}</PortalLayoutClient>
    </PortalProvider>
  );
}
