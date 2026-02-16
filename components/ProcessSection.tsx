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

  const stepLabels = ["Discovery", "Strat", "Design", "Dev"];

  const stepPositions = [
    { x: 50, y: 10, angle: -90 },   // Discovery - Top (12 o'clock)
    { x: 90, y: 50, angle: 0 },     // Strategy - Right (3 o'clock)
    { x: 50, y: 90, angle: 90 },    // Design - Bottom (6 o'clock)
    { x: 10, y: 50, angle: 180 },   // Development - Left (9 o'clock)
  ];

  return (
    <section id="process" className={`${bodyFont.className} relative px-6 py-20 lg:px-10 text-zinc-100`}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Our Process
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              How we bring ideas to life.
            </h2>
            <p className="text-base text-white/70">
              From vision to reality, we follow a proven methodology that ensures exceptional results at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Circular Process Diagram */}
            <div className="relative h-[500px] flex items-center justify-center">
              <svg viewBox="-50 -50 400 400" className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
                
                {/* Progress arc */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="#fda4af"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${((selectedStep + 1) / 4) * 628} 628`}
                  transform="rotate(-90 150 150)"
                  className="transition-all duration-700"
                />
                
                {/* Center circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="70"
                  fill="rgba(244,63,94,0.05)"
                  stroke="rgba(244,63,94,0.2)"
                  strokeWidth="1"
                />
                
                {/* Step indicators */}
                {stepPositions.map((pos, index) => {
                  const isSelected = selectedStep === index;
                  const angle = (pos.angle * Math.PI) / 180;
                  const x = 150 + 100 * Math.cos(angle);
                  const y = 150 + 100 * Math.sin(angle);
                  
                  return (
                    <g key={index}>
                      {/* Step circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? "32" : "28"}
                        fill={isSelected ? "#fda4af" : "rgba(253, 164, 175, 0.3)"}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => setSelectedStep(index)}
                        onMouseEnter={() => setSelectedStep(index)}
                      />
                      
                      {/* Step title */}
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        className={`text-[10px] font-bold uppercase tracking-wide transition-all duration-300 ${
                          isSelected ? 'fill-slate-900' : 'fill-white'
                        }`}
                        style={{ fontFamily: 'inherit', pointerEvents: 'none' }}
                      >
                        {processSteps[index].title}
                      </text>
                    </g>
                  );
                })}
                
                {/* Center step number */}
                <text
                  x="150"
                  y="158"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-6xl font-bold fill-rose-200/30"
                  style={{ fontFamily: 'inherit' }}
                >
                  {String(selectedStep + 1).padStart(2, '0')}
                </text>
              </svg>
            </div>

            {/* Step Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`${displayFont.className} text-3xl text-white`}>
                  {processSteps[selectedStep].title}
                </h3>
                <p className="text-base uppercase tracking-[0.2em] text-rose-200 font-semibold">
                  {processSteps[selectedStep].subtitle}
                </p>
                <p className="text-base text-white/70">
                  {processSteps[selectedStep].description}
                </p>
              </div>

              {/* Step navigation dots */}
              <div className="flex gap-3 pt-4">
                {processSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStep(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      selectedStep === index ? 'w-12 bg-rose-200' : 'w-2 bg-white/20'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
