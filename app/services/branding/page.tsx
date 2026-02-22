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
  title: "Branding Services | Visual Identity and Brand Systems",
  description:
    "Premium branding services that define positioning, visual identity, and brand systems. Build a brand that feels unmistakable and trusted.",
  keywords: [
    "branding services",
    "brand identity",
    "visual identity",
    "brand strategy",
    "logo design",
    "brand system",
    "rebrand",
  ],
  openGraph: {
    title: "Branding Services | Visual Identity and Brand Systems",
    description:
      "We craft brand strategy and visual identity systems that signal trust and differentiation.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism branding services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding Services | Visual Identity and Brand Systems",
    description:
      "Premium branding and visual identity for growth-minded teams.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const outcomes = [
  {
    title: "A brand that feels unmistakable",
    description:
      "Positioning and visual direction that sets you apart in crowded markets.",
  },
  {
    title: "Consistency across every touchpoint",
    description:
      "Guidelines, typography, and systems so every team ships on-brand.",
  },
  {
    title: "Confidence in your market presence",
    description:
      "A premium identity that builds trust with customers and investors.",
  },
];

const services = [
  {
    title: "Brand Strategy and Positioning",
    description:
      "Messaging hierarchy, audience insights, and competitive differentiation.",
  },
  {
    title: "Visual Identity Systems",
    description:
      "Logo suites, typography, color systems, and brand assets.",
  },
  {
    title: "Rebranding and Refreshes",
    description:
      "Evolve your brand without losing equity or customer trust.",
  },
  {
    title: "Brand Guidelines",
    description:
      "Comprehensive documentation for internal teams and partners.",
  },
  {
    title: "Marketing Collateral Design",
    description:
      "Sales decks, pitch templates, and campaign creative aligned to the brand.",
  },
  {
    title: "Brand Launch Support",
    description:
      "Rollout planning and creative support to ensure a confident release.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery and Research",
    description:
      "We uncover market context, customer insights, and brand opportunity.",
  },
  {
    step: "02",
    title: "Strategy and Positioning",
    description:
      "We define messaging, values, and the brand narrative.",
  },
  {
    step: "03",
    title: "Visual Identity Design",
    description:
      "We craft the visual system and validate it across key touchpoints.",
  },
  {
    step: "04",
    title: "Guidelines and Launch",
    description:
      "We deliver documentation and support the rollout.",
  },
];

const proofPoints = [
  { label: "Brand systems delivered", value: "85+" },
  { label: "Rebrands launched", value: "60+" },
  { label: "Avg. perception lift", value: "31%" },
  { label: "Client retention", value: "92%" },
];

const testimonials = [
  {
    quote:
      "They gave us a brand that finally matches the quality of our product. The response from customers has been immediate.",
    name: "Mia Everett",
    title: "CMO, NovaHealth",
  },
  {
    quote:
      "The strategy work was deep and the visual system is stunning. We now feel like a category leader.",
    name: "Isaac Romero",
    title: "Founder, Peakline Capital",
  },
];

const faqs = [
  {
    question: "How long does a branding project take?",
    answer:
      "Most branding projects run 6-10 weeks depending on scope, research, and stakeholder feedback cycles.",
  },
  {
    question: "Do you work with existing brands?",
    answer:
      "Yes. We can refresh an existing identity or rebuild it from the ground up based on your goals.",
  },
  {
    question: "Will we own all brand assets?",
    answer:
      "Yes. You receive full ownership of brand assets, guidelines, and source files upon completion.",
  },
  {
    question: "Do you provide ongoing brand support?",
    answer:
      "We offer retainer support for collateral, campaigns, and ongoing brand governance.",
  },
];

export default function BrandingPage() {
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding Services",
    description:
      "Branding services including strategy, visual identity, and brand systems for premium market positioning.",
    serviceType: "Branding",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.28),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.7),rgba(2,6,23,0.95))]" />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 pb-20 pt-24 sm:pt-28 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                  Branding Services
                </p>
                <h1
                  className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
                >
                  Build a brand identity that commands attention and trust.
                </h1>
                <p className="max-w-xl text-lg text-zinc-200">
                  We define positioning, craft a premium visual system, and deliver the assets your team needs to launch with confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/#contact"
                    className="rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:bg-fuchsia-400"
                  >
                    Start a rebrand
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
                    Engagement snapshot
                  </p>
                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Typical scope
                      </p>
                      <p className="text-lg text-white">
                        Brand strategy, visual identity, guidelines, and launch assets
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Best for
                      </p>
                      <p className="text-lg text-white">
                        Growth-stage startups, premium services, and category builders
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/80">
                        We take on 2 branding engagements per month for high-touch collaboration.
                      </p>
                      <p className="mt-3 text-base font-semibold text-fuchsia-200">
                        Next availability: March 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Trusted by ambitious founders and marketing teams</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>Strategy - Identity - Guidelines - Launch</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                Outcomes
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                The brand system that aligns teams and attracts customers.
              </h2>
              <p className="text-base text-white/70">
                A consistent brand unlocks trust, speed, and cohesion across every customer touchpoint.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                  Services
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Branding built for long-term consistency.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                We build identity systems that scale across marketing, product, and sales.
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                Process
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                A brand process that earns buy-in quickly.
              </h2>
              <p className="text-base text-white/70">
                Clear checkpoints, stakeholder alignment, and refined deliverables that reflect your vision.
              </p>
            </div>
            <div className="grid gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-fuchsia-200">
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                  Results
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Proof that strong branding fuels growth.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                A cohesive brand unlocks premium pricing, higher trust, and stronger conversion.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                  FAQ
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Branding questions, answered.
                </h2>
                <p className="text-base text-white/70">
                  If you need something bespoke, we can tailor the engagement together.
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
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200">
                    Start a brand
                  </p>
                  <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                    Tell us about the brand you want to build or evolve.
                  </h2>
                  <p className="text-base text-white/70">
                    Expect a response within one business day. We will share the right scope, timeline, and next steps.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                    Average branding engagement: $12k to $50k depending on scope and deliverables.
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Contact form
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                    Book your branding consultation
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Share the essentials and we will follow up with next steps and a brand plan.
                  </p>
                  <div className="mt-6">
                    <ContactForm variant="light" />
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
