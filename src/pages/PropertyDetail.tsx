import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Bed, Bath, Square, Check, ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [landlord, setLandlord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    fetchProperty();
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
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

  const handleContactLandlord = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to contact the landlord",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      // Check if conversation already exists
      const { data: existingConv } = await (supabase as any)
        .from("conversations")
        .select("id")
        .eq("property_id", property.id)
        .eq("tenant_id", user.id)
        .eq("landlord_id", property.landlord_id)
        .single();

      if (existingConv && (existingConv as any).id) {
        navigate(`/messages/${(existingConv as any).id}`);
        return;
      }

      // Create new conversation
      const { data: newConv, error } = await (supabase as any)
        .from("conversations")
        .insert({
          property_id: property.id,
          tenant_id: user.id,
          landlord_id: property.landlord_id,
        })
        .select()
        .single();

      if (error) throw error;

      if (newConv && (newConv as any).id) {
        navigate(`/messages/${(newConv as any).id}`);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {property.images && property.images.length > 0 ? (
            <>
              <div className="md:col-span-2 h-96 rounded-lg overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {property.images.slice(1, 5).map((image: string, idx: number) => (
                <div key={idx} className="h-48 rounded-lg overflow-hidden">
                  <img src={image} alt={`${property.title} ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </>
          ) : (
            <div className="md:col-span-2 h-96 rounded-lg bg-muted flex items-center justify-center">
              <MapPin className="h-24 w-24 text-muted-foreground" />
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

                <Button
                  onClick={handleContactLandlord}
                  className="w-full mb-4"
                  size="lg"
                  disabled={user?.id === property.landlord_id}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Landlord
                </Button>

                {landlord && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Listed by</h3>
                    <p className="text-muted-foreground">{landlord.full_name || "Landlord"}</p>
                    {landlord.phone && (
                      <p className="text-sm text-muted-foreground mt-1">{landlord.phone}</p>
                    )}
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
