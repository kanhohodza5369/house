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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { Plus, MapPin, Bed, Bath, Square, Edit, Trash2, Eye, Heart, Home } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
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
  const [analytics, setAnalytics] = useState<any>(null);
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

    // Get properties and analytics if landlord
    if (profileData && (profileData as any).user_type === "landlord") {
      fetchProperties(user.id);
      fetchAnalytics(user.id);
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

  const fetchAnalytics = async (userId: string) => {
    try {
      // Get total views for all landlord's properties
      const { data: viewsData, error: viewsError } = await (supabase as any)
        .from("property_views")
        .select(`
          property_id,
          properties!inner(title)
        `)
        .eq("properties.landlord_id", userId);

      // Get total interest for all landlord's properties
      const { data: interestData, error: interestError } = await (supabase as any)
        .from("property_interest")
        .select(`
          property_id,
          properties!inner(title)
        `)
        .eq("properties.landlord_id", userId);

      if (viewsError || interestError) {
        console.log("Analytics fetch error:", viewsError || interestError);
        setAnalytics({
          totalViews: 0,
          totalInterest: 0,
          propertyStats: {},
        });
        return;
      }

      // Calculate analytics
      const totalViews = viewsData?.length || 0;
      const totalInterest = interestData?.length || 0;

      // Group by property from the fetched data
      const propertyStats = {};
      const allPropertyIds = new Set([
        ...viewsData.map(v => v.property_id),
        ...interestData.map(i => i.property_id)
      ]);

      allPropertyIds.forEach(propertyId => {
        const propertyViews = viewsData?.filter(v => v.property_id === propertyId).length || 0;
        const propertyInterest = interestData?.filter(i => i.property_id === propertyId).length || 0;
        const title = viewsData.find(v => v.property_id === propertyId)?.properties?.title ||
                      interestData.find(i => i.property_id === propertyId)?.properties?.title || 'Unknown Property';

        propertyStats[propertyId] = {
          title,
          views: propertyViews,
          interest: propertyInterest,
        };
      });

      setAnalytics({
        totalViews,
        totalInterest,
        propertyStats,
      });
    } catch (error) {
      console.log("Analytics error:", error);
      setAnalytics({
        totalViews: 0,
        totalInterest: 0,
        propertyStats: {},
      });
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
      fetchAnalytics(user.id);
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
            <div className="bg-blue-50 rounded-lg w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 gap-2">
                <TabsTrigger value="properties" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white text-base py-3 text-center">My Properties</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white text-base py-3 text-center">Analytics</TabsTrigger>
                <TabsTrigger value="add" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white text-base py-3 text-center">Add Property</TabsTrigger>
              </TabsList>
            </div>

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

            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Analytics</h2>
                <p className="text-muted-foreground mb-6">
                  Track views and interest in your properties
                </p>
              </div>

              {analytics ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold">{analytics.totalViews}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Interest</p>
                        <p className="text-2xl font-bold">{analytics.totalInterest}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Properties</p>
                        <p className="text-2xl font-bold">{properties.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">Loading analytics...</p>
                  </CardContent>
                </Card>
              )}

              {analytics && Object.keys(analytics.propertyStats).length > 0 && (
                <>
                  {/* Analytics Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                            <p className="text-3xl font-bold">{properties.length}</p>
                          </div>
                          <Home className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                            <p className="text-3xl font-bold">{analytics.totalViews}</p>
                          </div>
                          <Eye className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Interest</p>
                            <p className="text-3xl font-bold">{analytics.totalInterest}</p>
                          </div>
                          <Heart className="h-8 w-8 text-red-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg. Views/Property</p>
                            <p className="text-3xl font-bold">
                              {properties.length > 0 ? Math.round(analytics.totalViews / properties.length) : 0}
                            </p>
                          </div>
                          <Eye className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Property Performance Bar Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Performance</CardTitle>
                        <p className="text-sm text-muted-foreground">Views and interest by property</p>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={{
                            views: {
                              label: "Views",
                              color: "hsl(var(--chart-1))",
                            },
                            interest: {
                              label: "Interest",
                              color: "hsl(var(--chart-2))",
                            },
                          }}
                          className="h-[300px]"
                        >
                          <BarChart data={Object.entries(analytics.propertyStats).map(([propertyId, stats]: [string, any]) => ({
                            name: stats.title.length > 15 ? stats.title.substring(0, 15) + '...' : stats.title,
                            views: stats.views,
                            interest: stats.interest,
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="views" fill="var(--color-views)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="interest" fill="var(--color-interest)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Property Distribution Pie Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Distribution</CardTitle>
                        <p className="text-sm text-muted-foreground">Views distribution across properties</p>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={{
                            views: {
                              label: "Views",
                            },
                          }}
                          className="h-[300px]"
                        >
                          <PieChart>
                            <Pie
                              data={Object.entries(analytics.propertyStats).map(([propertyId, stats]: [string, any]) => ({
                                name: stats.title.length > 20 ? stats.title.substring(0, 20) + '...' : stats.title,
                                value: stats.views,
                              }))}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {Object.entries(analytics.propertyStats).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Trend Chart */}
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Engagement Trend</CardTitle>
                      <p className="text-sm text-muted-foreground">Views and interest over time</p>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          views: {
                            label: "Views",
                            color: "hsl(var(--chart-1))",
                          },
                          interest: {
                            label: "Interest",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <AreaChart data={Object.entries(analytics.propertyStats).map(([propertyId, stats]: [string, any]) => ({
                          name: stats.title.length > 15 ? stats.title.substring(0, 15) + '...' : stats.title,
                          views: stats.views,
                          interest: stats.interest,
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area type="monotone" dataKey="views" stackId="1" stroke="var(--color-views)" fill="var(--color-views)" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="interest" stackId="1" stroke="var(--color-interest)" fill="var(--color-interest)" fillOpacity={0.6} />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Detailed Property List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Property Analytics</CardTitle>
                      <p className="text-sm text-muted-foreground">Individual property performance metrics</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(analytics.propertyStats).map(([propertyId, stats]: [string, any]) => (
                          <div key={propertyId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <h4 className="font-medium">{stats.title}</h4>
                              <div className="flex items-center gap-6 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {stats.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {stats.interest} interested
                                </span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {stats.views > 0 ? `${Math.round((stats.interest / stats.views) * 100)}%` : '0%'} conversion rate
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="add">
              <AddPropertyForm onSuccess={() => {
                setActiveTab("properties");
                fetchProperties(user.id);
                fetchAnalytics(user.id);
              }} />
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
