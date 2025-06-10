
import { Button } from "@/components/ui/button";
import { Calendar, Menu, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-calm">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">MindfulCare</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#therapists" className="text-sm font-medium hover:text-primary transition-colors">
            Find Therapists
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-3">
            <a href="#therapists" className="block py-2 text-sm font-medium hover:text-primary">
              Find Therapists
            </a>
            <a href="#how-it-works" className="block py-2 text-sm font-medium hover:text-primary">
              How It Works
            </a>
            <a href="#about" className="block py-2 text-sm font-medium hover:text-primary">
              About
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium hover:text-primary">
              Contact
            </a>
            <div className="pt-4 border-t space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-start">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
