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
  title: "McBrier Properties Case Study | Real Estate Website",
  description:
    "We built a polished, lead-focused property experience with custom WordPress templates, listing filters, and conversion-ready pages.",
  keywords: [
    "case study",
    "real estate website",
    "WordPress development",
    "lead generation",
    "property listings",
    "web design",
  ],
  openGraph: {
    title: "McBrier Properties Case Study | Real Estate Website",
    description:
      "A lead-focused real estate website with curated listings, fast publishing, and conversion-ready templates.",
    type: "article",
    images: [
      {
        url: "https://www.thewebprism.com/images/our-work/mcbrier_properties/mcbrier_properties_desktop.png",
        width: 1400,
        height: 900,
        alt: "McBrier Properties case study desktop preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "McBrier Properties Case Study | Real Estate Website",
    description:
      "A lead-focused real estate website with curated listings and conversion-ready templates.",
    images: ["https://www.thewebprism.com/images/our-work/mcbrier_properties/mcbrier_properties_desktop.png"],
  },
};

export default function McBrierPropertiesCaseStudy() {
  return (
    <main className={`${bodyFont.className} bg-white text-slate-900`}>
      <section className="bg-slate-950 px-6 pb-16 pt-20 text-white lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">Case Study</p>
            <h1 className={`${displayFont.className} text-3xl text-white sm:text-4xl lg:text-5xl`}>McBrier Properties</h1>
            <p className={`${displayFont.className} text-sm uppercase tracking-[0.25em] text-rose-200`}>
              WordPress real estate site
            </p>
            <p className="text-lg text-slate-200 max-w-3xl">
              We built a polished, lead-focused property experience that makes every listing feel curated while giving
              the brokerage an easy, reliable way to publish new inventory.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Overview</h2>
                <p className="mt-3 text-slate-600">
                  McBrier's new WordPress platform pairs elevated branding with practical real estate workflows. Custom
                  listing templates, property filters, and agent-focused landing pages keep visitors engaged and ready to
                  inquire.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Challenge</h2>
                <p className="mt-3 text-slate-600">
                  The previous site was slow to update and didn't showcase listings with the polish the brand deserved.
                  They needed a faster publishing workflow and clearer conversion paths for buyers and sellers.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Solution</h2>
                <p className="mt-3 text-slate-600">
                  We developed custom WordPress templates with structured ACF fields, advanced search and filtering, and
                  lead-capture forms tuned for high-intent inquiries. SEO foundations ensure listings rank and stay
                  discoverable.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative h-80 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
                <Image
                  src="/images/our-work/mcbrier_properties/mcbrier_properties_desktop.png"
                  alt="McBrier Properties desktop"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden sm:block w-64">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/mcbrier_properties/mcbrier_properties_tablet.png"
                    alt="McBrier Properties tablet"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-8 hidden sm:block w-28">
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/mcbrier_properties/mcbrier_properties_mobile.png"
                    alt="McBrier Properties mobile"
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
                  <span>Listings are published and updated in minutes, not days.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Advanced search keeps buyers exploring more listings per visit.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Lead capture workflows deliver higher-quality inquiries to agents.</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Brand alignment", "WordPress development", "Custom templates", "Search and filtering", "Lead capture"].map(
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
                {["WordPress", "PHP", "MySQL", "ACF", "SEO"].map((item) => (
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
              <p className="mt-3 text-slate-600">10 weeks from discovery to launch</p>
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
