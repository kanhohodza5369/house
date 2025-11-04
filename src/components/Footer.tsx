import { Home, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Home className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="text-lg md:text-xl font-bold">RentalHub</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Your trusted platform for finding the perfect rental home.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                Properties
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">contact@rentalhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border text-center text-muted-foreground">
          <p className="text-xs md:text-sm">&copy; {new Date().getFullYear()} RentalHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
