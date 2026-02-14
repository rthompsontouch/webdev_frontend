import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "GE Case Study | Enterprise Brand and Digital Platform",
  description:
    "We reimagined GE's digital presence with a scalable design system, editorial storytelling, and an enterprise-grade publishing workflow.",
  keywords: [
    "case study",
    "enterprise website",
    "design system",
    "digital platform",
    "Next.js",
    "editorial storytelling",
  ],
  openGraph: {
    title: "GE Case Study | Enterprise Brand and Digital Platform",
    description:
      "A scalable digital platform with a global design system and enterprise publishing workflow.",
    type: "article",
    images: [
      {
        url: "/images/our-work/ge/ge_desktop.png",
        width: 1400,
        height: 900,
        alt: "GE case study desktop preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GE Case Study | Enterprise Brand and Digital Platform",
    description:
      "A scalable digital platform with a global design system and enterprise publishing workflow.",
    images: ["/images/our-work/ge/ge_desktop.png"],
  },
};

export default function GeCaseStudy() {
  return (
    <main className={`${bodyFont.className} bg-white text-slate-900`}>
      <section className="bg-slate-950 px-6 pb-16 pt-20 text-white lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">Case Study</p>
            <h1 className={`${displayFont.className} text-3xl text-white sm:text-4xl lg:text-5xl`}>GE</h1>
            <p className={`${displayFont.className} text-sm uppercase tracking-[0.25em] text-rose-200`}>
              Enterprise brand and digital platform
            </p>
            <p className="text-lg text-slate-200 max-w-3xl">
              We reimagined GE's digital presence with a scalable design system, editorial storytelling, and an
              enterprise-grade publishing workflow that keeps teams aligned globally.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Overview</h2>
                <p className="mt-3 text-slate-600">
                  The new platform unifies brand storytelling, innovation news, and investor messaging under one
                  cohesive experience. A component-driven system empowers teams to publish fast without sacrificing
                  consistency, performance, or accessibility.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Challenge</h2>
                <p className="mt-3 text-slate-600">
                  GE needed a future-ready web experience that could support multiple business units while maintaining a
                  unified brand voice. The legacy platform was slow, fragmented, and difficult to scale globally.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Solution</h2>
                <p className="mt-3 text-slate-600">
                  We delivered a modular Next.js architecture backed by a headless CMS and a robust design system. Global
                  templates, performance budgets, and accessibility guardrails ensure every page ships on-brand and on
                  time.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative h-80 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
                <Image src="/images/our-work/ge/ge_desktop.png" alt="GE desktop" fill className="object-cover" unoptimized />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden sm:block w-64">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image src="/images/our-work/ge/ge_tablet.png" alt="GE tablet" fill className="object-cover" unoptimized />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-8 hidden sm:block w-28">
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image src="/images/our-work/ge/ge_mobile.png" alt="GE mobile" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Outcomes</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Content teams publish global updates in hours instead of weeks.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Component reuse delivers consistent storytelling across divisions.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Performance and accessibility scores improved across priority pages.</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Digital strategy",
                  "Design systems",
                  "Web engineering",
                  "Headless CMS integration",
                  "Performance optimization",
                ].map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
              <h2 className={`${displayFont.className} text-2xl`}>Technology</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind", "Headless CMS", "Vercel"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
              <h2 className={`${displayFont.className} text-2xl`}>Timeline</h2>
              <p className="mt-3 text-slate-600">16 weeks from discovery to launch</p>
            </div>
            <div className="rounded-3xl border-2 border-slate-200 bg-rose-500 p-6 text-white shadow-lg">
              <h2 className={`${displayFont.className} text-2xl`}>Ready to build your next platform?</h2>
              <p className="mt-3 text-rose-100">
                Let us craft a digital experience that elevates your brand and drives measurable growth.
              </p>
              <Link
                href="/#contact"
                className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
