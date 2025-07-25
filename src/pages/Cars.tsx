import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, User, Fuel, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    location: "",
    priceRange: ""
  });

  const cars = [
    {
      id: 1,
      name: "Toyota Corolla GLi",
      brand: "Toyota",
      year: 2022,
      category: "Sedan",
      location: "Karachi",
      rate: "5,000",
      mileage: "15 km/l",
      withDriver: true,
      transmission: "Manual",
      features: ["AC", "Power Steering", "USB Charging"],
      availability: "Available"
    },
    {
      id: 2,
      name: "Suzuki Alto VXR",
      brand: "Suzuki",
      year: 2023,
      category: "Hatchback",
      location: "Lahore",
      rate: "3,500",
      mileage: "18 km/l",
      withDriver: false,
      transmission: "Manual",
      features: ["AC", "Power Windows"],
      availability: "Available"
    },
    {
      id: 3,
      name: "Honda City Aspire",
      brand: "Honda",
      year: 2021,
      category: "Sedan",
      location: "Islamabad",
      rate: "6,500",
      mileage: "14 km/l",
      withDriver: true,
      transmission: "CVT",
      features: ["AC", "Sunroof", "Alloy Wheels"],
      availability: "Available"
    },
    {
      id: 4,
      name: "Hyundai Tucson",
      brand: "Hyundai",
      year: 2022,
      category: "SUV",
      location: "Karachi",
      rate: "12,000",
      mileage: "12 km/l",
      withDriver: true,
      transmission: "Automatic",
      features: ["AC", "Leather Seats", "Navigation"],
      availability: "Available"
    },
    {
      id: 5,
      name: "Suzuki Cultus VXR",
      brand: "Suzuki",
      year: 2020,
      category: "Hatchback",
      location: "Lahore",
      rate: "3,000",
      mileage: "16 km/l",
      withDriver: false,
      transmission: "Manual",
      features: ["AC", "Central Locking"],
      availability: "Rented"
    },
    {
      id: 6,
      name: "Toyota Fortuner",
      brand: "Toyota",
      year: 2023,
      category: "SUV",
      location: "Islamabad",
      rate: "15,000",
      mileage: "10 km/l",
      withDriver: true,
      transmission: "Automatic",
      features: ["AC", "4WD", "Premium Sound"],
      availability: "Available"
    }
  ];

  const brands = ["Toyota", "Suzuki", "Honda", "Hyundai", "KIA"];
  const categories = ["Sedan", "SUV", "Hatchback", "Luxury"];
  const locations = ["Karachi", "Lahore", "Islamabad", "Rawalpindi"];

  const filteredCars = cars.filter(car => {
    return (
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.brand === "" || car.brand === filters.brand) &&
      (filters.category === "" || car.category === filters.category) &&
      (filters.location === "" || car.location === filters.location)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Cars</h1>
          <p className="text-text-secondary">Find the perfect car for your needs</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search cars by name, brand, or model..."
              className="pl-10 bg-dark-surface border-border text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select onValueChange={(value) => setFilters({...filters, brand: value})}>
              <SelectTrigger className="bg-dark-surface border-border text-foreground">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setFilters({...filters, category: value})}>
              <SelectTrigger className="bg-dark-surface border-border text-foreground">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setFilters({...filters, location: value})}>
              <SelectTrigger className="bg-dark-surface border-border text-foreground">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="luxury" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-gold transition-all duration-300 bg-dark-surface border-border overflow-hidden">
              <div className="aspect-video bg-dark-elevated relative overflow-hidden">
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-4xl">🚗</span>
                </div>
                <Badge 
                  className={`absolute top-3 right-3 ${
                    car.availability === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {car.availability}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">
                    {car.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {car.year}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Fuel className="w-4 h-4" />
                    <span>{car.mileage}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <User className="w-4 h-4" />
                    <span>{car.withDriver ? "With Driver" : "Self Drive"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
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
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gold">Rs {car.rate}</span>
                    <span className="text-sm text-text-secondary">/day</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="luxury" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    variant="premium" 
                    className="flex-1"
                    disabled={car.availability !== 'Available'}
                  >
                    {car.availability === 'Available' ? 'Book Now' : 'Not Available'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No cars found matching your criteria</p>
            <Button 
              variant="luxury" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setFilters({brand: "", category: "", location: "", priceRange: ""});
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cars;