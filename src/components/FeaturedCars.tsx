import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Fuel, Calendar } from "lucide-react";

const FeaturedCars = () => {
  const featuredCars = [
    {
      id: 1,
      name: "Toyota Corolla GLi",
      brand: "Toyota",
      year: 2022,
      location: "Karachi",
      rate: "5,000",
      image: "/placeholder-car.jpg",
      mileage: "15 km/l",
      withDriver: true,
      availability: "Available"
    },
    {
      id: 2,
      name: "Suzuki Alto VXR",
      brand: "Suzuki",
      year: 2023,
      location: "Lahore",
      rate: "3,500",
      image: "/placeholder-car.jpg",
      mileage: "18 km/l",
      withDriver: false,
      availability: "Available"
    },
    {
      id: 3,
      name: "Honda City Aspire",
      brand: "Honda",
      year: 2021,
      location: "Islamabad",
      rate: "6,500",
      image: "/placeholder-car.jpg",
      mileage: "14 km/l",
      withDriver: true,
      availability: "Available"
    },
    {
      id: 4,
      name: "Hyundai Tucson",
      brand: "Hyundai",
      year: 2022,
      location: "Karachi",
      rate: "12,000",
      image: "/placeholder-car.jpg",
      mileage: "12 km/l",
      withDriver: true,
      availability: "Available"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Cars
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Handpicked vehicles from verified dealerships
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-gold transition-all duration-300 bg-dark-surface border-border overflow-hidden">
              <div className="aspect-video bg-dark-elevated relative overflow-hidden">
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-4xl">🚗</span>
                </div>
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
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
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gold">Rs {car.rate}</span>
                    <span className="text-sm text-text-secondary">/day</span>
                  </div>
                </div>
                
                <Button variant="premium" className="w-full">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="luxury" size="lg">
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;