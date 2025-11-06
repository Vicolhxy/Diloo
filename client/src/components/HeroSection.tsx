import bannerImg from "@assets/banner_1762115202011.png";

export default function HeroSection() {
  return (
    <section 
      className="relative w-full h-[600px] md:h-[500px] flex items-center bg-cover bg-center"
      style={{backgroundImage: `url(${bannerImg})`}}
      data-testid="hero-section"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-2xl" style={{marginTop: '36px'}}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[40px] 3xl:text-[60px] font-bold text-black leading-tight mb-4" style={{fontFamily: 'Hanuman, serif'}} data-testid="text-hero-title">
            Choose your style.
            <br />
            <span style={{marginTop: '10px', display: 'inline-block'}}>Customize every detail.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 mb-8" data-testid="text-hero-caption">
            AI-powered photo creation with full professional control.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white border-2 border-gray-200 rounded-md p-4" data-testid="card-stats-styles">
              <div className="font-bold text-black mb-1 text-[24px]">3+</div>
              <div className="text-sm font-semibold text-black mb-1 whitespace-nowrap">Styles</div>
              <div className="text-xs text-gray-600 whitespace-nowrap">Less, but better</div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-md p-4" data-testid="card-stats-settings">
              <div className="font-bold text-black mb-1 text-[24px]">18+</div>
              <div className="text-sm font-semibold text-black mb-1 whitespace-nowrap">Settings</div>
              <div className="text-xs text-gray-600 whitespace-nowrap">All you want</div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-md p-4" data-testid="card-stats-users">
              <div className="font-bold text-black mb-1 text-[24px]">200+</div>
              <div className="text-sm font-semibold text-black mb-1 whitespace-nowrap">Users</div>
              <div className="text-xs text-gray-600 whitespace-nowrap">5-star rates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
