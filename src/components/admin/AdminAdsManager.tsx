import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ToggleLeft, 
  ToggleRight,
  Search,
  Filter
} from "lucide-react";
import { AddAdDialog } from "./AddAdDialog";
import { AdminAdCard } from "./AdminAdCard";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: number;
  active: boolean;
  placement: "sidebar" | "footer" | "hero" | "between-cars";
}

const AdminAdsManager = () => {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: "1",
      title: "Premium Car Wash Service",
      description: "Professional car wash and detailing services",
      image: "/api/placeholder/300/200",
      link: "https://carwash.example.com",
      position: 1,
      active: true,
      placement: "hero"
    },
    {
      id: "2", 
      title: "Auto Insurance Deals",
      description: "Get the best insurance rates for your vehicle",
      image: "/api/placeholder/300/200",
      link: "https://insurance.example.com",
      position: 2,
      active: false,
      placement: "sidebar"
    },
    {
      id: "3",
      title: "Car Accessories Store",
      description: "Quality accessories for all car models",
      image: "/api/placeholder/300/200", 
      link: "https://accessories.example.com",
      position: 3,
      active: true,
      placement: "between-cars"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlacement, setFilterPlacement] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPlacement === "all" || ad.placement === filterPlacement;
    return matchesSearch && matchesFilter;
  });

  const handleAddAd = (newAd: Omit<Ad, 'id' | 'position'>) => {
    const ad: Ad = {
      ...newAd,
      id: Date.now().toString(),
      position: ads.length + 1,
      active: newAd.active ?? true
    };
    setAds([...ads, ad]);
    setIsAddDialogOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, active: !ad.active } : ad
    ));
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case "homepage": return "bg-blue-500";
      case "sidebar": return "bg-green-500";
      case "banner": return "bg-purple-500";
      case "footer": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Ads Management</h2>
          <p className="text-text-secondary">Manage advertisements and promotions</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Ad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{ads.length}</div>
            <div className="text-sm text-text-secondary">Total Ads</div>
          </CardContent>
        </Card>
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{ads.filter(ad => ad.active).length}</div>
            <div className="text-sm text-text-secondary">Active Ads</div>
          </CardContent>
        </Card>
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-500">{ads.filter(ad => !ad.active).length}</div>
            <div className="text-sm text-text-secondary">Inactive Ads</div>
          </CardContent>
        </Card>
        <Card className="bg-dark-surface border-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gold">{ads.filter(ad => ad.placement === "hero").length}</div>
            <div className="text-sm text-text-secondary">Hero Ads</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-dark-surface border-border">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <Input
                  placeholder="Search ads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterPlacement}
                onChange={(e) => setFilterPlacement(e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Placements</option>
                <option value="hero">Hero</option>
                <option value="sidebar">Sidebar</option>
                <option value="between-cars">Between Cars</option>
                <option value="footer">Footer</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ads List */}
      <div className="grid gap-4">
        {filteredAds.length === 0 ? (
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-8 text-center">
              <p className="text-text-secondary">No ads found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAds.map((ad) => (
            <AdminAdCard
              key={ad.id}
              ad={ad}
              onToggleActive={handleToggleActive}
              onDelete={handleDeleteAd}
            />
          ))
        )}
      </div>

      {/* Add Ad Dialog */}
      <AddAdDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAd={handleAddAd}
      />
    </div>
  );
};

export default AdminAdsManager;