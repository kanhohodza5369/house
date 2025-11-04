import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddPropertyForm from "@/components/AddPropertyForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, MapPin, Bed, Bath, Square, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    
    // Get profile
    const { data: profileData } = await (supabase as any)
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    // Get properties if landlord
    if (profileData && (profileData as any).user_type === "landlord") {
      fetchProperties(user.id);
    }
    
    setLoading(false);
  };

  const fetchProperties = async (userId: string) => {
    const { data, error } = await (supabase as any)
      .from("properties")
      .select("*")
      .eq("landlord_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading properties",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProperties(data || []);
    }
  };

  const handleDelete = async (propertyId: string) => {
    const { error } = await (supabase as any)
      .from("properties")
      .delete()
      .eq("id", propertyId);

    if (error) {
      toast({
        title: "Error deleting property",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      fetchProperties(user.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || "User"}
          </p>
        </div>

        {profile?.user_type === "landlord" ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="add">Add Property</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Properties</h2>
                <Button onClick={() => setActiveTab("add")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>

              {properties.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      You haven't listed any properties yet.
                    </p>
                    <Button onClick={() => setActiveTab("add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Property
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="h-48 bg-muted relative">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <Badge
                          className="absolute top-4 right-4"
                          variant={property.available ? "default" : "secondary"}
                        >
                          {property.available ? "Available" : "Rented"}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="line-clamp-1">
                            {property.city}, {property.state}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          {property.bedrooms && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                          {property.square_feet && (
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              <span>{property.square_feet}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${parseFloat(property.price).toLocaleString()}
                          <span className="text-sm text-muted-foreground font-normal">/mo</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => navigate(`/properties/${property.id}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Property</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this property? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(property.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="add">
              <AddPropertyForm onSuccess={() => {
                setActiveTab("properties");
                fetchProperties(user.id);
              }} />
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{profile?.full_name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile?.phone || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <Badge>{profile?.user_type}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Tenant Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Browse available properties and contact landlords to find your perfect home.
              </p>
              <Button onClick={() => navigate("/properties")}>
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
