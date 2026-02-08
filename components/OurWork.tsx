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
  image: string;
  slug: string;
}

export default function OurWork() {
  const works: Work[] = [
    {
      title: "Project Aurora",
      subtitle: "E-commerce platform redesign",
      description:
        "A performant storefront with modern UX patterns, optimized for conversion across devices.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
      slug: "project-aurora",
    },
    {
      title: "Atlas Dashboard",
      subtitle: "Analytics and reporting suite",
      description:
        "A scalable dashboard combining realtime metrics and beautiful visualizations for decision makers.",
      image: "https://images.unsplash.com/photo-1558494944-3fb6f7b5a0b2?w=1200&h=800&fit=crop",
      slug: "atlas-dashboard",
    },
    {
      title: "Nimbus App",
      subtitle: "Cross-platform mobile experience",
      description:
        "A polished mobile-first experience built with performance and accessibility in mind.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
      slug: "nimbus-app",
    },
  ];

  return (
    <section id="work" className={`${bodyFont.className} relative px-6 py-20 lg:px-10 text-zinc-100`}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Selected Work
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Projects that moved the needle for our partners.
            </h2>
          </div>
          <div className="space-y-12">
            {works.map((work, index) => (
              <div key={work.slug} className="group">
                <Link href={`/work/${work.slug}`} className="block space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-96 sm:h-80">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`${displayFont.className} text-2xl text-white group-hover:text-rose-200 transition`}>
                      {work.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-200 font-semibold">
                      {work.subtitle}
                    </p>
                    <p className="text-base text-white/70">{work.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-rose-200 group-hover:translate-x-1 transition pt-2">
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

