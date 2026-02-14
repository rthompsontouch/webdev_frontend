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
    },
  ];

  return (
    <section id="work" className={`${bodyFont.className} relative bg-white px-6 py-20 lg:px-10 text-slate-900`}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
              Web Development Work
            </p>
            <h2 className={`${displayFont.className} text-3xl text-slate-900 sm:text-4xl`}>
              High-performance sites, web apps, and portals built to convert.
            </h2>
          </div>
          <div className="space-y-12">
            {works.map((work) => {
              const isFeatured = work.slug === "pppacerie";
              const desktopWidthClass = isFeatured ? "lg:max-w-[600px]" : "";
              const tabletWidthClass = isFeatured ? "sm:w-[300px] lg:w-[300px]" : "w-64 lg:w-72";
              const mobileWidthClass = isFeatured ? "sm:w-[130px] lg:w-[130px]" : "w-24 lg:w-28";

              return (
              <div key={work.slug} className="group">
                <Link href={`/work/${work.slug}`} className="block">
                  <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <div className="space-y-3">
                    <h3 className={`${displayFont.className} text-2xl text-slate-900 group-hover:text-rose-600 transition`}>
                      {work.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-500 font-semibold">
                      {work.subtitle}
                    </p>
                    <p className="text-base text-slate-600">{work.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {work.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-rose-500 group-hover:translate-x-1 transition pt-2">
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    </div>
                    <div className={`relative h-80 sm:h-96 ${desktopWidthClass} mx-auto w-full`}>
                      <div className="relative z-10 h-full rounded-2xl overflow-hidden border-2 border-slate-300 bg-white shadow-sm transition-all duration-300 hover:z-40 hover:scale-[1.04] hover:shadow-2xl">
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
                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-xl">
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
                          <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-xl">
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
                </Link>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

