"use client";

import { useRef } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function BrandsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands = [
    "160355_154794_full-color-horizontal.png",
    "256px-Amazon_logo.svg.png",
    "666379_maleno_50years_logo.png",
    "February-Valentines-Day-2-300x284.png.webp",
    "logo3.png",
    "McBrier_Properties_Group_Logo.gif",
    "paragon-logo.jpg",
    "wikimediaimages-google-1015751_640.png",
  ].map((fileName) => ({
    src: `/images/brands/${fileName}`,
    name: fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));

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
    <section className={`${bodyFont.className} relative bg-white px-6 py-10 pb-14 lg:px-10 text-slate-600`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 text-center mb-8">
          Trusted by leading brands
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex-1 flex items-center gap-12 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand) => (
              <div
                key={brand.src}
                className="flex-shrink-0 h-16 flex items-center justify-center hover:opacity-100 opacity-70 transition-opacity"
                title={brand.name}
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={64}
                  className="h-full w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 transition-all"
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
