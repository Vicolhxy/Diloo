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
    role: "Marketing Director",
    avatar: w1Img,
    rating: 5,
    comment: "This AI-enhanced style is a Lifesaver! I can easily get great professional photos for our website."
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Freelance Designer",
    avatar: y1Img,
    rating: 5,
    comment: "The quality is outstanding and the turnaround time is incredibly fast. Highly recommend!"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "HR Manager",
    avatar: w2Img,
    rating: 5,
    comment: "Perfect for our team headshots. Natural results that look professional and authentic."
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Content Creator",
    avatar: b1Img,
    rating: 5,
    comment: "Amazing variety of styles. The AI technology is impressive and easy to use."
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Small Business Owner",
    avatar: y2Img,
    rating: 5,
    comment: "Great value for money. Professional quality photos without the professional photography price tag."
  },
  {
    id: 6,
    name: "David Kim",
    role: "Sales Executive",
    avatar: b2Img,
    rating: 5,
    comment: "Quick and efficient service. My LinkedIn profile has never looked better!"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-16 md:py-24" data-testid="testimonials">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-testimonials-title">
            What Our Users say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">
            We turn our clients into fanatics. Over 500 five star reviews and growing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4" data-testid={`text-comment-${testimonial.id}`}>
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
                    <p className="font-semibold text-gray-900 text-sm" data-testid={`text-name-${testimonial.id}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500" data-testid={`text-role-${testimonial.id}`}>
                      {testimonial.role}
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
