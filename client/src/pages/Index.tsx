
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TherapistDirectory from "@/components/TherapistDirectory";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TherapistDirectory />
        <HowItWorks />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
