import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home for now - database setup needed
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dashboard functionality requires database setup. Redirecting to home...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
