"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Plus_Jakarta_Sans } from "next/font/google";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function BrandsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands = [
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { id: uuidv4(), name: "Airbnb", url: "https://airbnb.com", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className={`${bodyFont.className} relative px-6 py-16 lg:px-10 text-white/60`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 text-center mb-8">
          Trusted by leading brands
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex-1 flex gap-12 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 h-16 flex items-center justify-center hover:opacity-100 opacity-70 transition-opacity"
                title={brand.name}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={64}
                  className="h-full w-auto object-contain"
                  unoptimized
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
