
import { Button } from "@/components/ui/button";
import { Calendar, Star, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-peaceful opacity-50" />
      
      <div className="container relative px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Your Mental Health Journey{" "}
            <span className="text-gradient">Starts Here</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with qualified therapists, book sessions easily, and take the first step 
            towards better mental health. Professional, confidential, and accessible care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your First Session
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Browse Therapists
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">500+ Therapists</h3>
              <p className="text-sm text-muted-foreground">
                Qualified professionals across all specialties
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Easy Booking</h3>
              <p className="text-sm text-muted-foreground">
                Schedule sessions that fit your schedule
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Highly Rated</h3>
              <p className="text-sm text-muted-foreground">
                4.9/5 average rating from our community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
