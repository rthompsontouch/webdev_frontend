import type { Metadata } from "next";
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
  title: "Web Design Services | Raleigh, Cary, Durham | TheWebPrism",
  description:
    "Professional web design for Raleigh, Cary, Durham & the Triangle. Strategy, UX, UI, and conversion-focused sites for North Carolina businesses.",
  keywords: [
    "web design services",
    "web design Raleigh NC",
    "web design Cary NC",
    "web design Durham NC",
    "professional web design",
    "ux ui design",
    "brand websites",
    "conversion focused design",
    "responsive web design",
    "design agency Triangle",
  ],
  openGraph: {
    title: "Web Design Services | Premium UX and Brand-First Websites",
    description:
      "We design premium, conversion-focused websites with world-class UX and unmistakable brand presence.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism web design services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Services | Premium UX and Brand-First Websites",
    description:
      "Premium web design and UX for brands that want a site that sells and scales.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
  alternates: { canonical: "https://www.thewebprism.com/services/web-design" },
};

const outcomes = [
  {
    title: "A brand system that feels unmistakable",
    description:
      "We translate your positioning into a visual language, typography, and layout system that looks premium on every screen.",
  },
  {
    title: "UX that guides decisions",
    description:
      "Page flow, content hierarchy, and persuasive microcopy designed to move visitors from curiosity to action.",
  },
  {
    title: "A site built for speed and trust",
    description:
      "Modern, responsive design with crisp performance and accessibility that helps you win the first impression.",
  },
];

const services = [
  {
    title: "UX Strategy and Information Architecture",
    description:
      "Customer journey mapping, IA, and content modeling so every page is purposeful.",
  },
  {
    title: "UI Design and Design Systems",
    description:
      "Component libraries, reusable patterns, and a consistent visual system that scales.",
  },
  {
    title: "High-Conversion Landing Pages",
    description:
      "Campaign-ready pages built to capture leads, schedule demos, and close deals.",
  },
  {
    title: "Brand-Forward Marketing Sites",
    description:
      "Hero storytelling, case studies, and credibility layers that showcase your value.",
  },
  {
    title: "Product-Led Website Design",
    description:
      "For SaaS and platforms that need clarity, onboarding, and feature-led flows.",
  },
  {
    title: "Design Handoff and QA",
    description:
      "Pixel-perfect collaboration with your dev team or ours, plus launch QA and polish.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery and Strategy",
    description:
      "We align on goals, audience, and positioning. You get a clear roadmap and content plan.",
  },
  {
    step: "02",
    title: "Wireframes and UX Flow",
    description:
      "We map user journeys and layout systems before visual design begins.",
  },
  {
    step: "03",
    title: "Visual Design and Prototyping",
    description:
      "High-fidelity screens with interaction detail and a cohesive brand system.",
  },
  {
    step: "04",
    title: "Handoff and Launch Support",
    description:
      "Developer-ready specs, assets, and QA so the build looks exactly right.",
  },
];

const proofPoints = [
  { label: "Avg. conversion lift", value: "28%" },
  { label: "Median time to launch", value: "6-8 wks" },
  { label: "Client retention", value: "92%" },
  { label: "Design systems delivered", value: "40+" },
];

const testimonials = [
  {
    quote:
      "They turned a cluttered site into a premium experience that finally matches our brand. Demo bookings jumped in the first month.",
    name: "Dana Morales",
    title: "VP Marketing, Verity Labs",
  },
  {
    quote:
      "The UX work was on another level. Every page now feels intentional and the narrative finally makes sense.",
    name: "Jordan Kim",
    title: "Founder, Northline Analytics",
  },
];

const faqs = [
  {
    question: "How long does a web design project take?",
    answer:
      "Most projects run 6-8 weeks depending on scope. We set a timeline in discovery and keep the cadence tight with weekly reviews.",
  },
  {
    question: "Do you help with copy and messaging?",
    answer:
      "Yes. We provide copy direction, page messaging, and microcopy guidance so the site sounds as premium as it looks.",
  },
  {
    question: "Can you work with our dev team?",
    answer:
      "Absolutely. We deliver developer-ready files, tokens, and QA support to ensure the build is pixel-perfect.",
  },
  {
    question: "Do you redesign existing sites?",
    answer:
      "Yes. We can refresh a current site or re-architect it entirely if the UX needs a full overhaul.",
  },
];

export default function WebDesignPage() {
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
    name: "Web Design Services",
    description:
      "Professional web design services including UX strategy, UI design, and conversion-optimized marketing sites.",
    serviceType: "Web Design",
  };

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden text-zinc-100`}
    >
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
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.75),rgba(2,6,23,0.95))]" />
      </div>

      <section className="relative px-6 pb-20 pt-24 sm:pt-28 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Web Design Services
              </p>
              <h1
                className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
              >
                Build a website that looks elite and sells with confidence.
              </h1>
              <p className="max-w-xl text-lg text-zinc-200">
                We design premium websites for modern brands who want clarity, credibility, and conversions. From UX strategy to polished UI systems, every screen is crafted to make your audience feel trust on contact.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/#contact"
                  className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
                >
                  Start a project
                </a>
                <a
                  href="/#process"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  View our process
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div
                    key={point.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                  >
                    <p className="text-2xl font-semibold text-white">
                      {point.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">
                  Engagement snapshot
                </p>
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Typical scope
                    </p>
                    <p className="text-lg text-white">
                      UX strategy, UI design, design system, and launch QA
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Best for
                    </p>
                    <p className="text-lg text-white">
                      B2B SaaS, premium services, fintech, and high-consideration brands
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-white/80">
                      We limit availability to 2 new web design projects per month.
                    </p>
                    <p className="mt-3 text-base font-semibold text-rose-200">
                      Next availability: March 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
            <span>Trusted by scale-ups and new market leaders</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span>Strategy - UX - UI - Motion - Content</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Outcomes
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              The web design upgrade your pipeline feels immediately.
            </h2>
            <p className="text-base text-white/70">
              Every deliverable is structured to increase trust, improve clarity, and move prospects toward a confident yes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10" id="services">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Services
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                Everything you need for a category-leading web presence.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              We handle the strategy, UX, UI, and launch polish so your team can focus on marketing and sales with total confidence.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
              >
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10" id="process">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
              Process
            </p>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              A design process built for alignment and momentum.
            </h2>
            <p className="text-base text-white/70">
              Collaborative checkpoints keep momentum high and feedback focused. You always know what is next and why.
            </p>
          </div>
          <div className="grid gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-rose-200">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10" id="work">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Results
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                Proof that premium design changes the pipeline.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              A strategic redesign improves clarity, trust, and speed. That translates into higher-quality leads, stronger close rates, and shorter sales cycles.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <p className="text-lg text-white">"{item.quote}"</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10" id="faq">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                FAQ
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                Answers to the questions we hear most.
              </h2>
              <p className="text-base text-white/70">
                If you have a question not covered here, the consultation below will get you a clear answer within 24 hours.
              </p>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-base font-semibold text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 lg:px-10" id="contact">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                  Start a project
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Tell us about your website and we will map the next best step.
                </h2>
                <p className="text-base text-white/70">
                  Expect a response within one business day. We will review your goals, share timeline options, and outline the exact scope needed to make the redesign successful.
                </p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                  Average project investment: $18k to $65k depending on scope, page count, and content requirements.
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Contact form
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                  Book your web design consult
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Share the essentials and we will follow up with next steps and a project plan.
                </p>
                <div className="mt-6">
                  <ContactForm variant="light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
