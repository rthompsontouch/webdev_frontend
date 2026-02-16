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

  return (
    <section id="work" className={`${bodyFont.className} relative pt-20 text-slate-900`} style={{ backgroundColor: 'rgb(113, 73, 198)' }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="space-y-4 mb-16">
          <div className="inline-block">
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'rgb(255, 200, 180)' }}>
              Web Development Work
            </p>
            <div className="mt-2 h-0.5 w-16 rounded-full" style={{ backgroundColor: 'rgb(255, 200, 180)' }} />
          </div>
          <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
            High-performance sites, web apps, and portals built to convert.
          </h2>
        </div>
      </div>
      
      <div className="space-y-0">
        {works.map((work) => {
          const isFeatured = work.slug === "pppacerie";
          const desktopWidthClass = isFeatured ? "lg:max-w-[600px]" : "";
          const tabletWidthClass = isFeatured ? "sm:w-[300px] lg:w-[300px]" : "w-64 lg:w-72";
          const mobileWidthClass = isFeatured ? "sm:w-[130px] lg:w-[130px]" : "w-24 lg:w-28";
          
          return (
            <div 
              key={work.slug} 
              className="group relative overflow-hidden"
              style={{ backgroundColor: work.bgColor }}
            >
              {/* Decorative accent circles */}
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: work.accentColor }} />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: work.accentColor }} />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: work.accentColor }} />
              
              <Link href={`/work/${work.slug}`} className="block">
                <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
                  <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center py-12">
                    <div className="space-y-3">
                      <h3 className={`${displayFont.className} text-3xl lg:text-4xl text-white group-hover:opacity-90 transition`} style={{ color: work.accentColor }}>
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
                      <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:translate-x-1 transition pt-2" style={{ color: work.accentColor }}>
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
                    <div className={`relative h-80 sm:h-96 ${desktopWidthClass} mx-auto w-full`}>
                      <div className="relative z-10 h-full rounded-2xl overflow-hidden border-2 border-white/20 bg-white shadow-sm transition-all duration-300 hover:z-40 hover:scale-[1.04] hover:shadow-2xl">
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      {work.tabletImage && (
                        <div className={`absolute -bottom-2 -right-6 hidden sm:block ${tabletWidthClass} z-20 transition-all duration-300 hover:z-40 hover:scale-[1.05] hover:shadow-2xl`}>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-white/20 bg-white shadow-xl">
                            <Image
                              src={work.tabletImage}
                              alt={`${work.title} tablet view`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}
                      {work.secondaryImage && (
                        <div className={`absolute -bottom-8 -right-6 hidden sm:block ${mobileWidthClass} z-30 transition-all duration-300 hover:z-40 hover:scale-[1.08] hover:shadow-2xl`}>
                          <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-white/20 bg-white shadow-xl">
                            <Image
                              src={work.secondaryImage}
                              alt={`${work.title} mobile view`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

