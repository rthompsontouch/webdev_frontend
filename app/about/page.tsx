import type { Metadata } from "next";
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
  title: "About TheWebPrism | Premium Digital Design & Development",
  description:
    "Learn about TheWebPrism. We are a team of designers and engineers in Raleigh, NC building premium digital experiences for ambitious brands.",
  keywords: ["about us", "design agency", "web development", "Raleigh NC", "team"],
  openGraph: {
    title: "About TheWebPrism",
    description:
      "A digital design and development studio focused on premium brand experiences.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism digital design and development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TheWebPrism",
    description:
      "A digital design and development studio focused on premium brand experiences.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const values = [
  {
    title: "Craft Over Speed",
    description:
      "We believe every detail matters. We invest the time to get it right, not just fast.",
  },
  {
    title: "Strategy First",
    description:
      "Beautiful design without strategy is just decoration. We lead with clarity and intent.",
  },
  {
    title: "Collaborative",
    description:
      "Your team is our team. We keep stakeholders aligned and decisions transparent.",
  },
  {
    title: "Measurable Impact",
    description:
      "We focus on outcomes, not deliverables. Success is defined by your business results.",
  },
];

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    bio: "10+ years in digital design and brand strategy. Previously led design teams at Fortune 500 companies.",
  },
  {
    name: "Jordan Lee",
    role: "Engineering Lead",
    bio: "Full-stack engineer with expertise in modern web architecture. Shipped 50+ high-performance products.",
  },
  {
    name: "Casey Roberts",
    role: "Product Designer",
    bio: "Specialized in UX research and product strategy. Passionate about solving customer problems through design.",
  },
  {
    name: "Morgan Chase",
    role: "Senior Developer",
    bio: "React and Node.js specialist. Builds scalable systems with exceptional performance.",
  },
];

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TheWebPrism",
    url: "https://thewebprism.com",
    description: "Premium digital design and development studio",
    telephone: "+1-910-403-9019",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Raleigh",
      addressRegion: "NC",
      addressCountry: "US",
    },
  };

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden text-zinc-100`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.75),rgba(2,6,23,0.95))]" />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 pt-24 pb-20 sm:pt-28 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                About us
              </p>
              <h1
                className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
              >
                We build premium digital experiences for ambitious brands.
              </h1>
              <p className="max-w-2xl text-lg text-zinc-200">
                TheWebPrism is a design and engineering studio in Raleigh, NC. We partner with growth-stage companies to deliver strategy, design, and development that drives results.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                  Our story
                </p>
                <h2
                  className={`${displayFont.className} text-3xl text-white sm:text-4xl`}
                >
                  Built on a simple principle: strategy and craft create lasting impact.
                </h2>
                <p className="text-base text-white/70">
                  TheWebPrism was founded on the belief that great digital products require three things: clear strategy, exceptional design, and solid engineering.
                </p>
                <p className="text-base text-white/70">
                  Too many agencies prioritize speed over quality. We do the opposite. We invest in understanding your market, your customers, and your goals, then we deliver work that moves the needle.
                </p>
                <p className="text-base text-white/70">
                  Since 2020, we have helped founders, CMOs, and product leaders launch brands and products that feel premium and perform with confidence.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xl font-semibold text-white">200+</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Projects delivered
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xl font-semibold text-white">92%</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Client retention
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xl font-semibold text-white">5+</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Year in business
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-3xl font-semibold text-white">50+</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                      Team collaborations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                  Our values
                </p>
                <h2
                  className={`${displayFont.className} text-3xl text-white sm:text-4xl`}
                >
                  How we work.
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-base text-white/70">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                  Team
                </p>
                <h2
                  className={`${displayFont.className} text-3xl text-white sm:text-4xl`}
                >
                  The people behind the work.
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 mb-6" />
                    <h3 className="text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-rose-200 font-medium mt-1">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm text-white/70">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                    Get in touch
                  </p>
                  <h2
                    className={`${displayFont.className} text-3xl text-white sm:text-4xl`}
                  >
                    Let's talk about your next project.
                  </h2>
                  <p className="text-base text-white/70">
                    Whether you are just exploring or ready to commit, we would love to hear from you.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href="mailto:hello@thewebprism.com"
                      className="text-rose-200 hover:text-rose-100 font-semibold transition-colors"
                    >
                      hello@thewebprism.com
                    </a>
                    <span className="text-white/40">•</span>
                    <a
                      href="tel:+19104039019"
                      className="text-rose-200 hover:text-rose-100 font-semibold transition-colors"
                    >
                      +1 (910) 403-9019
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                        Location
                      </p>
                      <p className="mt-2 text-lg text-white">
                        Raleigh, NC
                      </p>
                      <p className="text-sm text-white/70">
                        Based in Raleigh, serving the continental US.
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                        Availability
                      </p>
                      <p className="mt-2 text-lg text-white">
                        Limited Capacity
                      </p>
                      <p className="text-sm text-white/70">
                        We maintain a small team for close collaboration. Talk to us about timeline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
