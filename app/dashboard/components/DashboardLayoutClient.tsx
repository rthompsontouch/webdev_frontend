"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardNav from "./DashboardNav";
import { useDashboard } from "@/lib/context";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useDashboard();
  const isLoginPage = pathname === "/dashboard/login";
  const showNav = !isLoginPage && isAuthenticated;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.replace("/dashboard/login");
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (!isLoading && !isAuthenticated && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div data-dashboard className="min-h-screen bg-zinc-950 text-zinc-100">
      {showNav && <DashboardNav />}
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
