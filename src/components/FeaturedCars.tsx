import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Fuel, Calendar, Star, Car, Verified, Heart, Eye, Phone, MessageCircle, Shield, Crown, Clock, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";

interface CarListing {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  daily_rate: number;
  mileage: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  images: string[];
  location: {
    address: string;
    city: string;
    area: string;
  };
  with_driver: boolean;
  package_type: string;
  status: string;
  created_at: string;
  dealer_name?: string;
  dealer_rating?: number;
  dealer_verified?: boolean;
  views?: number;
  likes?: number;
}

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          car_brands(name),
          car_categories(name),
          profiles(dealer_name, is_dealer)
        `)
        .eq('is_available', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured cars:', error);
        setFeaturedCars([]);
      } else {
        // Transform the data to match expected format
        const transformedData = (data || []).map(car => ({
          ...car,
          brand: car.car_brands?.name || 'Unknown Brand',
          category: car.car_categories?.name || 'Unknown Category',
          daily_rate: car.price_per_day || 0,
          dealer_name: car.profiles?.dealer_name || 'Private Seller',
          dealer_verified: car.profiles?.is_dealer || false,
          dealer_rating: 4.5 + Math.random() * 0.5, // Mock rating for demo
          views: Math.floor(Math.random() * 500) + 50,
          likes: Math.floor(Math.random() * 50) + 5
        }));
        setFeaturedCars(transformedData);
      }
    } catch (error) {
      console.error('Error fetching featured cars:', error);
      setFeaturedCars([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-elevated to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Featured Cars</h2>
            <p className="text-xl text-text-secondary">Premium listings from verified dealers across Pakistan</p>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Star className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
              <p className="text-text-secondary">Loading featured cars...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCars.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-dark-elevated to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Featured Cars</h2>
            <p className="text-xl text-text-secondary">Premium listings from verified dealers across Pakistan</p>
          </div>
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Featured Cars Yet</h3>
            <p className="text-text-secondary mb-6">
              Be the first to feature your car listing and get maximum visibility!
            </p>
            <Link to="/add-car">
              <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                Feature Your Car
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-dark-elevated to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/30 rounded-full px-6 py-2 mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Premium Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Featured Cars</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Handpicked premium cars from verified dealers across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-2xl transition-all duration-500 hover:border-gold/50 bg-card/50 backdrop-blur-sm border-border overflow-hidden relative">
              {/* Image Section */}
              <div className="relative h-56 bg-dark-surface overflow-hidden">
                {car.images && car.images.length > 0 ? (
                  <OptimizedImage
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    priority={index < 3} // Load first 3 images immediately
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/10 to-gold-dark/10">
                    <Car className="w-20 h-20 text-gold" />
                  </div>
                )}
                
                {/* Premium Package Badge */}
                {car.package_type === 'premium' && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    PREMIUM
                  </Badge>
                )}

                {/* Featured Badge */}
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold shadow-lg">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  FEATURED
                </Badge>

                {/* Image Count */}
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    {car.images.length}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-black/70 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-black/70 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-foreground group-hover:text-gold transition-colors mb-2 line-clamp-2">
                    {car.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary font-medium">
                      {car.brand} {car.model} • {car.year}
                    </p>
                    <div className="text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(car.created_at)}
                    </div>
                  </div>
                </div>

                {/* Dealer Info */}
                <div className="bg-dark-elevated/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold-dark/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-foreground text-sm">{car.dealer_name}</span>
                          {car.dealer_verified && (
                            <Verified className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-xs text-text-secondary">{car.dealer_rating?.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-7 h-7 bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                        <Phone className="w-3 h-3" />
                      </button>
                      <button className="w-7 h-7 bg-blue-500/20 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                        <MessageCircle className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Car Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{car.location?.city || 'Pakistan'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Fuel className="w-4 h-4 text-green-500" />
                    <span>{car.fuel_type}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <User className="w-4 h-4 text-purple-500" />
                    <span>{car.seats} Seats</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {car.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {car.likes} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    Verified
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gold">
                      PKR {car.daily_rate?.toLocaleString()}
                    </span>
                    <span className="text-sm text-text-secondary">/day</span>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Best Price
                  </Badge>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/car-details/${car.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-dark font-medium">
                      View Details
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                    Contact Dealer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        {featuredCars.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 rounded-2xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">Discover More Premium Cars</h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Explore thousands of verified cars from trusted dealers across Pakistan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cars">
                  <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark font-semibold">
                    Browse All Cars
                  </Button>
                </Link>
                <Link to="/dealerships">
                  <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-dark">
                    View All Dealers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;