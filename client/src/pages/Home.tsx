import HeroSection from "@/components/HeroSection";
import StyleShowcase from "@/components/StyleShowcase";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StyleShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
