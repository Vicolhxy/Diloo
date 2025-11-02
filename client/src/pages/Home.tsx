import { useState, useEffect } from "react";
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
  const [activeCategory, setActiveCategory] = useState("pro-headshot");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navigation />
      <HeroSection />
      <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <StyleShowcase activeCategory={activeCategory} />
      
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
