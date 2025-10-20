import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center px-6 lg:px-16 py-16 bg-background">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight" data-testid="text-hero-title">
            Expert-crafted AI styles.<br />
            Always on trend.
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground" data-testid="text-scroll-hint">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
        
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800" 
            alt="Desk scene with coffee and stationery"
            className="w-full h-full object-cover"
            data-testid="img-hero-background"
          />
        </div>
      </div>
    </section>
  );
}
