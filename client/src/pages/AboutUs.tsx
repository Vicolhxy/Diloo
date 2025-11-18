import { Heart, Users, Sparkles, Mail } from "lucide-react";
import teamPhoto from "@assets/AboutUs_1763503986056.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section with Team Photo */}
      <section className="relative h-[500px] w-full overflow-hidden" data-testid="section-hero">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${teamPhoto})` }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'Hanuman, serif' }}
            data-testid="text-hero-title"
          >
            About Us
          </h1>
          <p 
            className="text-xl md:text-2xl text-white/95 max-w-4xl leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            The Diloo team — AI engineers, imaging specialists, and designers working together to build the future of professional photos.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-6" data-testid="section-mission">
        <div className="container mx-auto max-w-7xl">
          <h2 
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            style={{ fontFamily: 'Hanuman, serif' }}
            data-testid="text-mission-title"
          >
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card 1 */}
            <div 
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
              data-testid="card-mission-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900" data-testid="text-mission-1-title">
                  Preserving the natural beauty in all faces.
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed" data-testid="text-mission-1-content">
                We created Diloo because we love what AI can do to elevate photography — just not when it erases what makes people real. We believe in natural skin, real expressions, and the most radiant version of yourself. AI should enhance your photo, not substitute it.
              </p>
            </div>

            {/* Mission Card 2 */}
            <div 
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
              data-testid="card-mission-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900" data-testid="text-mission-2-title">
                  Giving people more power, not less.
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed" data-testid="text-mission-2-content">
                Most AI photo editors feel like a shot in the dark — you upload and pray for the best. Diloo is different. You're in control over dozens of outfits, colors, poses and expressions. You choose how you want to look and the AI guides you.
              </p>
            </div>

            {/* Mission Card 3 */}
            <div 
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
              data-testid="card-mission-3"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900" data-testid="text-mission-3-title">
                  Making it easy for anyone to create pro-quality portraits.
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed" data-testid="text-mission-3-content">
                Traditional portrait photography is costly and time-consuming. Diloo keeps it straight-forward: produce a refined, studio-quality portrait at home in a matter of minutes. No waiting, no appointments. And with customizable outfits and backgrounds, you can experiment with different looks without paying again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-6 bg-white" data-testid="section-contact">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 
            className="text-4xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Hanuman, serif' }}
            data-testid="text-contact-title"
          >
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8" data-testid="text-contact-description">
            We support full remote work, so we don't maintain a fixed office. But that doesn't mean you can't reach us — our support is always with you.
          </p>
          <a 
            href="mailto:info@diloo.ca"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover-elevate active-elevate-2 transition-colors"
            data-testid="link-contact-email"
          >
            <Mail className="w-5 h-5" />
            info@diloo.ca
          </a>
        </div>
      </section>
    </div>
  );
}
