import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-xl mb-4 text-foreground">RentalHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted platform for finding the perfect rental property.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Our Services
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/properties" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Browse Properties
              </Link>
              <Link to="/auth" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                List Property
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>info@rentalhub.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} RentalHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
