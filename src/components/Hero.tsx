import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Find Your Perfect
              <span className="block text-primary mt-2">Rental Home</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              Connect with trusted landlords and discover your ideal living space. 
              From apartments to houses, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 pt-4">
              <Link to="/properties">
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <img 
              src={heroImage} 
              alt="Modern rental property" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
