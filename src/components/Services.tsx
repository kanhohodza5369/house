import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import apartmentsIcon from "@/assets/apartments-icon.jpg";
import housesIcon from "@/assets/houses-icon.jpg";
import roomsIcon from "@/assets/rooms-icon.jpg";
import sharedIcon from "@/assets/shared-icon.jpg";

const services = [
  {
    title: "Apartments",
    description: "Modern apartments with all amenities included. Perfect for professionals and small families.",
    image: apartmentsIcon,
  },
  {
    title: "Houses",
    description: "Spacious family homes with yards and privacy. Ideal for growing families.",
    image: housesIcon,
  },
  {
    title: "Single Rooms",
    description: "Affordable private rooms for students and young professionals starting out.",
    image: roomsIcon,
  },
  {
    title: "Shared Spaces",
    description: "Co-living spaces with shared amenities. Great for building community.",
    image: sharedIcon,
  },
];

const Services = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect rental option for your lifestyle and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
