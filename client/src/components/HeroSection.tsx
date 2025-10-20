import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-indigo-900/80 z-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920')] bg-cover bg-center opacity-30" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6" data-testid="text-hero-title">
          让每一张照片都成为艺术
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          选择你喜欢的风格，上传照片，AI将为你创造专属的艺术作品
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full bg-white text-primary hover:bg-white/90 hover-elevate active-elevate-2"
            data-testid="button-start"
          >
            开始创作
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 rounded-full backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white/20"
            data-testid="button-view-styles"
          >
            浏览风格
          </Button>
        </div>
      </div>
    </section>
  );
}
