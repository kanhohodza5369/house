import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Users, Shield, TrendingUp } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 -z-10">
            <img 
              src={aboutHero} 
              alt="Modern luxury apartment building" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                About RentalHub
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Connecting landlords and tenants directly for a seamless rental experience
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                At RentalHub, we believe finding a home should be simple, transparent, and direct. 
                We've created a platform that eliminates the middleman, allowing landlords and tenants 
                to connect directly. This means better prices for tenants, more control for landlords, 
                and a more personal rental experience for everyone.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                Our platform empowers thousands of people every day to find their perfect rental home 
                or list their property with confidence. We're committed to making the rental process 
                as smooth and stress-free as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="space-y-3">
                  <h3 className="text-5xl md:text-6xl font-bold text-primary">10,000+</h3>
                  <p className="text-xl text-muted-foreground font-medium">Active Listings</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-5xl md:text-6xl font-bold text-primary">50,000+</h3>
                  <p className="text-xl text-muted-foreground font-medium">Happy Tenants</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-5xl md:text-6xl font-bold text-primary">5,000+</h3>
                  <p className="text-xl text-muted-foreground font-medium">Landlords</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose RentalHub
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="group text-center space-y-4 p-6 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Home className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Wide Selection</h3>
                <p className="text-muted-foreground">
                  Browse thousands of properties from apartments to houses in your desired location
                </p>
              </div>

              <div className="group text-center space-y-4 p-6 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Direct Connection</h3>
                <p className="text-muted-foreground">
                  Connect directly with landlords without agency fees or hidden costs
                </p>
              </div>

              <div className="group text-center space-y-4 p-6 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Verified Listings</h3>
                <p className="text-muted-foreground">
                  All properties are verified to ensure quality and authenticity
                </p>
              </div>

              <div className="group text-center space-y-4 p-6 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Easy Process</h3>
                <p className="text-muted-foreground">
                  Simple, streamlined process from search to securing your new home
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                RentalHub was founded by a team of real estate professionals and tech enthusiasts 
                who experienced firsthand the frustrations of traditional rental processes. We saw 
                the need for a platform that puts people first—connecting them directly, transparently, 
                and efficiently.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Today, we're proud to serve communities across the country, helping thousands of 
                people find their perfect home and landlords find great tenants. Our commitment to 
                innovation and customer satisfaction drives everything we do.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
