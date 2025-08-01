import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Car, 
  ArrowLeft,
  Clock,
  Shield,
  Award,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";

interface DealerShowroomData {
  id: string;
  name: string;
  profileImage: string;
  rating: number;
  reviews: number;
  location: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  description: string;
  totalCars: number;
  isOnline: boolean;
  lastSeen: string;
  specialOffers: string[];
  verified: boolean;
  openingHours: string;
  establishedYear: number;
  cars: CarListing[];
}

interface CarListing {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  category: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  withDriver: boolean;
  featured: boolean;
  available: boolean;
}

const DealerShowroom = () => {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [dealerData, setDealerData] = useState<DealerShowroomData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockDealerData: DealerShowroomData = {
      id: dealerId || "1",
      name: "Toyota Center Karachi",
      profileImage: "/api/placeholder/120/120",
      rating: 4.8,
      reviews: 256,
      location: "Shahrah-e-Faisal, Karachi",
      coordinates: { lat: 24.8607, lng: 67.0011 },
      phone: "+92-21-34567890",
      email: "info@toyotakarachi.com",
      description: "Authorized Toyota dealer providing premium vehicles with exceptional service. We have been serving Karachi for over 20 years with a commitment to quality and customer satisfaction.",
      totalCars: 45,
      isOnline: true,
      lastSeen: "online",
      specialOffers: ["20% off on Corolla", "Free insurance for 6 months", "Zero down payment available"],
      verified: true,
      openingHours: "9:00 AM - 8:00 PM",
      establishedYear: 2003,
      cars: [
        {
          id: "1",
          name: "Toyota Corolla GLi",
          brand: "Toyota",
          year: 2023,
          price: 8500,
          image: "/api/placeholder/300/200",
          category: "Sedan",
          mileage: 15,
          transmission: "Manual",
          fuelType: "Petrol",
          withDriver: false,
          featured: true,
          available: true
        },
        {
          id: "2",
          name: "Toyota Camry Hybrid",
          brand: "Toyota",
          year: 2023,
          price: 15000,
          image: "/api/placeholder/300/200",
          category: "Sedan",
          mileage: 20,
          transmission: "Automatic",
          fuelType: "Hybrid",
          withDriver: true,
          featured: true,
          available: true
        },
        {
          id: "3",
          name: "Toyota Prado",
          brand: "Toyota",
          year: 2022,
          price: 25000,
          image: "/api/placeholder/300/200",
          category: "SUV",
          mileage: 12,
          transmission: "Automatic",
          fuelType: "Petrol",
          withDriver: true,
          featured: false,
          available: true
        },
        {
          id: "4",
          name: "Toyota Hiace",
          brand: "Toyota",
          year: 2023,
          price: 12000,
          image: "/api/placeholder/300/200",
          category: "Van",
          mileage: 10,
          transmission: "Manual",
          fuelType: "Diesel",
          withDriver: true,
          featured: false,
          available: false
        }
      ]
    };

    setDealerData(mockDealerData);
    setLoading(false);
  }, [dealerId]);

  const handleCarClick = (car: CarListing) => {
    navigate(`/car-details/${car.id}`);
  };

  const handleCallDealer = () => {
    window.open(`tel:${dealerData?.phone}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in your cars at ${dealerData?.name}`;
    const phoneNumber = dealerData?.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading showroom...</p>
        </div>
      </div>
    );
  }

  if (!dealerData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Showroom not found</h2>
          <p className="text-text-secondary mb-4">The requested dealership could not be found.</p>
          <Button onClick={() => navigate('/dealerships')}>
            Back to Dealerships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dealerships')}
          className="mb-6 text-gold hover:text-gold/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dealerships
        </Button>

        {/* Dealer Profile Header */}
        <Card className="bg-dark-surface border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-gold/20">
                  <AvatarImage src={dealerData.profileImage} alt={dealerData.name} />
                  <AvatarFallback className="bg-gradient-gold text-primary-foreground font-bold text-2xl">
                    {dealerData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                {/* Online Status */}
                {dealerData.isOnline && (
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-dark-surface flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                
                {/* Verified Badge */}
                {dealerData.verified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-dark-surface">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Dealer Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gold">{dealerData.name}</h1>
                  {dealerData.verified && (
                    <Badge className="bg-blue-500 text-white">Verified</Badge>
                  )}
                </div>

                {/* Rating and Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{dealerData.rating}</span>
                    <span className="text-text-secondary">({dealerData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Car className="w-5 h-5 text-gold" />
                    <span className="text-gold font-medium">{dealerData.totalCars} vehicles</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-text-secondary">Est. {dealerData.establishedYear}</span>
                  </div>
                </div>

                {/* Location and Contact */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gold" />
                    <span className="text-foreground">{dealerData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">{dealerData.openingHours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-text-secondary">{dealerData.lastSeen}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-4">{dealerData.description}</p>

                {/* Special Offers */}
                {dealerData.specialOffers.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Special Offers:</h3>
                    <div className="flex flex-wrap gap-2">
                      {dealerData.specialOffers.map((offer, index) => (
                        <Badge key={index} variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                          {offer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleCallDealer} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Map */}
        <Card className="bg-dark-surface border-border mb-8">
          <CardHeader>
            <CardTitle className="text-gold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Showroom Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleMap
              center={dealerData.coordinates}
              zoom={15}
              height="300px"
              markers={[
                {
                  position: dealerData.coordinates,
                  title: dealerData.name,
                  info: `${dealerData.name} - ${dealerData.location}`
                }
              ]}
            />
          </CardContent>
        </Card>

        {/* Cars Grid - Mobile Optimized 2x2 Layout */}
        <Card className="bg-dark-surface border-border">
          <CardHeader>
            <CardTitle className="text-gold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Available Vehicles ({dealerData.cars.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile: 2 cars per row, Desktop: 3-4 cars per row */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dealerData.cars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => handleCarClick(car)}
                  className="bg-dark-elevated rounded-lg border border-border cursor-pointer hover:border-gold transition-all duration-300 group overflow-hidden"
                >
                  {/* Car Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {car.featured && (
                        <Badge className="bg-gold text-black text-xs">Featured</Badge>
                      )}
                      {!car.available && (
                        <Badge variant="destructive" className="text-xs">Rented</Badge>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="absolute bottom-2 right-2">
                      {car.withDriver && (
                        <Badge variant="secondary" className="text-xs bg-blue-500/80 text-white">
                          +Driver
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-gold transition-colors truncate">
                      {car.name}
                    </h3>
                    
                    <div className="text-xs text-text-secondary space-y-1">
                      <div className="flex justify-between">
                        <span>{car.year}</span>
                        <span>{car.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{car.transmission}</span>
                        <span>{car.mileage} km/l</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="text-gold font-bold text-sm">
                        Rs {car.price.toLocaleString()}
                        <span className="text-xs text-text-secondary font-normal">/day</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 px-3 text-xs border-gold text-gold hover:bg-gold hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle quick booking
                        }}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {dealerData.cars.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No vehicles available</h3>
                <p className="text-text-secondary">This dealership doesn't have any vehicles listed at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <div className="mt-8 p-6 bg-dark-surface rounded-lg border border-border text-center">
          <h3 className="text-xl font-bold text-gold mb-2">Ready to Rent?</h3>
          <p className="text-text-secondary mb-4">
            Contact {dealerData.name} directly to inquire about vehicles and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleCallDealer} className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {dealerData.phone}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleWhatsApp}
              className="flex items-center gap-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Chat
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DealerShowroom;