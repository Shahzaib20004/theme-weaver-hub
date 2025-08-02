import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Phone, 
  Star,
  TrendingUp,
  Users,
  Calendar,
  DollarSign
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  carIds: string[];
  isActive: boolean;
}

interface DealerStats {
  totalCars: number;
  activeDeals: number;
  totalInquiries: number;
  monthlyRevenue: number;
}

const DealerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dealerInfo, setDealerInfo] = useState({
    name: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    profileImage: ""
  });
  const [deals, setDeals] = useState<Deal[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [stats, setStats] = useState<DealerStats>({
    totalCars: 0,
    activeDeals: 0,
    totalInquiries: 0,
    monthlyRevenue: 0
  });
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    description: "",
    discount: 0,
    validUntil: "",
    carIds: [] as string[]
  });

  useEffect(() => {
    if (user) {
      fetchDealerData();
      fetchDeals();
      fetchCars();
      fetchStats();
    }
  }, [user]);

  const fetchDealerData = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('dealer_name, phone, email, location, description, profile_image')
        .eq('user_id', user?.id)
        .single();

      if (profile) {
        setDealerInfo({
          name: profile.dealer_name || "",
          description: profile.description || "",
          location: profile.location || "",
          phone: profile.phone || "",
          email: profile.email || "",
          profileImage: profile.profile_image || ""
        });
      }
    } catch (error) {
      console.error('Error fetching dealer data:', error);
    }
  };

  const fetchDeals = async () => {
    // Mock deals data - replace with actual Supabase query
    setDeals([
      {
        id: "1",
        title: "Summer Special",
        description: "20% off on all sedan rentals",
        discount: 20,
        validUntil: "2024-03-31",
        carIds: ["1", "2"],
        isActive: true
      },
      {
        id: "2", 
        title: "Weekend Package",
        description: "Special rates for weekend bookings",
        discount: 15,
        validUntil: "2024-04-15",
        carIds: ["3", "4"],
        isActive: true
      }
    ]);
  };

  const fetchCars = async () => {
    try {
      const { data: carsData } = await supabase
        .from('cars')
        .select('*')
        .eq('dealer_id', user?.id);

      setCars(carsData || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchStats = async () => {
    // Mock stats - replace with actual calculations
    setStats({
      totalCars: cars.length,
      activeDeals: deals.filter(d => d.isActive).length,
      totalInquiries: 45,
      monthlyRevenue: 125000
    });
  };

  const handleAddDeal = async () => {
    try {
      // Add deal logic here
      const deal: Deal = {
        id: Date.now().toString(),
        ...newDeal,
        isActive: true
      };
      
      setDeals([...deals, deal]);
      setIsAddingDeal(false);
      setNewDeal({
        title: "",
        description: "",
        discount: 0,
        validUntil: "",
        carIds: []
      });
      
      toast({
        title: "Deal Added",
        description: "Your deal has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add deal",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await supabase
        .from('profiles')
        .update({
          dealer_name: dealerInfo.name,
          description: dealerInfo.description,
          location: dealerInfo.location,
          phone: dealerInfo.phone
        })
        .eq('user_id', user?.id);

      toast({
        title: "Profile Updated",
        description: "Your dealership profile has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">Dealer Dashboard</h1>
          <p className="text-text-secondary">Manage your dealership, cars, and deals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Cars</p>
                  <p className="text-2xl font-bold text-gold">{stats.totalCars}</p>
                </div>
                <Car className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Active Deals</p>
                  <p className="text-2xl font-bold text-green-500">{stats.activeDeals}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Inquiries</p>
                  <p className="text-2xl font-bold text-blue-500">{stats.totalInquiries}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-purple-500">Rs {stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-dark-surface">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-black">Profile</TabsTrigger>
            <TabsTrigger value="deals" className="data-[state=active]:bg-gold data-[state=active]:text-black">Deals</TabsTrigger>
            <TabsTrigger value="cars" className="data-[state=active]:bg-gold data-[state=active]:text-black">My Cars</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gold data-[state=active]:text-black">Analytics</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold">Dealership Profile</CardTitle>
                <CardDescription>Manage your dealership information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Dealership Name</Label>
                    <Input
                      value={dealerInfo.name}
                      onChange={(e) => setDealerInfo({...dealerInfo, name: e.target.value})}
                      className="bg-dark-elevated border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Phone</Label>
                    <Input
                      value={dealerInfo.phone}
                      onChange={(e) => setDealerInfo({...dealerInfo, phone: e.target.value})}
                      className="bg-dark-elevated border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Location</Label>
                  <Input
                    value={dealerInfo.location}
                    onChange={(e) => setDealerInfo({...dealerInfo, location: e.target.value})}
                    className="bg-dark-elevated border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Description</Label>
                  <Textarea
                    value={dealerInfo.description}
                    onChange={(e) => setDealerInfo({...dealerInfo, description: e.target.value})}
                    className="bg-dark-elevated border-border text-foreground"
                    rows={4}
                  />
                </div>

                <Button onClick={handleUpdateProfile} className="w-full md:w-auto">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Manage Deals</h2>
                <Button 
                  onClick={() => setIsAddingDeal(true)} 
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Deal
                </Button>
              </div>

              {/* Add Deal Form */}
              {isAddingDeal && (
                <Card className="bg-dark-surface border-border">
                  <CardHeader>
                    <CardTitle className="text-gold">Create New Deal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Deal Title</Label>
                        <Input
                          value={newDeal.title}
                          onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                          className="bg-dark-elevated border-border text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Discount (%)</Label>
                        <Input
                          type="number"
                          value={newDeal.discount}
                          onChange={(e) => setNewDeal({...newDeal, discount: parseInt(e.target.value)})}
                          className="bg-dark-elevated border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newDeal.description}
                        onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                        className="bg-dark-elevated border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Valid Until</Label>
                      <Input
                        type="date"
                        value={newDeal.validUntil}
                        onChange={(e) => setNewDeal({...newDeal, validUntil: e.target.value})}
                        className="bg-dark-elevated border-border text-foreground"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddDeal}>Create Deal</Button>
                      <Button variant="outline" onClick={() => setIsAddingDeal(false)}>Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Deals List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deals.map((deal) => (
                  <Card key={deal.id} className="bg-dark-surface border-border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{deal.title}</h3>
                          <p className="text-text-secondary">{deal.description}</p>
                        </div>
                        <Badge variant={deal.isActive ? "default" : "secondary"}>
                          {deal.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gold">{deal.discount}%</span>
                          <span className="text-text-secondary">discount</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Calendar className="w-4 h-4" />
                          <span>Valid until {deal.validUntil}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Cars Tab */}
          <TabsContent value="cars">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">My Vehicles</h2>
                <Button asChild>
                  <Link to="/add-car">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vehicle
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <Card key={car.id} className="bg-dark-surface border-border">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-dark-elevated rounded-lg mb-4 flex items-center justify-center">
                        <Car className="w-12 h-12 text-text-secondary" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">{car.name}</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>{car.brand} • {car.year}</p>
                        <p className="text-gold font-medium">Rs {car.daily_rate}/day</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold">Analytics & Reports</CardTitle>
                <CardDescription>Track your performance and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Coming Soon</h3>
                  <p className="text-text-secondary">Detailed analytics and reporting features will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DealerDashboard;