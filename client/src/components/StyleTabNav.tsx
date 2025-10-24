import { useMemo } from "react";
import { Link, useSearch } from "wouter";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";
import w3Img from "@assets/W3_1761159011572.png";
import i1Img from "@assets/I1_1761159011573.png";

const styles = [
  { id: "1", image: w1Img, label: "Style 1" },
  { id: "2", image: y1Img, label: "Style 2" },
  { id: "3", image: w2Img, label: "Style 3" },
  { id: "4", image: b1Img, label: "Style 4" },
  { id: "5", image: y2Img, label: "Style 5" },
  { id: "6", image: b2Img, label: "Style 6" },
  { id: "7", image: w3Img, label: "Style 7" },
  { id: "8", image: i1Img, label: "Style 8" },
];

export default function StyleTabNav() {
  const searchString = useSearch();
  
  const activeStyleId = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get('style') || "3";
  }, [searchString]);

  return (
    <div className="w-full bg-white border-b border-gray-200" data-testid="style-tab-nav">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          {styles.map((style) => (
            <Link key={style.id} href={`/upload?style=${style.id}`}>
              <div
                className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  activeStyleId === style.id
                    ? 'ring-4 ring-primary shadow-lg'
                    : 'ring-2 ring-gray-200 hover:ring-primary/50'
                }`}
                data-testid={`tab-style-${style.id}`}
              >
                <img
                  src={style.image}
                  alt={style.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
