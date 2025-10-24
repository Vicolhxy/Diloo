import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

const styles = [
  { id: 1, image: w1Img, alt: "Professional headshot 1" },
  { id: 2, image: y1Img, alt: "Professional headshot 2" },
  { id: 3, image: w2Img, alt: "Professional headshot 3" },
  { id: 4, image: b1Img, alt: "Professional headshot 4" },
  { id: 5, image: y2Img, alt: "Professional headshot 5" },
  { id: 6, image: b2Img, alt: "Professional headshot 6" },
  { id: 7, image: w3Img, alt: "Professional headshot 7" },
  { id: 8, image: i1Img, alt: "Professional headshot 8" },
];

export default function StyleShowcase() {
  return (
    <section className="w-full bg-gray-50 pt-3 pb-12 md:pt-4 md:pb-16" data-testid="style-showcase">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {styles.map((style) => (
            <div
              key={style.id}
              className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md"
              data-testid={`card-style-${style.id}`}
            >
              <img
                src={style.image}
                alt={style.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-6">
          <Link href="/upload?style=3">
            <Button 
              className="bg-primary text-black font-bold hover:bg-primary/90 px-8 py-6 text-base"
              data-testid="button-showcase-create-now"
            >
              Create Now
            </Button>
          </Link>
          <p className="text-sm text-gray-600 text-center max-w-md" data-testid="text-payment-notice">
            You'll see the generated results first, then decide whether to download with payment. Feel free to try it out!
          </p>
        </div>
      </div>
    </section>
  );
}
