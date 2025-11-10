import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import paymentBg from "@/assets/payment-bg.jpg";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const planId = searchParams.get("plan");
  const planName = searchParams.get("name");
  const planPrice = searchParams.get("price");

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
  };

  const paymentMethods = [
    {
      id: "visa",
      name: "Visa",
      icon: CreditCard,
      description: "Pay with Visa credit/debit card",
      color: "text-blue-600"
    },
    {
      id: "mastercard",
      name: "MasterCard",
      icon: CreditCard,
      description: "Pay with MasterCard credit/debit card",
      color: "text-red-600"
    },
    {
      id: "ecocash",
      name: "EcoCash",
      icon: Smartphone,
      description: "Pay with EcoCash mobile money",
      color: "text-green-600"
    },
    {
      id: "innbucks",
      name: "InnBucks",
      icon: Wallet,
      description: "Pay with InnBucks digital wallet",
      color: "text-purple-600"
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod || !planId) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);

    try {
      // Here you would integrate with your payment processor
      // For now, we'll simulate payment processing

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user subscription
      const { error } = await (supabase as any)
        .from("profiles")
        .update({
          subscription_plan: planId,
          subscription_status: "active"
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success(`Payment successful! ${planName} plan activated.`);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Payment failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!planId || !planName || !planPrice) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Plan Selection</h1>
            <p className="text-muted-foreground mb-6">Please select a plan first.</p>
            <Button onClick={() => navigate("/plans")}>
              Go to Plans
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      <div className="absolute inset-0 -z-10">
        <img
          src={paymentBg}
          alt="Payment background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">
              Selected Plan: <span className="font-semibold">{planName}</span> - ${planPrice}/month
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <IconComponent className={`h-6 w-6 ${method.color}`} />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {selectedMethod && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMethod === "visa" || selectedMethod === "mastercard" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                      />
                    </div>
                  </>
                ) : selectedMethod === "ecocash" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">EcoCash Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+263 77 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        value={`$${planPrice}`}
                        readOnly
                      />
                    </div>
                  </>
                ) : selectedMethod === "innbucks" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="walletId">InnBucks Wallet ID</Label>
                      <Input
                        id="walletId"
                        placeholder="Enter your wallet ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN</Label>
                      <Input
                        id="pin"
                        placeholder="Enter your PIN"
                        type="password"
                        maxLength={4}
                      />
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/plans")}
            >
              Back to Plans
            </Button>
            <Button
              className="flex-1"
              onClick={handlePayment}
              disabled={!selectedMethod || loading}
            >
              {loading ? "Processing..." : `Pay $${planPrice}`}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;