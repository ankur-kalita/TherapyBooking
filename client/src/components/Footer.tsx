
import { Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MindfulCare</span>
            </div>
            <p className="text-background/70 mb-4 max-w-md">
              Connecting you with qualified therapists for a healthier, happier life. 
              Professional, confidential, and accessible mental health care.
            </p>
            <p className="text-sm text-background/60">
              © 2024 MindfulCare. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Find Therapists</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Book Sessions</a></li>
              <li><a href="#" className="hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>
            If you're in a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
