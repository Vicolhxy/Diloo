import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CategoryNav from "./CategoryNav";
import style1 from "@assets/stock_images/professional_portrai_d6c070ec.jpg";
import style2 from "@assets/stock_images/professional_portrai_7825c2db.jpg";
import style3 from "@assets/stock_images/professional_portrai_821b54c0.jpg";
import style4 from "@assets/stock_images/professional_portrai_57d8c6c4.jpg";
import style5 from "@assets/stock_images/professional_portrai_45a60435.jpg";
import style6 from "@assets/stock_images/professional_portrai_c3263eb1.jpg";
import avatar1 from "@assets/stock_images/professional_headsho_e7733723.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_075d0ea6.jpg";

const styles = [
  { id: 1, image: style1, bgColor: "bg-gray-100 dark:bg-gray-800", hasSale: true, hasComing: false },
  { id: 2, image: style2, bgColor: "bg-blue-100 dark:bg-blue-900", hasSale: false, hasComing: true },
  { id: 3, image: style3, bgColor: "bg-blue-200 dark:bg-blue-800", hasSale: false, hasComing: false },
  { id: 4, image: avatar1, bgColor: "bg-gray-50 dark:bg-gray-900", hasSale: false, hasComing: false },
  { id: 5, image: avatar2, bgColor: "bg-amber-50 dark:bg-amber-900", hasSale: false, hasComing: false },
  { id: 6, image: style4, bgColor: "bg-blue-100 dark:bg-blue-900", hasSale: false, hasComing: false },
  { id: 7, image: style5, bgColor: "bg-gray-100 dark:bg-gray-800", hasSale: false, hasComing: false },
  { id: 8, image: style6, bgColor: "bg-amber-100 dark:bg-amber-900", hasSale: false, hasComing: false },
];

export default function StyleShowcase() {
  return (
    <section className="py-16 px-6 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <CategoryNav />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style) => (
            <Card 
              key={style.id} 
              className={`relative overflow-hidden rounded-2xl border-none ${style.bgColor} hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer`}
              data-testid={`card-style-${style.id}`}
            >
              <div className="aspect-[3/4] relative p-4">
                {style.hasSale && (
                  <Badge 
                    className="absolute top-6 left-6 bg-red-500 dark:bg-red-600 text-white rounded-md text-xs z-10"
                    data-testid="badge-sale"
                  >
                    Sale
                  </Badge>
                )}
                <img 
                  src={style.image} 
                  alt={`Style ${style.id}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                {style.hasComing && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <Button 
                      size="sm"
                      className="bg-primary text-primary-foreground rounded-full"
                      data-testid="button-coming"
                    >
                      Coming
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
