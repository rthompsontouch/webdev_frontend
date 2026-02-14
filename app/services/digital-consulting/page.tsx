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
  title: "Digital Consulting Services | Strategy, UX, and Growth",
  description:
    "Digital consulting for brands that need clarity, alignment, and momentum. We deliver strategy, UX direction, and execution roadmaps that drive growth.",
  keywords: [
    "digital consulting",
    "digital strategy",
    "product strategy",
    "ux strategy",
    "growth consulting",
    "technology roadmap",
    "digital transformation",
  ],
  openGraph: {
    title: "Digital Consulting Services | Strategy, UX, and Growth",
    description:
      "We align strategy, UX, and execution with a roadmap that builds momentum and revenue.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism digital consulting services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Consulting Services | Strategy, UX, and Growth",
    description:
      "Premium digital consulting for product, marketing, and leadership teams.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const outcomes = [
  {
    title: "Clarity on what to build next",
    description:
      "We align teams around the highest impact initiatives and remove strategic noise.",
  },
  {
    title: "A roadmap built for execution",
    description:
      "Milestones, owners, and measurable outcomes so progress is visible and predictable.",
  },
  {
    title: "Customer-led UX direction",
    description:
      "Research-backed guidance that sharpens positioning and improves conversion.",
  },
];

const services = [
  {
    title: "Digital Strategy and Positioning",
    description:
      "Audience analysis, competitive mapping, and differentiation strategy.",
  },
  {
    title: "Product and Experience Audits",
    description:
      "Deep UX reviews, funnel analysis, and performance diagnostics.",
  },
  {
    title: "Go-to-Market and Growth Planning",
    description:
      "Channel planning, messaging alignment, and launch readiness.",
  },
  {
    title: "Technology and Platform Roadmaps",
    description:
      "Stack evaluation, build vs buy guidance, and delivery planning.",
  },
  {
    title: "Workshop Facilitation",
    description:
      "Executive alignment sessions, product vision, and KPI definition.",
  },
  {
    title: "Fractional Leadership Support",
    description:
      "Senior-level guidance for teams that need momentum without full-time hires.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Alignment and Discovery",
    description:
      "We gather inputs, audit data, and align on success metrics.",
  },
  {
    step: "02",
    title: "Insights and Strategy",
    description:
      "We translate findings into strategic direction and prioritized opportunities.",
  },
  {
    step: "03",
    title: "Roadmap and Execution Plan",
    description:
      "A clear plan with milestones, resources, and expected outcomes.",
  },
  {
    step: "04",
    title: "Enablement and Momentum",
    description:
      "We support implementation, workshops, and ongoing strategic guidance.",
  },
];

const proofPoints = [
  { label: "Strategy workshops run", value: "140+" },
  { label: "Avg. revenue lift", value: "22%" },
  { label: "Roadmaps delivered", value: "90+" },
  { label: "Stakeholder alignment", value: "94%" },
];

const testimonials = [
  {
    quote:
      "They brought instant clarity to our roadmap and unified marketing and product for the first time.",
    name: "Avery Collins",
    title: "COO, Brightline Media",
  },
  {
    quote:
      "The audit and strategy sprint paid for itself within a quarter. We finally know what to prioritize.",
    name: "Miguel Santos",
    title: "Founder, Apex Commerce",
  },
];

const faqs = [
  {
    question: "How long does a consulting engagement last?",
    answer:
      "Most engagements run 2-6 weeks depending on scope. Longer advisory retainers are also available.",
  },
  {
    question: "Do you work with internal teams?",
    answer:
      "Yes. We collaborate with leadership, marketing, product, and engineering to align goals and execution.",
  },
  {
    question: "Can you help with implementation?",
    answer:
      "Absolutely. We can support execution directly or guide your internal teams through delivery.",
  },
  {
    question: "What if we need ongoing support?",
    answer:
      "We offer ongoing advisory retainers for quarterly planning and strategic oversight.",
  },
];

export default function DigitalConsultingPage() {
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
    name: "Digital Consulting",
    description:
      "Digital consulting services including strategy, UX audits, roadmaps, and growth planning.",
    serviceType: "Digital Consulting",
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
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.28),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.7),rgba(2,6,23,0.95))]" />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 pb-20 pt-24 sm:pt-28 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  Digital Consulting
                </p>
                <h1
                  className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
                >
                  Align your strategy, UX, and execution for confident growth.
                </h1>
                <p className="max-w-xl text-lg text-zinc-200">
                  We help leadership teams uncover what matters most, map the path forward, and build momentum with a structured digital roadmap.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/#contact"
                    className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
                  >
                    Start a strategy
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                    Engagement snapshot
                  </p>
                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Typical scope
                      </p>
                      <p className="text-lg text-white">
                        Discovery, audits, strategy workshop, and a 12-month roadmap
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Best for
                      </p>
                      <p className="text-lg text-white">
                        Leadership teams, founders, and growth-stage product organizations
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/80">
                        We offer limited quarterly consulting slots for deep focus.
                      </p>
                      <p className="mt-3 text-base font-semibold text-amber-200">
                        Next availability: April 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Trusted by leadership teams and growth-stage brands</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>Strategy - UX - Roadmap - Enablement</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                Outcomes
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                The strategic clarity your team needs to move faster.
              </h2>
              <p className="text-base text-white/70">
                We focus on impact, alignment, and measurable next steps you can execute with confidence.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  Services
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Consulting built for leadership and alignment.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                We bring clarity to complex decisions and a path to execution that teams can trust.
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                Process
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                A consulting approach that brings focus and momentum.
              </h2>
              <p className="text-base text-white/70">
                We keep leadership aligned and decisions grounded in research, data, and customer insights.
              </p>
            </div>
            <div className="grid gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-amber-200">
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  Results
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Proof that alignment drives growth.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                Strategic clarity creates faster launches, stronger marketing, and more consistent results.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  FAQ
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  The details leadership teams care about.
                </h2>
                <p className="text-base text-white/70">
                  If you need a bespoke engagement, we will tailor the scope together.
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
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                    Start a strategy
                  </p>
                  <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                    Tell us what you are trying to solve and we will map the plan.
                  </h2>
                  <p className="text-base text-white/70">
                    Expect a response within one business day. We will share an engagement outline, timeline, and next steps.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                    Typical consulting engagement: $8k to $35k depending on scope and timeline.
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Contact form
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                    Book your digital consulting session
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Share the essentials and we will follow up with next steps and a strategic plan.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
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
