"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

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
    {
      id: "marketing",
      title: "Marketing",
      description: "Data-driven campaigns that drive growth. From strategy to execution across all channels.",
      href: "/services/marketing",
    },
    {
      id: "seo-optimization",
      title: "SEO Optimization",
      description: "Technical and content SEO that ranks. Organic visibility and sustainable traffic growth.",
      href: "/services/seo-optimization",
    },
  ];

  const pastelCardTones = [
    "bg-rose-100 text-zinc-900 border-rose-200",
    "bg-amber-100 text-zinc-900 border-amber-200",
    "bg-sky-100 text-zinc-900 border-sky-200",
    "bg-emerald-100 text-zinc-900 border-emerald-200",
    "bg-violet-100 text-zinc-900 border-violet-200",
    "bg-pink-100 text-zinc-900 border-pink-200",
    "bg-lime-100 text-zinc-900 border-lime-200",
    "bg-orange-100 text-zinc-900 border-orange-200",
  ];

  const serviceImages: Record<string, { src: string; alt: string }> = {
    "web-design": {
      src: "/images/services/web-design.png",
      alt: "Web design",
    },
    "web-development": {
      src: "/images/services/development.png",
      alt: "Web development",
    },
    "mobile-development": {
      src: "/images/services/mobile.png",
      alt: "Mobile development",
    },
    "ui-ux-design": {
      src: "/images/services/ui-ux.png",
      alt: "UI/UX design",
    },
    branding: {
      src: "/images/services/branding.png",
      alt: "Branding",
    },
    "digital-consulting": {
      src: "/images/services/consulting.png",
      alt: "Digital consulting",
    },
    marketing: {
      src: "/images/services/marketing.png",
      alt: "Marketing",
    },
    "seo-optimization": {
      src: "/images/services/seo.png",
      alt: "SEO optimization",
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-card-index"));
          if (Number.isNaN(index)) return;
          setVisibleCards((prev) => ({ ...prev, [index]: true }));
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${bodyFont.className} relative px-6 py-[64px] md:py-[72px] lg:px-10 text-zinc-100 md:min-h-[calc(100vh-4rem)] md:flex md:items-center scroll-mt-16`}
    >
      <svg
        className="pointer-events-none absolute top-0 left-0 h-12 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 H1440 V36 C1200,92 960,18 720,54 C480,92 240,44 0,80 Z"
          fill="white"
        />
      </svg>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-0">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Services
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Everything you need to launch and scale digital products.
            </h2>
          </div>
          <div className="grid gap-2 -space-y-2 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
            {services.map((service, index) => {
              const image = serviceImages[service.id];

              return (
                <Link
                  key={service.id}
                  href={service.href}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-card-index={index}
                  style={{
                    transitionDelay: visibleCards[index]
                      ? `${(index % 3) * 80}ms`
                      : "0ms",
                  }}
                  className={`rounded-2xl border p-6 transition-all duration-700 ease-out will-change-transform hover:border-white/40 group transform-gpu ${
                    visibleCards[index]
                      ? "translate-y-0 translate-x-0 opacity-100"
                      : `translate-y-4 opacity-0 ${index % 2 === 0 ? "-translate-x-6" : "translate-x-6"}`
                  } ${index % 2 === 0 ? "-rotate-2" : "rotate-2"} ${pastelCardTones[index % pastelCardTones.length]} md:rotate-0 md:translate-x-0 md:border-white/10 md:bg-white/5 md:text-white md:hover:border-white/30`}
                >
                  {image && (
                    <div className="flex w-full items-center justify-center md:hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={160}
                        height={160}
                        className="h-36 w-36 object-contain"
                      />
                    </div>
                  )}
                  <div className="mt-6 text-left">
                    <h3 className="text-lg font-semibold text-zinc-900 transition md:text-white md:group-hover:text-rose-200">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-700 md:text-white/70">{service.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-700 transition md:text-rose-200">
                      <span className="relative inline-block">
                        Learn More
                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-rose-200 transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
