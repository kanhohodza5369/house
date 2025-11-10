import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import apartmentsIcon from "@/assets/apartments-icon.jpg";
import housesIcon from "@/assets/houses-icon.jpg";
import roomsIcon from "@/assets/rooms-icon.jpg";
import { toast } from "sonner";

const Plans = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
    setLoading(false);
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 15,
      period: "month",
      description: "For landlords with 1-5 properties",
      features: [
        "List up to 5 properties",
        "Basic analytics",
        "Property management",
        "Tenant inquiries",
        "Email support"
      ],
      limitations: [
        "Limited to 5 properties",
        "Basic analytics only"
      ],
      image: apartmentsIcon,
      popular: false
    },
    {
      id: "standard",
      name: "Standard",
      price: 35,
      period: "month",
      description: "For growing landlords",
      features: [
        "List up to 20 properties",
        "Advanced analytics",
        "Property management",
        "Tenant inquiries",
        "Priority support",
        "Featured listings"
      ],
      limitations: [
        "Limited to 20 properties"
      ],
      image: housesIcon,
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: 75,
      period: "month",
      description: "For serious landlords",
      features: [
        "Unlimited properties",
        "Advanced analytics",
        "Priority support",
        "Featured listings",
        "Property promotion",
        "Custom branding",
        "Dedicated account manager"
      ],
      limitations: [],
      image: roomsIcon,
      popular: false
    }
  ];

  const handleSelectPlan = async (planId: string) => {
    if (!user) return;

    setSelectedPlan(planId);

    try {
      const selectedPlanData = plans.find(p => p.id === planId);
      if (!selectedPlanData) return;

      // Navigate to payment page with plan details
      navigate(`/payment?plan=${planId}&name=${selectedPlanData.name}&price=${selectedPlanData.price}`);
    } catch (error: any) {
      toast.error("Failed to proceed to payment: " + error.message);
      setSelectedPlan(null);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 h-full flex flex-col ${
                selectedPlan === plan.id
                  ? 'border-primary shadow-lg ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >

              <div className="relative">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold mb-1">
                    ${plan.price}
                    <span className="text-lg font-normal opacity-90">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">{plan.description}</p>
                </div>
              </div>
              <CardHeader className="pt-4">
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold text-sm">Features:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Limitations:</h4>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>•</span>
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <Button
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? "Processing..." : `Choose ${plan.name}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Plans;