
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "MindfulCare made it so easy to find a therapist who understood my anxiety. The booking process was seamless, and my therapist has been incredibly helpful.",
      therapy: "Anxiety & Stress Management"
    },
    {
      name: "James R.",
      rating: 5,
      text: "After struggling to find the right therapist for months, I found Dr. Chen through MindfulCare. The video sessions are convenient and feel just like in-person therapy.",
      therapy: "Trauma Therapy"
    },
    {
      name: "Maria L.",
      rating: 5,
      text: "The couples therapy sessions we've had through this platform have saved our relationship. Being able to book sessions that work for both our schedules was a game-changer.",
      therapy: "Couples Therapy"
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who have transformed their mental health journey with MindfulCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.therapy}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
