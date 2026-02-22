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
  title: "Web Development Services | High-Performance Websites",
  description:
    "Professional web development services for fast, scalable, and reliable websites. Engineering that boosts performance, security, and conversions.",
  keywords: [
    "web development services",
    "full-stack development",
    "next.js development",
    "performance optimization",
    "web app development",
    "responsive development",
    "web engineering",
  ],
  openGraph: {
    title: "Web Development Services | High-Performance Websites",
    description:
      "We build fast, scalable websites with clean architecture, strong security, and production-grade performance.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism web development services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services | High-Performance Websites",
    description:
      "High-performance web development for brands that need speed, stability, and scale.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

const outcomes = [
  {
    title: "Performance that wins attention",
    description:
      "Core Web Vitals optimized, lightning-fast load times, and measurable improvements in engagement.",
  },
  {
    title: "Architecture that scales",
    description:
      "Clean, modular codebases with room to grow as your product and traffic expand.",
  },
  {
    title: "Reliability you can trust",
    description:
      "Security best practices, QA, and monitoring to keep your site stable and resilient.",
  },
];

const services = [
  {
    title: "Front-End Engineering",
    description:
      "Pixel-perfect builds with responsive layouts, motion, and accessibility baked in.",
  },
  {
    title: "Full-Stack Web Apps",
    description:
      "Production-grade apps with secure APIs, auth, and modern data workflows.",
  },
  {
    title: "Next.js and React Development",
    description:
      "Server rendering, static generation, and high-performance UX built for growth.",
  },
  {
    title: "CMS and Headless Integrations",
    description:
      "Content workflows that empower marketing teams without slowing engineering.",
  },
  {
    title: "Performance Optimization",
    description:
      "Code splitting, caching, image optimization, and Lighthouse-driven improvements.",
  },
  {
    title: "Maintenance and Support",
    description:
      "Ongoing optimization, feature iterations, and release management.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Technical Discovery",
    description:
      "We audit your stack, goals, and requirements to define architecture and scope.",
  },
  {
    step: "02",
    title: "Build and Integrate",
    description:
      "We implement the UI, backend services, and content pipelines with best practices.",
  },
  {
    step: "03",
    title: "Testing and QA",
    description:
      "Automated testing, manual QA, and performance benchmarking before launch.",
  },
  {
    step: "04",
    title: "Launch and Optimize",
    description:
      "Deployment support, monitoring, and iterative performance tuning.",
  },
];

const proofPoints = [
  { label: "Median Lighthouse score", value: "95+" },
  { label: "Avg. load time", value: "<1.8s" },
  { label: "Projects launched", value: "120+" },
  { label: "Client retention", value: "92%" },
];

const testimonials = [
  {
    quote:
      "They rebuilt our site to load in under two seconds and our demo requests immediately climbed. The engineering quality is exceptional.",
    name: "Kara Nguyen",
    title: "Head of Growth, PulseGrid",
  },
  {
    quote:
      "The handoff and code quality were flawless. Our team was able to scale features without rework.",
    name: "Luis Ortega",
    title: "CTO, Northshore Health",
  },
];

const faqs = [
  {
    question: "What tech stack do you use?",
    answer:
      "We specialize in modern stacks like Next.js, React, and headless CMS platforms. We will tailor the stack to your product needs.",
  },
  {
    question: "Can you improve an existing site?",
    answer:
      "Yes. We can optimize performance, refactor architecture, or rebuild for scale while preserving your current brand.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "We offer ongoing support plans for feature updates, monitoring, and performance improvements.",
  },
  {
    question: "How do you ensure quality?",
    answer:
      "Every build includes automated testing, manual QA, and launch checklists to ensure stability.",
  },
];

export default function WebDevelopmentPage() {
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
    name: "Web Development Services",
    description:
      "High-performance web development services including front-end engineering, full-stack builds, and performance optimization.",
    serviceType: "Web Development",
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
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.28),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.7),rgba(2,6,23,0.95))]" />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 pb-20 pt-24 sm:pt-28 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Web Development Services
                </p>
                <h1
                  className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
                >
                  Engineering your site for speed, scale, and stability.
                </h1>
                <p className="max-w-xl text-lg text-zinc-200">
                  We build high-performance websites and web apps that load fast, scale effortlessly, and stay secure. Clean code, resilient infrastructure, and measurable performance improvements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/#contact"
                    className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                  >
                    Start a build
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    Engagement snapshot
                  </p>
                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Typical scope
                      </p>
                      <p className="text-lg text-white">
                        Front-end build, integrations, CMS workflows, and performance tuning
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Best for
                      </p>
                      <p className="text-lg text-white">
                        SaaS platforms, ecommerce, enterprise marketing, and content-heavy brands
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/80">
                        We take on 2 new builds per month to ensure engineering quality.
                      </p>
                      <p className="mt-3 text-base font-semibold text-emerald-200">
                        Next availability: March 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Trusted by product teams and scaling brands</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>Engineering - Performance - Security - QA</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                Outcomes
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                The engineering uplift your team feels immediately.
              </h2>
              <p className="text-base text-white/70">
                From performance gains to stability, your site becomes a dependable revenue engine.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Services
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Full-stack development built for momentum.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                We build reliable systems that keep your marketing, product, and growth teams aligned.
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                Process
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                A delivery process focused on quality and velocity.
              </h2>
              <p className="text-base text-white/70">
                We keep stakeholders aligned while shipping predictable, production-ready outcomes.
              </p>
            </div>
            <div className="grid gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-emerald-200">
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Results
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Proof that engineering quality accelerates growth.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                Fast sites convert more, rank higher, and build trust faster. The build quality shows in your results.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  FAQ
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Clear answers before you commit.
                </h2>
                <p className="text-base text-white/70">
                  If your question is not listed here, the consultation will cover it directly.
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
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                    Start a build
                  </p>
                  <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                    Tell us about the experience you need to ship.
                  </h2>
                  <p className="text-base text-white/70">
                    Expect a response within one business day. We will review your goals, advise on architecture, and provide the right delivery plan.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                    Average project investment: $20k to $90k depending on scope, integrations, and infrastructure.
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Contact form
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                    Book your web development consult
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
      </div>
    </main>
  );
}
