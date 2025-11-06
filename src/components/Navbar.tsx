import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import apartmentsIcon from "@/assets/apartments-icon.jpg";
import housesIcon from "@/assets/houses-icon.jpg";
import roomsIcon from "@/assets/rooms-icon.jpg";
import sharedIcon from "@/assets/shared-icon.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error logging out");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            RentalHub
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Properties <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-background border-border z-50">
                  <Link to="/properties?type=apartments">
                    <DropdownMenuItem className="p-4 cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-4">
                        <img src={apartmentsIcon} alt="Apartments" className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-foreground">Apartments</div>
                          <div className="text-sm text-muted-foreground">Find your perfect apartment in the city</div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/properties?type=houses">
                    <DropdownMenuItem className="p-4 cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-4">
                        <img src={housesIcon} alt="Houses" className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-foreground">Houses</div>
                          <div className="text-sm text-muted-foreground">Browse spacious houses for families</div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/properties?type=rooms">
                    <DropdownMenuItem className="p-4 cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-4">
                        <img src={roomsIcon} alt="Rooms" className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-foreground">Rooms</div>
                          <div className="text-sm text-muted-foreground">Affordable single rooms for rent</div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/properties?type=shared">
                    <DropdownMenuItem className="p-4 cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-4">
                        <img src={sharedIcon} alt="Shared Spaces" className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-foreground">Shared Spaces</div>
                          <div className="text-sm text-muted-foreground">Co-living spaces and shared rentals</div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Our Services
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
