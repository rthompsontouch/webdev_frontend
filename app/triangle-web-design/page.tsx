import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import ContactForm from "@/components/ContactForm";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Triangle Web Design | Raleigh, Durham, Cary, Apex, Holly Springs, Fuquay",
  description:
    "Premium web design, web development, and SEO optimization for Triangle businesses. Serving Raleigh, Durham, Cary, Apex, Holly Springs, and Fuquay-Varina with conversion-focused sites.",
  keywords: [
    "triangle web design",
    "raleigh web design",
    "durham web design",
    "cary web design",
    "apex web design",
    "holly springs web design",
    "fuquay varina web design",
    "web development",
    "seo optimization",
  ],
  openGraph: {
    title: "Triangle Web Design | Premium Design + Development",
    description:
      "Conversion-focused web design, development, and SEO for Triangle-area brands in Raleigh, Durham, Cary, Apex, Holly Springs, and Fuquay-Varina.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism Triangle web design services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triangle Web Design | Premium Design + Development",
    description:
      "Conversion-focused web design, development, and SEO for Triangle-area brands.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const localAreas = [
  {
    name: "Raleigh",
    description:
      "Brand-forward sites for startups, agencies, and local service businesses that need trust, speed, and clarity.",
  },
  {
    name: "Durham",
    description:
      "Modern web experiences for tech, healthcare, and creative teams looking to stand out in a competitive market.",
  },
  {
    name: "Cary",
    description:
      "Premium marketing sites and landing pages built to capture leads and establish authority.",
  },
  {
    name: "Apex",
    description:
      "Responsive websites that make it easy for customers to choose you, book you, and trust you.",
  },
  {
    name: "Holly Springs",
    description:
      "High-converting sites for local businesses ready to upgrade from DIY templates.",
  },
  {
    name: "Fuquay-Varina",
    description:
      "Clean, fast, and SEO-ready sites that help you rank locally and win new clients.",
  },
];

const services = [
  {
    title: "Web Design",
    description:
      "Conversion-first UX, premium UI, and brand storytelling that positions you as the obvious choice.",
  },
  {
    title: "Web Development",
    description:
      "Fast, secure, and scalable builds with clean architecture and best-in-class performance.",
  },
  {
    title: "SEO Optimization",
    description:
      "Technical SEO, on-page strategy, and local search foundations that help you get found.",
  },
];

const faqs = [
  {
    question: "Do you work with businesses across the Triangle?",
    answer:
      "Yes. We serve Raleigh, Durham, Cary, Apex, Holly Springs, Fuquay-Varina, and the surrounding Triangle region.",
  },
  {
    question: "Can you help with local SEO?",
    answer:
      "Absolutely. We build technical SEO foundations, local landing content, and on-page optimization to improve visibility.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Most projects launch in 4-8 weeks depending on scope. We set a clear timeline after discovery.",
  },
  {
    question: "Do you offer design + development together?",
    answer:
      "Yes. We offer full-service design, development, and SEO so everything ships as one cohesive experience.",
  },
];

export default function TriangleWebDesignPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Triangle Web Design",
    serviceType: "Web Design",
    areaServed: [
      "Raleigh, NC",
      "Durham, NC",
      "Cary, NC",
      "Apex, NC",
      "Holly Springs, NC",
      "Fuquay-Varina, NC",
    ],
    description:
      "Premium web design, web development, and SEO optimization for Triangle-area businesses.",
  };

  return (
    <main className={`${bodyFont.className} relative min-h-screen overflow-hidden text-zinc-100`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.7),rgba(2,6,23,0.95))]" />
      </div>

      <section className="relative px-6 pb-16 pt-24 sm:pt-28 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Triangle Web Design
              </p>
              <h1 className={`${displayFont.className} text-4xl text-white sm:text-5xl`}>
                Premium web design, development, and SEO for the Triangle.
              </h1>
              <p className="text-base text-white/70">
                We help Triangle-area businesses launch websites that load fast, rank locally, and turn visitors into
                clients. From Raleigh to Durham and Cary to Apex, we deliver premium digital experiences that build
                trust and drive revenue.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                >
                  Book a free strategy call
                </a>
                <Link
                  href="/#work"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40"
                >
                  See recent work
                </Link>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-200 font-semibold">
                What you get
              </p>
              <div className="space-y-4 text-sm text-white/70">
                <p>
                  Strategic UX, premium UI, and performance-focused development so your site feels fast, modern, and
                  credible.
                </p>
                <p>
                  Local SEO foundations including technical optimization, on-page structure, and location-centric
                  messaging.
                </p>
                <p>
                  A launch-ready site with conversion paths, contact flow, and a polished brand experience.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className={`${displayFont.className} text-xl text-white`}>{service.title}</h2>
                <p className="mt-3 text-sm text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Service Areas
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Serving the Triangle with local expertise.
            </h2>
            <p className="text-base text-white/70">
              We build websites for teams across the Triangle region. Each city has its own market and customer
              expectations, and we tailor messaging and SEO to match.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localAreas.map((area) => (
              <div
                key={area.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className={`${displayFont.className} text-xl text-white`}>{area.name}</h3>
                <p className="mt-3 text-sm text-white/70">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Local SEO Focus
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                Built to rank in local search.
              </h2>
              <p className="text-base text-white/70">
                We structure pages to highlight your location and expertise, optimize performance, and align your
                content with what Triangle customers actually search for.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Localized copy and service area signals</li>
                <li>Fast load times and Core Web Vitals focus</li>
                <li>Schema markup for services and FAQs</li>
                <li>Clear calls-to-action that convert</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className={`${displayFont.className} text-2xl text-white`}>Ready to win local traffic?</h3>
              <p className="mt-3 text-sm text-white/70">
                Share your goals and we will send a tailored plan for design, development, and SEO optimization.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
              >
                Get a local SEO plan
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-10 lg:px-10" id="contact">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Start a project
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Let us build your Triangle website.
            </h2>
            <p className="text-base text-white/70">
              Tell us about your business and goals. We will respond with next steps and a clear plan.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              <p>Services: Web design, development, and SEO optimization.</p>
              <p>Location: Triangle region, North Carolina.</p>
              <p>Timelines: Most projects launch in 4-8 weeks.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
