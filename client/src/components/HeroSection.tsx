import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
          <div className="mt-8">
            <Link href="/upload?style=3">
              <Button 
                size="lg"
                className="bg-primary text-black font-bold hover:bg-primary/90"
                data-testid="button-hero-create-now"
              >
                Create Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
