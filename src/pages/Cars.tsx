import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, User, Fuel, Calendar, ChevronLeft, ChevronRight, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  description: string;
  features: string[];
  images: string[];
  location: {
    address: string;
    city: string;
    area: string;
  };
  condition: string;
  color: string;
  with_driver: boolean;
  package_type: string;
  status: string;
  user_id: string;
  created_at: string;
}

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    location: "",
    priceRange: ""
  });
  const { toast } = useToast();

  // Pagination constants
  const CARS_PER_PAGE = 20;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          car_brands(name),
          car_categories(name)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cars:', error);
        toast({
          title: "Error",
          description: "Failed to load car listings. Please try again.",
          variant: "destructive",
        });
        setCars([]);
      } else {
        // Transform the data to match expected format
        const transformedData = (data || []).map(car => ({
          ...car,
          brand: car.car_brands?.name || 'Unknown Brand',
          category: car.car_categories?.name || 'Unknown Category',
          daily_rate: car.price_per_day || 0
        }));
        setCars(transformedData);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = !filters.brand || car.brand === filters.brand;
      const matchesCategory = !filters.category || car.category === filters.category;
      const matchesLocation = !filters.location || car.location?.city === filters.location;
      
      let matchesPrice = true;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        const carPrice = car.daily_rate || car.price_per_day || 0;
        matchesPrice = carPrice >= min && (max ? carPrice <= max : true);
      }

      return matchesSearch && matchesBrand && matchesCategory && matchesLocation && matchesPrice;
    });
  }, [cars, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE
  );

  // Get unique values for filters
  const uniqueBrands = [...new Set(cars.map(car => car.brand))].sort();
  const uniqueCategories = [...new Set(cars.map(car => car.category))].sort();
  const uniqueLocations = [...new Set(cars.map(car => car.location?.city).filter(Boolean))].sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Car className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Loading Cars...</h2>
              <p className="text-muted-foreground">Please wait while we fetch the latest listings</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Cars</h1>
          <p className="text-muted-foreground">
            {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} available for rent
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by car name, brand, or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {uniqueBrands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                <SelectItem value="0-2500">Under PKR 2,500</SelectItem>
                <SelectItem value="2500-5000">PKR 2,500 - 5,000</SelectItem>
                <SelectItem value="5000-7500">PKR 5,000 - 7,500</SelectItem>
                <SelectItem value="7500-10000">PKR 7,500 - 10,000</SelectItem>
                <SelectItem value="10000">Above PKR 10,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <Car className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">No Cars Available</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {cars.length === 0 
                ? "There are currently no approved car listings. Be the first to list your car!"
                : "No cars match your search criteria. Try adjusting your filters."
              }
            </p>
            {cars.length === 0 && (
              <Button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold/90 hover:to-gold-dark/90 text-dark">
                List Your Car
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedCars.map((car) => (
                <Card key={car.id} className="group hover:shadow-lg transition-all duration-300 hover:border-gold/30">
                  <CardContent className="p-0">
                    {/* Car Image */}
                    <div className="relative h-48 bg-dark-elevated rounded-t-lg overflow-hidden">
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={car.images[0]}
                          alt={car.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Package Badge */}
                      {car.package_type !== 'basic' && (
                        <Badge className="absolute top-3 left-3 bg-gold text-dark">
                          {car.package_type.toUpperCase()}
                        </Badge>
                      )}
                      
                      {/* Availability Badge */}
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        Available
                      </Badge>
                    </div>

                    {/* Car Details */}
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-gold transition-colors">
                          {car.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {car.brand} {car.model} • {car.year}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{car.location?.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="w-3 h-3" />
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{car.transmission}</span>
                        </div>
                      </div>

                      {/* Features */}
                      {car.features && car.features.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {car.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {car.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{car.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gold">
                            PKR {car.daily_rate?.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">/day</span>
                        </div>
                        <Button size="sm" className="bg-gold hover:bg-gold/90 text-dark">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-gold text-dark" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cars;