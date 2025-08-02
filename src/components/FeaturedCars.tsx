import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Fuel, Calendar, Star, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
        .select('*')
        .eq('status', 'approved')
        .in('package_type', ['featured', 'premium'])
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured cars:', error);
        setFeaturedCars([]);
      } else {
        setFeaturedCars(data || []);
      }
    } catch (error) {
      console.error('Error fetching featured cars:', error);
      setFeaturedCars([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-dark-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Cars</h2>
            <p className="text-muted-foreground">Premium listings from verified dealers</p>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Star className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Loading featured cars...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCars.length === 0) {
    return (
      <section className="py-16 bg-dark-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Cars</h2>
            <p className="text-muted-foreground">Premium listings from verified dealers</p>
          </div>
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Featured Cars Yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to feature your car listing and get maximum visibility!
            </p>
            <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark">
              Feature Your Car
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-dark-elevated">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Cars</h2>
          <p className="text-muted-foreground">Premium listings from verified dealers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 hover:border-gold/50 bg-card border-border overflow-hidden">
              <div className="relative h-48 bg-dark-surface overflow-hidden">
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/10 to-gold-dark/10">
                    <Car className="w-16 h-16 text-gold" />
                  </div>
                )}
                
                {/* Package Badge */}
                <Badge className="absolute top-3 left-3 bg-gold text-dark">
                  <Star className="w-3 h-3 mr-1" />
                  {car.package_type.toUpperCase()}
                </Badge>
                
                {/* Availability Badge */}
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                  Available
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-foreground group-hover:text-gold transition-colors mb-1">
                    {car.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {car.brand} {car.model} • {car.year}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location?.city || 'Location not set'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel_type}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{car.seats} Seats</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gold">
                      PKR {car.daily_rate?.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-gold text-gold hover:bg-gold hover:text-dark">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {featuredCars.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark">
              View All Featured Cars
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;