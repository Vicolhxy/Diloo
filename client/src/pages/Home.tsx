import HeroSection from "@/components/HeroSection";
import StyleShowcase from "@/components/StyleShowcase";
import SimpleSections from "@/components/SimpleSections";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StyleShowcase />
      <SimpleSections />
    </div>
  );
}
