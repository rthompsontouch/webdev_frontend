"use client";

import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import ContactForm from "./ContactForm";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function HeroSection() {
  return (
    <section className={`${bodyFont.className} relative min-h-screen w-full overflow-hidden text-zinc-100`}>
      <div className="absolute inset-x-0 top-0 z-0 h-[100svh] lg:hidden">
        <div className="absolute inset-0 bg-[url('/images/hero_image.jpg')] bg-cover bg-center" />
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.75),rgba(2,6,23,0.95))] opacity-85" />
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-0 block h-16 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,28 C180,78 360,0 540,44 C720,88 900,16 1080,56 C1200,82 1320,72 1440,52 L1440,120 L0,120 Z"
            className="fill-black"
          />
        </svg>
      </div>
      <div className="absolute inset-0 z-0 hidden lg:block">
        <div className="absolute inset-0 bg-[url('/images/hero_image.jpg')] bg-cover bg-center" />
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.75),rgba(2,6,23,0.95))] opacity-85" />
      </div>

      <div className="relative z-10 flex justify-center min-h-screen pt-20">
        <div className="max-w-6xl w-full mx-auto px-6 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-[10px] lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:items-center">
            <div className="flex min-h-[calc(100svh-5rem)] flex-col justify-center space-y-6 lg:min-h-0">
              <div className="inline-block">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                  Premium Digital Design & Development
                </p>
                <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
              </div>
              <h1 className={`${displayFont.className} text-4xl leading-tight text-white sm:text-5xl lg:text-6xl`}>
                Web design and development for Raleigh, Cary & the Triangle.
              </h1>
              <p className="max-w-xl text-lg text-zinc-200">
                We craft premium websites, apps, and digital experiences for Triangle-area businesses. Raleigh, Durham, Cary, Apex, Holly Springs & Fuquay-Varina.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/#contact"
                  className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
                  onClick={(event) => {
                    const target = document.getElementById("contact");
                    if (target) {
                      event.preventDefault();
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Request Quote
                </Link>
                <Link
                  href="/#services"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div id="contact" className="-mt-[10px] mb-8 rounded-3xl border border-white/20 bg-black p-6 shadow-2xl shadow-black/40 sm:mt-0 sm:mb-0 sm:bg-black/50 sm:backdrop-blur lg:mt-0">
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Let&apos;s talk about your next project
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Prefer to call?{" "}
                <a
                  href="tel:+19193466039"
                  className="font-medium text-rose-300 hover:text-rose-200 transition-colors"
                >
                  (919) 346-6039
                </a>
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
