import { Palette, Upload, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Palette,
    title: "Choose Styles",
    description: "Browse our collection of expert-crafted AI styles and pick your favorites"
  },
  {
    id: 2,
    icon: Upload,
    title: "Upload Photo",
    description: "Upload your photo or use our AI technology analyze your preferences"
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Generate Photos",
    description: "Get AI-enhanced photos delivered straight to your inbox. Payment only when you're happy!"
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 md:py-24" data-testid="how-it-works">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-how-it-works-subtitle">
            Transform your photos into any artistic style within seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
                data-testid={`card-step-${step.id}`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <div className="relative">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {step.id}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3" data-testid={`text-step-${step.id}-title`}>
                  {step.title}
                </h3>
                <p className="text-gray-600" data-testid={`text-step-${step.id}-description`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
