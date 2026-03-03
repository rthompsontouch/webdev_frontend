"use client";

import { useRef, useState } from "react";
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

interface Work {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  image: string;
  secondaryImage?: string;
  tabletImage?: string;
  slug: string;
  bgColor: string;
  accentColor: string;
}

export default function OurWork() {
  const [selectedViews, setSelectedViews] = useState<Record<string, 'desktop' | 'tablet' | 'mobile'>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const works: Work[] = [
    {
      title: "PPPACERIE",
      subtitle: "Custom cruise booking platform",
      description:
        "A bespoke React experience for booking cruises in Erie, PA with a custom engine, admin approvals, and real-time reporting. We streamlined the intake flow, built an internal ops console, and added analytics so the team could see demand trends and optimize inventory week to week.",
      stack: ["React", "Node.js", "MongoDB", "Custom Booking Engine"],
      image: "/images/our-work/pppacerie/desktop.png",
      secondaryImage: "/images/our-work/pppacerie/mobile.png",
      tabletImage: "/images/our-work/pppacerie/tablet.png",
      slug: "pppacerie",
      bgColor: "rgb(113, 73, 198)",
      accentColor: "rgb(255, 200, 180)",
    },
    {
      title: "Builders Hardware",
      subtitle: "Enterprise web platform and integration suite",
      description:
        "A suite of redesigns plus custom bridge apps connecting internal systems, ERP data, and secure payments. We delivered a PCI compliance program, automated reporting, and locked down customer workflows so updates could ship fast without sacrificing security or stability.",
      stack: ["Full-Stack", "System Integration", "PCI Compliance", "Security"],
      image: "/images/our-work/builders_hardware/builders_desktop.png",
      secondaryImage: "/images/our-work/builders_hardware/builders_mobile.png",
      tabletImage: "/images/our-work/builders_hardware/builders_tablet.png",
      slug: "builders-hardware",
      bgColor: "rgba(0, 66, 112, 1.0)",
      accentColor: "rgb(255, 210, 170)",
    },
    {
      title: "GE",
      subtitle: "Enterprise brand and digital platform",
      description:
        "A modernized corporate web platform focused on performance, accessibility, and scalable publishing. We rebuilt the IA, created a modular component system, and optimized load times so the GE team could launch new content quickly while keeping standards high.",
      stack: ["Next.js", "TypeScript", "Tailwind", "Headless CMS"],
      image: "/images/our-work/ge/ge_desktop.png",
      secondaryImage: "/images/our-work/ge/ge_mobile.png",
      tabletImage: "/images/our-work/ge/ge_tablet.png",
      slug: "ge",
      bgColor: "#0d1623",
      accentColor: "#e5e9ee",
    },
    {
      title: "McBrier Properties",
      subtitle: "WordPress real estate site",
      description:
        "A property showcase on WordPress with custom templates, search, and lead capture designed for realtors. We improved listing discovery, built flexible content blocks for agents, and tuned the experience to drive more qualified inquiries.",
      stack: ["WordPress", "PHP", "MySQL", "ACF"],
      image: "/images/our-work/mcbrier_properties/mcbrier_properties_desktop.png",
      secondaryImage: "/images/our-work/mcbrier_properties/mcbrier_properties_mobile.png",
      tabletImage: "/images/our-work/mcbrier_properties/mcbrier_properties_tablet.png",
      slug: "mcbrier-properties",
      bgColor: "rgb(50, 102, 102)",
      accentColor: "#ffb380",
    },
  ];

  const work = works[currentSlide];
  const selectedView = selectedViews[work.slug] || 'desktop';
  const truncatedDescription =
    work.description.length > 170
      ? `${work.description.slice(0, 170).trim()}...`
      : work.description;
  
  const handleViewChange = (view: 'desktop' | 'tablet' | 'mobile', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedViews(prev => ({ ...prev, [work.slug]: view }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + works.length) % works.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    if (startX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    const threshold = 50;
    if (Math.abs(deltaX) < threshold) return;
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="work" className={`${bodyFont.className} relative text-slate-900 transition-colors duration-700 scroll-mt-16`} style={{ backgroundColor: work.bgColor }}>
      <svg
        className="pointer-events-none absolute top-0 left-0 h-16 w-full md:hidden"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,110 L40,110 L40,70 L90,70 L90,120 L140,120 L140,55 L190,55 L190,95 L230,95 L230,65 L260,65 L280,40 L300,65 L300,105 L350,105 L350,60 L400,60 L400,130 L470,130 L470,80 L520,80 L520,110 L560,110 L560,50 L610,50 L610,95 L650,95 L650,70 L690,70 L710,35 L730,70 L730,120 L790,120 L790,60 L850,60 L850,100 L900,100 L900,45 L950,45 L950,120 L1020,120 L1020,75 L1080,75 L1080,105 L1120,105 L1120,55 L1180,55 L1180,90 L1220,90 L1220,65 L1250,65 L1270,40 L1290,65 L1290,110 L1340,110 L1340,70 L1390,70 L1390,130 L1440,130 L1440,0 Z"
          fill="#000000"
        />
      </svg>
      <div 
        className="relative min-h-[calc(100vh-4rem)] pt-20 md:pt-12 pb-10 md:pb-12 md:flex md:flex-col overflow-hidden"
      >
        {/* Decorative accent circles */}
        <div className="absolute top-8 left-10 w-48 h-48 rounded-full opacity-10 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute top-1/4 right-12 w-56 h-56 rounded-full opacity-8 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute bottom-16 left-1/3 w-40 h-40 rounded-full opacity-12 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute bottom-20 right-1/4 w-52 h-52 rounded-full opacity-10 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        

        {/* Title Section */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 md:pb-8">
          <div className="space-y-4">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700" style={{ color: work.accentColor }}>
                Web Development Work
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
            </div>
            <h2 className={`${displayFont.className} hidden text-3xl text-white sm:text-4xl md:block`}>
              High-performance sites, web apps, and portals built to convert.
            </h2>
          </div>
        </div>
        
        {/* Job Content - Centered in remaining space */}
        <div className="md:flex-1 md:flex md:items-center">
          <Link href={`/work/${work.slug}`} className="block group w-full">
            <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 w-full">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3
                      className={`${displayFont.className} text-3xl lg:text-4xl text-white group-hover:opacity-90 transition-all duration-700`}
                      style={{ color: work.accentColor }}
                    >
                      {work.title}
                    </h3>
                    <div
                      className="flex items-center gap-2 text-sm font-semibold text-white group-hover:translate-x-1 transition-all duration-300"
                      style={{ color: work.accentColor }}
                    >
                      <span className="relative">
                        View Case Study
                        <span
                          className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                          style={{ backgroundColor: work.accentColor }}
                        />
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-sm uppercase tracking-[0.2em] text-white/90 font-semibold md:block">
                    {work.subtitle}
                  </p>
                  <p className="text-sm text-white/80">{truncatedDescription}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {work.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {/* View Tabs */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        prevSlide();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20"
                      aria-label="Previous project"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleViewChange('desktop', e)}
                      className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
                        selectedView === 'desktop'
                          ? 'text-black'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                      style={{
                        backgroundColor: selectedView === 'desktop' ? work.accentColor : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      Desktop
                    </button>
                    {work.tabletImage && (
                      <button
                        onClick={(e) => handleViewChange('tablet', e)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
                          selectedView === 'tablet'
                            ? 'text-black'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                        style={{
                          backgroundColor: selectedView === 'tablet' ? work.accentColor : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        Tablet
                      </button>
                    )}
                    {work.secondaryImage && (
                      <button
                        onClick={(e) => handleViewChange('mobile', e)}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
                          selectedView === 'mobile'
                            ? 'text-black'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                        style={{
                          backgroundColor: selectedView === 'mobile' ? work.accentColor : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        Mobile
                      </button>
                    )}
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        nextSlide();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20"
                      aria-label="Next project"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Image Display */}
                  <div
                    className="relative mx-auto w-full flex justify-center items-center min-h-[240px]"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {selectedView === 'desktop' && (
                      <div key={`${work.slug}-desktop-wrapper`} className="relative w-full max-w-[600px] h-[240px] md:h-auto animate-fadeIn">
                        <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl bg-white shadow-sm md:aspect-[3/2]" style={{ border: '3px solid black' }}>
                          <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover"
                            unoptimized
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedView === 'tablet' && work.tabletImage && (
                      <div
                        key={`${work.slug}-tablet-wrapper`}
                        className="relative w-[320px] h-[240px] animate-fadeIn md:h-auto md:aspect-[4/3]"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-xl" style={{ border: '3px solid black' }}>
                          <Image
                            src={work.tabletImage}
                            alt={`${work.title} tablet view`}
                            fill
                            className="object-cover"
                            unoptimized
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedView === 'mobile' && work.secondaryImage && (
                      <div
                        key={`${work.slug}-mobile-wrapper`}
                        className="relative w-[150px] h-[240px] animate-fadeIn md:h-auto md:aspect-[9/16]"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-xl" style={{ border: '3px solid black' }}>
                          <Image
                            src={work.secondaryImage}
                            alt={`${work.title} mobile view`}
                            fill
                            className="object-cover"
                            unoptimized
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {works.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

