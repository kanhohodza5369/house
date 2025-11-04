import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroHouse from "@/assets/hero-house.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroHouse} 
          alt="Beautiful luxury rental house" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Find Your Perfect
            <span className="text-primary block mt-2">Rental Home</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Connect directly with landlords and discover your ideal living space. Browse thousands of listings or list your property today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                Browse Properties
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
