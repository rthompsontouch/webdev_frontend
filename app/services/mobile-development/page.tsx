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
  title: "Mobile App Development | iOS and Android Product Teams",
  description:
    "Premium mobile app development for iOS and Android. We build fast, reliable, and scalable apps with beautiful UX and robust engineering.",
  keywords: [
    "mobile app development",
    "ios development",
    "android development",
    "react native development",
    "mobile product design",
    "app engineering",
    "mobile strategy",
  ],
  openGraph: {
    title: "Mobile App Development | iOS and Android Product Teams",
    description:
      "We design and build mobile apps that feel premium, perform fast, and scale with your product.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development | iOS and Android Product Teams",
    description:
      "Premium iOS and Android development for ambitious product teams.",
  },
};

const outcomes = [
  {
    title: "Apps users keep coming back to",
    description:
      "Intentional UX, delightful interaction design, and flows that drive retention.",
  },
  {
    title: "Engineering built for scale",
    description:
      "Clean architecture, modular code, and QA practices that keep releases smooth.",
  },
  {
    title: "Launch-ready performance",
    description:
      "Optimized load times, offline resilience, and device-specific polish.",
  },
];

const services = [
  {
    title: "iOS and Android Development",
    description:
      "Native or cross-platform builds tailored to your product goals.",
  },
  {
    title: "React Native Engineering",
    description:
      "Shared codebases with a premium native feel and scalable architecture.",
  },
  {
    title: "Mobile UX and UI Systems",
    description:
      "Design systems and interaction patterns that feel consistent and premium.",
  },
  {
    title: "App Store Launch Support",
    description:
      "Submission readiness, metadata, and release orchestration.",
  },
  {
    title: "Performance and QA",
    description:
      "Automated testing, device labs, and continuous optimization.",
  },
  {
    title: "Ongoing Product Iteration",
    description:
      "Feature updates, analytics-driven improvements, and growth experiments.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Product Discovery",
    description:
      "We define the MVP scope, architecture, and success metrics.",
  },
  {
    step: "02",
    title: "Design and Prototyping",
    description:
      "Interactive prototypes validate flows before engineering begins.",
  },
  {
    step: "03",
    title: "Build and QA",
    description:
      "Agile sprints, continuous QA, and device testing keep quality high.",
  },
  {
    step: "04",
    title: "Launch and Iterate",
    description:
      "We support release, analytics, and roadmap planning post-launch.",
  },
];

const proofPoints = [
  { label: "Apps shipped", value: "70+" },
  { label: "Avg. rating increase", value: "+1.2" },
  { label: "Median launch time", value: "10-12 wks" },
  { label: "Retention lift", value: "24%" },
];

const testimonials = [
  {
    quote:
      "They transformed our beta into a polished mobile product. Retention and reviews went up immediately.",
    name: "Sofia Patel",
    title: "Product Lead, Halo Fitness",
  },
  {
    quote:
      "The team handled both design and engineering with exceptional detail. Our app launch was seamless.",
    name: "Marcus Lee",
    title: "CEO, Fieldline Logistics",
  },
];

const faqs = [
  {
    question: "Do you build native or cross-platform apps?",
    answer:
      "We build both. We will recommend native, React Native, or hybrid based on performance, timeline, and budget.",
  },
  {
    question: "Can you take over an existing app?",
    answer:
      "Yes. We can audit, refactor, and evolve existing apps while preserving roadmap momentum.",
  },
  {
    question: "Do you help with app store submissions?",
    answer:
      "Absolutely. We handle release checklists, metadata, and submission support.",
  },
  {
    question: "What about post-launch maintenance?",
    answer:
      "We offer ongoing iteration plans for features, analytics, and performance improvements.",
  },
];

export default function MobileDevelopmentPage() {
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
    name: "Mobile App Development",
    description:
      "Mobile app development services for iOS and Android including design, engineering, QA, and launch support.",
    serviceType: "Mobile Development",
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
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.32),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.28),rgba(2,6,23,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.7),rgba(2,6,23,0.95))]" />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 pb-20 pt-24 sm:pt-28 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                  Mobile App Development
                </p>
                <h1
                  className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}
                >
                  Build mobile apps that feel premium and perform flawlessly.
                </h1>
                <p className="max-w-xl text-lg text-zinc-200">
                  We design and engineer iOS and Android apps for teams who care about performance, retention, and brand trust. Launch with confidence and keep momentum post-release.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:bg-pink-400"
                  >
                    Start a build
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
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-200">
                    Engagement snapshot
                  </p>
                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Typical scope
                      </p>
                      <p className="text-lg text-white">
                        Product strategy, mobile UX, engineering, QA, and app store launch
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Best for
                      </p>
                      <p className="text-lg text-white">
                        Consumer apps, health tech, logistics, and mobile-first platforms
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm text-white/80">
                        We take on 1-2 new mobile builds per quarter to ensure quality.
                      </p>
                      <p className="mt-3 text-base font-semibold text-pink-200">
                        Next availability: April 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Trusted by product teams and consumer brands</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>iOS - Android - React Native - QA</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                Outcomes
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                The mobile experience your users expect from premium brands.
              </h2>
              <p className="text-base text-white/70">
                Every decision is designed to improve usability, retention, and app store reputation.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                  Services
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Mobile engineering built for real-world usage.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                We deliver everything from MVP builds to full-scale product launches with polish.
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                Process
              </p>
              <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                A product delivery rhythm that keeps launches smooth.
              </h2>
              <p className="text-base text-white/70">
                We stay close to your team with regular demos, QA, and release planning.
              </p>
            </div>
            <div className="grid gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-pink-200">
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                  Results
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  Proof that mobile quality drives retention.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/70">
                Users notice the details. Premium engineering and UX translate into ratings, referrals, and revenue.
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
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                  FAQ
                </p>
                <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                  A few things to know before we build.
                </h2>
                <p className="text-base text-white/70">
                  If you have a question not covered here, the consultation will cover it directly.
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
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-200">
                    Start a build
                  </p>
                  <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
                    Tell us about the mobile product you want to launch.
                  </h2>
                  <p className="text-base text-white/70">
                    Expect a response within one business day. We will review your goals, advise on platform strategy, and outline the best delivery plan.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
                    Average project investment: $30k to $120k depending on scope, platforms, and integrations.
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/30">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Contact form
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-900">
                    Book your mobile development consult
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Share the essentials and we will follow up with next steps and a product plan.
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
