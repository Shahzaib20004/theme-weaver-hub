import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import Header from "@/components/Header";
import AdminPasswordPrompt from "@/components/AdminPasswordPrompt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AdminCarCard } from "@/components/admin/AdminCarCard";
import { AdminAdCard } from "@/components/admin/AdminAdCard";
import { AddCarDialog } from "@/components/admin/AddCarDialog";
import { AddAdDialog } from "@/components/admin/AddAdDialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Star, Eye } from "lucide-react";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  location: string;
  rate: number;
  image: string;
  mileage: number;
  withDriver: boolean;
  availability: "available" | "rented" | "maintenance";
  featured: boolean;
  category: string;
  description: string;
  position: number;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: number;
  active: boolean;
  placement: "hero" | "sidebar" | "footer" | "between-cars";
}

const Admin = () => {
  const { toast } = useToast();
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    // Check if admin session exists and is valid (within 24 hours)
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      const sessionTime = parseInt(adminSession);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const currentTime = Date.now();
      
      if (currentTime - sessionTime < twentyFourHours) {
        setHasAdminAccess(true);
      } else {
        localStorage.removeItem('admin_session');
      }
    }
  }, []);
  
  const [cars, setCars] = useState<Car[]>([
    {
      id: "1",
      name: "Tesla Model S",
      brand: "Tesla",
      year: 2023,
      location: "New York",
      rate: 150,
      image: "/placeholder.svg",
      mileage: 0,
      withDriver: false,
      availability: "available",
      featured: true,
      category: "luxury",
      description: "Premium electric sedan",
      position: 1
    },
    {
      id: "2", 
      name: "BMW X5",
      brand: "BMW",
      year: 2022,
      location: "Los Angeles",
      rate: 120,
      image: "/placeholder.svg",
      mileage: 15000,
      withDriver: true,
      availability: "available",
      featured: false,
      category: "suv",
      description: "Luxury SUV with premium features",
      position: 2
    }
  ]);

  const [ads, setAds] = useState<Ad[]>([
    {
      id: "ad1",
      title: "Summer Special Offer",
      description: "Get 20% off on all bookings this summer!",
      image: "/placeholder.svg",
      link: "/cars",
      position: 1,
      active: true,
      placement: "hero"
    },
    {
      id: "ad2",
      title: "Premium Car Collection",
      description: "Discover our luxury vehicle lineup",
      image: "/placeholder.svg", 
      link: "/cars?category=luxury",
      position: 2,
      active: true,
      placement: "between-cars"
    }
  ]);

  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [isAddAdOpen, setIsAddAdOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent, type: 'cars' | 'ads') => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    if (type === 'cars') {
      setCars((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Update positions
        return newArray.map((item, index) => ({
          ...item,
          position: index + 1
        }));
      });
    } else {
      setAds((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Update positions
        return newArray.map((item, index) => ({
          ...item,
          position: index + 1
        }));
      });
    }

    toast({
      title: "Position Updated",
      description: `${type === 'cars' ? 'Car' : 'Ad'} position has been updated successfully.`,
    });
  };

  const toggleCarFeatured = (carId: string) => {
    setCars(cars.map(car => 
      car.id === carId ? { ...car, featured: !car.featured } : car
    ));
    toast({
      title: "Featured Status Updated",
      description: "Car featured status has been updated.",
    });
  };

  const toggleAdActive = (adId: string) => {
    setAds(ads.map(ad => 
      ad.id === adId ? { ...ad, active: !ad.active } : ad
    ));
    toast({
      title: "Ad Status Updated", 
      description: "Advertisement status has been updated.",
    });
  };

  const deleteCar = (carId: string) => {
    setCars(cars.filter(car => car.id !== carId));
    toast({
      title: "Car Deleted",
      description: "Car has been removed from the system.",
    });
  };

  const deleteAd = (adId: string) => {
    setAds(ads.filter(ad => ad.id !== adId));
    toast({
      title: "Ad Deleted",
      description: "Advertisement has been removed.",
    });
  };

  // Show password prompt if admin access not granted
  if (!hasAdminAccess) {
    return <AdminPasswordPrompt onSuccess={() => setHasAdminAccess(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage cars, advertisements, and website content</p>
        </div>

        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cars">Cars Management</TabsTrigger>
            <TabsTrigger value="ads">Ads Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Car Inventory</h2>
              <Button onClick={() => setIsAddCarOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Car
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Drag and Drop to Reorder Cars</CardTitle>
              </CardHeader>
              <CardContent>
                <DndContext 
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, 'cars')}
                >
                  <SortableContext 
                    items={cars.map(car => car.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {cars.map((car) => (
                        <AdminCarCard
                          key={car.id}
                          car={car}
                          onToggleFeatured={toggleCarFeatured}
                          onDelete={deleteCar}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Advertisement Management</h2>
              <Button onClick={() => setIsAddAdOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Ad
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Drag and Drop to Reorder Advertisements</CardTitle>
              </CardHeader>
              <CardContent>
                <DndContext 
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, 'ads')}
                >
                  <SortableContext 
                    items={ads.map(ad => ad.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {ads.map((ad) => (
                        <AdminAdCard
                          key={ad.id}
                          ad={ad}
                          onToggleActive={toggleAdActive}
                          onDelete={deleteAd}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cars.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {cars.filter(car => car.featured).length} featured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ads.filter(ad => ad.active).length}</div>
                  <p className="text-xs text-muted-foreground">
                    {ads.length} total ads
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {cars.filter(car => car.availability === 'available').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ready for booking
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold">System Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Website Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue="CarRental Pro" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="info@carrental.com" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable to show maintenance page to visitors
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddCarDialog 
        open={isAddCarOpen} 
        onOpenChange={setIsAddCarOpen}
        onAddCar={(newCar) => {
          setCars([...cars, { ...newCar, position: cars.length + 1 }]);
          toast({
            title: "Car Added",
            description: "New car has been added to the inventory.",
          });
        }}
      />

      <AddAdDialog 
        open={isAddAdOpen} 
        onOpenChange={setIsAddAdOpen}
        onAddAd={(newAd) => {
          setAds([...ads, { ...newAd, position: ads.length + 1 }]);
          toast({
            title: "Ad Created",
            description: "New advertisement has been created.",
          });
        }}
      />
    </div>
  );
};

export default Admin;