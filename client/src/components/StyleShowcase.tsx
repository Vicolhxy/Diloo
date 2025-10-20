import { Card } from "@/components/ui/card";
import style1 from "@assets/stock_images/professional_portrai_d6c070ec.jpg";
import style2 from "@assets/stock_images/professional_portrai_7825c2db.jpg";
import style3 from "@assets/stock_images/professional_portrai_821b54c0.jpg";
import style4 from "@assets/stock_images/professional_portrai_57d8c6c4.jpg";
import style5 from "@assets/stock_images/professional_portrai_45a60435.jpg";
import style6 from "@assets/stock_images/professional_portrai_c3263eb1.jpg";

const styles = [
  { id: 1, name: "水彩风格", image: style1 },
  { id: 2, name: "油画风格", image: style2 },
  { id: 3, name: "素描风格", image: style3 },
  { id: 4, name: "复古风格", image: style4 },
  { id: 5, name: "现代艺术", image: style5 },
  { id: 6, name: "印象派", image: style6 },
];

export default function StyleShowcase() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-styles-title">
            探索多样风格
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-styles-subtitle">
            从经典艺术到现代创意，为你的照片找到完美的表达方式
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style) => (
            <Card 
              key={style.id} 
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover-elevate active-elevate-2"
              data-testid={`card-style-${style.id}`}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-xl" data-testid={`text-style-name-${style.id}`}>
                    {style.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
