import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Search, Car, MessageCircle, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

interface Dealership {
  id: string;
  name: string;
  profileImage: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  description: string;
  totalCars: number;
  isOnline: boolean;
  lastSeen: string;
  specialOffers: string[];
  verified: boolean;
}

const Dealerships = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDealership, setSelectedDealership] = useState<string | null>(null);

  const dealerships: Dealership[] = [
    {
      id: "1",
      name: "Toyota Center Karachi",
      profileImage: "/api/placeholder/60/60",
      rating: 4.8,
      reviews: 256,
      location: "Shahrah-e-Faisal, Karachi",
      phone: "+92-21-34567890",
      email: "info@toyotakarachi.com",
      description: "Authorized Toyota dealer with premium vehicles",
      totalCars: 45,
      isOnline: true,
      lastSeen: "online",
      specialOffers: ["20% off on Corolla", "Free insurance"],
      verified: true
    },
    {
      id: "2", 
      name: "Honda Premier Motors",
      profileImage: "/api/placeholder/60/60",
      rating: 4.6,
      reviews: 189,
      location: "Defence Housing Authority, Karachi",
      phone: "+92-21-35567890",
      email: "sales@hondapremier.com",
      description: "Premium Honda dealership with latest models",
      totalCars: 32,
      isOnline: false,
      lastSeen: "last seen 2 hours ago",
      specialOffers: ["Weekend special deals"],
      verified: true
    },
    {
      id: "3",
      name: "Suzuki Elite Auto",
      profileImage: "/api/placeholder/60/60", 
      rating: 4.7,
      reviews: 143,
      location: "Gulshan-e-Iqbal, Karachi",
      phone: "+92-21-36567890",
      email: "contact@suzukielite.com",
      description: "Largest Suzuki dealer with extensive inventory",
      totalCars: 38,
      isOnline: true,
      lastSeen: "online",
      specialOffers: ["Buy 1 Get service free", "Low down payment"],
      verified: true
    },
    {
      id: "4",
      name: "KIA Motors Hub",
      profileImage: "/api/placeholder/60/60",
      rating: 4.5,
      reviews: 98,
      location: "Clifton Block 4, Karachi",
      phone: "+92-21-37567890",
      email: "info@kiahub.com",
      description: "Modern KIA dealership with cutting-edge vehicles",
      totalCars: 28,
      isOnline: false,
      lastSeen: "last seen 30 minutes ago",
      specialOffers: ["Student discount available"],
      verified: true
    },
    {
      id: "5",
      name: "Hyundai Excellence",
      profileImage: "/api/placeholder/60/60",
      rating: 4.4,
      reviews: 112,
      location: "North Nazimabad, Karachi",
      phone: "+92-21-38567890",
      email: "sales@hyundaiexcellence.com",
      description: "Trusted Hyundai dealer with quality service",
      totalCars: 25,
      isOnline: true,
      lastSeen: "online",
      specialOffers: ["Extended warranty", "Free maintenance"],
      verified: false
    },
    {
      id: "6",
      name: "MG Motor Showroom",
      profileImage: "/api/placeholder/60/60",
      rating: 4.3,
      reviews: 76,
      location: "Malir Cantonment, Karachi",
      phone: "+92-21-39567890",
      email: "contact@mgmotor.com",
      description: "Newest MG dealership with innovative designs",
      totalCars: 22,
      isOnline: false,
      lastSeen: "last seen 1 hour ago",
      specialOffers: ["New launch offers"],
      verified: true
    }
  ];

  const filteredDealerships = dealerships.filter(dealer =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDealershipClick = (dealership: Dealership) => {
    setSelectedDealership(dealership.id);
    // Navigate to dealer showroom
    navigate(`/dealer-showroom/${dealership.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gold mb-2">
            {t('header.dealerships')}
          </h1>
          <p className="text-text-secondary">
            Connect with verified car dealerships across Pakistan
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <Input
            placeholder="Search dealerships or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dark-surface border-border text-foreground h-12"
          />
        </div>

        {/* WhatsApp-style Dealership List */}
        <div className="bg-dark-surface rounded-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-dark-elevated">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Dealerships</h2>
              <Badge variant="outline" className="text-gold border-gold">
                {filteredDealerships.length} dealers
              </Badge>
            </div>
          </div>

          {/* Dealership List */}
          <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
            {filteredDealerships.map((dealership) => (
              <div
                key={dealership.id}
                onClick={() => handleDealershipClick(dealership)}
                className="p-4 hover:bg-dark-elevated cursor-pointer transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <Avatar className="w-14 h-14 border-2 border-gold/20">
                      <AvatarImage src={dealership.profileImage} alt={dealership.name} />
                      <AvatarFallback className="bg-gradient-gold text-primary-foreground font-bold">
                        {dealership.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Online Status */}
                    {dealership.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-surface"></div>
                    )}
                    
                    {/* Verified Badge */}
                    {dealership.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Dealership Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-foreground font-semibold truncate group-hover:text-gold transition-colors">
                        {dealership.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-gold transition-colors" />
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{dealership.rating}</span>
                      </div>
                      <span className="text-sm text-text-secondary">({dealership.reviews} reviews)</span>
                      <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
                      <div className="flex items-center space-x-1">
                        <Car className="w-4 h-4 text-gold" />
                        <span className="text-sm text-gold font-medium">{dealership.totalCars} cars</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-1 mb-2">
                      <MapPin className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary truncate">{dealership.location}</span>
                    </div>

                    {/* Special Offers Preview */}
                    {dealership.specialOffers.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs bg-gold/20 text-gold border-gold/30">
                          {dealership.specialOffers[0]}
                        </Badge>
                        {dealership.specialOffers.length > 1 && (
                          <span className="text-xs text-text-secondary">
                            +{dealership.specialOffers.length - 1} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Last Seen */}
                    <div className="mt-2">
                      <span className="text-xs text-text-secondary">
                        {dealership.lastSeen}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 border-gold text-gold hover:bg-gold hover:text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${dealership.phone}`);
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://wa.me/${dealership.phone.replace(/[^0-9]/g, '')}`);
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDealerships.length === 0 && (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No dealerships found</h3>
              <p className="text-text-secondary">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gold mb-1">
                {dealerships.filter(d => d.verified).length}
              </div>
              <div className="text-sm text-text-secondary">Verified Dealers</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {dealerships.filter(d => d.isOnline).length}
              </div>
              <div className="text-sm text-text-secondary">Online Now</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">
                {dealerships.reduce((sum, d) => sum + d.totalCars, 0)}
              </div>
              <div className="text-sm text-text-secondary">Total Vehicles</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500 mb-1">
                {(dealerships.reduce((sum, d) => sum + d.rating, 0) / dealerships.length).toFixed(1)}
              </div>
              <div className="text-sm text-text-secondary">Avg Rating</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dealerships;