import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import authBackground from "@/assets/auth-bg.jpg";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      setSent(true);
      toast.success("Password reset link sent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Error sending reset link");
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
            {!sent ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Reset Password</h2>
                  <p className="text-white/80 text-sm mt-2">Enter your email to receive a reset link</p>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-5">
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

                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-base font-medium" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
                <p className="text-white/80 mb-6">
                  We've sent a password reset link to <strong className="text-white">{email}</strong>
                </p>
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <Link to="/auth" className="text-white hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
