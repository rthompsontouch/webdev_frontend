import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServiceSection from "@/components/ServiceSection";
import OurWork from "@/components/OurWork";
import ProcessSection from "@/components/ProcessSection";

export const metadata: Metadata = {
  title: "TheWebPrism | Premium Design & Development Studio",
  description:
    "Premium digital design and development for ambitious brands. We create websites, apps, and digital experiences that feel premium and drive results.",
  keywords: [
    "web design",
    "web development",
    "digital design",
    "design agency",
    "app development",
    "branding",
    "digital consulting",
  ],
  openGraph: {
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "We build premium digital experiences for brands that want to stand out and scale.",
    type: "website",
    images: [
      {
        url: "https://www.thewebprism.com/images/hero_image.jpg",
        width: 1600,
        height: 900,
        alt: "TheWebPrism digital design and development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWebPrism | Premium Digital Design & Development",
    description:
      "Premium design and development for ambitious brands in Raleigh and beyond.",
    images: ["https://www.thewebprism.com/images/hero_image.jpg"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <BrandsCarousel />
      <ServiceSection />
      <OurWork />
      <ProcessSection />
    </main>
  );
}
