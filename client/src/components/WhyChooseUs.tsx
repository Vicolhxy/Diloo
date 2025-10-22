import { Award, DollarSign, Zap } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Professional Quality",
    description: "AI tools fine-tuned by our expert team ensuring professional results every time",
    icon: Award,
  },
  {
    id: 2,
    title: "Affordable Prices",
    description: "Premium quality photos at pricing that fit any budget, making AI art accessible",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Lightning Fast",
    description: "Get your enhanced photos in seconds - no more waiting days for professional results",
    icon: Zap,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-primary py-16 md:py-24" data-testid="why-choose-us">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-why-choose-us-title">
            Why Choose Us
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto" data-testid="text-why-choose-us-subtitle">
            Fast delivery to the inbox
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center text-white"
                data-testid={`card-feature-${feature.id}`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3" data-testid={`text-feature-${feature.id}-title`}>
                  {feature.title}
                </h3>
                <p className="text-white/80" data-testid={`text-feature-${feature.id}-description`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
