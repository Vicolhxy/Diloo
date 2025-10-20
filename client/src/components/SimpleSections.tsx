export default function SimpleSections() {
  return (
    <section className="py-20 px-6 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto space-y-16 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground" data-testid="text-how-it-works">
          How It Works
        </h2>
        
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground" data-testid="text-why-choose-us">
          Why Choose Us
        </h2>
        
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground" data-testid="text-what-users-say">
          What Our Users Say
        </h2>
      </div>
    </section>
  );
}
