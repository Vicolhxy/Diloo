import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import w1Img from "@assets/W1_1761159011555.png";
import y1Img from "@assets/Y1_1761159011566.png";
import w2Img from "@assets/W2_1761159011568.png";
import b1Img from "@assets/B1_1761159011569.png";
import y2Img from "@assets/Y2_1761159011570.png";
import b2Img from "@assets/B2_1761159011571.png";

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    avatar: w1Img,
    rating: 5,
    comment: "This AI-enhanced style is a Lifesaver! I can easily get great professional photos for our website."
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: y1Img,
    rating: 5,
    comment: "The quality is outstanding and the turnaround time is incredibly fast. Highly recommend!"
  },
  {
    id: 3,
    name: "Sarah Chen",
    avatar: w2Img,
    rating: 5,
    comment: "Perfect for our team headshots. Natural results that look professional and authentic."
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar: b1Img,
    rating: 5,
    comment: "Amazing variety of styles. The AI technology is impressive and easy to use."
  },
  {
    id: 5,
    name: "Lisa Anderson",
    avatar: y2Img,
    rating: 5,
    comment: "Great value for money. Professional quality photos without the professional photography price tag."
  },
  {
    id: 6,
    name: "David Kim",
    avatar: b2Img,
    rating: 5,
    comment: "Quick and efficient service. My LinkedIn profile has never looked better!"
  }
];

export default function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden" data-testid="testimonials">
      <div className="mb-12 md:mb-16 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-testimonials-title">
          What Our Users say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">
          We turn our clients into fanatics. Over 500 five star reviews and growing
        </p>
      </div>
      
      <div className="relative w-full">
        <div 
          className="flex gap-6"
          style={{
            animation: 'scroll-left 30s linear infinite',
            width: 'max-content'
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-80 border border-gray-200 shadow-sm"
              data-testid={index < 6 ? `card-testimonial-${testimonial.id}` : undefined}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4" data-testid={index < 6 ? `text-comment-${testimonial.id}` : undefined}>
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm" data-testid={index < 6 ? `text-name-${testimonial.id}` : undefined}>
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
