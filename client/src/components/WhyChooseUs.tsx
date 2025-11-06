import whyUs01 from "@assets/WhyUs-01_1762392282574.png";
import whyUs02 from "@assets/WhyUs-02_1762392282575.png";
import whyUs03 from "@assets/WhyUs-03_1762392282562.png";

const features = [
  {
    id: 1,
    title: "Look Your Best, Effortlessly",
    description: "Upload any photo and watch Diloo instantly transform it into a ",
    boldText: "studio-quality portrait",
    descriptionEnd: ".\nNo appointments — just professional results ",
    boldTextEnd: "in under a minute",
    descriptionFinal: ".",
    image: whyUs01,
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Studio Quality, Naturally Real",
    description: "We don't blur away your personality.\nDiloo preserves natural skin texture and lighting — for portraits that look ",
    boldText: "polished yet authentically you",
    descriptionEnd: ".",
    image: whyUs02,
    imagePosition: "right",
  },
  {
    id: 3,
    title: "Customize Every Detail",
    description: "Choose from ",
    boldText: "dozens of styles, outfits, and moods",
    descriptionEnd: " to create your perfect version.",
    image: whyUs03,
    imagePosition: "left",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24" data-testid="why-choose-us">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold text-black" 
            style={{fontFamily: 'Hanuman, serif'}} 
            data-testid="text-why-choose-us-title"
          >
            Why People Love Diloo
          </h2>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                feature.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-12`}
              data-testid={`section-feature-${feature.id}`}
            >
              {/* Image */}
              <div className="flex-shrink-0 w-full md:w-[480px]" data-testid={`img-container-${feature.id}`}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto"
                  data-testid={`img-feature-${feature.id}`}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 max-w-2xl" data-testid={`text-container-${feature.id}`}>
                <h3 
                  className="text-2xl md:text-3xl font-bold text-black mb-4"
                  data-testid={`text-feature-${feature.id}-title`}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-base md:text-lg text-gray-700 leading-relaxed"
                  data-testid={`text-feature-${feature.id}-description`}
                >
                  {feature.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < feature.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  <strong>{feature.boldText}</strong>
                  {feature.descriptionEnd && feature.descriptionEnd.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < feature.descriptionEnd.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  {feature.boldTextEnd && <strong>{feature.boldTextEnd}</strong>}
                  {feature.descriptionFinal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
