import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Brands = () => {
  const brands = [
    {
      id: "toyota",
      name: "Toyota",
      logo: "/api/placeholder/120/60",
      description: "World's most reliable automotive brand",
      carCount: 145,
      rating: 4.8,
      popular: true,
      models: ["Corolla", "Camry", "Prius", "Fortuner", "Land Cruiser"]
    },
    {
      id: "honda",
      name: "Honda", 
      logo: "/api/placeholder/120/60",
      description: "Engineering excellence and innovation",
      carCount: 98,
      rating: 4.7,
      popular: true,
      models: ["Civic", "Accord", "City", "BR-V", "CR-V"]
    },
    {
      id: "suzuki",
      name: "Suzuki",
      logo: "/api/placeholder/120/60", 
      description: "Compact cars with great fuel efficiency",
      carCount: 112,
      rating: 4.6,
      popular: true,
      models: ["Alto", "Swift", "Cultus", "Vitara", "Jimny"]
    },
    {
      id: "hyundai",
      name: "Hyundai",
      logo: "/api/placeholder/120/60",
      description: "Modern design with advanced technology",
      carCount: 67,
      rating: 4.5,
      popular: false,
      models: ["Elantra", "Tucson", "Sonata", "Santa Fe", "Accent"]
    },
    {
      id: "kia",
      name: "KIA",
      logo: "/api/placeholder/120/60",
      description: "Bold design and innovative features",
      carCount: 45,
      rating: 4.4,
      popular: false,
      models: ["Picanto", "Cerato", "Sportage", "Sorento", "Stonic"]
    },
    {
      id: "nissan",
      name: "Nissan",
      logo: "/api/placeholder/120/60",
      description: "Innovation that excites",
      carCount: 52,
      rating: 4.3,
      popular: false,
      models: ["Sunny", "Altima", "X-Trail", "Patrol", "Kicks"]
    },
    {
      id: "mercedes",
      name: "Mercedes-Benz",
      logo: "/api/placeholder/120/60",
      description: "Luxury and performance combined",
      carCount: 23,
      rating: 4.9,
      popular: false,
      models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"]
    },
    {
      id: "bmw",
      name: "BMW",
      logo: "/api/placeholder/120/60",
      description: "The ultimate driving machine",
      carCount: 18,
      rating: 4.8,
      popular: false,
      models: ["3 Series", "5 Series", "X3", "X5", "7 Series"]
    },
    {
      id: "audi",
      name: "Audi",
      logo: "/api/placeholder/120/60",
      description: "Vorsprung durch Technik",
      carCount: 15,
      rating: 4.7,
      popular: false,
      models: ["A4", "A6", "Q5", "Q7", "A8"]
    }
  ];

  const popularBrands = brands.filter(brand => brand.popular);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Car Brands
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Explore vehicles from the world's most trusted automotive brands. From economy to luxury, find the perfect car for your needs.
            </p>
          </div>

          {/* Popular Brands */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-gold" />
              Popular Brands
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBrands.map((brand) => (
                <Card key={brand.id} className="group hover:shadow-gold transition-all duration-300 cursor-pointer bg-dark-surface border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="h-12 object-contain"
                      />
                      <Badge className="bg-gold text-primary-foreground">Popular</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">{brand.name}</h3>
                    <p className="text-text-secondary text-sm mb-4">{brand.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4 text-gold" />
                        <span className="text-sm font-medium text-foreground">{brand.carCount} cars</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-foreground">{brand.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-text-secondary mb-2">Popular Models:</p>
                      <div className="flex flex-wrap gap-1">
                        {brand.models.slice(0, 3).map((model, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-dark-elevated text-foreground">
                            {model}
                          </Badge>
                        ))}
                        {brand.models.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-dark-elevated text-text-secondary">
                            +{brand.models.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button variant="luxury" className="w-full group-hover:scale-105 transition-transform duration-300">
                      View {brand.name} Cars
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Brands */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">All Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {brands.map((brand) => (
                <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-dark-surface border-border">
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="h-8 mx-auto object-contain"
                      />
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-1 text-sm">{brand.name}</h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Car className="w-3 h-3 text-gold" />
                        <span className="text-xs text-foreground">{brand.carCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-foreground">{brand.rating}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full text-xs h-7">
                      View Cars
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Brand Stats */}
          <div className="mt-16 bg-dark-surface rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Brand Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">9</div>
                <div className="text-sm text-text-secondary">Total Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">575</div>
                <div className="text-sm text-text-secondary">Total Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">4.7</div>
                <div className="text-sm text-text-secondary">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">3</div>
                <div className="text-sm text-text-secondary">Popular Brands</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;
