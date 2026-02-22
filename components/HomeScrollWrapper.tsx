"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Wraps layout content. On homepage (tablet/desktop), uses a dedicated scroll
 * container with section-by-section snap. Other pages use normal scroll.
 * Same DOM structure for both to minimize hydration mismatch.
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
      className={`relative z-10 ${isHome ? "home-scroll-container h-screen overflow-y-auto overflow-x-hidden" : ""}`}
      suppressHydrationWarning
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
