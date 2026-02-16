"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function BrandsCarousel() {
  const brands = [
    "February-Valentines-Day-2-300x284.png.webp",
    "logo3.png",
    "McBrier_Properties_Group_Logo.png",
    "paragon-logo.png",
    "wikimediaimages-google-1015751_640.png",
    "160355_154794_full-color-horizontal.png",
    "256px-Amazon_logo.svg.png",
    "666379_maleno_50years_logo.png",
  ].map((fileName, index) => ({
    src: `/images/brands/${fileName}`,
    name: fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    angle: (index * 360) / 8, // Distribute 8 logos evenly in a circle
  }));

  return (
    <section 
      id="brands"
      className={`${bodyFont.className} relative bg-slate-900 text-white md:h-[calc(100vh-4rem)] md:flex md:items-center md:justify-center px-6 py-16 md:py-8 scroll-mt-16 overflow-hidden`}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Mobile Grid View */}
        <div className="md:hidden">
          <div className="flex flex-col items-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 text-center">
              Trusted by leading brands
            </p>
            <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.src}
                className="flex items-center justify-center h-24"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={150}
                  height={80}
                  className="max-h-full max-w-full w-auto h-auto object-contain opacity-70"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden md:block relative w-full max-w-3xl mx-auto" style={{ aspectRatio: "1/1" }}>
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="text-center space-y-4">
              <h3 className={`${displayFont.className} text-3xl lg:text-4xl font-bold text-white`}>
                Trusted Partners
              </h3>
              <p className="text-slate-300 text-base">50+ Leading Brands</p>
              <div className="h-0.5 w-24 rounded-full bg-rose-200 mx-auto" />
            </div>
          </div>

          {/* Circular Brand Layout */}
          {brands.map((brand, index) => {
            const radius = 35; // Percentage of container
            const angleRad = (brand.angle * Math.PI) / 180;
            const x = 50 + radius * Math.cos(angleRad);
            const y = 50 + radius * Math.sin(angleRad);

            return (
              <div
                key={brand.src}
                className="absolute group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-32 h-24 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-800 group-hover:border-rose-200/50 group-hover:shadow-lg group-hover:shadow-rose-200/20">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="max-h-full max-w-full w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity p-2"
                    unoptimized
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
