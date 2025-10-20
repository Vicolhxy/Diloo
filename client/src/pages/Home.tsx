import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import StyleShowcase from "@/components/StyleShowcase";
import SimpleSections from "@/components/SimpleSections";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3 bg-white overflow-hidden">
      <HeroSection />
      <CategoryNav />
      <StyleShowcase />
      <SimpleSections />
    </div>
  );
}
