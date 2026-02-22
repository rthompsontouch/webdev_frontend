"use client";

import { usePathname } from "next/navigation";
import PortalNav from "./PortalNav";
import { usePortal } from "@/lib/context/PortalProvider";

export default function PortalLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { customerId } = usePortal();
  const isLoginPage = pathname === "/portal/login";
  const showNav = !isLoginPage && customerId;

  return (
    <div data-dashboard className="min-h-screen bg-zinc-950 text-zinc-100">
      {showNav && <PortalNav />}
      <main
        className={
          showNav
            ? "pt-16 md:pl-64 md:pt-0"
            : "flex min-h-screen items-center justify-center"
        }
      >
        <div
          className={
            showNav ? "dashboard-content p-6 md:p-8" : "w-full max-w-md px-4"
          }
        >
          {children}
        </div>
      </main>
    </div>
  );
}
