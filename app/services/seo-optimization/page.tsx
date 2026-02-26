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
  title: "SEO Optimization Services | Technical and Content SEO",
  description:
    "Professional SEO services that drive organic traffic and rankings. Technical audits, content strategy, and sustainable growth for long-term visibility.",
  keywords: [
    "seo services",
    "seo optimization",
    "technical seo",
    "content seo",
    "search engine optimization",
    "organic traffic",
    "seo strategy",
    "local seo",
  ],
  openGraph: {
    title: "SEO Optimization Services | Technical and Content SEO",
    description:
      "We drive organic visibility with technical SEO, content strategy, and sustainable optimization for long-term rankings.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism SEO optimization services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Optimization Services | Technical and Content SEO",
    description:
      "Technical and content SEO that drives sustainable organic growth and visibility.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
  alternates: { canonical: "https://www.thewebprism.com/services/seo-optimization" },
};

const outcomes = [
  {
    title: "Higher search engine rankings",
    description:
      "Strategic optimization that improves your visibility for high-intent keywords that drive qualified traffic.",
  },
  {
    title: "Sustainable organic growth",
    description:
      "Long-term SEO strategy focused on building authority and earning rankings that compound over time.",
  },
  {
    title: "Technical excellence",
    description:
      "Clean site architecture, fast load times, and mobile optimization that search engines reward.",
  },
];

const services = [
  {
    title: "Technical SEO Audits",
    description:
      "Comprehensive site analysis covering crawlability, indexation, site speed, and Core Web Vitals.",
  },
  {
    title: "Keyword Research and Strategy",
    description:
      "Data-driven keyword targeting aligned with your audience's search intent and business goals.",
  },
  {
    title: "On-Page Optimization",
    description:
      "Content optimization, meta tags, schema markup, and internal linking for maximum relevance.",
  },
  {
    title: "Content Strategy and Creation",
    description:
      "SEO-optimized content that ranks, engages, and converts your target audience.",
  },
  {
    title: "Link Building and Authority",
    description:
      "White-hat link acquisition strategies that build domain authority and trustworthiness.",
  },
  {
    title: "Local SEO",
    description:
      "Google Business Profile optimization, local citations, and location-based strategies.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "SEO Audit and Analysis",
    description:
      "We analyze your current SEO performance, identify opportunities, and create a prioritized roadmap.",
  },
  {
    step: "02",
    title: "Strategy and Planning",
    description:
      "Define target keywords, content themes, and technical improvements with clear success metrics.",
  },
  {
    step: "03",
    title: "Implementation and Optimization",
    description:
      "Execute technical fixes, optimize content, and build authority through strategic link building.",
  },
  {
    step: "04",
    title: "Monitoring and Iteration",
    description:
      "Track rankings, traffic, and conversions with monthly reports and continuous optimization.",
  },
];

const proofPoints = [
  { label: "Avg. organic traffic lift", value: "+185%" },
  { label: "Keywords ranked top 10", value: "1,200+" },
  { label: "Client retention", value: "94%" },
  { label: "Technical audits completed", value: "150+" },
];

const testimonials = [
  {
    quote:
      "Our organic traffic tripled in six months. Their technical SEO work was thorough and their content strategy actually ranks.",
    name: "Alex Rodriguez",
    title: "Director of Marketing, Cascade Digital",
  },
  {
    quote:
      "Finally, an SEO team that explains everything clearly and delivers real results. We're ranking for our most valuable keywords.",
    name: "Emily Brooks",
    title: "Founder, Elevate Consulting",
  },
];

const faqs = [
  {
    question: "How long does it take to see SEO results?",
    answer:
      "Most clients see meaningful improvements in 3-6 months. SEO is a long-term investment, but we prioritize quick wins in technical SEO while building sustainable organic growth.",
  },
  {
    question: "Do you guarantee #1 rankings?",
    answer:
      "No reputable SEO agency can guarantee specific rankings. We focus on driving qualified organic traffic, improving visibility, and increasing conversions through sustainable, white-hat strategies.",
  },
  {
    question: "What's included in an SEO audit?",
    answer:
      "Our audits cover technical SEO (site speed, crawlability, indexation), on-page optimization, content analysis, backlink profile, competitor analysis, and keyword opportunities with actionable recommendations.",
  },
  {
    question: "Do you help with content creation?",
    answer:
      "Yes. We develop content strategies and can create SEO-optimized content including blog posts, landing pages, and pillar content that ranks and converts.",
  },
];

export default function SEOOptimizationPage() {
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
    name: "SEO Optimization Services",
    description:
      "Professional SEO services including technical audits, keyword research, on-page optimization, content strategy, and link building.",
    serviceType: "SEO",
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
                SEO Optimization Services
              </p>
              <h1
                className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
              >
                SEO that drives sustainable organic growth.
              </h1>
              <p className="max-w-xl text-lg text-zinc-200">
                We optimize for search engines and humans. Technical excellence, strategic content, and white-hat link building that earns rankings and drives qualified traffic for the long term.
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
                      Technical audit, keyword strategy, content optimization, and link building
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Best for
                    </p>
                    <p className="text-lg text-white">
                      B2B companies, e-commerce, local businesses, and content publishers
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm text-white/80">
                      Monthly retainers for ongoing optimization and content.
                    </p>
                    <p className="mt-3 text-base font-semibold text-rose-200">
                      Starting at $3k/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
            <span>White-hat strategies for sustainable rankings</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span>Technical - Content - Authority - Local</span>
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
              SEO optimization that delivers measurable results.
            </h2>
            <p className="text-base text-white/70">
              We focus on sustainable strategies that build long-term organic visibility and drive qualified traffic to your site.
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
                Comprehensive SEO services for every stage.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              From technical foundations to content strategy and authority building, we handle all aspects of SEO optimization.
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
              Our proven SEO optimization process.
            </h2>
            <p className="text-base text-white/70">
              Strategic, data-driven optimization that builds momentum and delivers sustainable organic growth.
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
                SEO success stories from our clients.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              Strategic SEO drives long-term organic growth, qualified traffic, and sustainable visibility.
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
                SEO questions answered.
              </h2>
              <p className="text-base text-white/70">
                Learn more about our SEO approach and how we can help your business grow organically.
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
                  Ready to grow your organic traffic?
                </h2>
                <p className="text-base text-white/70">
                  Get a free SEO audit and custom strategy. We&apos;ll analyze your current performance and identify quick wins plus long-term opportunities.
                </p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                  SEO audits start at $1,500. Monthly retainers start at $3k. Custom enterprise packages available.
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Contact form
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                  Request your SEO audit
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Tell us about your site and goals. We&apos;ll provide a detailed audit and strategy.
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
