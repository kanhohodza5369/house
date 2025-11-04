import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Property listings will be available once the database is properly configured.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
