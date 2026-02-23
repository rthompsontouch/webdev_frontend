"use client";

import { useState } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function ProcessSection() {
  const [selectedStep, setSelectedStep] = useState(0);

  const processSteps: ProcessStep[] = [
    {
      title: "Discovery",
      subtitle: "Understanding Your Vision",
      description: "We start by deeply understanding your business goals, target audience, and unique challenges. Through collaborative workshops and research, we define the strategy that will drive your project's success.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    },
    {
      title: "Strategy",
      subtitle: "Planning for Success",
      description: "With insights in hand, we craft a comprehensive roadmap. We define the user experience, technical architecture, and design direction that will bring your vision to life.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop",
    },
    {
      title: "Design",
      subtitle: "Creating Beautiful Solutions",
      description: "Our designers create stunning, intuitive interfaces that balance aesthetics with functionality. Every pixel is purposeful, every interaction thoughtful.",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=600&fit=crop",
    },
    {
      title: "Develop",
      subtitle: "Building with Excellence",
      description: "Our developers transform designs into robust, scalable solutions using cutting-edge technologies. We build fast, secure, and maintainable code that grows with your business.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop",
    },
  ];

  const stepPositions = [
    { angle: -90 },
    { angle: 0 },
    { angle: 90 },
    { angle: 180 },
  ];

  return (
    <section
      id="process"
      className={`${bodyFont.className} relative overflow-hidden px-6 py-16 lg:px-10 md:py-20 md:min-h-[calc(100vh-4rem)] md:flex md:items-center scroll-mt-16`}
    >
      {/* Background - blends with Our Work above and FAQ below */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute top-1/4 -left-24 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute bottom-1/3 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-rose-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="space-y-10 md:space-y-14">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Our Process
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl lg:text-5xl`}>
              How we bring ideas to life.
            </h2>
            <p className="max-w-2xl text-base text-white/70 md:text-lg">
              From vision to reality, we follow a proven methodology that ensures exceptional results at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Circular Process Diagram - modernized */}
            <div className="relative flex items-center justify-center">
              <div className="relative h-[380px] w-full max-w-[380px] md:h-[420px] md:max-w-[420px]">
                <svg viewBox="-60 -60 320 320" className="w-full h-full drop-shadow-2xl">
                  {/* Outer glow ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="rgba(253, 164, 175, 0.08)"
                    strokeWidth="1"
                  />
                  {/* Background track */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="2"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="url(#processGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${((selectedStep + 1) / 4) * 534} 534`}
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-700"
                  />
                  <defs>
                    <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fda4af" />
                      <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                  </defs>
                  {/* Center circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="58"
                    fill="rgba(0,0,0,0.4)"
                    stroke="rgba(244,63,94,0.25)"
                    strokeWidth="1"
                  />
                  {/* Center step number */}
                  <text
                    x="100"
                    y="108"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-5xl font-bold fill-rose-200/40"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(selectedStep + 1).padStart(2, "0")}
                  </text>
                  {/* Step indicators */}
                  {stepPositions.map((pos, index) => {
                    const isSelected = selectedStep === index;
                    const angle = (pos.angle * Math.PI) / 180;
                    const x = 100 + 85 * Math.cos(angle);
                    const y = 100 + 85 * Math.sin(angle);

                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "26" : "22"}
                          fill={isSelected ? "#fda4af" : "rgba(253, 164, 175, 0.25)"}
                          stroke={isSelected ? "rgba(253, 164, 175, 0.5)" : "transparent"}
                          strokeWidth="2"
                          className="cursor-pointer transition-all duration-300"
                          onClick={() => setSelectedStep(index)}
                          onMouseEnter={() => setSelectedStep(index)}
                        />
                        <text
                          x={x}
                          y={y + 3}
                          textAnchor="middle"
                          className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                            isSelected ? "fill-zinc-900" : "fill-white/90"
                          }`}
                          style={{ fontFamily: "inherit", pointerEvents: "none" }}
                        >
                          {processSteps[index].title}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Step Details - glass card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8 lg:p-10">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-sm font-bold text-rose-300">
                    {selectedStep + 1}
                  </span>
                  <div>
                    <h3 className={`${displayFont.className} text-2xl text-white sm:text-3xl`}>
                      {processSteps[selectedStep].title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-200 font-semibold">
                      {processSteps[selectedStep].subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-white/75">
                  {processSteps[selectedStep].description}
                </p>
                {/* Step navigation - modern pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {processSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedStep(index)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        selectedStep === index
                          ? "bg-rose-500/30 text-rose-200 ring-1 ring-rose-400/30"
                          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    >
                      {processSteps[index].title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
