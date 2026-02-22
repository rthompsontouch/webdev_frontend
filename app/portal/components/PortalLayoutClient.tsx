"use client";

import { usePathname } from "next/navigation";
import { usePortal } from "@/lib/context/PortalProvider";
import PortalNavbar from "./PortalNavbar";

export default function PortalLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { customerId } = usePortal();
  const isLoginPage = pathname === "/portal/login";
  const isInvitePage = pathname === "/portal/invite";
  const showNavbar = !isLoginPage && !isInvitePage && customerId;

  return (
    <div data-dashboard className="min-h-screen bg-zinc-950 text-zinc-100">
      {showNavbar && <PortalNavbar />}
      <main
        className={
          isLoginPage || isInvitePage
            ? "flex min-h-screen items-center justify-center"
            : "min-h-screen"
        }
      >
        <div
          className={
            isLoginPage || isInvitePage
              ? "w-full max-w-md px-4"
              : "mx-auto max-w-3xl p-6 pt-20 md:p-8 md:pt-24"
          }
        >
          {children}
        </div>
      </main>
    </div>
  );
}
