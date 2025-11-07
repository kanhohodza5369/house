import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, MessageCircle, Phone, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [landlord, setLandlord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isInterested, setIsInterested] = useState(false);
  const [interestCount, setInterestCount] = useState(0);

  useEffect(() => {
    checkUser();
    fetchProperty();
    trackView();
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    // Check if user is already interested in this property
    if (user && id) {
      const { data: interestData } = await (supabase as any)
        .from("property_interest")
        .select("id")
        .eq("property_id", id)
        .eq("user_id", user.id)
        .single();

      setIsInterested(!!interestData);
    }
  };

  const fetchProperty = async () => {
    try {
      const { data: propertyData, error: propertyError } = await (supabase as any)
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (propertyError) throw propertyError;
      setProperty(propertyData);

      // Fetch landlord info
      if (propertyData) {
        const { data: landlordData } = await (supabase as any)
          .from("profiles")
          .select("*")
          .eq("id", (propertyData as any).landlord_id)
          .single();

        setLandlord(landlordData);
      }
    } catch (error: any) {
      toast({
        title: "Error loading property",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    if (!id) return;

    try {
      // Track property view
      await (supabase as any).from("property_views").insert({
        property_id: id,
        user_id: user?.id || null,
        session_id: sessionStorage.getItem("session_id") || Math.random().toString(36),
      });

      // Get interest count for this property
      const { count } = await (supabase as any)
        .from("property_interest")
        .select("*", { count: "exact", head: true })
        .eq("property_id", id);

      setInterestCount(count || 0);
    } catch (error) {
      // Silently fail for analytics tracking
      console.log("Analytics tracking failed:", error);
    }
  };

  const handleInterest = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to express interest in properties",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!id) return;

    try {
      if (isInterested) {
        // Remove interest
        await (supabase as any)
          .from("property_interest")
          .delete()
          .eq("property_id", id)
          .eq("user_id", user.id);

        setIsInterested(false);
        setInterestCount(prev => prev - 1);
        toast({
          title: "Interest removed",
          description: "You've removed your interest in this property",
        });
      } else {
        // Add interest
        await (supabase as any).from("property_interest").insert({
          property_id: id,
          user_id: user.id,
          contact_method: "whatsapp",
        });

        setIsInterested(true);
        setInterestCount(prev => prev + 1);
        toast({
          title: "Interest expressed",
          description: "The landlord has been notified of your interest",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppContact = () => {
    if (!landlord?.phone) {
      toast({
        title: "Phone number not available",
        description: "Landlord's phone number is not available for WhatsApp contact",
        variant: "destructive",
      });
      return;
    }

    // Remove + and spaces from phone number
    const phoneNumber = landlord.phone.replace(/[\+\s]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate("/properties")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {property.images && property.images.length > 0 ? (
            <>
              {/* Top row - 2 images */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-64">
                    <img
                      src={property.images[0]}
                      alt={`${property.title} 1`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-64">
                    <img
                      src={property.images[1] || property.images[0]}
                      alt={`${property.title} 2`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Bottom row - 1 image centered */}
              <Card className="col-span-2 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-64">
                    <img
                      src={property.images[2] || property.images[0]}
                      alt={`${property.title} 3`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="col-span-2">
              <Card className="h-64 flex items-center justify-center bg-muted">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No images available</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.address}, {property.city}, {property.state} {property.zip_code}</span>
                  </div>
                </div>
                <Badge className="text-lg">{property.property_type}</Badge>
              </div>

              <div className="flex items-center gap-6 text-lg">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                {property.square_feet && (
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    <span>{property.square_feet} sqft</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <>
                <Separator />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-6">
                  ${parseFloat(property.price).toLocaleString()}
                  <span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>

                <div className="space-y-3 mb-4">
                  <Button
                    onClick={handleInterest}
                    variant={isInterested ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                    disabled={user?.id === property.landlord_id}
                  >
                    <Heart className={`mr-2 h-5 w-5 ${isInterested ? 'fill-current' : ''}`} />
                    {isInterested ? "Interested" : "I'm Interested"}
                  </Button>
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full"
                    size="lg"
                    disabled={user?.id === property.landlord_id}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Landlord
                  </Button>
                </div>

                {landlord && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Listed by</h3>
                    <p className="text-muted-foreground">{landlord.full_name || "Landlord"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
