import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our website",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
    </main>
  );
}
