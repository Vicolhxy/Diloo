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
            <Link href="/upload?style=1">
              <Button 
                size="lg"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 min-h-10 rounded-md px-8 bg-primary text-black hover:bg-primary/90 font-normal"
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
