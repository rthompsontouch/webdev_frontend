import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServiceSection from "@/components/ServiceSection";
import OurWork from "@/components/OurWork";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "TheWebPrism | Web Design Raleigh, Cary, Durham | Triangle NC",
  description:
    "Premium web design and development for Raleigh, Cary, Durham, Apex, Holly Springs & Fuquay-Varina. Conversion-focused websites and SEO for Triangle-area businesses.",
  openGraph: {
    title: "TheWebPrism | Web Design Raleigh, Cary, Durham | Triangle NC",
    description:
      "Premium web design and development for Raleigh, Cary, Durham, Apex, Holly Springs & Fuquay-Varina. Conversion-focused websites for Triangle businesses.",
    url: "https://www.thewebprism.com",
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
      <FAQSection />
    </main>
  );
}
