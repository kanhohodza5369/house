import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroHouse from "@/assets/hero-house.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroHouse} 
          alt="Beautiful luxury rental house" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
            Find Your Perfect
            <span className="block mt-2">Rental Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Connect directly with landlords and discover your ideal living space. Browse thousands of listings or list your property today.
          </p>
          <div className="flex justify-center pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
