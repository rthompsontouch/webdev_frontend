import Image from "next/image";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function ProcessSection() {
  const processSteps: ProcessStep[] = [
    {
      title: "Discovery",
      subtitle: "Understanding Your Vision",
      description: "We start by deeply understanding your business goals, target audience, and unique challenges. Through collaborative workshops and research, we define the strategy that will drive your project's success.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    },
    {
      title: "Strategy",
      subtitle: "Planning for Success",
      description: "With insights in hand, we craft a comprehensive roadmap. We define the user experience, technical architecture, and design direction that will bring your vision to life.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=600&fit=crop",
    },
    {
      title: "Design",
      subtitle: "Creating Beautiful Solutions",
      description: "Our designers create stunning, intuitive interfaces that balance aesthetics with functionality. Every pixel is purposeful, every interaction thoughtful.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop",
    },
    {
      title: "Development",
      subtitle: "Building with Excellence",
      description: "Our developers transform designs into robust, scalable solutions using cutting-edge technologies. We build fast, secure, and maintainable code that grows with your business.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section id="process" className={`${bodyFont.className} relative px-6 py-20 lg:px-10 text-zinc-100`}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Our Process
              </p>
              <div className="mt-2 h-0.5 w-16 rounded-full bg-rose-200" />
            </div>
            <h2 className={`${displayFont.className} text-3xl text-white sm:text-4xl`}>
              How we bring ideas to life.
            </h2>
            <p className="text-base text-white/70">
              From vision to reality, we follow a proven methodology that ensures exceptional results at every stage.
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1" : ""
                }`}
              >
                <div className="flex flex-col justify-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <span className="text-4xl font-bold text-rose-200/30">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`${displayFont.className} text-2xl text-white`}>
                    {step.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-rose-200 font-semibold">
                    {step.subtitle}
                  </p>
                  <p className="text-base text-white/70">
                    {step.description}
                  </p>
                </div>

                <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
