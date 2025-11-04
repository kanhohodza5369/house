import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Users, Shield, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                About RentalHub
              </h1>
              <p className="text-xl text-muted-foreground">
                Connecting landlords and tenants directly for a seamless rental experience
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At RentalHub, we believe finding a home should be simple, transparent, and direct. 
                We've created a platform that eliminates the middleman, allowing landlords and tenants 
                to connect directly. This means better prices for tenants, more control for landlords, 
                and a more personal rental experience for everyone.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform empowers thousands of people every day to find their perfect rental home 
                or list their property with confidence. We're committed to making the rental process 
                as smooth and stress-free as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Why Choose RentalHub
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Wide Selection</h3>
                <p className="text-muted-foreground">
                  Browse thousands of properties from apartments to houses in your desired location
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Direct Connection</h3>
                <p className="text-muted-foreground">
                  Connect directly with landlords without agency fees or hidden costs
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Verified Listings</h3>
                <p className="text-muted-foreground">
                  All properties are verified to ensure quality and authenticity
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Easy Process</h3>
                <p className="text-muted-foreground">
                  Simple, streamlined process from search to securing your new home
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold text-primary">10,000+</h3>
                  <p className="text-lg text-muted-foreground">Active Listings</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold text-primary">50,000+</h3>
                  <p className="text-lg text-muted-foreground">Happy Tenants</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold text-primary">5,000+</h3>
                  <p className="text-lg text-muted-foreground">Landlords</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RentalHub was founded by a team of real estate professionals and tech enthusiasts 
                who experienced firsthand the frustrations of traditional rental processes. We saw 
                the need for a platform that puts people first—connecting them directly, transparently, 
                and efficiently.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
