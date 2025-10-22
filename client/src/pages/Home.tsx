import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import StyleShowcase from "@/components/StyleShowcase";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <HeroSection />
      <CategoryNav />
      <StyleShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
