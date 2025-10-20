import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import avatar1 from "@assets/stock_images/professional_headsho_e7733723.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_075d0ea6.jpg";
import avatar3 from "@assets/stock_images/professional_headsho_fd62cb19.jpg";
import avatar4 from "@assets/stock_images/professional_headsho_470526a4.jpg";
import avatar5 from "@assets/stock_images/professional_headsho_a32e74cd.jpg";

const testimonials = [
  {
    id: 1,
    name: "李明",
    avatar: avatar1,
    rating: 5,
    comment: "效果超出预期！照片变得非常有艺术感，而且处理速度很快。",
  },
  {
    id: 2,
    name: "王芳",
    avatar: avatar2,
    rating: 5,
    comment: "非常专业的服务，生成的照片保留了原片的自然美感。",
  },
  {
    id: 3,
    name: "张伟",
    avatar: avatar3,
    rating: 5,
    comment: "操作简单，风格多样，完全满足了我的需求。强烈推荐！",
  },
  {
    id: 4,
    name: "刘洋",
    avatar: avatar4,
    rating: 5,
    comment: "AI技术真的很强大，几秒钟就完成了专业级的照片处理。",
  },
  {
    id: 5,
    name: "陈静",
    avatar: avatar5,
    rating: 5,
    comment: "价格合理，质量优秀，已经推荐给身边的朋友了。",
  },
];

export default function Testimonials() {
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4" data-testid="text-testimonials-title">
            用户评价
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">
            来自真实用户的反馈
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-6 animate-scroll">
          {doubledTestimonials.map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`} 
              className="w-80 flex-shrink-0 hover-elevate"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground" data-testid={`text-name-${testimonial.id}`}>
                      {testimonial.name}
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-comment-${testimonial.id}`}>
                  {testimonial.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
