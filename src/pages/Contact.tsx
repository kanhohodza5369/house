import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import contactHero from "@/assets/contact-hero.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 -z-10">
            <img 
              src={contactHero} 
              alt="Customer service reception area" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Have questions? We're here to help you find your perfect rental
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <div className="w-24 h-1 bg-primary mb-6" />
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Reach out to us through any of the following channels. Our team is ready to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground">support@rentalhub.com</p>
                      <p className="text-muted-foreground">info@rentalhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Office</h3>
                      <p className="text-muted-foreground">123 Rental Street</p>
                      <p className="text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Clock className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h3 className="font-semibold text-foreground text-lg mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    For urgent matters outside business hours, our support team is available 24/7 through our online chat system.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-10 shadow-lg">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">Fill out the form and we'll be in touch soon</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                        className="resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 text-base" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-foreground text-xl mb-3">
                    How do I list my property?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simply create an account, click on "List Your Property", and follow the step-by-step process to add your property details, photos, and pricing information.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-foreground text-xl mb-3">
                    Are there any fees for tenants?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No, browsing and contacting landlords is completely free for tenants. We don't charge any agency fees or hidden costs.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-foreground text-xl mb-3">
                    How are properties verified?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All listings go through our verification process where we check property ownership, photos, and details to ensure authenticity and quality.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-foreground text-xl mb-3">
                    Can I schedule property viewings online?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, you can message landlords directly through our platform to schedule viewings at your convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
