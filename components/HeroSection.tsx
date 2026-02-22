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
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero_image.jpg')] bg-cover bg-center" />
        <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute top-20 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.35),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.75),rgba(2,6,23,0.95))] opacity-85" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
        <div className="max-w-6xl w-full mx-auto px-6 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
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
                  href="/#services"
                  className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
                >
                  Explore Services
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  About Us
                </Link>
              </div>
            </div>

            <div id="contact" className="rounded-3xl border border-white/20 bg-black/50 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">
                Quick Contact
              </p>
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
