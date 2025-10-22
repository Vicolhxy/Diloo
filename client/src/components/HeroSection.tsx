import { ChevronDown } from "lucide-react";
import bannerImg from "@assets/Banner_1761159003003.png";

export default function HeroSection() {
  return (
    <section 
      className="relative w-full h-[600px] md:h-[500px] flex items-center bg-cover bg-center"
      style={{backgroundImage: `url(${bannerImg})`}}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4" data-testid="text-hero-title">
            Expert-crafted AI styles.
            <br />
            Always on trend.
          </h1>
          <div className="mt-8 flex items-center gap-2 text-sm text-white" data-testid="scroll-hint">
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
