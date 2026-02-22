"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/lib/context";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/projects", label: "Projects" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useDashboard();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    router.replace("/dashboard/login");
  };

  return (
    <>
      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/95 px-4 backdrop-blur md:hidden">
        <Link
          href="/"
          className="text-lg font-semibold text-white transition-colors duration-200 hover:text-rose-400"
        >
          TheWebPrism
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar - hidden on mobile, shown on md+ */}
      <nav
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-800 bg-zinc-900/95 backdrop-blur transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <Link
            href="/"
            className="text-lg font-semibold text-white transition-colors duration-200 hover:text-rose-400"
          >
            TheWebPrism
          </Link>
          <span className="ml-2 rounded bg-rose-500/20 px-2 py-0.5 text-xs font-medium text-rose-400">
            Dashboard
          </span>
        </div>
        <div className="space-y-1 p-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`dashboard-nav-link block rounded-lg border-l-2 border-transparent px-4 py-2.5 text-sm font-medium ${
                  isActive
                    ? "dashboard-nav-link-active border-rose-500/50 bg-rose-500/20 text-rose-400"
                    : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="tel:+19193466039"
            className="mt-4 flex items-center gap-2 rounded-lg border-l-2 border-transparent px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-rose-400"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (919) 346-6039
          </a>
          <button
            onClick={handleSignOut}
            className="mt-1 block w-full rounded-lg border-l-2 border-transparent px-4 py-2.5 text-left text-sm font-medium text-zinc-400 hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>
      </nav>
    </>
  );
}
