"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Process", href: "/#process" },
    { name: "FAQ", href: "/#faq" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const getScrollContainer = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const isHome = pathname === "/";
      return isHome && isDesktop
        ? (document.querySelector(".home-scroll-container") as HTMLElement) ?? window
        : window;
    };

    const handleScroll = () => {
      const scrollContainer = getScrollContainer();
      const scrollTop = scrollContainer === window
        ? window.scrollY
        : (scrollContainer as HTMLElement).scrollTop;
      setIsScrolled(scrollTop > 8);

      const sections = ["services", "work", "process", "faq", "contact"];
      const viewportOffset = 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportOffset && rect.bottom > viewportOffset) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    let scrollContainer = getScrollContainer();
    handleScroll();
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      const next = getScrollContainer();
      if (next !== scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer = next;
        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(1); // e.g., "#services"
      return activeSection === hash;
    }
    return pathname === href;
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 shadow-md ${
        isScrolled
          ? "bg-black/80 backdrop-blur-sm border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo/Logo_white.png"
                alt="Logo"
                width={140}
                height={36}
                className="h-16 w-auto"
                priority
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    link.name === "Contact"
                      ? "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                      : "text-white/90 hover:text-white transition-colors font-medium relative group"
                  }
                >
                  {link.name}
                  {link.name !== "Contact" && (
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
                        isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors text-white hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    link.name === "Contact"
                      ? "block px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                      : "block px-3 py-2 rounded-md text-white/90 hover:bg-white/10 transition-colors font-medium"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
    </nav>
  );
}
