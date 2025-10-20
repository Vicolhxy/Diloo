import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full flex-shrink-0" style={{height: '800px', backgroundImage: "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden'}}>
      <div className="absolute bottom-16 left-16 flex flex-col items-start gap-3 w-[528px]">
        <h1 className="font-heading font-bold text-[64px] leading-normal text-black" data-testid="text-hero-title">
          Expert-crafted AI styles.
        </h1>
        <h2 className="font-heading font-bold text-[64px] leading-normal text-black" data-testid="text-hero-subtitle">
          Always on trend.
        </h2>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1" data-testid="scroll-hint">
        <span className="text-base text-black font-normal">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-black" />
      </div>
    </section>
  );
}
