"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Wraps layout content. On homepage desktop (md+), uses a dedicated scroll
 * container with section-by-section snap. On mobile/tablet and other pages,
 * uses normal window scroll.
 */
export default function HomeScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPortal = pathname?.startsWith("/portal");
  const isHome = pathname === "/";

  if (isDashboard || isPortal) {
    return <div className="relative z-10 min-h-screen">{children}</div>;
  }

  return (
    <div
      className={`relative z-10 ${isHome ? "home-scroll-container md:h-screen md:overflow-y-auto md:overflow-x-hidden" : ""}`}
      suppressHydrationWarning
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
