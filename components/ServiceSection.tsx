"use client";

import Link from "next/link";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceSection() {
  const services: Service[] = [
    {
      id: "web-design",
      title: "Web Design",
      description: "Premium websites built for conversion and trust. Strategy, UX, and brand-forward design.",
      href: "/services/web-design",
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "High-performance sites and full-stack apps. Engineering built for momentum and scale.",
      href: "/services/web-development",
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      description: "Premium iOS and Android apps for brands that care about quality and retention.",
      href: "/services/mobile-development",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "Research-led product design and design systems. UX that removes friction and feels premium.",
      href: "/services/ui-ux-design",
    },
    {
      id: "branding",
      title: "Branding",
      description: "Visual identity and brand systems. Build a presence that feels unmistakable.",
      href: "/services/branding",
    },
    {
      id: "digital-consulting",
      title: "Digital Consulting",
      description: "Strategic guidance for growth-stage teams. Roadmaps, audits, and alignment workshops.",
      href: "/services/digital-consulting",
    },
  ];

  return (
    <section id="services" className={`${bodyFont.className} relative px-6 py-20 lg:px-10 text-zinc-100`}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Services
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Everything you need to launch and scale digital products.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-rose-200 transition">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{service.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-200 group-hover:translate-x-1 transition">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
