"use client";

import { useState, useEffect, useRef } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const faqs = [
  {
    q: "How much does web design cost in Raleigh, Cary, and Durham?",
    a: "Web design pricing in the Triangle varies by scope. We offer custom websites for Raleigh, Cary, Durham, Apex, Holly Springs, and Fuquay-Varina businesses—from landing pages to full e-commerce. Contact us for a tailored quote based on your goals.",
  },
  {
    q: "How long does it take to build a website in the Triangle NC area?",
    a: "Most Triangle web design projects take 6–12 weeks from kickoff to launch. Timeline depends on complexity: a simple marketing site is faster; custom web development, SEO optimization, and e-commerce take longer. We'll give you a clear timeline in our discovery phase.",
  },
  {
    q: "Do you offer SEO services for Raleigh and Cary businesses?",
    a: "Yes. We provide technical SEO, content optimization, and local SEO for Raleigh, Cary, Durham, Apex, Holly Springs, and Fuquay-Varina. Our SEO strategy helps Triangle-area businesses rank higher and attract more qualified leads.",
  },
  {
    q: "What makes TheWebPrism different from other Triangle web design agencies?",
    a: "We focus on premium design, conversion-driven development, and long-term partnerships. We serve Raleigh, Cary, Durham, and the greater Triangle with strategy-first web design, UX research, and scalable web development—not just templates.",
  },
  {
    q: "Can you redesign an existing website for my Raleigh or Cary business?",
    a: "Absolutely. We specialize in website redesigns for Triangle businesses—improving UX, performance, and SEO while keeping your brand. We work with WordPress, custom builds, and modern frameworks to modernize your digital presence.",
  },
  {
    q: "Do you build e-commerce websites for Triangle NC businesses?",
    a: "Yes. We design and develop e-commerce sites for Raleigh, Cary, Durham, and the Triangle—from Shopify and WooCommerce to custom platforms. We handle product catalogs, checkout flows, and integrations so you can sell online with confidence.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        setParallaxOffset(progress * 80 - 40);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <section
      id="faq"
      ref={sectionRef}
      className={`${bodyFont.className} relative overflow-hidden px-6 py-16 lg:px-10 md:min-h-[calc(100vh-4rem)] md:flex md:items-center scroll-mt-16`}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl w-full">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-3">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                FAQ
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              Frequently asked questions about web design in the Triangle
            </h2>
            <p className="text-base text-white/70">
              Common questions about Raleigh, Cary, Durham web design, pricing, timelines, and our process.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-rose-500/20 hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <span
                    className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-rose-300 transition-all duration-300 ${
                      openIndex === index ? "rotate-180 bg-rose-500/30" : ""
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-sm leading-relaxed text-white/70">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
