import { Card, CardContent } from "@/components/ui/card";
import { Image, Upload, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "选择喜欢的风格",
    description: "从我们精心策划的风格库中，选择最符合你审美的艺术风格",
    icon: Image,
  },
  {
    id: 2,
    title: "上传自己的照片",
    description: "支持多种格式，简单拖拽即可完成上传，安全便捷",
    icon: Upload,
  },
  {
    id: 3,
    title: "生成风格化照片",
    description: "AI智能处理，数秒内为你呈现专业级的艺术化照片",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-how-title">
            如何使用
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-subtitle">
            三步轻松创作你的艺术照片
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.id} 
                className="relative overflow-visible hover-elevate active-elevate-2 transition-all duration-300"
                data-testid={`card-step-${step.id}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.id}
                  </div>
                  <div className="mt-8 mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl lg:text-2xl text-foreground mb-4" data-testid={`text-step-title-${step.id}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-step-desc-${step.id}`}>
                    {step.description}
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
