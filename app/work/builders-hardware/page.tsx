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
  title: "Builders Hardware Case Study | Enterprise Web Platform and Integration Suite",
  description:
    "We delivered multiple website redesigns, custom bridge applications to connect internal systems, and a PCI compliance program to secure sensitive credit card data.",
  keywords: [
    "case study",
    "enterprise website",
    "system integration",
    "PCI compliance",
    "database security",
    "bridge applications",
    "full-stack development",
  ],
  openGraph: {
    title: "Builders Hardware Case Study | Enterprise Web Platform and Integration Suite",
    description:
      "Multiple website redesigns with custom bridge applications and PCI compliance solutions for enterprise security.",
    type: "article",
    images: [
      {
        url: "https://www.thewebprism.com/images/our-work/builders_hardware/builders_desktop.png",
        width: 1400,
        height: 900,
        alt: "Builders Hardware case study desktop preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Builders Hardware Case Study | Enterprise Web Platform and Integration Suite",
    description:
      "Multiple website redesigns with custom bridge applications and PCI compliance solutions for enterprise security.",
    images: ["https://www.thewebprism.com/images/our-work/builders_hardware/builders_desktop.png"],
  },
};

export default function BuildersHardwareCaseStudy() {
  return (
    <main className={`${bodyFont.className} bg-white text-slate-900`}>
      <section className="bg-slate-950 px-6 pb-16 pt-20 text-white lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">Case Study</p>
            <h1 className={`${displayFont.className} text-3xl text-white sm:text-4xl lg:text-5xl`}>
              Builders Hardware
            </h1>
            <p className={`${displayFont.className} text-sm uppercase tracking-[0.25em] text-rose-200`}>
              Enterprise web platform and integration suite
            </p>
            <p className="text-lg text-slate-200 max-w-3xl">
              We transformed Builders Hardware&apos;s digital presence through multiple website redesigns while building
              critical bridge applications to connect internal systems and implementing a comprehensive PCI compliance
              program to secure sensitive credit card data.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Overview</h2>
                <p className="mt-3 text-slate-600">
                  This multi-phase engagement combined strategic redesigns of customer-facing websites with mission-critical
                  backend integrations. We built custom bridge applications that enabled seamless data flow between
                  disparate internal systems, while also developing security tools to ensure PCI compliance across the
                  organization&apos;s customer database.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Challenge</h2>
                <p className="mt-3 text-slate-600">
                  Builders Hardware operated with siloed systems that couldn&apos;t communicate effectively, leading to manual
                  data entry and operational inefficiencies. Legacy websites needed modernization, and the company faced
                  urgent PCI compliance requirements to protect customer payment information stored in their databases.
                </p>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                <h2 className={`${displayFont.className} text-2xl text-slate-900`}>Solution</h2>
                <p className="mt-3 text-slate-600">
                  We redesigned multiple web properties with modern interfaces and improved user experiences. Custom bridge
                  applications were engineered to synchronize data between internal software platforms automatically. A
                  specialized PCI compliance program was developed to identify and securely remove sensitive credit card
                  information from the database, ensuring regulatory compliance and data security.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative h-80 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
                <Image
                  src="/images/our-work/builders_hardware/builders_desktop.png"
                  alt="Builders Hardware desktop"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden sm:block w-64">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/builders_hardware/builders_tablet.png"
                    alt="Builders Hardware tablet"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-8 hidden sm:block w-28">
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-2xl">
                  <Image
                    src="/images/our-work/builders_hardware/builders_mobile.png"
                    alt="Builders Hardware mobile"
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
                  <span>Multiple modern websites launched with improved user experiences and conversion rates.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Bridge applications eliminated manual data entry and enabled real-time system synchronization.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>PCI compliance program successfully secured customer data and met regulatory requirements.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                  <span>Operational efficiency improved through automated workflows and integrated systems.</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Services</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Web design & development",
                  "System integration",
                  "Bridge applications",
                  "Database security",
                  "PCI compliance",
                  "Full-stack engineering",
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
                {[
                  "Full-Stack Development",
                  "System Integration",
                  "Database Security",
                  "API Development",
                  "PCI Standards",
                ].map((item) => (
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
              <p className="mt-3 text-slate-600">Multi-phase engagement spanning multiple projects and system integrations</p>
            </div>
            <div className="rounded-3xl border-2 border-slate-200 bg-rose-500 p-6 text-white shadow-lg">
              <h2 className={`${displayFont.className} text-2xl`}>Need enterprise integration or security solutions?</h2>
              <p className="mt-3 text-rose-100">
                Let us build the custom solutions your business needs to operate securely and efficiently.
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
