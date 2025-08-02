import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, User, Fuel, Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCars, useCarBrands, useDealerships } from "@/hooks/useApi";
import { useRealtime } from "@/contexts/RealtimeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    location: "",
    priceRange: ""
  });

  // Pagination constants
  const CARS_PER_PAGE = 20; // 2x10 layout

  // Fetch real-time data
  const { data: cars = [], isLoading: carsLoading, error: carsError } = useCars({
    location: filters.location || undefined,
    brand_id: filters.brand || undefined,
    category: filters.category || undefined,
  });

  const { data: brands = [], isLoading: brandsLoading } = useCarBrands();
  const { data: dealerships = [], isLoading: dealershipsLoading } = useDealerships();
  
  // Real-time connection status
  const { isConnected } = useRealtime();

  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    let filtered = cars;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.car_brands?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(car => {
        const price = car.daily_rate;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    return filtered;
  }, [cars, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARS_PER_PAGE;
  const endIndex = startIndex + CARS_PER_PAGE;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Loading state
  if (carsLoading || brandsLoading || dealershipsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading cars...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (carsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cars</h2>
            <p className="text-gray-600 mb-4">{carsError.message}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Real-time status indicator */}
      {isConnected && (
        <div className="bg-green-100 border-b border-green-200 px-4 py-2">
          <div className="container mx-auto flex items-center justify-center text-sm text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live updates enabled
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-600">
            {filteredCars.length} cars available for rent
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Brand Filter */}
            <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="Karachi">Karachi</SelectItem>
                <SelectItem value="Lahore">Lahore</SelectItem>
                <SelectItem value="Islamabad">Islamabad</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                <SelectItem value="0-5000">Under ₹5,000</SelectItem>
                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                <SelectItem value="20000-999999">Above ₹20,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cars Grid */}
        {currentCars.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCars.map((car) => (
              <Card key={car.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    {car.images && car.images[0] ? (
                      <img 
                        src={car.images[0]} 
                        alt={car.model}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{car.model}</h3>
                      <Badge variant={car.status === 'available' ? 'default' : 'secondary'}>
                        {car.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600">{car.car_brands?.name} • {car.year}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {car.location || car.dealerships?.city}
                      </div>
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-1" />
                        {car.fuel_type}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{car.daily_rate.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                      
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cars;