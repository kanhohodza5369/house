import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Search, MessageSquare, FileCheck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import servicesHero from "@/assets/services-hero.jpg";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 -z-10">
            <img 
              src={servicesHero} 
              alt="Professional property management team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Everything you need to find your perfect rental or list your property
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                What We Offer
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Service 1 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Property Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse through thousands of verified listings. Use our advanced filters to find properties that match your exact requirements.
                </p>
              </div>

              {/* Service 2 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Property Listing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  List your property for free and reach thousands of potential tenants. Create detailed listings with photos and amenities.
                </p>
              </div>

              {/* Service 3 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Direct Messaging</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect directly with landlords or tenants through our secure messaging system. Schedule viewings and discuss terms.
                </p>
              </div>

              {/* Service 4 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Verification Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All listings go through our verification process to ensure legitimacy. Background checks and document verification available.
                </p>
              </div>

              {/* Service 5 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Secure Payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Process deposits and rent payments securely through our platform. Track payment history and receive automated reminders.
                </p>
              </div>

              {/* Service 6 */}
              <div className="group bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated support team is available around the clock to assist with any questions or issues you may encounter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Tenants Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  For Tenants
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-foreground">Find Your Dream Home</h3>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Access to thousands of verified property listings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Advanced search filters for precise results</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Save favorite properties and set alerts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Virtual tours and detailed photo galleries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Direct communication with landlords</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-foreground">Seamless Experience</h3>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>No agency fees or hidden costs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Easy online application process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Secure payment processing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Digital lease agreements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Ongoing support throughout your tenancy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Landlords Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  For Landlords
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-foreground">List Your Property</h3>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Free property listing with unlimited photos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Reach thousands of potential tenants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Easy-to-use dashboard for managing listings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Analytics to track views and inquiries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Featured listing options for maximum visibility</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-foreground">Manage with Ease</h3>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Screen potential tenants effectively</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Secure messaging system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Digital contract management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Automated rent collection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold text-xl">✓</span>
                      <span>Maintenance request tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Join thousands of satisfied users who found their perfect rental match
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/properties">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                    Browse Properties
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary">
                    List Your Property
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
