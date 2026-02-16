"use client";

import { useState } from "react";
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

  const works: Work[] = [
    {
      title: "Personal Private Pleasure Adventure Cruises",
      subtitle: "Custom cruise booking platform",
      description:
        "A bespoke React website for booking cruises in Erie, PA with a custom booking engine, admin approvals, and analytics dashboard.",
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
        "Multiple website redesigns with custom bridge applications connecting internal systems and a PCI compliance program to secure sensitive data.",
      stack: ["Full-Stack Development", "System Integration", "PCI Compliance", "Database Security"],
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
        "A modernized corporate web experience with performance, accessibility, and scalable content publishing in mind.",
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
        "A property showcase built on WordPress with custom templates, search, and lead capture built for realtors.",
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

  return (
    <section id="work" className={`${bodyFont.className} relative text-slate-900 transition-colors duration-700 scroll-mt-16`} style={{ backgroundColor: work.bgColor }}>
      <div 
        className="relative md:min-h-[calc(100vh-4rem)] pt-6 md:pt-8 pb-6 md:pb-8 md:flex md:flex-col overflow-hidden"
      >
        {/* Decorative accent circles */}
        <div className="absolute top-8 left-10 w-48 h-48 rounded-full opacity-10 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute top-1/4 right-12 w-56 h-56 rounded-full opacity-8 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute bottom-16 left-1/3 w-40 h-40 rounded-full opacity-12 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        <div className="absolute bottom-20 right-1/4 w-52 h-52 rounded-full opacity-10 blur-3xl transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label="Previous project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label="Next project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Title Section */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 md:pb-8">
          <div className="space-y-4">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-700" style={{ color: work.accentColor }}>
                Web Development Work
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full transition-colors duration-700" style={{ backgroundColor: work.accentColor }} />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
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
                  <h3 className={`${displayFont.className} text-3xl lg:text-4xl text-white group-hover:opacity-90 transition-all duration-700`} style={{ color: work.accentColor }}>
                    {work.title}
                  </h3>
                  <p className="text-base uppercase tracking-[0.2em] text-white/90 font-semibold">
                    {work.subtitle}
                  </p>
                  <p className="text-base text-white/80">{work.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {work.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:translate-x-1 transition-all duration-300" style={{ color: work.accentColor }}>
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
                <div className="space-y-4">
                  {/* View Tabs */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={(e) => handleViewChange('desktop', e)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
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
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
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
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
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
                  </div>
                  
                  {/* Image Display */}
                  <div className="relative mx-auto w-full flex justify-center items-center min-h-[300px]">
                    {selectedView === 'desktop' && (
                      <div key={`${work.slug}-desktop-wrapper`} className="relative w-full lg:max-w-[600px] animate-fadeIn">
                        <div className="relative z-10 rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: '3px solid black' }}>
                          <Image
                            src={work.image}
                            alt={work.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                            unoptimized
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedView === 'tablet' && work.tabletImage && (
                      <div key={`${work.slug}-tablet-wrapper`} className="relative w-[300px] animate-fadeIn">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-xl" style={{ border: '3px solid black' }}>
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
                      <div key={`${work.slug}-mobile-wrapper`} className="relative w-[130px] animate-fadeIn">
                        <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-white shadow-xl" style={{ border: '3px solid black' }}>
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

