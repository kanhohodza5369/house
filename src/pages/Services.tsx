import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Search, MessageSquare, FileCheck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to find your perfect rental or list your property
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Service 1 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Property Search</h3>
                <p className="text-muted-foreground">
                  Browse through thousands of verified listings. Use our advanced filters to find properties that match your exact requirements, from location to amenities.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Property Listing</h3>
                <p className="text-muted-foreground">
                  List your property for free and reach thousands of potential tenants. Create detailed listings with photos, descriptions, and amenities.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Direct Messaging</h3>
                <p className="text-muted-foreground">
                  Connect directly with landlords or tenants through our secure messaging system. Schedule viewings and discuss terms without intermediaries.
                </p>
              </div>

              {/* Service 4 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Verification Services</h3>
                <p className="text-muted-foreground">
                  All listings go through our verification process to ensure legitimacy. Background checks and document verification available for added security.
                </p>
              </div>

              {/* Service 5 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Process deposits and rent payments securely through our platform. Track payment history and receive automated reminders.
                </p>
              </div>

              {/* Service 6 */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our dedicated support team is available around the clock to assist with any questions or issues you may encounter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Tenants Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                For Tenants
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Find Your Dream Home</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Access to thousands of verified property listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Advanced search filters for precise results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Save favorite properties and set alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Virtual tours and detailed photo galleries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Direct communication with landlords</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Seamless Experience</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>No agency fees or hidden costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Easy online application process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Secure payment processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Digital lease agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Ongoing support throughout your tenancy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Landlords Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                For Landlords
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">List Your Property</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Free property listing with unlimited photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Reach thousands of potential tenants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Easy-to-use dashboard for managing listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Analytics to track views and inquiries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Featured listing options for maximum visibility</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Manage with Ease</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Screen potential tenants effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Secure messaging system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Digital contract management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Automated rent collection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Maintenance request tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of satisfied users who found their perfect rental match
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/properties">
                  <Button size="lg" className="w-full sm:w-auto">
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
      </main>

      <Footer />
    </div>
  );
};

export default Services;
