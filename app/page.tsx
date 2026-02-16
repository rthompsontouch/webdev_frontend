import HeroSection from "@/components/HeroSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServiceSection from "@/components/ServiceSection";
import OurWork from "@/components/OurWork";
import ProcessSection from "@/components/ProcessSection";

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
