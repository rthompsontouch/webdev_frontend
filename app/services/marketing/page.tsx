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
  title: "Marketing Services | Data-Driven Growth Campaigns",
  description:
    "Full-service marketing from strategy to execution. Performance marketing, content, email, and paid campaigns that drive measurable growth.",
  keywords: [
    "marketing services",
    "digital marketing",
    "growth marketing",
    "content marketing",
    "email marketing",
    "paid advertising",
    "marketing strategy",
  ],
  openGraph: {
    title: "Marketing Services | Data-Driven Growth Campaigns",
    description:
      "We create and execute marketing campaigns that drive growth across all channels with clear ROI tracking.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism marketing services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Services | Data-Driven Growth Campaigns",
    description:
      "Performance marketing that drives measurable growth and sustainable pipeline.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const outcomes = [
  {
    title: "Clear attribution and ROI",
    description:
      "Every campaign is tracked with precision. You always know what's working and where to double down.",
  },
  {
    title: "Integrated multi-channel approach",
    description:
      "Content, email, paid, and social working together in a cohesive strategy that compounds results.",
  },
  {
    title: "Messaging that converts",
    description:
      "Research-backed positioning and copy that speaks to your audience's real problems and aspirations.",
  },
];

const services = [
  {
    title: "Growth Strategy and Positioning",
    description:
      "Market research, customer insights, and competitive analysis to define your unique angle.",
  },
  {
    title: "Content Marketing and SEO",
    description:
      "Strategic content that ranks, educates, and nurtures prospects through the funnel.",
  },
  {
    title: "Paid Advertising (Google, Meta, LinkedIn)",
    description:
      "High-performing campaigns optimized for your cost-per-acquisition goals.",
  },
  {
    title: "Email Marketing and Automation",
    description:
      "Nurture sequences, product launches, and lifecycle campaigns that drive engagement.",
  },
  {
    title: "Social Media Strategy",
    description:
      "Platform-specific strategies and content plans that build brand awareness and community.",
  },
  {
    title: "Analytics and Performance Reporting",
    description:
      "Monthly insights, dashboards, and recommendations so you can make confident decisions.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Audit and Strategy",
    description:
      "We analyze your current marketing, competitive landscape, and customer data to build a roadmap.",
  },
  {
    step: "02",
    title: "Campaign Planning",
    description:
      "We define channels, messaging, creative direction, and success metrics for each initiative.",
  },
  {
    step: "03",
    title: "Execution and Optimization",
    description:
      "We launch campaigns, monitor performance, and iterate based on data to maximize ROI.",
  },
  {
    step: "04",
    title: "Reporting and Scale",
    description:
      "Monthly reviews with clear insights and recommendations to scale what's working.",
  },
];

const proofPoints = [
  { label: "Avg. ROI increase", value: "3.2x" },
  { label: "Client retention", value: "88%" },
  { label: "Campaigns launched", value: "200+" },
  { label: "Channels managed", value: "12+" },
];

const testimonials = [
  {
    quote:
      "They transformed our marketing from scattered tactics to a cohesive strategy. Our pipeline has never been healthier.",
    name: "Sarah Chen",
    title: "CMO, Horizon Tech",
  },
  {
    quote:
      "Finally, a team that understands both the creative and the data side. Our CAC dropped 40% in three months.",
    name: "Marcus Williams",
    title: "VP Growth, Elevate Labs",
  },
];

const faqs = [
  {
    question: "What channels do you specialize in?",
    answer:
      "We work across content marketing, SEO, paid advertising (Google, Meta, LinkedIn), email marketing, and social media. We recommend the best mix based on your goals and audience.",
  },
  {
    question: "Do you handle creative and copywriting?",
    answer:
      "Yes. Our team includes strategists, copywriters, and designers who create all campaign assets in-house.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We define clear KPIs upfront—typically focused on leads, pipeline, and revenue attribution. You get monthly reports with insights and recommendations.",
  },
  {
    question: "Can you work with our existing tools?",
    answer:
      "Absolutely. We integrate with your CRM, analytics platforms, and marketing automation tools to ensure seamless tracking and attribution.",
  },
];

export default function MarketingPage() {
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
    name: "Marketing Services",
    description:
      "Full-service marketing including strategy, content, paid advertising, email marketing, and performance analytics.",
    serviceType: "Marketing",
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
                Marketing Services
              </p>
              <h1
                className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
              >
                Marketing that drives growth, not just clicks.
              </h1>
              <p className="max-w-xl text-lg text-zinc-200">
                We build and execute data-driven marketing strategies that generate pipeline and revenue. From positioning to performance campaigns, every initiative is designed to scale with clear ROI.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
                >
                  Start a project
                </a>
                <a
                  href="#process"
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
                      Strategy, content, paid campaigns, email, and analytics
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Best for
                    </p>
                    <p className="text-lg text-white">
                      B2B SaaS, e-commerce, and growth-stage companies
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-white/80">
                      Custom packages based on channel mix and budget.
                    </p>
                    <p className="mt-3 text-base font-semibold text-rose-200">
                      Starting at $5k/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
            <span>Performance-driven campaigns built for scale</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span>Strategy - Content - Paid - Email - Analytics</span>
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
              Marketing that moves the needle on pipeline and revenue.
            </h2>
            <p className="text-base text-white/70">
              Every campaign is built with clear goals and optimized relentlessly to maximize your return on investment.
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
                Full-stack marketing from strategy to execution.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              We handle the entire marketing funnel so you can focus on closing deals and serving customers.
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
              A marketing process built for results.
            </h2>
            <p className="text-base text-white/70">
              We combine strategic thinking with rapid execution and continuous optimization to maximize your marketing ROI.
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
                Campaigns that drive real business outcomes.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              Our marketing strategies are built on data, executed with precision, and optimized for sustainable growth.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <p className="text-lg text-white">&ldquo;{item.quote}&rdquo;</p>
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
                Common questions about our marketing services.
              </h2>
              <p className="text-base text-white/70">
                Have more questions? Reach out below and we&apos;ll get back to you within 24 hours.
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
                  Let&apos;s build a marketing strategy that scales.
                </h2>
                <p className="text-base text-white/70">
                  Tell us about your goals and current challenges. We&apos;ll provide a clear roadmap and custom package recommendation within one business day.
                </p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                  Retainer packages start at $5k/month. Project-based campaigns start at $8k. Custom enterprise packages available.
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Contact form
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                  Book your marketing consultation
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Share your goals and we&apos;ll follow up with a custom strategy and pricing.
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
