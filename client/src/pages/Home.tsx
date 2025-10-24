import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import StyleShowcase from "@/components/StyleShowcase";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navigation />
      <HeroSection />
      <CategoryNav />
      <StyleShowcase />
      
      {/* CTA Section after StyleShowcase */}
      <section className="w-full bg-gray-50 py-8" data-testid="cta-section">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <Link href="/upload?style=3">
            <Button 
              size="lg"
              className="bg-primary text-black font-bold hover:bg-primary/90"
              data-testid="button-showcase-create-now"
            >
              Create Now
            </Button>
          </Link>
        </div>
      </section>
      
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
