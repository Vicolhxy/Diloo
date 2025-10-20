import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import style1 from "@assets/stock_images/professional_portrai_d6c070ec.jpg";
import style2 from "@assets/stock_images/professional_portrai_7825c2db.jpg";
import style3 from "@assets/stock_images/professional_portrai_821b54c0.jpg";
import style4 from "@assets/stock_images/professional_portrai_57d8c6c4.jpg";
import style5 from "@assets/stock_images/professional_portrai_45a60435.jpg";
import style6 from "@assets/stock_images/professional_portrai_c3263eb1.jpg";
import avatar1 from "@assets/stock_images/professional_headsho_e7733723.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_075d0ea6.jpg";

const styles = [
  { id: 1, image: style1, hasNew: true, hasCreate: false },
  { id: 2, image: style2, hasNew: false, hasCreate: true },
  { id: 3, image: style3, hasNew: false, hasCreate: false },
  { id: 4, image: style4, hasNew: false, hasCreate: false },
  { id: 5, image: avatar1, hasNew: false, hasCreate: false },
  { id: 6, image: avatar2, hasNew: false, hasCreate: false },
  { id: 7, image: style5, hasNew: false, hasCreate: false },
  { id: 8, image: style6, hasNew: false, hasCreate: false },
];

export default function StyleShowcase() {
  return (
    <section className="w-full max-w-[1920px] flex flex-wrap items-start content-start gap-y-20 gap-x-16 px-[100px] pt-5 pb-20">
      {styles.map((style) => (
        <div 
          key={style.id} 
          className="relative w-[382px] h-[500px] rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          data-testid={`card-style-${style.id}`}
        >
          <img 
            src={style.image} 
            alt={`Style ${style.id}`}
            className="w-full h-full object-cover"
          />
          
          {style.hasNew && (
            <div className="absolute top-0 right-0 bg-[#ff6969] rounded-bl-xl inline-flex justify-center items-center gap-2 px-2.5 py-1">
              <Badge 
                className="bg-transparent border-none text-[#f0f0f0] text-sm font-bold p-0 hover:bg-transparent"
                data-testid="badge-new"
              >
                NEW
              </Badge>
            </div>
          )}
          
          {style.hasCreate && (
            <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
                <Button 
                  className="bg-[#25ced1] text-white font-bold text-base rounded-3xl px-8 py-2.5"
                  data-testid="button-create"
                >
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
