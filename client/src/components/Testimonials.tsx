import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    rating: 5,
    comment: "Super easy to use! My professional headshot turned out amazing — way better than I expected."
  },
  {
    id: 2,
    name: "Michael Reed",
    rating: 5,
    comment: "Loved how customizable it is. I could tweak every little detail until it looked perfect."
  },
  {
    id: 3,
    name: "Sophia Nguyen",
    rating: 4.5,
    comment: "Really great results overall! Would love to see a few more background options though."
  },
  {
    id: 4,
    name: "Daniel Brooks",
    rating: 5,
    comment: "Fast, realistic, and super professional. Honestly looks like a real studio photo!"
  },
  {
    id: 5,
    name: "Olivia Turner",
    rating: 5,
    comment: "The quality blew me away. I uploaded a selfie and got a LinkedIn-ready photo in seconds."
  },
  {
    id: 6,
    name: "Liam Johnson",
    rating: 5,
    comment: "This AI is seriously impressive. Clean, sharp results and very natural lighting."
  },
  {
    id: 7,
    name: "Grace Mitchell",
    rating: 5,
    comment: "I used it for my company ID photo — everyone thought I had it taken by a pro photographer!"
  },
  {
    id: 8,
    name: "Ethan Collins",
    rating: 4.5,
    comment: "Almost perfect! The customization options are great, just wish I could preview more poses."
  },
  {
    id: 9,
    name: "Ava Thompson",
    rating: 5,
    comment: "I love how realistic the photos look. No weird filters or fake skin smoothing — just natural."
  },
  {
    id: 10,
    name: "Jack Peterson",
    rating: 5,
    comment: "Super polished results, intuitive interface, and everything feels professional. Highly recommend!"
  }
];

export default function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden" data-testid="testimonials">
      <div className="mb-12 md:mb-16 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Hanuman, serif'}} data-testid="text-testimonials-title">
          What People Are Saying
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
              data-testid={index < 10 ? `card-testimonial-${testimonial.id}` : undefined}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                    <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <div className="relative w-4 h-4">
                      <Star className="w-4 h-4 text-yellow-400 absolute" />
                      <div className="overflow-hidden absolute" style={{ width: '50%' }}>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-4" data-testid={index < 10 ? `text-comment-${testimonial.id}` : undefined}>
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm" data-testid={index < 10 ? `text-name-${testimonial.id}` : undefined}>
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
