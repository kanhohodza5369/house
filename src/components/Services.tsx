import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import apartmentsIcon from "@/assets/apartments-icon.jpg";
import housesIcon from "@/assets/houses-icon.jpg";
import roomsIcon from "@/assets/rooms-icon.jpg";
import sharedIcon from "@/assets/shared-icon.jpg";

const services = [
  {
    title: "Apartments",
    description: "Find your perfect apartment in the city. Modern, comfortable, and conveniently located.",
    image: apartmentsIcon,
  },
  {
    title: "Houses",
    description: "Discover spacious houses for rent. Perfect for families looking for more space and privacy.",
    image: housesIcon,
  },
  {
    title: "Rooms",
    description: "Affordable single rooms for students and young professionals. Start your journey here.",
    image: roomsIcon,
  },
  {
    title: "Shared Spaces",
    description: "Co-living spaces that foster community. Share experiences while saving on rent.",
    image: sharedIcon,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a wide range of rental options to suit your needs and budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
