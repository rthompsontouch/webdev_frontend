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
  title: "PPPacerie Case Study | Luxury Cruise Booking Platform",
  description:
    "We crafted a premium booking experience with a custom engine, intelligent availability rules, and an operational admin suite.",
  keywords: [
    "case study",
    "booking platform",
    "luxury travel",
    "web app",
    "UX design",
    "custom platform",
  ],
  openGraph: {
    title: "PPPacerie Case Study | Luxury Cruise Booking Platform",
    description:
      "A premium cruise booking platform with intelligent availability, pricing, and admin operations.",
    type: "article",
    images: [
      {
        url: "/images/our-work/pppacerie/desktop.png",
        width: 1400,
        height: 900,
        alt: "PPPacerie case study desktop preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPPacerie Case Study | Luxury Cruise Booking Platform",
    description:
      "A premium cruise booking platform with intelligent availability, pricing, and admin operations.",
    images: ["/images/our-work/pppacerie/desktop.png"],
  },
};

export default function PppacerieCaseStudy() {
  return (
    <main className={`${bodyFont.className} bg-white text-slate-900`}>
      <section className="bg-slate-950 px-6 pb-16 pt-20 text-white lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">Case Study</p>
            <h1 className={`${displayFont.className} text-3xl text-white sm:text-4xl lg:text-5xl`}>
              Personal Private Pleasure Adventure Cruises
            </h1>
            <p className={`${displayFont.className} text-sm uppercase tracking-[0.25em] text-rose-200`}>
              Custom cruise booking platform
            </p>
            <p className="text-lg text-slate-200 max-w-3xl">
              We crafted a premium booking experience that feels as polished as the cruises themselves, while giving the
              team an operational dashboard that keeps every trip running smoothly.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Overview</h2>
                <p className="mt-3 text-slate-600">
                  This project blends luxury travel storytelling with a frictionless booking flow. Guests can explore
                  routes, select private packages, and confirm availability in minutes. Behind the scenes, the team uses
                  a streamlined admin suite to manage approvals, deposits, and capacity.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Challenge</h2>
                <p className="mt-3 text-slate-600">
                  Manual booking requests and email coordination were slowing response times. The company needed a system
                  that could capture intent instantly, validate trip logistics, and deliver a premium user experience.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Solution</h2>
                <p className="mt-3 text-slate-600">
                  We designed a custom booking engine with intelligent rules for route availability, capacity, and
                  pricing. A tailored admin portal tracks approvals, payment milestones, and guest preferences, while a
                  branded front end sets the tone for a high-end cruise experience.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative h-80 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
                <Image
                  src="/images/our-work/pppacerie/desktop.png"
                  alt="Personal Private Pleasure Adventure Cruises desktop"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden sm:block w-64">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/pppacerie/tablet.png"
                    alt="Personal Private Pleasure Adventure Cruises tablet"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-8 hidden sm:block w-28">
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/pppacerie/mobile.png"
                    alt="Personal Private Pleasure Adventure Cruises mobile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
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
                  <span>Booking requests now move from inquiry to confirmation in a single flow.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Admin approvals and deposit tracking are centralized in one dashboard.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Analytics reveal peak-season demand and repeat-guest trends.</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Product strategy", "UX/UI design", "Web app development", "Custom booking engine", "Analytics"].map(
                  (service) => (
                    <span
                      key={service}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {service}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
              <h2 className={`${displayFont.className} text-2xl`}>Technology</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "Stripe", "Admin Portal"].map((item) => (
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
              <p className="mt-3 text-slate-600">14 weeks from discovery to launch</p>
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
