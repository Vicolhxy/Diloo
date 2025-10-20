import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    title: "真实自然",
    description: "我们追求真实而避免过度修图，保留照片的自然美感与真实情感",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "专业团队",
    description: "我们专业的团队精心调理AI生成工具，确保每一张照片都达到专业水准",
    icon: Users,
  },
  {
    id: 3,
    title: "快速生成",
    description: "我们可以在数秒内完成照片生成，让你即刻欣赏到艺术化的作品",
    icon: Zap,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-why-title">
            为什么选择我们
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-why-subtitle">
            专业、真实、高效的AI照片处理服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="border-primary/20 hover-elevate active-elevate-2 transition-all duration-300"
                data-testid={`card-feature-${feature.id}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl lg:text-2xl text-foreground mb-4" data-testid={`text-feature-title-${feature.id}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-desc-${feature.id}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
