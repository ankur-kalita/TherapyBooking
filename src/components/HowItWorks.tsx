
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MessageSquare, User, Video } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      title: "Create Your Profile",
      description: "Tell us about your preferences, therapy goals, and what you're looking for in a therapist.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Calendar,
      title: "Browse & Book",
      description: "Explore our directory of qualified therapists and book a session that fits your schedule.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Video,
      title: "Attend Your Session",
      description: "Join your secure video session from anywhere. Our platform ensures privacy and confidentiality.",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Follow Up",
      description: "Rate your experience, message your therapist between sessions, and book follow-up appointments.",
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  return (
    <section className="py-16" id="how-it-works">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How <span className="text-gradient">MindfulCare</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with your mental health journey is simple. Follow these easy steps to connect with a therapist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mt-2 ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
