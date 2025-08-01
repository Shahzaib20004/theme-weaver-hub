import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Car,
  Fuel,
  Calendar,
  Settings,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  Camera,
  Eye,
  Clock,
  CreditCard
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface CarDetailData {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  images: string[];
  description: string;
  specifications: {
    engine: string;
    transmission: string;
    fuelType: string;
    mileage: number;
    seats: number;
    color: string;
    bodyType: string;
    drivetrain: string;
  };
  features: string[];
  condition: string;
  availability: "available" | "rented" | "maintenance";
  withDriver: boolean;
  pickupDelivery: boolean;
  insurance: boolean;
  verified: boolean;
  owner: {
    id: string;
    name: string;
    type: "individual" | "dealer";
    profileImage: string;
    rating: number;
    reviews: number;
    phone: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    joinedDate: string;
    responseTime: string;
    isOnline: boolean;
  };
  location: {
    city: string;
    area: string;
    coordinates?: { lat: number; lng: number };
    showExact: boolean;
  };
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    deposit: number;
  };
  policies: {
    cancellation: string;
    fuelPolicy: string;
    mileageLimit: string;
  };
}

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [carData, setCarData] = useState<CarDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCarData: CarDetailData = {
      id: carId || "1",
      name: "Toyota Corolla GLi 2023",
      brand: "Toyota",
      model: "Corolla GLi",
      year: 2023,
      price: 8500,
      category: "Sedan",
      images: Array.from({ length: 12 }, (_, i) => `/api/placeholder/800/600?car=${i + 1}`),
      description: "Immaculate 2023 Toyota Corolla GLi in excellent condition. This reliable sedan offers superior fuel efficiency, comfortable seating for 5, and modern safety features. Perfect for city driving and long trips. Recently serviced with all maintenance records available.",
      specifications: {
        engine: "1.3L 4-Cylinder",
        transmission: "5-Speed Manual",
        fuelType: "Petrol",
        mileage: 15,
        seats: 5,
        color: "Pearl White",
        bodyType: "Sedan",
        drivetrain: "Front-Wheel Drive"
      },
      features: [
        "Air Conditioning",
        "Power Steering",
        "Central Locking",
        "Electric Windows",
        "ABS Brakes",
        "Airbags",
        "USB Charging Port",
        "FM/AM Radio",
        "CD Player",
        "Immobilizer",
        "Remote Key"
      ],
      condition: "Excellent",
      availability: "available",
      withDriver: true,
      pickupDelivery: true,
      insurance: true,
      verified: true,
      owner: {
        id: "owner1",
        name: "Ahmad Motors",
        type: "dealer",
        profileImage: "/api/placeholder/80/80",
        rating: 4.8,
        reviews: 156,
        phone: "+92-300-1234567",
        location: "Gulberg, Lahore",
        coordinates: { lat: 31.5204, lng: 74.3587 },
        joinedDate: "2020-01-15",
        responseTime: "Usually responds within 1 hour",
        isOnline: true
      },
      location: {
        city: "Lahore",
        area: "Gulberg",
        coordinates: { lat: 31.5204, lng: 74.3587 },
        showExact: false
      },
      pricing: {
        daily: 8500,
        weekly: 55000,
        monthly: 200000,
        deposit: 25000
      },
      policies: {
        cancellation: "Free cancellation up to 24 hours before pickup",
        fuelPolicy: "Return with same fuel level",
        mileageLimit: "200 km/day included, Rs 15/km after"
      }
    };

    setCarData(mockCarData);
    setLoading(false);
  }, [carId]);

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!carData) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? carData.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === carData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleContactOwner = () => {
    if (!carData) return;
    window.open(`tel:${carData.owner.phone}`);
  };

  const handleWhatsApp = () => {
    if (!carData) return;
    const message = `Hi, I'm interested in your ${carData.name}`;
    const phoneNumber = carData.owner.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  const handleRequestLocation = () => {
    if (carData?.owner.type === "individual") {
      setShowLocationPrompt(true);
    } else {
      // For dealers, show location immediately
      toast({
        title: "Location Shared",
        description: "Dealer location is now visible on the map"
      });
    }
  };

  const handleBookNow = () => {
    // Implement booking logic
    toast({
      title: "Booking Request Sent",
      description: "The owner will be notified of your booking request"
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Car removed from your favorites" : "Car added to your favorites"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Car not found</h2>
          <p className="text-text-secondary mb-4">The requested car could not be found.</p>
          <Button onClick={() => navigate('/cars')}>
            Back to Cars
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
          onClick={() => navigate(-1)}
          className="mb-6 text-gold hover:text-gold/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Car Images Gallery */}
        <Card className="bg-dark-surface border-border mb-8">
          <CardContent className="p-0">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden rounded-t-lg">
                <img 
                  src={carData.images[currentImageIndex]} 
                  alt={`${carData.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {carData.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  <Camera className="w-4 h-4 inline mr-1" />
                  {currentImageIndex + 1}/{carData.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {carData.verified && (
                    <Badge className="bg-blue-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {carData.availability === "available" && (
                    <Badge className="bg-green-500 text-white">Available</Badge>
                  )}
                  {carData.withDriver && (
                    <Badge className="bg-gold text-black">Driver Available</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 bg-dark-elevated">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {carData.images.slice(0, 20).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${
                        index === currentImageIndex ? 'border-gold' : 'border-border'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Info */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl text-gold mb-2">{carData.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {carData.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        {carData.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {carData.location.city}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gold">
                      Rs {carData.price.toLocaleString()}
                      <span className="text-lg text-text-secondary font-normal">/day</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary leading-relaxed">{carData.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(carData.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Features & Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {carData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pricing Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-dark-elevated rounded-lg">
                    <div className="text-2xl font-bold text-gold">Rs {carData.pricing.daily.toLocaleString()}</div>
                    <div className="text-text-secondary">Daily Rate</div>
                  </div>
                  <div className="text-center p-4 bg-dark-elevated rounded-lg">
                    <div className="text-2xl font-bold text-gold">Rs {carData.pricing.weekly.toLocaleString()}</div>
                    <div className="text-text-secondary">Weekly Rate</div>
                  </div>
                  <div className="text-center p-4 bg-dark-elevated rounded-lg">
                    <div className="text-2xl font-bold text-gold">Rs {carData.pricing.monthly.toLocaleString()}</div>
                    <div className="text-text-secondary">Monthly Rate</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Security Deposit Required</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Rs {carData.pricing.deposit.toLocaleString()} refundable security deposit
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Rental Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(carData.policies).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="font-medium text-foreground mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-text-secondary text-sm">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold">
                  {carData.owner.type === "dealer" ? "Dealership" : "Owner"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={carData.owner.profileImage} alt={carData.owner.name} />
                      <AvatarFallback>{carData.owner.name[0]}</AvatarFallback>
                    </Avatar>
                    {carData.owner.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark-surface"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{carData.owner.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-foreground">{carData.owner.rating}</span>
                      <span className="text-sm text-text-secondary">({carData.owner.reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-text-secondary">{carData.owner.responseTime}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleContactOwner} className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Owner
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleWhatsApp}
                    className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booking Actions */}
            <Card className="bg-dark-surface border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    onClick={handleBookNow}
                    className="w-full h-12 text-lg"
                    disabled={carData.availability !== "available"}
                  >
                    {carData.availability === "available" ? "Book Now" : "Not Available"}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleRequestLocation}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-text-secondary">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Free cancellation • No booking fees
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                {carData.location.showExact || carData.owner.type === "dealer" ? (
                  <GoogleMap
                    center={carData.location.coordinates || carData.owner.coordinates}
                    zoom={14}
                    height="200px"
                    markers={carData.location.coordinates ? [
                      {
                        position: carData.location.coordinates,
                        title: carData.name,
                        info: `${carData.name} location`
                      }
                    ] : []}
                  />
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                    <p className="text-text-secondary mb-3">
                      Exact location hidden for privacy
                    </p>
                    <Button onClick={handleRequestLocation} variant="outline">
                      Request Location
                    </Button>
                  </div>
                )}
                <div className="mt-3 text-center">
                  <p className="text-sm text-text-secondary">
                    {carData.location.area}, {carData.location.city}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-dark-surface border-border">
              <CardHeader>
                <CardTitle className="text-gold">Included Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Driver Service</span>
                    <Badge variant={carData.withDriver ? "default" : "secondary"}>
                      {carData.withDriver ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Pickup/Delivery</span>
                    <Badge variant={carData.pickupDelivery ? "default" : "secondary"}>
                      {carData.pickupDelivery ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Insurance</span>
                    <Badge variant={carData.insurance ? "default" : "secondary"}>
                      {carData.insurance ? "Included" : "Not Included"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;