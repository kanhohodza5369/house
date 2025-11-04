import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import authBackground from "@/assets/auth-bg.jpg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"tenant" | "landlord">("tenant");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            phone: phone,
            user_type: userType,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Account created successfully! Redirecting to dashboard...");
        // Auto-login is enabled, so redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 -z-10">
        <img 
          src={authBackground} 
          alt="Luxury property interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="w-full max-w-md">
        <Card className="backdrop-blur-2xl bg-white/10 border border-white/30 shadow-2xl">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-white/80 text-sm mt-2">Join our rental community</p>
            </div>
            
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-white">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-white">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-white">I am a</Label>
                <RadioGroup value={userType} onValueChange={(value: any) => setUserType(value)}>
                  <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
                    <RadioGroupItem value="tenant" id="tenant" className="border-white text-white" />
                    <Label htmlFor="tenant" className="text-white cursor-pointer flex-1">Tenant - Looking for property</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
                    <RadioGroupItem value="landlord" id="landlord" className="border-white text-white" />
                    <Label htmlFor="landlord" className="text-white cursor-pointer flex-1">Landlord - Listing property</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-base font-medium" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-white/80">
                Already have an account?{" "}
                <Link to="/auth" className="text-white hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
